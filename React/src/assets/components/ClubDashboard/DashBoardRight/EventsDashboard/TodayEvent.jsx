
import React from "react";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Users,
  UserRoundCheck,
  ClipboardList,
  Star,
  ArrowUpRight,
  Radio,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const TodayEvent = () => {
  // Sample event data — baad mein API se connect kar sakte ho
  const event = {
    clubName: "Dance Club",
    title: "Annual Dance & Cultural Celebration",
    date: "23 October, 2026",
    time: "12:00 PM - 3:00 PM",
    venue: "Main Auditorium, SKIT Jaipur",
    registrations: 50,
    members: 32,
    volunteers: 12,
    rating: "4.8",
    poster: "./images/DanceClub.jpeg",
    about:
      "Get ready for an exciting celebration of talent, music, and creativity! Join us for amazing performances, energetic dance battles, and unforgettable campus memories.",
    coordinators: [
      "Himanshu Agrawal",
      "Manpreet Singh",
      "Club Coordinator",
    ],
  };

  const stats = [
    {
      label: "Registrations",
      value: event.registrations,
      icon: ClipboardList,
      description: "Total registered",
    },
    {
      label: "Members",
      value: event.members,
      icon: Users,
      description: "Participating",
    },
    {
      label: "Volunteers",
      value: event.volunteers,
      icon: UserRoundCheck,
      description: "Event support",
    },
  ];

  return (
    <div className="w-full space-y-5 px-1 py-4 sm:px-3">
      {/* Section heading */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <span className="h-6 w-1 rounded-full bg-[#931913]" />
            <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
              Today's Event
            </h2>
          </div>

          <p className="pl-3 text-sm text-gray-500">
            Stay updated with what's happening on campus today.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-2 text-sm font-semibold text-[#931913]">
          <Radio size={16} className="animate-pulse" />
          Today's Highlight
        </div>
      </div>

      {/* Main event card */}
      <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">
        {/* Top accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#580e07] via-[#931913] to-[#c65a43]" />

        <div className="flex flex-col lg:flex-row">
          {/* Event poster */}
          <div className="relative h-56 shrink-0 overflow-hidden bg-[#580e07] sm:h-72 lg:h-auto lg:min-h-[490px] lg:w-[300px]">
            <img
              src={event.poster}
              alt={`${event.clubName} event poster`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />

            {/* Poster overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20" />

            {/* Today badge */}
            <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-bold text-[#931913] shadow-lg">
              <span className="h-2 w-2 animate-pulse rounded-full bg-red-600" />
              LIVE TODAY
            </div>

            {/* Poster text */}
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-white/80">
                <Sparkles size={15} />
                Featured Campus Event
              </div>

              <h3 className="text-2xl font-extrabold leading-tight sm:text-3xl">
                {event.clubName}
              </h3>

              <p className="mt-1 text-sm text-white/80">
                SKIT Jaipur
              </p>
            </div>
          </div>

          {/* Event information */}
          <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-6 lg:p-7">
            {/* Club and rating */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="rounded-lg bg-[#fff1ee] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#931913]">
                {event.clubName}
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-700">
                <Star size={15} fill="currentColor" />
                {event.rating}
              </span>
            </div>

            {/* Title */}
            <h3 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-3xl">
              {event.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              An exciting campus experience filled with talent, energy, and
              unforgettable moments.
            </p>

            {/* Event details */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3.5">
                <div className="rounded-lg bg-white p-2 text-[#931913] shadow-sm">
                  <CalendarDays size={19} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-500">
                    Event Date
                  </p>
                  <p className="mt-1 text-sm font-bold text-gray-800">
                    {event.date}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3.5">
                <div className="rounded-lg bg-white p-2 text-[#931913] shadow-sm">
                  <Clock3 size={19} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-500">
                    Event Time
                  </p>
                  <p className="mt-1 text-sm font-bold text-gray-800">
                    {event.time}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3.5 sm:col-span-2">
                <div className="rounded-lg bg-white p-2 text-[#931913] shadow-sm">
                  <MapPin size={19} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-500">
                    Venue
                  </p>
                  <p className="mt-1 text-sm font-bold text-gray-800">
                    {event.venue}
                  </p>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="mt-6">
              <div className="mb-3 flex items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-gray-800">
                  Event Overview
                </h4>

                <span className="text-xs text-gray-400">
                  Participation stats
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {stats.map((stat) => {
                  const Icon = stat.icon;

                  return (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-gray-100 bg-white p-3 transition-colors hover:border-red-100 hover:bg-red-50/40 sm:p-4"
                    >
                      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#fff1ee] text-[#931913]">
                        <Icon size={18} />
                      </div>

                      <p className="text-xl font-extrabold text-gray-900 sm:text-2xl">
                        {stat.value}
                      </p>

                      <p className="mt-1 text-[11px] font-semibold text-gray-600 sm:text-xs">
                        {stat.label}
                      </p>

                      <p className="mt-1 hidden text-[11px] text-gray-400 sm:block">
                        {stat.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* About event */}
            <div className="mt-6">
              <h4 className="flex items-center gap-2 text-sm font-bold text-gray-900">
                <span className="h-5 w-1 rounded-full bg-[#931913]" />
                About This Event
              </h4>

              <p className="mt-2 text-sm leading-7 text-gray-600">
                {event.about}
              </p>
            </div>

            {/* Coordinators */}
            <div className="mt-6 border-t border-gray-100 pt-5">
              <div className="mb-3 flex items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-gray-900">
                  Event Coordinators
                </h4>

                <span className="text-xs text-gray-400">
                  {event.coordinators.length} coordinators
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {event.coordinators.map((name, index) => (
                  <div
                    key={`${name}-${index}`}
                    className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 py-2 pl-2 pr-3"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#931913] text-xs font-bold text-white">
                      {name.charAt(0).toUpperCase()}
                    </div>

                    <span className="text-xs font-medium text-gray-700">
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex flex-col gap-3 rounded-xl bg-[#fff8f6] p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 size={18} className="shrink-0 text-[#931913]" />
                <span>Be part of today's campus experience.</span>
              </div>

              <div className="inline-flex items-center gap-2 text-sm font-bold text-[#931913]">
                Event details
                <ArrowUpRight size={17} />
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default TodayEvent;
