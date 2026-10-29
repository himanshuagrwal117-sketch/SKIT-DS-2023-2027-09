import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Search,
  CalendarDays,
  MapPin,
  Clock3,
  Users,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  CalendarCheck,
  CalendarClock,
  CalendarRange,
  SlidersHorizontal,
  ArrowUpRight,
  X,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  FileText,
} from "lucide-react";

const API_BASE = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

const PAGE_SIZE = 8;

const getEventDate = (event) => {
  const value = event.event_date || event.date;
  if (!value) return null;

  const date = new Date(`${String(value).slice(0, 10)}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
};

const formatDate = (value, options = {}) => {
  if (!value) return "Date not available";

  const date = new Date(`${String(value).slice(0, 10)}T00:00:00`);

  if (Number.isNaN(date.getTime())) return "Date not available";

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    ...options,
  });
};

const formatTime = (value) => {
  if (!value) return "";

  const match = String(value).match(/^(\d{1,2}):(\d{2})/);

  if (!match) return value;

  const hours = Number(match[1]);
  const minutes = Number(match[2]);

  const date = new Date();
  date.setHours(hours, minutes, 0, 0);

  return date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const getEventStatus = (event) => {
  const eventDate = getEventDate(event);

  if (!eventDate) return "undated";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return eventDate < today ? "past" : "upcoming";
};

const getClubName = (event) => {
  return (
    event.club_name ||
    event.club?.name ||
    event.clubs?.name ||
    event.clubName ||
    (event.club_id ? `Club #${event.club_id}` : "Club information unavailable")
  );
};

const getTimeRange = (event) => {
  const start = formatTime(event.start_time);
  const end = formatTime(event.end_time);

  if (start && end) return `${start} – ${end}`;
  return start || end || "Time not specified";
};

const getInitials = (name = "") =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "CL";

const StatCard = ({ icon: Icon, label, value, description }) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
          {value}
        </p>
      </div>

      <div className="rounded-xl bg-[#900505]/[0.08] p-3 text-[#900505]">
        <Icon size={21} />
      </div>
    </div>

    <p className="mt-3 text-xs leading-5 text-gray-500">{description}</p>
  </div>
);

const StatusBadge = ({ status }) => {
  if (status === "past") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600">
        <CheckCircle2 size={13} />
        Past event
      </span>
    );
  }

  if (status === "upcoming") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
        <CalendarClock size={13} />
        Upcoming
      </span>
    );
  }

  return (
    <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
      Date unavailable
    </span>
  );
};

const EventDetailsModal = ({ event, onClose }) => {
  if (!event) return null;

  const status = getEventStatus(event);
  const proposalUrl = event.proposal_url || event.proposal_path;
  const posterUrl = event.poster_url || event.poster_path;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-details-title"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between border-b border-gray-100 p-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#900505]">
              Event overview
            </p>
            <h2
              id="event-details-title"
              className="mt-2 text-2xl font-bold text-gray-900"
            >
              {event.event_name || event.name || "Untitled event"}
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close event details"
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6 p-6">
          <div className="flex flex-wrap gap-2">
            <StatusBadge status={status} />

            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              Approved
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-gray-50 p-4">
              <CalendarDays size={19} className="text-[#900505]" />
              <p className="mt-3 text-xs font-medium text-gray-500">Date</p>
              <p className="mt-1 font-semibold text-gray-900">
                {formatDate(event.event_date || event.date)}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <Clock3 size={19} className="text-[#900505]" />
              <p className="mt-3 text-xs font-medium text-gray-500">Schedule</p>
              <p className="mt-1 font-semibold text-gray-900">
                {getTimeRange(event)}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <MapPin size={19} className="text-[#900505]" />
              <p className="mt-3 text-xs font-medium text-gray-500">Venue</p>
              <p className="mt-1 font-semibold text-gray-900">
                {event.venue || "Venue not specified"}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <Users size={19} className="text-[#900505]" />
              <p className="mt-3 text-xs font-medium text-gray-500">Organising club</p>
              <p className="mt-1 font-semibold text-gray-900">
                {getClubName(event)}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-900">Event motive</h3>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-gray-600">
              {event.motive || event.description || "No event description available."}
            </p>
          </div>

          {event.eca_requirements && (
            <div>
              <h3 className="text-sm font-bold text-gray-900">
                ECA requirements
              </h3>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-gray-600">
                {event.eca_requirements}
              </p>
            </div>
          )}

          {(proposalUrl || posterUrl) && (
            <div>
              <h3 className="text-sm font-bold text-gray-900">
                Event documents
              </h3>

              <div className="mt-3 flex flex-wrap gap-3">
                {proposalUrl && (
                  <a
                    href={proposalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-[#900505] hover:text-[#900505]"
                  >
                    <FileText size={16} />
                    View proposal
                    <ExternalLink size={14} />
                  </a>
                )}

                {posterUrl && (
                  <a
                    href={posterUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#900505] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#720404]"
                  >
                    View poster
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          )}

          <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-700" size={19} />
              <div>
                <p className="text-sm font-semibold text-emerald-900">
                  Proposal approved by ECA
                </p>
                <p className="mt-1 text-xs leading-5 text-emerald-800">
                  This event is included because its proposal has been approved.
                  Public student visibility may additionally depend on poster
                  approval and publication status.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t border-gray-100 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-100 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
          >
            Close details
          </button>
        </div>
      </div>
    </div>
  );
};

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");
  const [clubFilter, setClubFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("nearest");
  const [page, setPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchEvents = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    setError("");

    try {
      const response = await fetch(
        `${API_BASE}/api/eca/event-requests?status=approved`,
        {
          method: "GET",
          credentials: "include",
          headers: { Accept: "application/json" },
        }
      );

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message ||
            result.error ||
            `Unable to load approved events (${response.status}).`
        );
      }

      if (result.success === false) {
        throw new Error(result.message || "Unable to load approved events.");
      }

      const rows = Array.isArray(result.events)
        ? result.events
        : Array.isArray(result.data)
          ? result.data
          : Array.isArray(result)
            ? result
            : [];

      // Extra frontend safety: show approved proposals only.
      const approvedEvents = rows.filter(
        (event) => String(event.status || "").toLowerCase() === "approved"
      );

      setEvents(approvedEvents);
      setPage(1);
    } catch (err) {
      console.error("ECA approved events fetch error:", err);
      setError(
        err.message ||
          "Could not load events. Check your login and backend connection."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const clubs = useMemo(() => {
    return [...new Set(events.map(getClubName))].sort((a, b) =>
      a.localeCompare(b)
    );
  }, [events]);

  const stats = useMemo(() => {
    const upcoming = events.filter(
      (event) => getEventStatus(event) === "upcoming"
    ).length;

    const past = events.filter(
      (event) => getEventStatus(event) === "past"
    ).length;

    const clubCount = new Set(events.map(getClubName)).size;

    return {
      total: events.length,
      upcoming,
      past,
      clubs: clubCount,
    };
  }, [events]);

  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = events.filter((event) => {
      const status = getEventStatus(event);
      const club = getClubName(event);

      const matchesTime =
        timeFilter === "all" ||
        (timeFilter === "upcoming" && status === "upcoming") ||
        (timeFilter === "past" && status === "past");

      const matchesClub = clubFilter === "all" || club === clubFilter;

      const searchableText = [
        event.event_name,
        event.name,
        event.motive,
        event.description,
        event.venue,
        club,
        event.eca_requirements,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return (
        matchesTime &&
        matchesClub &&
        (!query || searchableText.includes(query))
      );
    });

    return filtered.sort((a, b) => {
      const dateA = getEventDate(a)?.getTime() ?? 0;
      const dateB = getEventDate(b)?.getTime() ?? 0;

      if (sortOrder === "oldest") return dateA - dateB;
      if (sortOrder === "newest") return dateB - dateA;

      // Upcoming events first, nearest date first.
      const statusA = getEventStatus(a);
      const statusB = getEventStatus(b);

      if (statusA !== statusB) {
        return statusA === "upcoming" ? -1 : 1;
      }

      if (statusA === "past") return dateB - dateA;

      return dateA - dateB;
    });
  }, [events, search, timeFilter, clubFilter, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredEvents.length / PAGE_SIZE));

  const paginatedEvents = filteredEvents.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  useEffect(() => {
    setPage((current) => Math.min(current, totalPages));
  }, [totalPages]);

  const clearFilters = () => {
    setSearch("");
    setTimeFilter("all");
    setClubFilter("all");
    setSortOrder("nearest");
    setPage(1);
  };

  return (
    <div className="min-h-full bg-[#f8f8fa] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1500px] space-y-7">
        {/* Page heading */}
        <section className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#900505]">
              <span className="h-2 w-2 rounded-full bg-[#900505]" />
              ECA Administration
            </div>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              All Events
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
              Explore approved events from every registered club. Review
              upcoming schedules, revisit past events, and access event
              information from one place.
            </p>
          </div>

          <button
            type="button"
            onClick={() => fetchEvents(true)}
            disabled={loading || refreshing}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-[#900505]/30 hover:text-[#900505] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={16}
              className={refreshing ? "animate-spin" : ""}
            />
            Refresh events
          </button>
        </section>

        {/* Summary cards */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={CalendarRange}
            label="Approved events"
            value={loading ? "—" : stats.total}
            description="All approved club proposals available to ECA."
          />

          <StatCard
            icon={CalendarClock}
            label="Upcoming events"
            value={loading ? "—" : stats.upcoming}
            description="Approved events scheduled for today or later."
          />

          <StatCard
            icon={CalendarCheck}
            label="Past events"
            value={loading ? "—" : stats.past}
            description="Approved events whose dates have passed."
          />

          <StatCard
            icon={Users}
            label="Clubs represented"
            value={loading ? "—" : stats.clubs}
            description="Unique clubs with approved events in this list."
          />
        </section>

        {/* Event list and filters */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 p-5 sm:p-6">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Club event directory
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {loading
                    ? "Loading approved events..."
                    : `${filteredEvents.length} ${
                        filteredEvents.length === 1 ? "event" : "events"
                      } match your filters`}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: "all", label: "All events" },
                  { id: "upcoming", label: "Upcoming" },
                  { id: "past", label: "Past events" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setTimeFilter(tab.id);
                      setPage(1);
                    }}
                    className={`rounded-lg px-3.5 py-2.5 text-sm font-semibold transition ${
                      timeFilter === tab.id
                        ? "bg-[#900505] text-white shadow-sm"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-[minmax(240px,1fr)_minmax(180px,0.55fr)_minmax(180px,0.55fr)_auto]">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search event, club or venue..."
                  aria-label="Search events"
                  className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#900505] focus:ring-4 focus:ring-[#900505]/[0.07]"
                />
              </div>

              <div className="relative">
                <Users
                  size={16}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <select
                  value={clubFilter}
                  onChange={(e) => {
                    setClubFilter(e.target.value);
                    setPage(1);
                  }}
                  aria-label="Filter by club"
                  className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-9 text-sm text-gray-700 outline-none transition focus:border-[#900505] focus:ring-4 focus:ring-[#900505]/[0.07]"
                >
                  <option value="all">All clubs</option>
                  {clubs.map((club) => (
                    <option key={club} value={club}>
                      {club}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>

              <div className="relative">
                <SlidersHorizontal
                  size={16}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <select
                  value={sortOrder}
                  onChange={(e) => {
                    setSortOrder(e.target.value);
                    setPage(1);
                  }}
                  aria-label="Sort events"
                  className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-9 text-sm text-gray-700 outline-none transition focus:border-[#900505] focus:ring-4 focus:ring-[#900505]/[0.07]"
                >
                  <option value="nearest">Nearest upcoming first</option>
                  <option value="newest">Newest date first</option>
                  <option value="oldest">Oldest date first</option>
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>

              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
              >
                <X size={15} />
                Clear
              </button>
            </div>
          </div>

          {/* Error state */}
          {error && !loading && (
            <div className="m-5 flex flex-col gap-4 rounded-xl border border-red-200 bg-red-50 p-5 sm:flex-row sm:items-start">
              <AlertCircle className="shrink-0 text-red-600" size={21} />

              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-red-900">
                  Could not load events
                </h3>
                <p className="mt-1 break-words text-sm leading-6 text-red-700">
                  {error}
                </p>
                <p className="mt-2 text-xs leading-5 text-red-700">
                  Check that you are logged in as an ECA administrator and
                  that the deployed API is configured correctly.
                </p>
              </div>

              <button
                type="button"
                onClick={() => fetchEvents(true)}
                className="shrink-0 rounded-lg bg-red-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800"
              >
                Try again
              </button>
            </div>
          )}

          {/* Loading state */}
          {loading && (
            <div className="grid gap-4 p-5 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse rounded-xl border border-gray-100 p-5"
                >
                  <div className="h-3 w-24 rounded bg-gray-100" />
                  <div className="mt-5 h-5 w-3/4 rounded bg-gray-100" />
                  <div className="mt-4 h-3 w-1/2 rounded bg-gray-100" />
                  <div className="mt-8 h-20 rounded-lg bg-gray-50" />
                </div>
              ))}
            </div>
          )}

          {/* Events grid */}
          {!loading && !error && paginatedEvents.length > 0 && (
            <>
              <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:p-5 xl:grid-cols-3">
                {paginatedEvents.map((event) => {
                  const status = getEventStatus(event);
                  const eventName =
                    event.event_name || event.name || "Untitled event";
                  const clubName = getClubName(event);

                  return (
                    <article
                      key={event.id}
                      className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition duration-200 hover:-translate-y-0.5 hover:border-[#900505]/30 hover:shadow-lg"
                    >
                      <div className="h-1 bg-gradient-to-r from-[#900505] via-[#c51b1b] to-[#e8a2a2]" />

                      <div className="flex flex-1 flex-col p-5">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#900505]/[0.07] text-sm font-bold text-[#900505]">
                              {getInitials(clubName)}
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-xs font-semibold text-gray-500">
                                {clubName}
                              </p>
                              <p className="mt-1 text-[11px] font-medium text-emerald-700">
                                ECA approved
                              </p>
                            </div>
                          </div>

                          <StatusBadge status={status} />
                        </div>

                        <h3 className="mt-5 line-clamp-2 min-h-[3.5rem] text-lg font-bold leading-7 text-gray-900 transition group-hover:text-[#900505]">
                          {eventName}
                        </h3>

                        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500">
                          {event.motive ||
                            event.description ||
                            "No event description has been provided."}
                        </p>

                        <div className="mt-5 space-y-3 border-t border-gray-100 pt-4">
                          <div className="flex items-start gap-3">
                            <CalendarDays
                              size={17}
                              className="mt-0.5 shrink-0 text-[#900505]"
                            />
                            <div>
                              <p className="text-xs text-gray-500">Event date</p>
                              <p className="mt-0.5 text-sm font-semibold text-gray-800">
                                {formatDate(event.event_date || event.date)}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Clock3
                              size={17}
                              className="mt-0.5 shrink-0 text-[#900505]"
                            />
                            <div>
                              <p className="text-xs text-gray-500">Timing</p>
                              <p className="mt-0.5 text-sm font-semibold text-gray-800">
                                {getTimeRange(event)}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <MapPin
                              size={17}
                              className="mt-0.5 shrink-0 text-[#900505]"
                            />
                            <div className="min-w-0">
                              <p className="text-xs text-gray-500">Venue</p>
                              <p className="mt-0.5 break-words text-sm font-semibold text-gray-800">
                                {event.venue || "Venue not specified"}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-auto flex items-center justify-between gap-3 border-t border-gray-100 pt-4 mt-5">
                          <span className="text-xs text-gray-400">
                            Event ID: {event.id ?? "N/A"}
                          </span>

                          <button
                            type="button"
                            onClick={() => setSelectedEvent(event)}
                            className="inline-flex items-center gap-2 rounded-lg bg-[#900505]/[0.06] px-3.5 py-2.5 text-sm font-semibold text-[#900505] transition hover:bg-[#900505] hover:text-white"
                          >
                            View details
                            <ArrowUpRight size={15} />
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Pagination */}
              <div className="flex flex-col gap-4 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-gray-500">
                  Showing{" "}
                  <span className="font-semibold text-gray-800">
                    {(page - 1) * PAGE_SIZE + 1}–
                    {Math.min(page * PAGE_SIZE, filteredEvents.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-gray-800">
                    {filteredEvents.length}
                  </span>{" "}
                  events
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    aria-label="Previous page"
                    className="rounded-lg border border-gray-200 p-2.5 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft size={17} />
                  </button>

                  <span className="px-3 text-sm font-semibold text-gray-700">
                    Page {page} of {totalPages}
                  </span>

                  <button
                    type="button"
                    disabled={page >= totalPages}
                    onClick={() =>
                      setPage((p) => Math.min(totalPages, p + 1))
                    }
                    aria-label="Next page"
                    className="rounded-lg border border-gray-200 p-2.5 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronRight size={17} />
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Empty state */}
          {!loading && !error && paginatedEvents.length === 0 && (
            <div className="flex flex-col items-center px-6 py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                <CalendarDays size={29} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                {events.length === 0
                  ? "No approved events yet"
                  : "No events match your filters"}
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                {events.length === 0
                  ? "Approved club proposals will appear here automatically when they are available in the ECA event requests API."
                  : "Try another search term or clear your filters to see more events."}
              </p>

              <button
                type="button"
                onClick={
                  events.length === 0
                    ? () => fetchEvents(true)
                    : clearFilters
                }
                className="mt-5 rounded-xl bg-[#900505] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#720404]"
              >
                {events.length === 0 ? "Reload events" : "Clear filters"}
              </button>
            </div>
          )}
        </section>

        <p className="px-1 text-xs leading-5 text-gray-400">
          Event information is retrieved from the ECA event requests API.
          Only proposals with an approved status are displayed on this page.
        </p>
      </div>

      <EventDetailsModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
};

export default AllEvents;