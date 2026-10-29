
import React from "react";
import {
  CalendarDays,
  Clock3,
  Star,
  Users,
  UserRoundCheck,
  ClipboardList,
  MapPin,
  MoreVertical,
} from "lucide-react";

const AllEvents = () => {
  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-y-auto px-1 py-4 pb-6">

      {/* Event Card */}
      <div
        className="group flex w-full flex-col gap-4 rounded-2xl
        border border-gray-200 bg-white p-4
        shadow-sm transition-all duration-300
        hover:border-[#8e2020]/30 hover:shadow-md
        sm:p-5 lg:flex-row lg:gap-5"
      >
        {/* Event Poster */}
        <div className="relative h-48 w-full shrink-0 overflow-hidden
        rounded-xl bg-gray-100 sm:h-56 lg:h-auto lg:min-h-[220px]
        lg:w-[220px]">
          <img
            src="./images/DanceClub.jpeg"
            alt="Club event poster"
            className="h-full w-full object-cover
            transition-transform duration-500
            group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t
          from-black/40 via-transparent to-transparent" />

          <div className="absolute bottom-3 left-3 rounded-lg
          bg-white/95 px-3 py-1.5 text-xs font-semibold
          text-[#8e2020] shadow-sm">
            Club Event
          </div>
        </div>

        {/* Event Information */}
        <div className="flex min-w-0 flex-1 flex-col">

          {/* Title and Rating */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="mb-1 text-xs font-semibold uppercase
              tracking-[0.12em] text-[#8e2020]">
                Club Name
              </p>

              <h3 className="text-lg font-bold leading-snug
              text-gray-900 sm:text-xl">
                Club name club name
              </h3>
            </div>

            <button
              type="button"
              aria-label="Event options"
              className="shrink-0 rounded-lg p-2 text-gray-400
              transition hover:bg-gray-100 hover:text-[#8e2020]
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-[#8e2020]"
            >
              <MoreVertical size={20} />
            </button>
          </div>

          {/* Date, Time and Rating */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5
            rounded-lg bg-gray-50 px-3 py-2 text-xs
            font-medium text-gray-600 ring-1 ring-gray-200">
              <CalendarDays size={14} className="text-[#8e2020]" />
              <span>12th March, 2026</span>
            </div>

            <div className="inline-flex items-center gap-1.5
            rounded-lg bg-gray-50 px-3 py-2 text-xs
            font-medium text-gray-600 ring-1 ring-gray-200">
              <Clock3 size={14} className="text-[#8e2020]" />
              <span>12:00 pm to 3:00 pm</span>
            </div>

            <div className="inline-flex items-center gap-1.5
            rounded-lg border border-amber-200 bg-amber-50
            px-3 py-2 text-xs font-semibold text-amber-800">
              <Star size={14} className="fill-amber-400 text-amber-500" />
              Rating
            </div>
          </div>

          {/* Event Statistics */}
          <div className="mt-4 grid grid-cols-1 gap-2
          sm:grid-cols-3">

            <div className="flex items-center gap-3 rounded-xl
            border border-gray-100 bg-gray-50/80 p-3">
              <div className="flex h-9 w-9 shrink-0 items-center
              justify-center rounded-lg bg-[#8e2020]/10
              text-[#8e2020]">
                <ClipboardList size={18} />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-gray-500">
                  Registrations
                </p>
                <p className="mt-0.5 text-base font-bold text-gray-900">
                  50
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl
            border border-gray-100 bg-gray-50/80 p-3">
              <div className="flex h-9 w-9 shrink-0 items-center
              justify-center rounded-lg bg-[#8e2020]/10
              text-[#8e2020]">
                <Users size={18} />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-gray-500">
                  Members
                </p>
                <p className="mt-0.5 text-base font-bold text-gray-900">
                  32
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl
            border border-gray-100 bg-gray-50/80 p-3">
              <div className="flex h-9 w-9 shrink-0 items-center
              justify-center rounded-lg bg-[#8e2020]/10
              text-[#8e2020]">
                <UserRoundCheck size={18} />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-gray-500">
                  Volunteers
                </p>
                <p className="mt-0.5 text-base font-bold text-gray-900">
                  12
                </p>
              </div>
            </div>

          </div>

          {/* About Event */}
          <div className="mt-4">
            <h4 className="mb-1 text-sm font-semibold text-gray-900">
              About Event
            </h4>

            <p className="text-sm leading-6 text-gray-600">
              hiufhdgfyd uytud yttwi udhyt tudi hskud iui d h jok.
              kkkmm kmkm kmk mkmkmk kkmm kmkmmmkmkm kmkmk kmkmmkm
              kmkk kmkm
            </p>
          </div>

          {/* Coordinators */}
          <div className="mt-4 flex flex-col gap-2 border-t
          border-gray-100 pt-3 sm:flex-row sm:items-start">

            <div className="flex shrink-0 items-center gap-2
            text-sm font-semibold text-[#8e2020]">
              <Users size={16} />
              <span>Coordinators:</span>
            </div>

            <p className="text-sm leading-6 text-gray-600">
              Himanshu Agrawal, Himanshu Agrawal,
              Himanshu Agrawal, Himanshu Agrawal
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default AllEvents;