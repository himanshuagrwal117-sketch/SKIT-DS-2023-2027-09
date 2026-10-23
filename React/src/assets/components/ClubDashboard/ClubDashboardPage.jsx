import React, { useState } from "react";

import {
  Bell,
  CalendarDays,
  ChevronDown,
  LayoutDashboard,
} from "lucide-react";

import DashboardLeftSection from "./DashboardLeft/DashboardLeftSection";
import DashBoardRightSection from "./DashBoardRight/DashBoardRightSection";

const ClubDashboardPage = () => {
  const [ActiveState, setActiveState] = useState("dashboard");

  return (
    <div className="min-h-screen w-full bg-[#F7F4F4]">

      {/* =====================================================
          TOP NAVBAR
      ===================================================== */}
      <header
        className="
          sticky top-0 z-50
          w-full
          border-b border-white/10
          bg-[#7D0505]
          shadow-[0_3px_18px_rgba(70,0,0,0.12)]
        "
      >
        <div
          className="
            flex h-[76px]
            w-full
            items-center
            justify-between
            px-5
            sm:px-7
            lg:px-10
          "
        >

          {/* ================= LEFT BRAND ================= */}
          <div className="flex items-center gap-3.5">

            <div
              className="
                flex h-[42px] w-[42px]
                items-center
                justify-center
                rounded-[12px]
                border border-white/15
                bg-white/[0.08]
              "
            >
              <LayoutDashboard
                size={19}
                strokeWidth={1.9}
                className="text-white"
              />
            </div>

            <div>
              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.17em]
                  text-white/50
                "
              >
                Orbix Club Portal
              </p>

              <h1
                className="
                  mt-0.5
                  text-[17px]
                  font-semibold
                  tracking-[-0.02em]
                  text-white
                "
              >
                Club Dashboard
              </h1>
            </div>

          </div>


          {/* ================= RIGHT ACTIONS ================= */}
          <div className="flex items-center gap-2">

            {/* CALENDAR */}
            <button
              type="button"
              aria-label="Calendar"
              className="
                hidden
                h-[40px] w-[40px]
                items-center
                justify-center
                rounded-[11px]

                border border-white/10
                bg-white/[0.07]

                text-white/75

                transition-all
                duration-200

                hover:bg-white/[0.14]
                hover:text-white

                sm:flex
              "
            >
              <CalendarDays
                size={17}
                strokeWidth={1.8}
              />
            </button>


            {/* NOTIFICATION */}
            <button
              type="button"
              aria-label="Notifications"
              className="
                relative
                flex h-[40px] w-[40px]
                items-center
                justify-center
                rounded-[11px]

                border border-white/10
                bg-white/[0.07]

                text-white/75

                transition-all
                duration-200

                hover:bg-white/[0.14]
                hover:text-white
              "
            >
              <Bell
                size={17}
                strokeWidth={1.8}
              />

              <span
                className="
                  absolute
                  right-[9px]
                  top-[8px]
                  h-[5px] w-[5px]
                  rounded-full
                  bg-[#FFB9B9]
                  ring-2
                  ring-[#7D0505]
                "
              />
            </button>


            {/* PROFILE */}
            <button
              type="button"
              className="
                ml-1
                flex h-[42px]
                items-center
                gap-2.5

                rounded-full

                border border-white/10
                bg-white/[0.07]

                py-1
                pl-1
                pr-3

                transition-all
                duration-200

                hover:bg-white/[0.14]
              "
            >

              {/* PROFILE IMAGE */}
              <div
                className="
                  h-[34px] w-[34px]
                  shrink-0
                  overflow-hidden
                  rounded-full
                  border border-white/20
                  bg-white/10
                "
              >
                <img
                  src="/images/bd.webp"
                  alt="Club Coordinator"
                  className="h-full w-full object-cover"
                />
              </div>


              {/* PROFILE TEXT */}
              <div className="hidden min-w-0 text-left md:block">

                <p
                  className="
                    max-w-[120px]
                    truncate
                    text-[10.5px]
                    font-semibold
                    leading-none
                    text-white
                  "
                >
                  Club Coordinator
                </p>

                <p
                  className="
                    mt-1
                    text-[8.5px]
                    leading-none
                    text-white/45
                  "
                >
                  Coordinator Panel
                </p>

              </div>


              <ChevronDown
                size={13}
                strokeWidth={2}
                className="hidden text-white/45 md:block"
              />

            </button>

          </div>

        </div>
      </header>


      {/* =====================================================
          MAIN DASHBOARD AREA
      ===================================================== */}
      <main
        className="
          w-full
          px-4
          py-4
          sm:px-5
          sm:py-5
          lg:px-7
          lg:py-6
        "
      >

        {/* =====================================================
            DASHBOARD SHELL
        ===================================================== */}
        <section
          className="
            flex
            min-h-[calc(100vh-124px)]
            w-full

            overflow-hidden

            rounded-[20px]

            border
            border-[#E7DEDE]

            bg-white

            shadow-[0_8px_32px_rgba(70,20,20,0.055)]
          "
        >

          {/* =================================================
              LEFT SIDEBAR
          ================================================= */}
          <div
            className="
              shrink-0

              border-r
              border-[#EEE7E7]

              bg-[#FCFAFA]
            "
          >
            <DashboardLeftSection
              setActiveState={setActiveState}
              ActiveState={ActiveState}
            />
          </div>


          {/* =================================================
              RIGHT DASHBOARD CONTENT
          ================================================= */}
          <div
            className="
              min-w-0
              flex-1

              overflow-x-hidden
              overflow-y-auto

              bg-[#FDFBFB]
            "
          >
            <DashBoardRightSection
              ActiveState={ActiveState}
            />
          </div>

        </section>

      </main>

    </div>
  );
};

export default ClubDashboardPage;