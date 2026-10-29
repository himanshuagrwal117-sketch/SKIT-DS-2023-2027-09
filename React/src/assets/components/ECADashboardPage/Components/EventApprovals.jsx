import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useSearchParams } from "react-router-dom";

import {
  ClipboardCheck,
  Search,
  RefreshCw,
  CalendarDays,
  Clock3,
  MapPin,
  Building2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileText,
  Eye,
  X,
  Loader2,
  ShieldCheck,
  Image as ImageIcon,
  UploadCloud,
  RotateCcw,
  ExternalLink,
  Trophy,
  MessageSquare,
  Check,
} from "lucide-react";

// =====================================================
// CONFIGURATION
// =====================================================

const API_URL = (
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000"
).replace(/\/+$/, "");

// These endpoints must be implemented in ecaAdmin.js
const ENDPOINTS = {
  list: `${API_URL}/api/eca/event-requests`,

  details: (id) =>
    `${API_URL}/api/eca/event-requests/${id}`,

  approveEvent: (id) =>
    `${API_URL}/api/eca/event-requests/${id}/approve`,

  rejectEvent: (id) =>
    `${API_URL}/api/eca/event-requests/${id}/reject`,

  approvePoster: (id) =>
    `${API_URL}/api/eca/event-requests/${id}/poster/approve`,

  rejectPoster: (id) =>
    `${API_URL}/api/eca/event-requests/${id}/poster/reject`,

  proposalUrl: (id) =>
    `${API_URL}/api/eca/event-requests/${id}/proposal-url`,

  posterUrl: (id) =>
    `${API_URL}/api/eca/event-requests/${id}/poster-url`,
};

// =====================================================
// CONSTANTS
// =====================================================

const FILTER_OPTIONS = [
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "approved",
    label: "Approved",
  },
  {
    value: "rejected",
    label: "Rejected",
  },
  {
    value: "all",
    label: "All Requests",
  },
];

const EVENT_STATUS_STYLES = {
  draft: {
    label: "Draft",
    className:
      "bg-gray-100 text-gray-600 border-gray-200",
  },

  pending: {
    label: "Pending",
    className:
      "bg-amber-50 text-amber-700 border-amber-200",
  },

  approved: {
    label: "Approved",
    className:
      "bg-green-50 text-green-700 border-green-200",
  },

  rejected: {
    label: "Rejected",
    className:
      "bg-red-50 text-red-700 border-red-200",
  },
};

const POSTER_STATUS_STYLES = {
  awaited: {
    label: "Poster Awaited",
    className:
      "bg-gray-100 text-gray-700 border-gray-200",
  },

  uploaded: {
    label: "Poster Uploaded",
    className:
      "bg-blue-50 text-blue-700 border-blue-200",
  },

  revised_not_uploaded: {
    label: "Revised Poster Not Uploaded",
    className:
      "bg-orange-50 text-orange-700 border-orange-200",
  },

  revised_uploaded: {
    label: "Revised Poster Uploaded",
    className:
      "bg-indigo-50 text-indigo-700 border-indigo-200",
  },

  approved: {
    label: "Approved",
    className:
      "bg-green-50 text-green-700 border-green-200",
  },
};

// =====================================================
// HELPERS
// =====================================================

const formatDate = (value) => {
  if (!value) return "—";

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const formatTime = (value) => {
  if (!value) return "—";

  const parts = String(value).split(":");

  const hours = Number(parts[0]);
  const minutes = Number(parts[1]);

  if (
    !Number.isFinite(hours) ||
    !Number.isFinite(minutes)
  ) {
    return value;
  }

  return new Date(
    2000,
    0,
    1,
    hours,
    minutes
  ).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const getClubName = (event) => {
  return (
    event?.clubs?.club_name ||
    event?.clubs?.name ||
    event?.club?.club_name ||
    event?.club?.name ||
    event?.club_name ||
    "Unknown Club"
  );
};

// Poster revision is expected to be stored in Supabase.
// 1 = original poster, 2+ = revised poster.
const getPosterRevision = (event) => {
  const revision = Number(event?.poster_revision);

  if (Number.isFinite(revision) && revision >= 1) {
    return revision;
  }

  return 1;
};

// =====================================================
// POSTER DISPLAY STATUS
// =====================================================

const getPosterDisplayStatus = (event) => {
  const eventStatus = event?.status;

  const posterStatus =
    event?.poster_status || "not_uploaded";

  const revision = getPosterRevision(event);

  if (posterStatus === "approved") {
    return "approved";
  }

  if (posterStatus === "rejected") {
    return "revised_not_uploaded";
  }

  if (posterStatus === "pending") {
    return revision > 1
      ? "revised_uploaded"
      : "uploaded";
  }

  if (eventStatus === "approved") {
    return "awaited";
  }

  return "awaited";
};

// =====================================================
// OVERALL APPROVAL STATUS
// =====================================================

const getOverallStatus = (event) => {
  if (event?.status === "rejected") {
    return "rejected";
  }

  if (
    event?.status === "approved" &&
    event?.poster_status === "approved"
  ) {
    return "approved";
  }

  return "pending";
};

// =====================================================
// BADGE COMPONENT
// =====================================================

const StatusBadge = ({
  status,
  type = "event",
}) => {
  const styles =
    type === "poster"
      ? POSTER_STATUS_STYLES
      : EVENT_STATUS_STYLES;

  const config = styles[status] || {
    label: status || "Unknown",
    className:
      "bg-gray-100 text-gray-600 border-gray-200",
  };

  return (
    <span
      className={`
        inline-flex items-center
        rounded-full border
        px-3 py-1
        text-xs font-semibold
        whitespace-nowrap
        ${config.className}
      `}
    >
      {config.label}
    </span>
  );
};

// =====================================================
// DETAIL ITEM
// =====================================================

const DetailItem = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
      <div className="mb-2 flex items-center gap-2 text-gray-500">
        <Icon size={15} />

        <span className="text-xs font-medium">
          {label}
        </span>
      </div>

      <p className="break-words text-sm font-semibold text-gray-900">
        {value ?? "—"}
      </p>
    </div>
  );
};

// =====================================================
// MAIN COMPONENT
// =====================================================

const EventApprovals = () => {
  const [searchParams, setSearchParams] =
    useSearchParams();

  // ===================================================
  // STATES
  // ===================================================

  const [events, setEvents] = useState([]);

  const [filter, setFilter] = useState("pending");

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const [selectedEvent, setSelectedEvent] =
    useState(null);

  const [detailLoading, setDetailLoading] =
    useState(false);

  const [decision, setDecision] = useState(null);

  const [rejectionReason, setRejectionReason] =
    useState("");

  const [submitting, setSubmitting] =
    useState(false);

  const [actionError, setActionError] =
    useState("");

  const [openingDocument, setOpeningDocument] =
    useState(false);

  // ===================================================
  // API REQUEST HELPER
  // ===================================================

  const apiRequest = useCallback(
    async (url, options = {}) => {
      const response = await fetch(url, {
        credentials: "include",

        ...options,

        headers: {
          ...(options.body
            ? {
                "Content-Type": "application/json",
              }
            : {}),

          ...options.headers,
        },
      });

      let data = {};

      try {
        data = await response.json();
      } catch {
        // The server may return an empty/non-JSON response.
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            `Request failed (${response.status})`
        );
      }

      return data;
    },
    []
  );

  // ===================================================
  // FETCH ALL EVENT REQUESTS
  // ===================================================

  const fetchEvents = useCallback(
    async (signal) => {
      setLoading(true);
      setError("");

      try {
        const data = await apiRequest(
          ENDPOINTS.list,
          { signal }
        );

        if (!signal?.aborted) {
          setEvents(
            Array.isArray(data.events)
              ? data.events
              : []
          );
        }
      } catch (err) {
        if (err.name === "AbortError") {
          return;
        }

        console.error(
          "Fetch event requests error:",
          err
        );

        setError(
          err.message ||
            "Unable to load event requests."
        );
      } finally {
        if (!signal?.aborted) {
          setLoading(false);
        }
      }
    },
    [apiRequest]
  );

  useEffect(() => {
    const controller = new AbortController();

    fetchEvents(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchEvents]);

  // ===================================================
  // UPDATE LOCAL EVENT DATA
  // ===================================================

  const updateEventLocally = useCallback(
    (updatedEvent) => {
      if (!updatedEvent?.id) return;

      setEvents((previous) =>
        previous.map((event) => {
          if (
            String(event.id) !==
            String(updatedEvent.id)
          ) {
            return event;
          }

          return {
            ...event,
            ...updatedEvent,

            // Keep joined club data if update API
            // returns only the event_requests row.
            clubs:
              updatedEvent.clubs ||
              event.clubs,
          };
        })
      );

      setSelectedEvent((previous) => {
        if (
          !previous ||
          String(previous.id) !==
            String(updatedEvent.id)
        ) {
          return previous;
        }

        return {
          ...previous,
          ...updatedEvent,

          clubs:
            updatedEvent.clubs ||
            previous.clubs,
        };
      });
    },
    []
  );

  // ===================================================
  // FETCH SPECIFIC EVENT DETAILS
  // ===================================================

  const fetchEventDetails = useCallback(
    async (eventId) => {
      setDetailLoading(true);
      setActionError("");

      try {
        const data = await apiRequest(
          ENDPOINTS.details(eventId)
        );

        const event =
          data.event ||
          data.request ||
          data.data;

        if (!event) {
          throw new Error(
            "Event details were not returned."
          );
        }

        const existingEvent = events.find(
          (item) =>
            String(item.id) === String(eventId)
        );

        setSelectedEvent({
          ...existingEvent,
          ...event,

          clubs:
            event.clubs ||
            existingEvent?.clubs,
        });

        setDecision(null);
        setRejectionReason("");

        return true;
      } catch (err) {
        console.error(
          "Fetch event details error:",
          err
        );

        setActionError(
          err.message ||
            "Unable to load event details."
        );

        return false;
      } finally {
        setDetailLoading(false);
      }
    },
    [apiRequest, events]
  );

  // ===================================================
  // OPEN EVENT REVIEW MODAL
  // ===================================================

  const openEvent = async (event) => {
    setSelectedEvent(event);

    setDecision(null);
    setRejectionReason("");
    setActionError("");
    setSuccessMessage("");

    await fetchEventDetails(event.id);
  };

  // ===================================================
  // CLOSE EVENT REVIEW MODAL
  // ===================================================

  const closeEvent = () => {
    if (submitting || detailLoading) {
      return;
    }

    setSelectedEvent(null);
    setDecision(null);
    setRejectionReason("");
    setActionError("");

    const nextParams = new URLSearchParams(
      searchParams
    );

    nextParams.delete("eventId");

    setSearchParams(nextParams, {
      replace: true,
    });
  };

  // ===================================================
  // EMAIL DEEP LINK SUPPORT
  // ===================================================

  const eventIdFromUrl =
    searchParams.get("eventId");

  useEffect(() => {
    if (!eventIdFromUrl || loading) {
      return;
    }

    const event = events.find(
      (item) =>
        String(item.id) ===
        String(eventIdFromUrl)
    );

    if (!event) {
      setError(
        `Event request #${eventIdFromUrl} was not found.`
      );

      return;
    }

    // Only auto-open if this event is not already open.
    if (
      String(selectedEvent?.id) ===
      String(eventIdFromUrl)
    ) {
      return;
    }

    setSelectedEvent(event);
    setDecision(null);
    setRejectionReason("");
    setActionError("");
  }, [
    eventIdFromUrl,
    events,
    loading,
    selectedEvent?.id,
  ]);

  // ===================================================
  // FILTER EVENT REQUESTS
  // ===================================================

  const counts = useMemo(() => {
    const result = {
      all: events.length,
      pending: 0,
      approved: 0,
      rejected: 0,
    };

    events.forEach((event) => {
      const status = getOverallStatus(event);

      result[status] += 1;
    });

    return result;
  }, [events]);

  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return events.filter((event) => {
      const overallStatus =
        getOverallStatus(event);

      const matchesFilter =
        filter === "all" ||
        overallStatus === filter;

      const matchesSearch =
        !query ||
        String(event.event_name || "")
          .toLowerCase()
          .includes(query) ||
        getClubName(event)
          .toLowerCase()
          .includes(query) ||
        String(event.venue || "")
          .toLowerCase()
          .includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [events, filter, search]);

  // ===================================================
  // START APPROVAL / REJECTION
  // ===================================================

  const startDecision = (type) => {
    setDecision(type);

    setRejectionReason("");
    setActionError("");
  };

  // ===================================================
  // SUBMIT APPROVAL / REJECTION
  // ===================================================

  const submitDecision = async () => {
    if (
      !selectedEvent ||
      !decision ||
      submitting
    ) {
      return;
    }

    const reason = rejectionReason.trim();

    const isRejection =
      decision === "reject_event" ||
      decision === "reject_poster";

    if (isRejection && !reason) {
      setActionError(
        "Please enter a rejection reason."
      );

      return;
    }

    if (reason.length > 1000) {
      setActionError(
        "Rejection reason cannot exceed 1000 characters."
      );

      return;
    }

    const endpointMap = {
      approve_event:
        ENDPOINTS.approveEvent(selectedEvent.id),

      reject_event:
        ENDPOINTS.rejectEvent(selectedEvent.id),

      approve_poster:
        ENDPOINTS.approvePoster(selectedEvent.id),

      reject_poster:
        ENDPOINTS.rejectPoster(selectedEvent.id),
    };

    const endpoint = endpointMap[decision];

    if (!endpoint) {
      setActionError("Invalid approval action.");
      return;
    }

    setSubmitting(true);
    setActionError("");

    try {
      const data = await apiRequest(endpoint, {
        method: "PATCH",

        body: JSON.stringify(
          isRejection
            ? { reason }
            : {}
        ),
      });

      const updatedEvent =
        data.event ||
        data.request ||
        data.data;

      if (updatedEvent) {
        updateEventLocally(updatedEvent);
      }

      // Refresh the complete list so the combined
      // approval filters reflect the latest DB state.
      await fetchEvents();

      // Refresh modal details too.
      await fetchEventDetails(
        selectedEvent.id
      );

      const messages = {
        approve_event:
          "Event proposal approved successfully. Poster approval is still pending.",

        reject_event:
          "Event proposal rejected successfully.",

        approve_poster:
          "Event poster approved successfully. The event is now fully approved.",

        reject_poster:
          "Event poster rejected. The club can upload a revised poster.",
      };

      setSuccessMessage(messages[decision]);

      setDecision(null);
      setRejectionReason("");
    } catch (err) {
      console.error(
        "Event approval action error:",
        err
      );

      setActionError(
        err.message ||
          "Unable to process the request."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ===================================================
  // OPEN SECURE PROPOSAL / POSTER
  // ===================================================

  const openDocument = async (type) => {
    if (!selectedEvent || openingDocument) {
      return;
    }

    setOpeningDocument(true);
    setActionError("");

    // Open a blank tab synchronously so popup blockers
    // don't block the tab after the async request.
    const newTab = window.open(
      "",
      "_blank"
    );

    try {
      const endpoint =
        type === "proposal"
          ? ENDPOINTS.proposalUrl(
              selectedEvent.id
            )
          : ENDPOINTS.posterUrl(
              selectedEvent.id
            );

      const data = await apiRequest(endpoint);

      const url =
        data.url ||
        data.signedUrl ||
        data.signed_url;

      if (!url) {
        throw new Error(
          "Document URL was not returned by the server."
        );
      }

      if (!/^https?:\/\//i.test(url)) {
        throw new Error(
          "Invalid document URL."
        );
      }

      if (newTab) {
        newTab.opener = null;
        newTab.location.replace(url);
      } else {
        window.open(
          url,
          "_blank",
          "noopener,noreferrer"
        );
      }
    } catch (err) {
      if (newTab) {
        newTab.close();
      }

      setActionError(
        err.message ||
          "Unable to open document."
      );
    } finally {
      setOpeningDocument(false);
    }
  };

  // ===================================================
  // SELECTED EVENT DERIVED VALUES
  // ===================================================

  const selectedPosterStatus =
    selectedEvent
      ? getPosterDisplayStatus(selectedEvent)
      : null;

  const selectedOverallStatus =
    selectedEvent
      ? getOverallStatus(selectedEvent)
      : null;

  const canReviewEvent =
    selectedEvent?.status === "pending";

  const canReviewPoster =
    selectedEvent?.status === "approved" &&
    selectedEvent?.poster_status === "pending" &&
    Boolean(selectedEvent?.poster_path);

  const posterAwaited =
    selectedEvent?.status === "approved" &&
    (
      !selectedEvent?.poster_status ||
      selectedEvent.poster_status ===
        "not_uploaded"
    );

  const revisedPosterAwaited =
    selectedEvent?.status === "approved" &&
    selectedEvent?.poster_status === "rejected";

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <div className="mx-auto max-w-[1500px] space-y-6">

      {/* ============================================= */}
      {/* HEADER */}
      {/* ============================================= */}

      <div className="flex flex-wrap items-start justify-between gap-4">

        <div>
          <div className="mb-2 flex items-center gap-2 text-[#900505]">

            <ShieldCheck size={16} />

            <span className="text-xs font-bold uppercase tracking-widest">
              ECA Administration
            </span>

          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            Event Approvals
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Review event proposals and posters submitted
            by clubs.
          </p>
        </div>

        <button
          type="button"
          onClick={() => fetchEvents()}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-[#900505] hover:text-[#900505] disabled:opacity-50"
        >
          <RefreshCw
            size={16}
            className={
              loading ? "animate-spin" : ""
            }
          />

          Refresh
        </button>

      </div>

      {/* ============================================= */}
      {/* SUCCESS MESSAGE */}
      {/* ============================================= */}

      {successMessage && (
        <div className="flex items-start justify-between gap-3 rounded-xl border border-green-200 bg-green-50 p-4">

          <div className="flex items-center gap-2 text-sm font-medium text-green-700">
            <CheckCircle2 size={18} />
            {successMessage}
          </div>

          <button
            type="button"
            onClick={() => setSuccessMessage("")}
            className="text-green-700"
          >
            <X size={17} />
          </button>

        </div>
      )}

      {/* ============================================= */}
      {/* FILTER TABS */}
      {/* ============================================= */}

      <div className="flex flex-wrap gap-3">

        {FILTER_OPTIONS.map((option) => {
          const active =
            filter === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() =>
                setFilter(option.value)
              }
              className={`
                rounded-xl border px-4 py-2.5
                text-sm font-semibold transition
                ${
                  active
                    ? "border-[#900505] bg-[#900505] text-white"
                    : "border-gray-200 bg-white text-gray-600 hover:border-[#900505]"
                }
              `}
            >

              {option.label}

              <span
                className={`
                  ml-2 rounded-full px-2 py-0.5 text-xs
                  ${
                    active
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-600"
                  }
                `}
              >
                {counts[option.value]}
              </span>

            </button>
          );
        })}

      </div>

      {/* ============================================= */}
      {/* SEARCH */}
      {/* ============================================= */}

      <div className="relative">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search by event name, club name or venue..."
          className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-[#900505]"
        />

      </div>

      {/* ============================================= */}
      {/* ERROR */}
      {/* ============================================= */}

      {error && (
        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">

          <AlertCircle size={18} />

          {error}

        </div>
      )}

      {/* ============================================= */}
      {/* EVENT REQUESTS TABLE */}
      {/* ============================================= */}

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">

        {loading ? (

          <div className="flex items-center justify-center gap-3 p-16 text-gray-500">

            <Loader2
              size={20}
              className="animate-spin"
            />

            Loading event requests...

          </div>

        ) : filteredEvents.length === 0 ? (

          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">

            <ClipboardCheck
              size={36}
              className="text-gray-300"
            />

            <h3 className="mt-4 font-semibold text-gray-800">
              No event requests found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              No requests match the selected filters.
            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1100px] text-left">

              <thead className="bg-gray-50">

                <tr className="text-xs uppercase tracking-wide text-gray-500">

                  <th className="px-5 py-4">
                    Event
                  </th>

                  <th className="px-5 py-4">
                    Club Name
                  </th>

                  <th className="px-5 py-4">
                    Date
                  </th>

                  <th className="px-5 py-4">
                    Event Status
                  </th>

                  <th className="px-5 py-4">
                    Poster Status
                  </th>

                  <th className="px-5 py-4">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-gray-100">

                {filteredEvents.map((event) => {
                  const posterStatus =
                    getPosterDisplayStatus(event);

                  return (
                    <tr
                      key={event.id}
                      className="transition hover:bg-gray-50"
                    >

                      {/* EVENT */}

                      <td className="px-5 py-4">

                        <p className="text-sm font-semibold text-gray-900">
                          {event.event_name ||
                            "Unnamed Event"}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          Request #{event.id}
                        </p>

                      </td>

                      {/* CLUB */}

                      <td className="px-5 py-4 text-sm font-medium text-gray-700">
                        {getClubName(event)}
                      </td>

                      {/* DATE */}

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {formatDate(event.event_date)}
                      </td>

                      {/* EVENT STATUS */}

                      <td className="px-5 py-4">

                        <StatusBadge
                          status={event.status}
                        />

                      </td>

                      {/* POSTER STATUS */}

                      <td className="px-5 py-4">

                        <StatusBadge
                          type="poster"
                          status={posterStatus}
                        />

                      </td>

                      {/* ACTION */}

                      <td className="px-5 py-4">

                        <button
                          type="button"
                          onClick={() =>
                            openEvent(event)
                          }
                          className="inline-flex items-center gap-2 rounded-lg border border-[#900505] px-3 py-2 text-xs font-semibold text-[#900505] transition hover:bg-[#900505] hover:text-white"
                        >

                          <Eye size={15} />

                          Review

                        </button>

                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* ============================================= */}
      {/* EVENT REVIEW MODAL */}
      {/* ============================================= */}

      {selectedEvent && (

        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(e) => {
            if (
              e.target === e.currentTarget
            ) {
              closeEvent();
            }
          }}
        >

          <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

            {/* ======================================= */}
            {/* MODAL HEADER */}
            {/* ======================================= */}

            <div className="flex items-start justify-between border-b border-gray-100 p-6">

              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-[#900505]">
                  ECA Event Review
                </p>

                <h2 className="mt-2 text-xl font-bold text-gray-900">
                  {selectedEvent.event_name ||
                    "Unnamed Event"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {getClubName(selectedEvent)}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">

                  <StatusBadge
                    status={selectedEvent.status}
                  />

                  <StatusBadge
                    type="poster"
                    status={selectedPosterStatus}
                  />

                </div>

              </div>

              <button
                type="button"
                onClick={closeEvent}
                disabled={submitting}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >

                <X size={20} />

              </button>

            </div>

            {/* ======================================= */}
            {/* MODAL CONTENT */}
            {/* ======================================= */}

            <div className="space-y-6 overflow-y-auto p-6">

              {detailLoading && (
                <div className="flex items-center gap-2 text-sm text-gray-500">

                  <Loader2
                    size={16}
                    className="animate-spin"
                  />

                  Refreshing event details...

                </div>
              )}

              {/* ===================================== */}
              {/* OVERALL APPROVAL PROGRESS */}
              {/* ===================================== */}

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">

                <h3 className="mb-4 text-sm font-bold text-gray-900">
                  Approval Progress
                </h3>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                  <div className="rounded-xl border border-gray-200 bg-white p-4">

                    <div className="mb-3 flex items-center gap-2">

                      <FileText
                        size={18}
                        className="text-[#900505]"
                      />

                      <p className="text-sm font-semibold">
                        Event Proposal
                      </p>

                    </div>

                    <StatusBadge
                      status={selectedEvent.status}
                    />

                  </div>

                  <div className="rounded-xl border border-gray-200 bg-white p-4">

                    <div className="mb-3 flex items-center gap-2">

                      <ImageIcon
                        size={18}
                        className="text-[#900505]"
                      />

                      <p className="text-sm font-semibold">
                        Event Poster
                      </p>

                    </div>

                    <StatusBadge
                      type="poster"
                      status={selectedPosterStatus}
                    />

                  </div>

                </div>

                {selectedOverallStatus ===
                  "approved" && (

                  <div className="mt-4 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm font-semibold text-green-700">

                    <CheckCircle2 size={18} />

                    Event proposal and poster are fully approved.

                  </div>

                )}

              </div>

              {/* ===================================== */}
              {/* EVENT DETAILS */}
              {/* ===================================== */}

              <div>

                <div className="mb-4 flex items-center gap-2">

                  <FileText
                    size={19}
                    className="text-[#900505]"
                  />

                  <h3 className="text-base font-bold text-gray-900">
                    Event Information
                  </h3>

                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                  <DetailItem
                    icon={Building2}
                    label="Organizing Club"
                    value={getClubName(
                      selectedEvent
                    )}
                  />

                  <DetailItem
                    icon={CalendarDays}
                    label="Event Date"
                    value={formatDate(
                      selectedEvent.event_date
                    )}
                  />

                  <DetailItem
                    icon={Clock3}
                    label="Event Time"
                    value={`${formatTime(
                      selectedEvent.start_time
                    )} - ${formatTime(
                      selectedEvent.end_time
                    )}`}
                  />

                  <DetailItem
                    icon={MapPin}
                    label="Venue"
                    value={selectedEvent.venue}
                  />

                  <DetailItem
                    icon={Trophy}
                    label="Trophy Requirement"
                    value={
                      selectedEvent.trophy_count ??
                      "Not specified"
                    }
                  />

                </div>

              </div>

              {/* ===================================== */}
              {/* EVENT MOTIVE */}
              {/* ===================================== */}

              <div className="rounded-xl border border-gray-100 p-4">

                <h3 className="text-sm font-bold text-gray-900">
                  Event Motive / Description
                </h3>

                <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-gray-600">
                  {selectedEvent.motive ||
                    "Not provided"}
                </p>

              </div>

              {/* ===================================== */}
              {/* ECA REQUIREMENTS */}
              {/* ===================================== */}

              <div className="rounded-xl border border-gray-100 p-4">

                <h3 className="text-sm font-bold text-gray-900">
                  ECA Requirements
                </h3>

                <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-gray-600">
                  {selectedEvent.eca_requirements ||
                    "None specified"}
                </p>

              </div>

              {/* ===================================== */}
              {/* PROPOSAL DOCUMENT */}
              {/* ===================================== */}

              <div className="rounded-xl border border-gray-100 p-4">

                <div className="flex items-center gap-2">

                  <FileText
                    size={18}
                    className="text-[#900505]"
                  />

                  <h3 className="text-sm font-bold text-gray-900">
                    Event Proposal Document
                  </h3>

                </div>

                {selectedEvent.proposal_path ? (

                  <button
                    type="button"
                    onClick={() =>
                      openDocument("proposal")
                    }
                    disabled={openingDocument}
                    className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[#900505] px-4 py-2.5 text-sm font-semibold text-[#900505] transition hover:bg-[#900505] hover:text-white disabled:opacity-50"
                  >

                    <ExternalLink size={16} />

                    View Proposal PDF

                  </button>

                ) : (

                  <p className="mt-3 text-sm text-gray-500">
                    No proposal document uploaded.
                  </p>

                )}

              </div>

              {/* ===================================== */}
              {/* EVENT REJECTION REASON */}
              {/* ===================================== */}

              {selectedEvent.status ===
                "rejected" &&
                selectedEvent.rejection_reason && (

                <div className="rounded-xl border border-red-200 bg-red-50 p-4">

                  <div className="flex items-center gap-2 text-red-700">

                    <MessageSquare size={17} />

                    <h3 className="text-sm font-bold">
                      Event Rejection Reason
                    </h3>

                  </div>

                  <p className="mt-2 whitespace-pre-wrap text-sm text-red-600">
                    {
                      selectedEvent.rejection_reason
                    }
                  </p>

                </div>

              )}

              {/* ===================================== */}
              {/* EVENT PROPOSAL APPROVAL */}
              {/* ===================================== */}

              <div className="rounded-xl border border-gray-200 p-5">

                <div className="mb-3 flex items-center gap-2">

                  <ClipboardCheck
                    size={19}
                    className="text-[#900505]"
                  />

                  <h3 className="text-base font-bold text-gray-900">
                    Event Proposal Approval
                  </h3>

                </div>

                {selectedEvent.status ===
                  "approved" ? (

                  <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm font-medium text-green-700">

                    <CheckCircle2 size={18} />

                    Event proposal has been approved.

                  </div>

                ) : selectedEvent.status ===
                  "rejected" ? (

                  <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">

                    <XCircle size={18} />

                    Event proposal has been rejected.

                  </div>

                ) : selectedEvent.status ===
                  "pending" ? (

                  <div>

                    <p className="mb-4 text-sm text-gray-600">
                      Review the event proposal details
                      before making a decision.
                    </p>

                    <div className="flex flex-wrap gap-3">

                      <button
                        type="button"
                        onClick={() =>
                          startDecision(
                            "reject_event"
                          )
                        }
                        disabled={submitting}
                        className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
                      >

                        <XCircle size={17} />

                        Reject Event

                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          startDecision(
                            "approve_event"
                          )
                        }
                        disabled={submitting}
                        className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
                      >

                        <CheckCircle2 size={17} />

                        Approve Event

                      </button>

                    </div>

                  </div>

                ) : (

                  <p className="text-sm text-gray-500">
                    Event proposal is not yet submitted
                    for approval.
                  </p>

                )}

              </div>

              {/* ===================================== */}
              {/* POSTER APPROVAL SECTION */}
              {/* ===================================== */}

              <div className="rounded-xl border border-gray-200 p-5">

                <div className="mb-4 flex items-center gap-2">

                  <ImageIcon
                    size={19}
                    className="text-[#900505]"
                  />

                  <h3 className="text-base font-bold text-gray-900">
                    Event Poster Review
                  </h3>

                </div>

                {/* EVENT NOT APPROVED YET */}

                {selectedEvent.status !==
                  "approved" ? (

                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">

                    <p className="text-sm text-gray-600">
                      Event proposal must be approved
                      before the club can submit a
                      poster for review.
                    </p>

                  </div>

                ) : (

                  <div className="space-y-4">

                    {/* POSTER STATUS */}

                    <div className="flex flex-wrap items-center justify-between gap-3">

                      <div>

                        <p className="mb-2 text-xs font-medium text-gray-500">
                          Current Poster Status
                        </p>

                        <StatusBadge
                          type="poster"
                          status={
                            selectedPosterStatus
                          }
                        />

                      </div>

                      {selectedEvent.poster_path && (

                        <button
                          type="button"
                          onClick={() =>
                            openDocument("poster")
                          }
                          disabled={
                            openingDocument
                          }
                          className="flex items-center gap-2 rounded-lg border border-[#900505] px-4 py-2.5 text-sm font-semibold text-[#900505] transition hover:bg-[#900505] hover:text-white disabled:opacity-50"
                        >

                          <Eye size={16} />

                          View Event Poster

                          <ExternalLink size={14} />

                        </button>

                      )}

                    </div>

                    {/* POSTER AWAITED */}

                    {posterAwaited && (

                      <div className="flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">

                        <UploadCloud
                          size={21}
                          className="mt-0.5 text-gray-500"
                        />

                        <div>

                          <h4 className="text-sm font-semibold text-gray-800">
                            Poster Awaited
                          </h4>

                          <p className="mt-1 text-sm text-gray-500">
                            Event proposal has been
                            approved. Waiting for the
                            club to upload its event
                            poster.
                          </p>

                        </div>

                      </div>

                    )}

                    {/* POSTER REJECTED */}

                    {revisedPosterAwaited && (

                      <div className="space-y-3">

                        <div className="flex items-start gap-3 rounded-xl border border-orange-200 bg-orange-50 p-4">

                          <RotateCcw
                            size={21}
                            className="mt-0.5 text-orange-600"
                          />

                          <div>

                            <h4 className="text-sm font-semibold text-orange-800">
                              Revised Poster Not Uploaded
                            </h4>

                            <p className="mt-1 text-sm text-orange-700">
                              The previous poster was
                              rejected. Waiting for the
                              club to upload a revised
                              poster.
                            </p>

                          </div>

                        </div>

                        {selectedEvent.poster_rejection_reason && (

                          <div className="rounded-xl border border-red-200 bg-red-50 p-4">

                            <h4 className="text-sm font-bold text-red-700">
                              Poster Rejection Reason
                            </h4>

                            <p className="mt-2 whitespace-pre-wrap text-sm text-red-600">
                              {
                                selectedEvent.poster_rejection_reason
                              }
                            </p>

                          </div>

                        )}

                      </div>

                    )}

                    {/* POSTER UPLOADED */}

                    {canReviewPoster && (

                      <div className="space-y-4">

                        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">

                          <div className="flex items-center gap-2 text-blue-700">

                            <ImageIcon size={18} />

                            <h4 className="text-sm font-semibold">
                              {getPosterRevision(
                                selectedEvent
                              ) > 1
                                ? "Revised Poster Uploaded"
                                : "Poster Uploaded"}
                            </h4>

                          </div>

                          <p className="mt-2 text-sm text-blue-700">
                            The poster is awaiting ECA
                            review. Please inspect the
                            uploaded poster before
                            approving or rejecting it.
                          </p>

                        </div>

                        <div className="flex flex-wrap gap-3">

                          <button
                            type="button"
                            onClick={() =>
                              startDecision(
                                "reject_poster"
                              )
                            }
                            disabled={submitting}
                            className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
                          >

                            <XCircle size={17} />

                            Reject Poster

                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              startDecision(
                                "approve_poster"
                              )
                            }
                            disabled={submitting}
                            className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
                          >

                            <CheckCircle2 size={17} />

                            Approve Poster

                          </button>

                        </div>

                      </div>

                    )}

                    {/* POSTER APPROVED */}

                    {selectedEvent.poster_status ===
                      "approved" && (

                      <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4">

                        <CheckCircle2
                          size={21}
                          className="text-green-600"
                        />

                        <div>

                          <h4 className="text-sm font-semibold text-green-800">
                            Event Poster Approved
                          </h4>

                          <p className="mt-1 text-sm text-green-700">
                            Both the event proposal
                            and poster have been
                            approved by ECA.
                          </p>

                        </div>

                      </div>

                    )}

                  </div>

                )}

              </div>

              {/* ===================================== */}
              {/* APPROVAL CONFIRMATION */}
              {/* ===================================== */}

              {decision && (

                <div className="rounded-xl border-2 border-[#900505]/20 bg-[#900505]/5 p-5">

                  <h3 className="text-base font-bold text-gray-900">

                    {decision === "approve_event" &&
                      "Confirm Event Approval"}

                    {decision === "reject_event" &&
                      "Confirm Event Rejection"}

                    {decision === "approve_poster" &&
                      "Confirm Poster Approval"}

                    {decision === "reject_poster" &&
                      "Confirm Poster Rejection"}

                  </h3>

                  <p className="mt-2 text-sm text-gray-600">

                    {decision === "approve_event" &&
                      "The event proposal will be approved. The club can then upload its poster for ECA review."}

                    {decision === "reject_event" &&
                      "Please provide a reason for rejecting this event proposal."}

                    {decision === "approve_poster" &&
                      "The poster will be approved and the event will move to the Approved section."}

                    {decision === "reject_poster" &&
                      "Please provide a reason. The club will need to upload a revised poster."}

                  </p>

                  {(decision === "reject_event" ||
                    decision === "reject_poster") && (

                    <div className="mt-4">

                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Rejection Reason
                        <span className="ml-1 text-red-600">
                          *
                        </span>
                      </label>

                      <textarea
                        value={rejectionReason}
                        onChange={(e) =>
                          setRejectionReason(
                            e.target.value
                          )
                        }
                        rows={4}
                        maxLength={1000}
                        placeholder={
                          decision === "reject_poster"
                            ? "Explain what changes are required in the poster..."
                            : "Enter the reason for rejecting this event..."
                        }
                        className="w-full resize-none rounded-xl border border-gray-200 bg-white p-3 text-sm outline-none focus:border-[#900505]"
                      />

                      <p className="mt-1 text-right text-xs text-gray-400">
                        {rejectionReason.length}/1000
                      </p>

                    </div>

                  )}

                  {actionError && (

                    <div className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">

                      <AlertCircle size={17} />

                      {actionError}

                    </div>

                  )}

                  <div className="mt-4 flex flex-wrap justify-end gap-3">

                    <button
                      type="button"
                      onClick={() => {
                        setDecision(null);
                        setRejectionReason("");
                        setActionError("");
                      }}
                      disabled={submitting}
                      className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-600"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={submitDecision}
                      disabled={
                        submitting ||
                        (
                          (
                            decision === "reject_event" ||
                            decision === "reject_poster"
                          ) &&
                          !rejectionReason.trim()
                        )
                      }
                      className={`
                        flex items-center gap-2
                        rounded-xl px-5 py-2.5
                        text-sm font-semibold text-white
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                        ${
                          decision.startsWith("approve")
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-red-600 hover:bg-red-700"
                        }
                      `}
                    >

                      {submitting ? (

                        <Loader2
                          size={16}
                          className="animate-spin"
                        />

                      ) : (

                        <Check size={16} />

                      )}

                      {submitting
                        ? "Processing..."
                        : decision.startsWith("approve")
                          ? "Confirm Approval"
                          : "Confirm Rejection"}

                    </button>

                  </div>

                </div>

              )}

              {/* ===================================== */}
              {/* GENERAL ACTION ERROR */}
              {/* ===================================== */}

              {!decision && actionError && (

                <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">

                  <AlertCircle size={18} />

                  {actionError}

                </div>

              )}

            </div>

            {/* ======================================= */}
            {/* MODAL FOOTER */}
            {/* ======================================= */}

            <div className="flex justify-end border-t border-gray-100 bg-white p-5">

              <button
                type="button"
                onClick={closeEvent}
                disabled={
                  submitting ||
                  detailLoading
                }
                className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default EventApprovals;