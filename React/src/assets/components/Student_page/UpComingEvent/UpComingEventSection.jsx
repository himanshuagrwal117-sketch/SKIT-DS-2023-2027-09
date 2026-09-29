import React from "react";
import { CalendarDays, ArrowRight } from "lucide-react";
import UpCmingEventCard from "./UpComingEventCard";

const UpComingEventSection = ({ upcomingEventsRef }) => {
  return (
    <section ref={upcomingEventsRef} className="w-full py-8">

      {/* ================= SECTION HEADER ================= */}
      <div className="mb-5 flex items-end justify-between px-1">

        <div>
          <div className="mb-2 flex items-center gap-3">
            <span className="h-[2px] w-7 rounded-full bg-white/70" />

            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/65">
              What's Happening
            </p>
          </div>

          <h2 className="text-[34px] font-semibold leading-tight tracking-[-0.03em] text-white">
            Upcoming Events
          </h2>

          <p className="mt-1.5 max-w-[520px] text-[12px] leading-5 text-white/60">
            Discover upcoming club activities, competitions, workshops and opportunities happening across SKIT Jaipur.
          </p>
        </div>

      </div>


      {/* ================= EVENTS CONTAINER ================= */}
      <div className="w-full overflow-hidden rounded-[22px] bg-white shadow-[0_15px_45px_rgba(0,0,0,0.10)]">

        {/* ================= TOP BAR ================= */}
        <div className="flex h-[58px] items-center justify-between border-b border-black/5 px-6">

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#983530]/10 text-[#983530]">
              <CalendarDays size={17} strokeWidth={2.2} />
            </div>

            <div>
              <h3 className="text-[13px] font-semibold text-[#292929]">
                Events Around Campus
              </h3>

              <p className="text-[10px] text-[#999]">
                Explore what's coming next
              </p>
            </div>

          </div>


          <div className="rounded-full bg-[#983530]/8 px-3 py-1.5 text-[10px] font-semibold text-[#983530]">
            Upcoming
          </div>

        </div>


        {/* ================= HORIZONTAL EVENT SCROLL ================= */}
        <div className="w-full overflow-x-auto overflow-y-hidden scroll-smooth [&::-webkit-scrollbar]:h-[5px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#983530]/20 hover:[&::-webkit-scrollbar-thumb]:bg-[#983530]/40">

          <div className="flex w-max flex-nowrap items-center gap-4 px-5 py-5">

            <UpCmingEventCard />
            <UpCmingEventCard />
            <UpCmingEventCard />
            <UpCmingEventCard />

          </div>

        </div>

      </div>

    </section>
  );
};

export default UpComingEventSection;