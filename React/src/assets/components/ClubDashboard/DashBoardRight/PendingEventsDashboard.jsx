import React, { useEffect, useMemo, useState } from "react";

import {

  CalendarDays,

  Clock3,

  MapPin,

  Search,

  FileText,

  Eye,

  X,

  RefreshCw,

  ClipboardList,

  Hourglass,

  CheckCircle2,

  XCircle,

  Save,

  ChevronDown,


} from "lucide-react";



const API_URL = (

  import.meta.env.VITE_API_URL || "http://localhost:5000"

).replace(/\/+$/, "");



const COLORS = {

  primary: "#900505",

  primaryLight: "#FFF1F1",

  border: "#E9E9EE",

  text: "#24242B",

  muted: "#777782",

};



const STATUS_CONFIG = {

  pending: {

    label: "Pending Approval",

    color: "#B7791F",

    bg: "#FFF7E6",

  },

  approved: {

    label: "Approved",

    color: "#16804A",

    bg: "#E8F7EE",

  },

  rejected: {

    label: "Rejected",

    color: "#C53030",

    bg: "#FFF0F0",

  },

  draft: {

    label: "Draft",

    color: "#6366F1",

    bg: "#EEF2FF",

  },

};



const formatDate = (date) => {

  if (!date) return "—";



  const parsed = new Date(`${date}T00:00:00`);



  if (Number.isNaN(parsed.getTime())) return date;



  return parsed.toLocaleDateString("en-IN", {

    day: "2-digit",

    month: "short",

    year: "numeric",

  });

};



const formatDateTime = (date) => {

  if (!date) return "—";



  const parsed = new Date(date);



  if (Number.isNaN(parsed.getTime())) return "—";



  return parsed.toLocaleString("en-IN", {

    day: "2-digit",

    month: "short",

    year: "numeric",

    hour: "2-digit",

    minute: "2-digit",

  });

};



const formatTime = (time) => {

  if (!time) return "—";



  const [hours, minutes] = time.split(":").map(Number);



  if (Number.isNaN(hours) || Number.isNaN(minutes)) {

    return time;

  }



  return new Date(2000, 0, 1, hours, minutes).toLocaleTimeString(

    "en-IN",

    {

      hour: "2-digit",

      minute: "2-digit",

    }

  );

};



const StatusBadge = ({ status }) => {

  const config = STATUS_CONFIG[status] || {

    label: status || "Unknown",

    color: COLORS.muted,

    bg: "#F3F4F6",

  };



  return (

    <span

      className="inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold"

      style={{

        color: config.color,

        backgroundColor: config.bg,

      }}

    >

      <span

        className="mr-2 h-1.5 w-1.5 rounded-full"

        style={{ backgroundColor: config.color }}

      />

      {config.label}

    </span>

  );

};



const StatCard = ({ title, value, icon: Icon, color, bg }) => (

  <div

    className="rounded-xl border bg-white px-4 py-3.5 transition-shadow hover:shadow-sm"

    style={{ borderColor: COLORS.border }}

  >

    <div className="flex items-center justify-between">

      <div

        className="flex h-9 w-9 items-center justify-center rounded-lg"

        style={{ color, backgroundColor: bg }}

      >

        <Icon size={15} />

      </div>



      <span className="text-2xl font-bold" style={{ color: COLORS.text }}>

        {typeof value === "number" ? String(value).padStart(2, "0") : value}

      </span>

    </div>



    <p className="mt-2.5 text-xs font-medium" style={{ color: COLORS.muted }}>

      {title}

    </p>

  </div>

);



const DetailRow = ({ icon: Icon, label, value }) => (

  <div className="flex items-start gap-2.5 py-2">

    <div

      className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"

      style={{

        backgroundColor: COLORS.primaryLight,

        color: COLORS.primary,

      }}

    >

      <Icon size={15} />

    </div>



    <div className="min-w-0 flex-1">

      <p className="text-xs" style={{ color: COLORS.muted }}>

        {label}

      </p>

      <p className="mt-0.5 break-words text-[13px] font-medium text-gray-800">

        {value || "—"}

      </p>

    </div>

  </div>

);



const EventDetailsModal = ({ event, onClose }) => {

  useEffect(() => {

    if (!event) return;



    const handleEscape = (e) => {

      if (e.key === "Escape") onClose();

    };



    document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);

  }, [event, onClose]);



  if (!event) return null;



  return (

    <div

      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"

      onMouseDown={(e) => {

        if (e.target === e.currentTarget) onClose();

      }}

    >

      <div className="flex max-h-[88vh] w-full max-w-xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl">

        <div

          className="flex items-start justify-between gap-3 border-b p-4"

          style={{ borderColor: COLORS.border }}

        >

          <div>

            <p

              className="mb-1 text-[10px] font-semibold uppercase tracking-wider"

              style={{ color: COLORS.primary }}

            >

              Event Request #{event.id}

            </p>



            <h2 className="text-base font-bold text-gray-900">

              {event.event_name}

            </h2>



            <div className="mt-2">

              <StatusBadge status={event.status} />

            </div>

          </div>



          <button

            onClick={onClose}

            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"

            aria-label="Close event details"

          >

            <X size={21} />

          </button>

        </div>



        <div className="overflow-y-auto px-4 py-3">

          <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">

            <DetailRow

              icon={CalendarDays}

              label="Event Date"

              value={formatDate(event.event_date)}

            />



            <DetailRow

              icon={Clock3}

              label="Event Timing"

              value={`${formatTime(event.start_time)} – ${formatTime(

                event.end_time

              )}`}

            />



            <DetailRow

              icon={MapPin}

              label="Venue"

              value={event.venue}

            />



            <DetailRow

              icon={CalendarDays}

              label="Request Created"

              value={formatDateTime(event.created_at)}

            />



            <DetailRow

              icon={ClipboardList}

              label="Trophies Required"

              value={String(event.trophy_count ?? 0)}

            />

          </div>



          <div className="mt-3 border-t pt-3">

            <h3 className="mb-1.5 text-[13px] font-bold text-gray-900">

              Event Motive

            </h3>



            <p className="whitespace-pre-wrap text-[13px] leading-5 text-gray-600">

              {event.motive || "No motive provided."}

            </p>

          </div>



          <div className="mt-3 border-t pt-3">

            <h3 className="mb-1.5 text-[13px] font-bold text-gray-900">

              Requirements from ECA

            </h3>



            <p className="whitespace-pre-wrap text-[13px] leading-5 text-gray-600">

              {event.eca_requirements || "No requirements specified."}

            </p>

          </div>



          <div className="mt-3 border-t pt-3">

            <h3 className="mb-2 text-[13px] font-bold text-gray-900">

              Event Proposal

            </h3>



            {event.proposal_path ? (

              <div className="flex items-center gap-3 rounded-lg border bg-gray-50 p-3">

                <FileText size={20} style={{ color: COLORS.primary }} />



                <div>

                  <p className="text-sm font-semibold text-gray-800">

                    Proposal uploaded

                  </p>

                  <p className="mt-1 text-xs text-gray-500">

                    PDF viewing will be enabled after storage integration.

                  </p>

                </div>

              </div>

            ) : (

              <p className="text-sm text-gray-500">

                No proposal PDF uploaded.

              </p>

            )}

          </div>

        </div>



        <div

          className="flex justify-end border-t px-4 py-3"

          style={{ borderColor: COLORS.border }}

        >

          <button

            onClick={onClose}

            className="rounded-lg px-4 py-2 text-xs font-semibold text-white"

            style={{ backgroundColor: COLORS.primary }}

          >

            Close

          </button>

        </div>

      </div>

    </div>

  );

};



const PendingEventsDashboard = () => {

  const [events, setEvents] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");

  const [selectedEvent, setSelectedEvent] = useState(null);

  const [refreshing, setRefreshing] = useState(false);



  const fetchEvents = async (isRefresh = false) => {

    if (isRefresh) {

      setRefreshing(true);

    } else {

      setLoading(true);

    }



    setError("");



    try {

      const response = await fetch(`${API_URL}/api/event-requests`, {

        method: "GET",

        credentials: "include",

      });



      const data = await response.json();



      if (!response.ok || !data.success) {

        throw new Error(data.message || "Failed to load event requests.");

      }



      setEvents(Array.isArray(data.events) ? data.events : []);

    } catch (err) {

      console.error("Failed to fetch events:", err);

      setError(err.message || "Something went wrong.");

    } finally {

      setLoading(false);

      setRefreshing(false);

    }

  };



  useEffect(() => {

    fetchEvents();

  }, []);



  const statistics = useMemo(

    () => ({

      total: events.length,

      pending: events.filter((event) => event.status === "pending").length,

      approved: events.filter((event) => event.status === "approved").length,

      rejected: events.filter((event) => event.status === "rejected").length,

      draft: events.filter((event) => event.status === "draft").length,

    }),

    [events]

  );



  const filteredEvents = useMemo(() => {

    return events.filter((event) => {

      const matchesSearch = [

        event.event_name,

        event.venue,

        event.motive,

      ]

        .some((value) =>

          String(value || "")

            .toLowerCase()

            .includes(search.trim().toLowerCase())

        );



      const matchesStatus =

        statusFilter === "all" || event.status === statusFilter;



      return matchesSearch && matchesStatus;

    });

  }, [events, search, statusFilter]);



  const statsCards = [

    {

      title: "Total Requests",

      value: statistics.total,

      icon: ClipboardList,

      color: "#900505",

      bg: "#FFF1F1",

    },

    {

      title: "Pending Approval",

      value: statistics.pending,

      icon: Hourglass,

      color: "#B7791F",

      bg: "#FFF7E6",

    },

    {

      title: "Approved",

      value: statistics.approved,

      icon: CheckCircle2,

      color: "#16804A",

      bg: "#E8F7EE",

    },

    {

      title: "Rejected",

      value: statistics.rejected,

      icon: XCircle,

      color: "#C53030",

      bg: "#FFF0F0",

    },

    {

      title: "Saved Drafts",

      value: statistics.draft,

      icon: Save,

      color: "#6366F1",

      bg: "#EEF2FF",

    },

  ];



  return (

    <div className="min-h-screen bg-[#F8F8FA] p-3 sm:p-4 lg:p-5">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">

          <div>

            <div className="mb-1.5 flex items-center gap-2">

              <span

                className="h-1 w-5 rounded-full"

                style={{ backgroundColor: COLORS.primary }}

              />

              <span

                className="text-[10px] font-bold uppercase tracking-[0.14em]"

                style={{ color: COLORS.primary }}

              >

                Club Management

              </span>

            </div>



            <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">

              Event Requests

            </h1>



            <p className="mt-1 text-xs text-gray-500">

              Track your event proposals, approvals, and saved drafts.

            </p>

          </div>



          <button

            onClick={() => fetchEvents(true)}

            disabled={refreshing || loading}

            className="inline-flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"

            style={{ borderColor: COLORS.border }}

          >

            <RefreshCw

              size={16}

              className={refreshing ? "animate-spin" : ""}

            />

            Refresh

          </button>

        </div>



        {/* STATISTICS */}

        <div className="mb-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 xl:grid-cols-5">

          {statsCards.map((card) => (

            <StatCard

              key={card.title}

              {...card}

              value={loading ? "…" : card.value}

            />

          ))}

        </div>



        {/* MAIN CONTENT */}

        <div

          className="overflow-hidden rounded-xl border bg-white shadow-sm"

          style={{ borderColor: COLORS.border }}

        >

          <div

            className="flex flex-col gap-3 border-b px-4 py-3 sm:flex-row sm:items-center sm:justify-between"

            style={{ borderColor: COLORS.border }}

          >

            <div>

              <h2 className="text-base font-bold text-gray-900">

                All Event Requests

              </h2>

              <p className="mt-1 text-xs text-gray-500">

                {filteredEvents.length} requests found

              </p>

            </div>



            <div className="flex flex-col gap-2 sm:flex-row">

              <div className="relative">

                <Search

                  size={17}

                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"

                />



                <input

                  type="text"

                  placeholder="Search events..."

                  value={search}

                  onChange={(e) => setSearch(e.target.value)}

                  className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-xs outline-none focus:border-[#900505] sm:w-44"

                />

              </div>



              <div className="relative">

                <select

                  value={statusFilter}

                  onChange={(e) => setStatusFilter(e.target.value)}

                  className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-8 text-xs outline-none focus:border-[#900505] sm:w-44"

                >

                  <option value="all">All Statuses</option>

                  <option value="pending">Pending Approval</option>

                  <option value="approved">Approved</option>

                  <option value="rejected">Rejected</option>

                  <option value="draft">Drafts</option>

                </select>



                <ChevronDown

                  size={16}

                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"

                />

              </div>

            </div>

          </div>



          {error && (

            <div className="m-5 rounded-xl border border-red-200 bg-red-50 p-4">

              <p className="text-sm font-medium text-red-700">{error}</p>

              <button

                onClick={() => fetchEvents(true)}

                className="mt-2 text-sm font-semibold text-red-700 underline"

              >

                Try again

              </button>

            </div>

          )}



          {loading ? (

            <div className="flex min-h-64 items-center justify-center">

              <RefreshCw

                size={26}

                className="animate-spin"

                style={{ color: COLORS.primary }}

              />

              <span className="ml-3 text-sm text-gray-500">

                Loading event requests...

              </span>

            </div>

          ) : filteredEvents.length === 0 ? (

            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">

              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">

                <ClipboardList size={30} style={{ color: COLORS.primary }} />

              </div>



              <h3 className="text-lg font-bold text-gray-800">

                No event requests found

              </h3>



              <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">

                {search || statusFilter !== "all"

                  ? "Try changing your search or status filter."

                  : "Your submitted event proposals and drafts will appear here."}

              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full min-w-[760px] text-left">

                <thead className="bg-[#FAFAFB]">

                  <tr className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">

                    <th className="px-4 py-3">Event</th>

                    <th className="px-4 py-3">Event Date</th>

                    <th className="px-4 py-3">Venue</th>

                    <th className="px-4 py-3">Created On</th>

                    <th className="px-4 py-3">Status</th>

                    <th className="px-4 py-3 text-right">Action</th>

                  </tr>

                </thead>



                <tbody className="divide-y divide-gray-100">

                  {filteredEvents.map((event) => (

                    <tr

                      key={event.id}

                      className="transition-colors hover:bg-[#FFF9F9]"

                    >

                      <td className="px-4 py-3">

                        <div className="flex items-center gap-3">

                          <div

                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"

                            style={{

                              backgroundColor: COLORS.primaryLight,

                              color: COLORS.primary,

                            }}

                          >

                            <CalendarDays size={15} />

                          </div>



                          <div>

                            <p className="text-[13px] font-semibold text-gray-900">

                              {event.event_name}

                            </p>

                            <p className="mt-1 text-xs text-gray-400">

                              Request #{event.id}

                            </p>

                          </div>

                        </div>

                      </td>



                      <td className="px-4 py-3 text-xs text-gray-600">

                        {formatDate(event.event_date)}

                      </td>



                      <td className="px-4 py-3 text-xs text-gray-600">

                        {event.venue || "—"}

                      </td>



                      <td className="px-4 py-3 text-xs text-gray-600">

                        {formatDateTime(event.created_at)}

                      </td>



                      <td className="px-4 py-3">

                        <StatusBadge status={event.status} />

                      </td>



                      <td className="px-4 py-3 text-right">

                        <button

                          onClick={() => setSelectedEvent(event)}

                          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors hover:bg-red-50"

                          style={{ color: COLORS.primary }}

                        >

                          <Eye size={16} />

                          View Details

                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>



        <div className="mt-3 text-center text-[11px] text-gray-400">

          Event requests are displayed according to your logged-in club account.

        </div>

      </div>



      <EventDetailsModal

        event={selectedEvent}

        onClose={() => setSelectedEvent(null)}

      />

    </div>

  );

};



export default PendingEventsDashboard;