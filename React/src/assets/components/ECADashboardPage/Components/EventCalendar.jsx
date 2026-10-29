import React, { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  Search,
  SlidersHorizontal,
  ArrowUpRight,
  CalendarCheck2,
  Sparkles,
  X,
  Users,
  Monitor,
  Palette,
  BookOpen,
  Trophy,
  Plus,
} from "lucide-react";

const CATEGORIES = {
  Technical: {
    color: "#6366f1",
    bg: "#eef2ff",
    border: "#c7d2fe",
    icon: Monitor,
  },
  Cultural: {
    color: "#db2777",
    bg: "#fdf2f8",
    border: "#fbcfe8",
    icon: Palette,
  },
  Workshop: {
    color: "#0d9488",
    bg: "#f0fdfa",
    border: "#99f6e4",
    icon: BookOpen,
  },
  Competition: {
    color: "#d97706",
    bg: "#fffbeb",
    border: "#fde68a",
    icon: Trophy,
  },
  Other: {
    color: "#760404",
    bg: "#fef2f2",
    border: "#fecaca",
    icon: CalendarDays,
  },
};

// Demo events: replace with your actual API data later.
const INITIAL_EVENTS = [
  {
    id: 1,
    title: "CodeFiesta Hackathon",
    club: "CodeFiesta",
    category: "Technical",
    date: "2026-10-30",
    startTime: "10:00 AM",
    endTime: "04:00 PM",
    venue: "Innovation Lab",
    status: "Approved",
    description:
      "A technical event where students collaborate, build innovative solutions and showcase their coding skills.",
  },
  {
    id: 2,
    title: "Creative Design Workshop",
    club: "Design Club",
    category: "Workshop",
    date: "2026-11-02",
    startTime: "11:00 AM",
    endTime: "01:00 PM",
    venue: "Seminar Hall 2",
    status: "Approved",
    description:
      "An interactive workshop covering visual communication, design systems and creative problem-solving.",
  },
  {
    id: 3,
    title: "Battle of Bands",
    club: "Music Club",
    category: "Cultural",
    date: "2026-11-05",
    startTime: "03:00 PM",
    endTime: "06:00 PM",
    venue: "Open Air Theatre",
    status: "Approved",
    description:
      "A live musical showcase featuring talented student performers from across the campus.",
  },
  {
    id: 4,
    title: "UI/UX Design Challenge",
    club: "Design Club",
    category: "Competition",
    date: "2026-11-07",
    startTime: "10:00 AM",
    endTime: "02:00 PM",
    venue: "Computer Lab 3",
    status: "Approved",
    description:
      "Design an intuitive digital experience by solving a real-world user experience problem.",
  },
  {
    id: 5,
    title: "AI & Future Tech Talk",
    club: "Tech Club",
    category: "Technical",
    date: "2026-11-10",
    startTime: "12:00 PM",
    endTime: "02:00 PM",
    venue: "Gyan Mandir",
    status: "Approved",
    description:
      "Explore emerging technologies, artificial intelligence and their applications in modern industries.",
  },
  {
    id: 6,
    title: "Photography Walk",
    club: "Photography Club",
    category: "Other",
    date: "2026-11-12",
    startTime: "08:00 AM",
    endTime: "10:00 AM",
    venue: "Campus Main Gate",
    status: "Approved",
    description:
      "A campus photography session focused on composition, storytelling and creative perspectives.",
  },
  {
    id: 7,
    title: "Web Development Bootcamp",
    club: "CodeFiesta",
    category: "Workshop",
    date: "2026-11-15",
    startTime: "10:00 AM",
    endTime: "01:00 PM",
    venue: "Innovation Lab",
    status: "Approved",
    description:
      "Learn modern frontend development concepts through practical demonstrations and guided exercises.",
  },
  {
    id: 8,
    title: "Inter-Club Cricket",
    club: "Sports Club",
    category: "Competition",
    date: "2026-11-18",
    startTime: "09:00 AM",
    endTime: "01:00 PM",
    venue: "College Ground",
    status: "Approved",
    description:
      "An inter-club cricket competition promoting teamwork, sportsmanship and campus engagement.",
  },
  {
    id: 9,
    title: "Entrepreneurship Meetup",
    club: "E-Cell",
    category: "Other",
    date: "2026-11-20",
    startTime: "02:00 PM",
    endTime: "04:00 PM",
    venue: "Conference Hall",
    status: "Approved",
    description:
      "Connect with aspiring founders and discuss startup ideas, business models and innovation.",
  },
];

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const toDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const parseDate = (dateString) => {
  const [year, month, day] = dateString.split("-").map(Number);

  return new Date(year, month - 1, day);
};

const formatDate = (dateString) =>
  parseDate(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const formatFullDate = (dateString) =>
  parseDate(dateString).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const isSameDay = (first, second) =>
  toDateKey(first) === toDateKey(second);

const getMonthGrid = (year, month) => {
  const firstDay = new Date(year, month, 1);
  const mondayOffset = (firstDay.getDay() + 6) % 7;

  const startDate = new Date(year, month, 1 - mondayOffset);

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    return date;
  });
};

const EventCalendar = () => {
  const [events, setEvents] = useState(INITIAL_EVENTS);

  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const [selectedDate, setSelectedDate] = useState(() => new Date());

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("Month");

  const [showAddEvent, setShowAddEvent] = useState(false);

  const [newEvent, setNewEvent] = useState({
    title: "",
    club: "",
    category: "Technical",
    date: toDateKey(new Date()),
    startTime: "10:00 AM",
    endTime: "12:00 PM",
    venue: "",
    description: "",
  });

  const today = new Date();

  const calendarDays = useMemo(
    () => getMonthGrid(currentMonth.getFullYear(), currentMonth.getMonth()),
    [currentMonth]
  );

  const filteredEvents = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return events.filter((event) => {
      const matchesCategory =
        activeCategory === "All" || event.category === activeCategory;

      const matchesSearch =
        !query ||
        event.title.toLowerCase().includes(query) ||
        event.club.toLowerCase().includes(query) ||
        event.venue.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [events, activeCategory, searchQuery]);

  const getEventsForDate = (date) =>
    filteredEvents.filter((event) => event.date === toDateKey(date));

  const selectedDateEvents = getEventsForDate(selectedDate);

  const upcomingEvents = useMemo(
    () =>
      filteredEvents
        .filter((event) => parseDate(event.date) >= new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate()
        ))
        .sort((a, b) => {
          if (a.date !== b.date) return a.date.localeCompare(b.date);
          return a.startTime.localeCompare(b.startTime);
        })
        .slice(0, 5),
    [filteredEvents, today.getDate(), today.getMonth(), today.getFullYear()]
  );

  const monthEvents = filteredEvents.filter((event) => {
    const date = parseDate(event.date);

    return (
      date.getMonth() === currentMonth.getMonth() &&
      date.getFullYear() === currentMonth.getFullYear()
    );
  });

  const navigateMonth = (direction) => {
    setCurrentMonth(
      (previous) =>
        new Date(
          previous.getFullYear(),
          previous.getMonth() + direction,
          1
        )
    );
  };

  const goToToday = () => {
    const now = new Date();

    setCurrentMonth(new Date(now.getFullYear(), now.getMonth(), 1));
    setSelectedDate(now);
  };

  const handleAddEvent = (event) => {
    event.preventDefault();

    if (!newEvent.title.trim() || !newEvent.date || !newEvent.venue.trim()) {
      return;
    }

    const createdEvent = {
      ...newEvent,
      id: Date.now(),
      title: newEvent.title.trim(),
      club: newEvent.club.trim() || "ECA Cell",
      venue: newEvent.venue.trim(),
      status: "Approved",
    };

    setEvents((previous) => [...previous, createdEvent]);

    const createdDate = parseDate(createdEvent.date);

    setCurrentMonth(
      new Date(createdDate.getFullYear(), createdDate.getMonth(), 1)
    );

    setSelectedDate(createdDate);
    setShowAddEvent(false);

    setNewEvent({
      title: "",
      club: "",
      category: "Technical",
      date: toDateKey(new Date()),
      startTime: "10:00 AM",
      endTime: "12:00 PM",
      venue: "",
      description: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#f7f5f5] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* HEADER */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#510000] via-[#760404] to-[#a91c27] p-6 text-white shadow-xl shadow-red-950/10 sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute -right-16 -top-28 h-80 w-80 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-4 -top-16 h-60 w-60 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -bottom-32 right-1/4 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

          <div className="relative z-10 flex flex-col justify-between gap-7 lg:flex-row lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-red-50">
                <Sparkles size={14} />
                ECA EVENT MANAGEMENT
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Event Calendar<span className="text-red-300">.</span>
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-red-100/90 sm:text-base">
                Every event, every club, one calendar. Stay ahead of
                everything happening across your campus.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md">
                  <CalendarCheck2 size={18} className="text-red-200" />
                  <div>
                    <p className="text-xl font-bold">{monthEvents.length}</p>
                    <p className="text-[11px] text-red-100/80">
                      Events this month
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md">
                  <Users size={18} className="text-red-200" />
                  <div>
                    <p className="text-xl font-bold">
                      {new Set(monthEvents.map((event) => event.club)).size}
                    </p>
                    <p className="text-[11px] text-red-100/80">
                      Clubs participating
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowAddEvent(true)}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-[#760404] shadow-lg transition hover:-translate-y-0.5 hover:bg-red-50"
            >
              <Plus size={18} />
              Add Event
            </button>
          </div>
        </section>

        {/* SEARCH AND FILTERS */}
        <section className="flex flex-col gap-4 rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search events, clubs, venues..."
              className="w-full rounded-xl border border-gray-200 bg-[#faf9f9] py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#760404] focus:ring-4 focus:ring-red-900/5"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <SlidersHorizontal size={16} className="mr-1 text-gray-400" />

            {["All", ...Object.keys(CATEGORIES)].map((category) => {
              const active = activeCategory === category;
              const style = CATEGORIES[category];

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className="rounded-lg border px-3 py-2 text-xs font-semibold transition"
                  style={
                    active
                      ? {
                          backgroundColor:
                            category === "All" ? "#760404" : style.bg,
                          color: category === "All" ? "#ffffff" : style.color,
                          borderColor:
                            category === "All" ? "#760404" : style.border,
                        }
                      : {
                          backgroundColor: "#ffffff",
                          color: "#6b7280",
                          borderColor: "#e5e7eb",
                        }
                  }
                >
                  {category}
                </button>
              );
            })}
          </div>
        </section>

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          {/* CALENDAR */}
          <section className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm">
            {/* Calendar toolbar */}
            <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {MONTHS[currentMonth.getMonth()]}{" "}
                  {currentMonth.getFullYear()}
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Select a date to explore scheduled events.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={goToToday}
                  className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:border-[#760404] hover:text-[#760404]"
                >
                  Today
                </button>

                <div className="flex items-center rounded-lg border border-gray-200 p-1">
                  <button
                    type="button"
                    aria-label="Previous month"
                    onClick={() => navigateMonth(-1)}
                    className="rounded-md p-2 text-gray-600 transition hover:bg-gray-100 hover:text-[#760404]"
                  >
                    <ChevronLeft size={17} />
                  </button>

                  <button
                    type="button"
                    aria-label="Next month"
                    onClick={() => navigateMonth(1)}
                    className="rounded-md p-2 text-gray-600 transition hover:bg-gray-100 hover:text-[#760404]"
                  >
                    <ChevronRight size={17} />
                  </button>
                </div>

                <select
                  value={viewMode}
                  onChange={(event) => setViewMode(event.target.value)}
                  className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 outline-none focus:border-[#760404]"
                >
                  <option value="Month">Month view</option>
                  <option value="Week">Week view</option>
                </select>
              </div>
            </div>

            {/* Weekday headings */}
            <div className="grid grid-cols-7 border-b border-gray-100 bg-[#fcfbfb]">
              {WEEKDAYS.map((day) => (
                <div
                  key={day}
                  className="py-3 text-center text-[10px] font-bold uppercase tracking-wider text-gray-400 sm:text-xs"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7">
              {(viewMode === "Month"
                ? calendarDays
                : calendarDays.filter((date) => {
                    const mondayOffset =
                      (selectedDate.getDay() + 6) % 7;

                    const weekStart = new Date(selectedDate);
                    weekStart.setDate(selectedDate.getDate() - mondayOffset);

                    const weekEnd = new Date(weekStart);
                    weekEnd.setDate(weekStart.getDate() + 6);

                    return date >= weekStart && date <= weekEnd;
                  })
              ).map((date) => {
                const isCurrentMonth =
                  date.getMonth() === currentMonth.getMonth();

                const isSelected = isSameDay(date, selectedDate);
                const isToday = isSameDay(date, today);
                const dayEvents = getEventsForDate(date);

                return (
                  <button
                    key={toDateKey(date)}
                    type="button"
                    onClick={() => setSelectedDate(date)}
                    className={[
                      "group relative min-h-[92px] border-b border-r border-gray-100 p-1.5 text-left transition sm:min-h-[125px] sm:p-2.5",
                      isSelected
                        ? "bg-red-50/80"
                        : "bg-white hover:bg-gray-50/80",
                      !isCurrentMonth && viewMode === "Month"
                        ? "bg-[#fcfbfb]"
                        : "",
                    ].join(" ")}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span
                        className={[
                          "flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold sm:h-8 sm:w-8 sm:text-sm",
                          isToday
                            ? "bg-[#760404] text-white shadow-md shadow-red-950/15"
                            : isSelected
                              ? "bg-red-100 text-[#760404]"
                              : isCurrentMonth
                                ? "text-gray-700"
                                : "text-gray-300",
                        ].join(" ")}
                      >
                        {date.getDate()}
                      </span>

                      {dayEvents.length > 0 && (
                        <span className="hidden text-[10px] font-semibold text-gray-400 sm:block">
                          {dayEvents.length}{" "}
                          {dayEvents.length === 1 ? "event" : "events"}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1">
                      {dayEvents
                        .slice(0, 3)
                        .map((event) => {
                          const style = CATEGORIES[event.category];

                          return (
                            <div
                              key={event.id}
                              title={`${event.title} · ${event.startTime}`}
                              className="truncate rounded-md border-l-[3px] px-1.5 py-1 text-[9px] font-semibold leading-tight sm:px-2 sm:py-1.5 sm:text-[10px]"
                              style={{
                                backgroundColor: style.bg,
                                borderLeftColor: style.color,
                                color: style.color,
                              }}
                            >
                              <span className="hidden sm:inline">
                                {event.startTime}{" "}
                              </span>
                              {event.title}
                            </div>
                          );
                        })}

                      {dayEvents.length > 3 && (
                        <p className="pl-1 text-[9px] font-bold text-gray-500 sm:text-[10px]">
                          +{dayEvents.length - 3} more
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Calendar footer / legend */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-gray-100 bg-[#fcfbfb] px-4 py-4 sm:px-6">
              {Object.entries(CATEGORIES).map(([category, style]) => (
                <div
                  key={category}
                  className="flex items-center gap-2 text-[10px] font-medium text-gray-500 sm:text-xs"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: style.color }}
                  />
                  {category}
                </div>
              ))}
            </div>
          </section>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-6">
            {/* Selected date */}
            <section className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-100 p-5">
                <div>
                  <h3 className="font-bold text-gray-900">Selected Date</h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Events scheduled for this day
                  </p>
                </div>

                <div className="rounded-xl bg-red-50 p-2.5 text-[#760404]">
                  <CalendarDays size={20} />
                </div>
              </div>

              <div className="p-5">
                <p className="text-2xl font-bold text-gray-900">
                  {selectedDate.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                  })}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {selectedDate.toLocaleDateString("en-IN", {
                    weekday: "long",
                    year: "numeric",
                  })}
                </p>

                <div className="my-5 h-px bg-gray-100" />

                {selectedDateEvents.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-gray-200 px-4 py-7 text-center">
                    <CalendarDays
                      size={28}
                      className="mx-auto text-gray-300"
                    />

                    <p className="mt-3 text-sm font-semibold text-gray-700">
                      No events scheduled
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-400">
                      Choose another date or add a new event.
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setNewEvent((previous) => ({
                          ...previous,
                          date: toDateKey(selectedDate),
                        }));
                        setShowAddEvent(true);
                      }}
                      className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#760404] hover:underline"
                    >
                      <Plus size={14} />
                      Create event
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedDateEvents.map((event) => {
                      const style = CATEGORIES[event.category];
                      const CategoryIcon = style.icon;

                      return (
                        <button
                          key={event.id}
                          type="button"
                          onClick={() => setSelectedEvent(event)}
                          className="w-full rounded-xl border border-gray-100 p-3.5 text-left transition hover:border-red-200 hover:shadow-sm"
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className="rounded-lg p-2.5"
                              style={{
                                backgroundColor: style.bg,
                                color: style.color,
                              }}
                            >
                              <CategoryIcon size={18} />
                            </div>

                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-bold leading-5 text-gray-800">
                                {event.title}
                              </p>

                              <p className="mt-1 text-xs text-gray-500">
                                {event.club}
                              </p>

                              <p className="mt-2 flex items-center gap-1.5 text-[11px] text-gray-500">
                                <Clock3 size={12} />
                                {event.startTime} – {event.endTime}
                              </p>
                            </div>

                            <ArrowUpRight
                              size={16}
                              className="shrink-0 text-gray-400"
                            />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>

            {/* Upcoming events */}
            <section className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-900">Coming Up</h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Your next scheduled events
                  </p>
                </div>

                <span className="rounded-lg bg-red-50 px-2.5 py-1.5 text-xs font-bold text-[#760404]">
                  {upcomingEvents.length}
                </span>
              </div>

              {upcomingEvents.length === 0 ? (
                <p className="rounded-xl bg-gray-50 p-4 text-center text-sm text-gray-500">
                  No upcoming events found.
                </p>
              ) : (
                <div className="space-y-4">
                  {upcomingEvents.map((event) => {
                    const style = CATEGORIES[event.category];
                    const date = parseDate(event.date);

                    return (
                      <button
                        type="button"
                        key={event.id}
                        onClick={() => {
                          setSelectedDate(date);
                          setCurrentMonth(
                            new Date(date.getFullYear(), date.getMonth(), 1)
                          );
                          setSelectedEvent(event);
                        }}
                        className="group flex w-full items-start gap-3 text-left"
                      >
                        <div className="flex h-[58px] w-[55px] shrink-0 flex-col items-center justify-center rounded-xl border border-gray-100 bg-[#faf9f9] transition group-hover:border-red-200 group-hover:bg-red-50">
                          <span className="text-lg font-bold leading-6 text-gray-800">
                            {date.getDate()}
                          </span>

                          <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
                            {date.toLocaleDateString("en-IN", {
                              month: "short",
                            })}
                          </span>
                        </div>

                        <div className="min-w-0 flex-1 py-0.5">
                          <p className="truncate text-sm font-bold text-gray-800 transition group-hover:text-[#760404]">
                            {event.title}
                          </p>

                          <p className="mt-1 truncate text-xs text-gray-500">
                            {event.club}
                          </p>

                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <span
                              className="rounded-md px-2 py-1 text-[9px] font-bold"
                              style={{
                                backgroundColor: style.bg,
                                color: style.color,
                              }}
                            >
                              {event.category}
                            </span>

                            <span className="text-[10px] text-gray-400">
                              {event.startTime}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </section>
          </aside>
        </div>
      </div>

      {/* EVENT DETAILS MODAL */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="event-details-title"
            className="my-auto w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-[#510000] to-[#a91c27] p-6 text-white">
              <div className="absolute -right-8 -top-10 h-40 w-40 rounded-full border border-white/10" />

              <button
                type="button"
                aria-label="Close event details"
                onClick={() => setSelectedEvent(null)}
                className="absolute right-4 top-4 rounded-lg bg-white/10 p-2 transition hover:bg-white/20"
              >
                <X size={18} />
              </button>

              <div
                className="mb-4 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold"
                style={{
                  backgroundColor: CATEGORIES[selectedEvent.category].bg,
                  color: CATEGORIES[selectedEvent.category].color,
                }}
              >
                {React.createElement(
                  CATEGORIES[selectedEvent.category].icon,
                  { size: 15 }
                )}
                {selectedEvent.category}
              </div>

              <h2
                id="event-details-title"
                className="relative pr-8 text-2xl font-bold leading-tight"
              >
                {selectedEvent.title}
              </h2>

              <p className="mt-2 text-sm text-red-100">
                Organized by {selectedEvent.club}
              </p>
            </div>

            <div className="space-y-5 p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-red-50 p-2.5 text-[#760404]">
                    <CalendarDays size={18} />
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Date</p>
                    <p className="mt-1 text-sm font-semibold text-gray-800">
                      {formatFullDate(selectedEvent.date)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-red-50 p-2.5 text-[#760404]">
                    <Clock3 size={18} />
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Event timing</p>
                    <p className="mt-1 text-sm font-semibold text-gray-800">
                      {selectedEvent.startTime} – {selectedEvent.endTime}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:col-span-2">
                  <div className="rounded-lg bg-red-50 p-2.5 text-[#760404]">
                    <MapPin size={18} />
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Venue</p>
                    <p className="mt-1 text-sm font-semibold text-gray-800">
                      {selectedEvent.venue}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                  About this event
                </p>

                <p className="text-sm leading-6 text-gray-600">
                  {selectedEvent.description ||
                    "No additional event description is available."}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <div>
                  <p className="text-xs text-gray-400">Event status</p>
                  <span className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {selectedEvent.status}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedEvent(null)}
                  className="rounded-xl bg-[#760404] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#590303]"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD EVENT MODAL */}
      {showAddEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setShowAddEvent(false)}
        >
          <form
            onSubmit={handleAddEvent}
            className="my-auto w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between bg-gradient-to-r from-[#510000] to-[#8c111b] p-5 text-white">
              <div>
                <h2 className="text-xl font-bold">Create Event</h2>
                <p className="mt-1 text-xs text-red-100">
                  Add an event to your calendar preview.
                </p>
              </div>

              <button
                type="button"
                aria-label="Close create event form"
                onClick={() => setShowAddEvent(false)}
                className="rounded-lg bg-white/10 p-2 hover:bg-white/20"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 p-5 sm:p-6">
              <div>
                <label className="mb-1.5 block text-xs font-bold text-gray-700">
                  Event Name *
                </label>

                <input
                  required
                  value={newEvent.title}
                  onChange={(event) =>
                    setNewEvent((previous) => ({
                      ...previous,
                      title: event.target.value,
                    }))
                  }
                  placeholder="Enter event name"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#760404] focus:ring-4 focus:ring-red-900/5"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-gray-700">
                    Organizing Club
                  </label>

                  <input
                    value={newEvent.club}
                    onChange={(event) =>
                      setNewEvent((previous) => ({
                        ...previous,
                        club: event.target.value,
                      }))
                    }
                    placeholder="Club name"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#760404]"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold text-gray-700">
                    Category
                  </label>

                  <select
                    value={newEvent.category}
                    onChange={(event) =>
                      setNewEvent((previous) => ({
                        ...previous,
                        category: event.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-[#760404]"
                  >
                    {Object.keys(CATEGORIES).map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-gray-700">
                  Event Date *
                </label>

                <input
                  type="date"
                  required
                  value={newEvent.date}
                  onChange={(event) =>
                    setNewEvent((previous) => ({
                      ...previous,
                      date: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#760404]"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-gray-700">
                    Start Time
                  </label>

                  <input
                    value={newEvent.startTime}
                    onChange={(event) =>
                      setNewEvent((previous) => ({
                        ...previous,
                        startTime: event.target.value,
                      }))
                    }
                    placeholder="10:00 AM"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#760404]"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold text-gray-700">
                    End Time
                  </label>

                  <input
                    value={newEvent.endTime}
                    onChange={(event) =>
                      setNewEvent((previous) => ({
                        ...previous,
                        endTime: event.target.value,
                      }))
                    }
                    placeholder="12:00 PM"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#760404]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-gray-700">
                  Venue *
                </label>

                <input
                  required
                  value={newEvent.venue}
                  onChange={(event) =>
                    setNewEvent((previous) => ({
                      ...previous,
                      venue: event.target.value,
                    }))
                  }
                  placeholder="Event venue"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#760404]"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-gray-700">
                  Description
                </label>

                <textarea
                  rows={3}
                  value={newEvent.description}
                  onChange={(event) =>
                    setNewEvent((previous) => ({
                      ...previous,
                      description: event.target.value,
                    }))
                  }
                  placeholder="Describe the event..."
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#760404]"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddEvent(false)}
                  className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-[#760404] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#590303]"
                >
                  Add to Calendar
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EventCalendar;