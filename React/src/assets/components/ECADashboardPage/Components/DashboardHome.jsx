import React, { useCallback, useEffect, useState } from "react";

import {
  Building2,
  Users,
  UserRoundCheck,
  UserRoundPlus,
  CalendarCheck2,
  CheckCircle2,
  XCircle,
  Clock3,
  CalendarDays,
  RefreshCw,
  ChevronDown,
  ShieldCheck,
  ArrowUpRight,
  AlertCircle,
  CalendarClock,
} from "lucide-react";

// =====================================================
// API CONFIGURATION
// =====================================================

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

// =====================================================
// ACADEMIC YEARS
// =====================================================

const academicYears = [
  "2025-26",
  "2026-27",
  "2027-28",
];

const DEFAULT_YEAR = "2026-27";

// =====================================================
// STATISTICS CONFIGURATION
// =====================================================

const statisticsConfig = [
  {
    key: "totalClubs",
    title: "Registered Clubs",
    subtitle: "Total active clubs",
    icon: Building2,
    color: "#900505",
    bg: "#FFF0F0",
  },
  {
    key: "totalUniqueMembers",
    title: "Total Club Members",
    subtitle: "Unique registered students",
    icon: Users,
    color: "#2563EB",
    bg: "#EFF6FF",
  },
  {
    key: "majorInterestMembers",
    title: "Major Interest",
    subtitle: "Registered club members",
    icon: UserRoundCheck,
    color: "#7C3AED",
    bg: "#F5F3FF",
  },
  {
    key: "minorInterestMembers",
    title: "Minor Interest",
    subtitle: "Registered club members",
    icon: UserRoundPlus,
    color: "#0891B2",
    bg: "#ECFEFF",
  },
  {
    key: "totalVolunteers",
    title: "Club Volunteers",
    subtitle: "Unique active volunteers",
    icon: Users,
    color: "#D97706",
    bg: "#FFFBEB",
  },
  {
    key: "conductedEvents",
    title: "Events Conducted",
    subtitle: "Completed this academic year",
    icon: CalendarCheck2,
    color: "#4F46E5",
    bg: "#EEF2FF",
  },
  {
    key: "approvedEvents",
    title: "Approved Events",
    subtitle: "Approved event requests",
    icon: CheckCircle2,
    color: "#16A34A",
    bg: "#F0FDF4",
  },
  {
    key: "rejectedEvents",
    title: "Rejected Events",
    subtitle: "Rejected event requests",
    icon: XCircle,
    color: "#DC2626",
    bg: "#FEF2F2",
  },
  {
    key: "pendingEvents",
    title: "Pending Approvals",
    subtitle: "Awaiting ECA review",
    icon: Clock3,
    color: "#EA580C",
    bg: "#FFF7ED",
  },
];

// =====================================================
// STATISTICS CARD
// =====================================================

const StatisticsCard = ({ item, value, loading }) => {
  const Icon = item.icon;

  return (
    <div
      className="
        group relative overflow-hidden
        rounded-2xl border border-gray-200
        bg-white p-5
        transition-all duration-200
        hover:-translate-y-0.5
        hover:border-gray-300
        hover:shadow-md
      "
    >
      <div className="flex items-start justify-between gap-3">

        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl"
          style={{
            backgroundColor: item.bg,
            color: item.color,
          }}
        >
          <Icon size={23} strokeWidth={2} />
        </div>

        <ArrowUpRight
          size={17}
          className="text-gray-300 transition-colors group-hover:text-gray-500"
        />

      </div>

      <div className="mt-5">

        <p className="text-[13px] font-medium text-gray-500">
          {item.title}
        </p>

        {loading ? (
          <div className="mt-3 h-9 w-20 animate-pulse rounded-lg bg-gray-100" />
        ) : (
          <h3 className="mt-1 text-[30px] font-bold tracking-tight text-gray-900">
            {value === null || value === undefined
              ? "—"
              : Number(value).toLocaleString("en-IN")}
          </h3>
        )}

        <p className="mt-1 text-[11px] text-gray-400">
          {item.subtitle}
        </p>

      </div>

      <div
        className="absolute bottom-0 left-0 h-1 w-full opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          backgroundColor: item.color,
        }}
      />
    </div>
  );
};

// =====================================================
// TODAY'S EVENTS
// =====================================================

const TodaysEvents = ({ events, loading, error }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">

      {/* HEADER */}

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-6 py-5">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF0F0] text-[#900505]">
            <CalendarClock size={22} />
          </div>

          <div>
            <h3 className="text-[16px] font-bold text-gray-900">
              Today's Events
            </h3>

            <p className="mt-0.5 text-[12px] text-gray-500">
              Events scheduled for today
            </p>
          </div>

        </div>

        <span className="rounded-full bg-[#FFF0F0] px-3 py-1.5 text-[11px] font-semibold text-[#900505]">
          {loading ? "Loading..." : `${events.length} Events`}
        </span>

      </div>

      {/* CONTENT */}

      {loading ? (
        <div className="space-y-4 p-6">

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-14 animate-pulse rounded-xl bg-gray-100"
            />
          ))}

        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center px-6 py-12 text-center">

          <AlertCircle size={30} className="text-red-400" />

          <p className="mt-3 text-sm font-medium text-gray-700">
            Unable to load today's events.
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Please try refreshing the dashboard.
          </p>

        </div>
      ) : events.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-14 text-center">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50 text-gray-400">
            <CalendarDays size={29} />
          </div>

          <h4 className="mt-4 text-[14px] font-semibold text-gray-800">
            No events scheduled for today
          </h4>

          <p className="mt-1 max-w-sm text-[12px] text-gray-400">
            Approved events scheduled for today will appear here.
          </p>

        </div>
      ) : (
        <div className="overflow-x-auto">

          <table className="w-full min-w-[650px] text-left">

            <thead className="bg-[#FAFAFB]">

              <tr className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">

                <th className="px-6 py-4">
                  Event Name
                </th>

                <th className="px-6 py-4">
                  Organizing Club
                </th>

                <th className="px-6 py-4">
                  Time
                </th>

                <th className="px-6 py-4">
                  Venue
                </th>

                <th className="px-6 py-4">
                  Status
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-gray-100">

              {events.map((event, index) => (
                <tr
                  key={event.id || index}
                  className="transition-colors hover:bg-gray-50"
                >

                  <td className="px-6 py-4">

                    <p className="text-[13px] font-semibold text-gray-900">
                      {event.event_name || event.name || "Unnamed Event"}
                    </p>

                  </td>

                  <td className="px-6 py-4 text-[12px] text-gray-600">
                    {event.club_name || "—"}
                  </td>

                  <td className="px-6 py-4 text-[12px] text-gray-600">
                    {event.time || "—"}
                  </td>

                  <td className="px-6 py-4 text-[12px] text-gray-600">
                    {event.venue || "—"}
                  </td>

                  <td className="px-6 py-4">

                    <span className="rounded-full bg-green-50 px-3 py-1 text-[11px] font-semibold text-green-700">
                      Approved
                    </span>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
};

// =====================================================
// MAIN DASHBOARD HOME
// =====================================================

const DashboardHome = () => {
  const [academicYear, setAcademicYear] = useState(DEFAULT_YEAR);

  const [statistics, setStatistics] = useState({});

  const [todaysEvents, setTodaysEvents] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [refreshKey, setRefreshKey] = useState(0);

  // =====================================================
  // FETCH DASHBOARD DATA
  // =====================================================

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    setError("");
    setStatistics({});
    setTodaysEvents([]);

    try {
      const response = await fetch(
        `${API_URL}/api/eca/dashboard?academicYear=${encodeURIComponent(
          academicYear
        )}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Dashboard API failed with status ${response.status}`
        );
      }

      const data = await response.json();

      setStatistics(data.statistics || {});

      setTodaysEvents(
        Array.isArray(data.todaysEvents)
          ? data.todaysEvents
          : []
      );

    } catch (err) {
      console.error("ECA Dashboard Error:", err);

      setError(err.message || "Unable to load dashboard data");

    } finally {
      setLoading(false);
    }
  }, [academicYear]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData, refreshKey]);

  // =====================================================
  // REFRESH DASHBOARD
  // =====================================================

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  // =====================================================
  // DATE FORMATTING
  // =====================================================

  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="mx-auto max-w-[1600px] space-y-7">

      {/* ============================================
          DASHBOARD HEADER
      ============================================ */}

      <div className="flex flex-wrap items-start justify-between gap-5">

        <div>

          <div className="mb-2 flex items-center gap-2">

            <ShieldCheck size={16} className="text-[#900505]" />

            <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-[#900505]">
              ECA Administration
            </span>

          </div>

          <h1 className="text-[25px] font-bold tracking-tight text-gray-900 sm:text-[29px]">
            Dashboard Overview
          </h1>

          <p className="mt-1 text-[13px] text-gray-500">
            Academic year statistics and event management overview.
          </p>

          <p className="mt-2 flex items-center gap-2 text-[12px] text-gray-400">
            <CalendarDays size={14} />
            {formattedDate}
          </p>

        </div>

        {/* YEAR SELECTOR + REFRESH */}

        <div className="flex flex-wrap items-center gap-3">

          <div className="relative">

            <select
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              className="
                appearance-none
                rounded-xl border border-gray-200
                bg-white py-3 pl-4 pr-10
                text-[12px] font-semibold text-gray-700
                shadow-sm outline-none
                focus:border-[#900505]
                focus:ring-2 focus:ring-red-100
              "
            >
              {academicYears.map((year) => (
                <option key={year} value={year}>
                  Academic Year {year}
                </option>
              ))}
            </select>

            <ChevronDown
              size={15}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

          </div>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={loading}
            className="
              flex items-center gap-2
              rounded-xl border border-gray-200
              bg-white px-4 py-3
              text-[12px] font-semibold text-gray-600
              shadow-sm transition
              hover:border-[#900505]
              hover:text-[#900505]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <RefreshCw
              size={15}
              className={loading ? "animate-spin" : ""}
            />

            Refresh
          </button>

        </div>

      </div>

      {/* ============================================
          ACADEMIC YEAR INFORMATION
      ============================================ */}

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#F5DADA] bg-[#FFF8F8] px-5 py-4">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#900505]">
            <CalendarDays size={20} />
          </div>

          <div>
            <p className="text-[12px] font-bold text-gray-900">
              Academic Year {academicYear}
            </p>

            <p className="mt-0.5 text-[11px] text-gray-500">
              Showing records for the selected academic session
            </p>
          </div>

        </div>

        <span className="rounded-full border border-[#F1CCCC] bg-white px-3 py-1.5 text-[11px] font-semibold text-[#900505]">
          {academicYear === DEFAULT_YEAR
            ? "Default Session"
            : "Selected Session"}
        </span>

      </div>

      {/* ============================================
          ERROR MESSAGE
      ============================================ */}

      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">

          <AlertCircle
            size={19}
            className="mt-0.5 shrink-0 text-red-600"
          />

          <div>
            <p className="text-[13px] font-semibold text-red-700">
              Dashboard data unavailable
            </p>

            <p className="mt-1 text-[12px] text-red-600">
              {error}
            </p>

            <p className="mt-1 text-[11px] text-red-500">
              The dashboard layout is ready. The ECA dashboard API must be
              connected to display live statistics.
            </p>
          </div>

        </div>
      )}

      {/* ============================================
          CLUB & STUDENT OVERVIEW
      ============================================ */}

      <section>

        <div className="mb-4 flex items-center gap-3">

          <div className="h-6 w-1 rounded-full bg-[#900505]" />

          <div>
            <h2 className="text-[16px] font-bold text-gray-900">
              Club & Student Overview
            </h2>

            <p className="mt-0.5 text-[11px] text-gray-400">
              Membership and volunteer statistics
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

          {statisticsConfig.slice(0, 5).map((item) => (
            <StatisticsCard
              key={item.key}
              item={item}
              value={statistics[item.key]}
              loading={loading}
            />
          ))}

        </div>

      </section>

      {/* ============================================
          EVENT OVERVIEW
      ============================================ */}

      <section>

        <div className="mb-4 flex items-center gap-3">

          <div className="h-6 w-1 rounded-full bg-[#900505]" />

          <div>
            <h2 className="text-[16px] font-bold text-gray-900">
              Event Overview
            </h2>

            <p className="mt-0.5 text-[11px] text-gray-400">
              Events and approval status for {academicYear}
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {statisticsConfig.slice(5).map((item) => (
            <StatisticsCard
              key={item.key}
              item={item}
              value={statistics[item.key]}
              loading={loading}
            />
          ))}

        </div>

      </section>

      {/* ============================================
          TODAY'S EVENTS
      ============================================ */}

      <section>

        <TodaysEvents
          events={todaysEvents}
          loading={loading}
          error={error}
        />

      </section>

      {/* ============================================
          FOOTER
      ============================================ */}

      <div className="border-t border-gray-200 pt-5 text-center">

        <p className="text-[11px] text-gray-400">
          Orbix ECA Administration Portal • SKIT Jaipur • Academic Year{" "}
          {academicYear}
        </p>

      </div>

    </div>
  );
};

export default DashboardHome;