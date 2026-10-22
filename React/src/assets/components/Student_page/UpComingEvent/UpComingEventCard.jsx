
import React, { useState } from "react";
import {
  Phone,
  MapPin,
  CalendarDays,
  Clock3,
  Award,
  Trophy,
  Star,
  ArrowUpRight,
} from "lucide-react";

import EventRegistrationPopup from "./EventRegistrationPopup";

const UpcomingEventCard = ({
  event = {},
}) => {
  // ================= POPUP STATE =================
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // ================= EVENT DATA =================
  const {
    name = "Event Name",
    club = "CodeFiesta",
    category = "Technical",
    poster = "/images/try.jpg",
    clubLogo = "/images/eca logo.png",
    venue = "Civil Front",
    date = "9 Feb 2026",
    time = "11:00 AM",
    facultyCoordinator = "Faculty Name",
    studentCoordinator = "Himanshu Agrawal",
    facultyPhone = "",
    studentPhone = "",
    points = 5,
    certificates = true,
    trophies = true,
  } = event;

  // ================= CATEGORY COLORS =================
  const categoryStyles = {
    Technical: "bg-[#2563eb] text-white",
    Cultural: "bg-[#9333ea] text-white",
    Sports: "bg-[#16a34a] text-white",
    Literary: "bg-[#ea580c] text-white",
    Social: "bg-[#db2777] text-white",
    Management: "bg-[#0891b2] text-white",
    Creative: "bg-[#d97706] text-white",
    Other: "bg-[#525252] text-white",
  };

  // ================= POPUP HANDLERS =================
  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <>
      {/* ================= UPCOMING EVENT CARD ================= */}
      <article className="flex h-[300px] w-[650px] shrink-0 overflow-hidden rounded-[18px] border border-black/8 bg-white p-2.5 shadow-[0_5px_20px_rgba(0,0,0,0.05)]">

        {/* ================= LEFT SIDE ================= */}
        <div className="flex h-full shrink-0 gap-2">

          {/* CATEGORY */}
          <div
            className={`flex w-[28px] items-center justify-center rounded-[12px] ${
              categoryStyles[category] || categoryStyles.Other
            }`}
          >
            <span className="rotate-[-90deg] whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.12em]">
              {category}
            </span>
          </div>

          {/* ================= A4 EVENT POSTER ================= */}
          <div className="group/poster relative h-full aspect-[210/297] shrink-0 cursor-pointer overflow-hidden rounded-[14px] bg-[#f4f1ef]">

            <img
              src={poster}
              alt={`${name} Poster`}
              className="h-full w-full object-cover"
            />

            {/* ================= SLIDING SOLID LAYER ================= */}
            <div className="absolute inset-0 flex -translate-x-full items-center justify-center bg-[#781f1b] transition-transform duration-500 ease-out group-hover/poster:translate-x-0">

              {/* CLUB LOGO */}
              <div className="flex h-[95px] w-[95px] items-center justify-center rounded-full bg-white p-3 shadow-lg">
                <img
                  src={clubLogo}
                  alt={`${club} Logo`}
                  className="h-full w-full object-contain"
                />
              </div>

            </div>

          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="flex min-w-0 flex-1 flex-col px-4 py-1.5">

          {/* ================= EVENT HEADING ================= */}
          <div className="mb-2">

            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#983530]/60">
              Upcoming Event
            </p>

            <h3 className="mt-0.5 text-[22px] font-semibold leading-tight tracking-[-0.02em] text-[#242424]">
              {name}
            </h3>

            <p className="mt-1 text-[12px] font-medium text-[#888]">
              by{" "}
              <span className="font-semibold text-[#983530]">
                {club}
              </span>
            </p>

          </div>

          {/* ================= TAGS ================= */}
          <div className="mb-2.5 flex flex-wrap gap-1.5">

            {certificates && (
              <div className="flex items-center gap-1 rounded-full bg-[#f5f3f2] px-2.5 py-1 text-[10px] font-medium text-[#555]">
                <Award size={11} className="text-[#983530]" />
                Certificates
              </div>
            )}

            {trophies && (
              <div className="flex items-center gap-1 rounded-full bg-[#f5f3f2] px-2.5 py-1 text-[10px] font-medium text-[#555]">
                <Trophy size={11} className="text-[#983530]" />
                Trophies
              </div>
            )}

            <div className="flex items-center gap-1 rounded-full bg-[#983530]/8 px-2.5 py-1 text-[10px] font-semibold text-[#983530]">
              <Star size={11} />
              +{points} Points
            </div>

          </div>

          {/* ================= EVENT DETAILS ================= */}
          <div className="mb-2.5 grid grid-cols-3 gap-1.5">

            {/* VENUE */}
            <div className="rounded-lg bg-[#f8f7f6] px-2 py-1.5">

              <div className="mb-0.5 flex items-center gap-1 text-[#983530]">
                <MapPin size={11} />
                <span className="text-[9px] font-bold uppercase tracking-[0.08em]">
                  Venue
                </span>
              </div>

              <p className="truncate text-[10px] font-semibold text-[#444]">
                {venue}
              </p>

            </div>

            {/* DATE */}
            <div className="rounded-lg bg-[#f8f7f6] px-2 py-1.5">

              <div className="mb-0.5 flex items-center gap-1 text-[#983530]">
                <CalendarDays size={11} />
                <span className="text-[9px] font-bold uppercase tracking-[0.08em]">
                  Date
                </span>
              </div>

              <p className="text-[10px] font-semibold text-[#444]">
                {date}
              </p>

            </div>

            {/* TIME */}
            <div className="rounded-lg bg-[#f8f7f6] px-2 py-1.5">

              <div className="mb-0.5 flex items-center gap-1 text-[#983530]">
                <Clock3 size={11} />
                <span className="text-[9px] font-bold uppercase tracking-[0.08em]">
                  Time
                </span>
              </div>

              <p className="text-[10px] font-semibold text-[#444]">
                {time}
              </p>

            </div>

          </div>

          {/* ================= COORDINATORS ================= */}
          <div className="mb-2.5 grid grid-cols-2 gap-3 border-t border-black/5 pt-2">

            {/* FACULTY COORDINATOR */}
            <div>

              <p className="mb-1 text-[10px] font-semibold text-[#999]">
                Faculty Coordinator
              </p>

              <div className="flex items-center gap-1.5">

                <button
                  type="button"
                  onClick={() => {
                    if (facultyPhone) {
                      window.location.href = `tel:${facultyPhone}`;
                    }
                  }}
                  disabled={!facultyPhone}
                  aria-label={`Call ${facultyCoordinator}`}
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#983530]/10 text-[#983530] transition-colors duration-200 hover:bg-[#983530] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Phone size={9} />
                </button>

                <span className="truncate text-[10px] font-medium text-[#444]">
                  {facultyCoordinator}
                </span>

              </div>

            </div>

            {/* STUDENT COORDINATOR */}
            <div>

              <p className="mb-1 text-[10px] font-semibold text-[#999]">
                Student Coordinator
              </p>

              <div className="flex items-center gap-1.5">

                <button
                  type="button"
                  onClick={() => {
                    if (studentPhone) {
                      window.location.href = `tel:${studentPhone}`;
                    }
                  }}
                  disabled={!studentPhone}
                  aria-label={`Call ${studentCoordinator}`}
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#983530]/10 text-[#983530] transition-colors duration-200 hover:bg-[#983530] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Phone size={9} />
                </button>

                <span className="truncate text-[10px] font-medium text-[#444]">
                  {studentCoordinator}
                </span>

              </div>

            </div>

          </div>

          {/* ================= REGISTER BUTTON ================= */}
          <button
            type="button"
            onClick={openPopup}
            className="group/register mt-auto flex h-[34px] w-full items-center justify-center gap-1.5 rounded-lg bg-[#983530] text-[11px] font-semibold text-white transition-colors duration-300 hover:bg-[#842c28]"
          >
            Register for Event

            <ArrowUpRight
              size={13}
              strokeWidth={2.2}
              className="transition-transform duration-300 group-hover/register:-translate-y-[1px] group-hover/register:translate-x-[1px]"
            />

          </button>

        </div>

      </article>

      {/* ================= EVENT REGISTRATION POPUP ================= */}
      <EventRegistrationPopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        event={{
          ...event,
          name,
          club,
          category,
          poster,
          clubLogo,
          venue,
          date,
          time,
          facultyCoordinator,
          studentCoordinator,
          points,
        }}
      />

    </>
  );
};

export default UpcomingEventCard;
