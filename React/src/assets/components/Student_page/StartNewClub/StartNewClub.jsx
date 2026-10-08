import React from "react";
import Header2 from "../../Header2/Header2";
import NewClubInfoForm from "./NewClubInfoForm";

const StartNewClub = () => {
  const steps = [
    {
      id: 1,
      title: "Club Information",
      subtitle: "Basic club details",
      image: "/images/p1.png",
      active: true,
    },
    {
      id: 2,
      title: "Student Coordinators",
      subtitle: "Student team details",
      image: "/images/p2.png",
      active: false,
    },
    {
      id: 3,
      title: "Faculty Coordinators",
      subtitle: "Faculty mentor details",
      image: "/images/p3.png",
      active: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F6F6]">
      {/* ================= HEADER ================= */}
      <Header2 />

      {/* ================= PAGE ================= */}
      <main className="w-full px-4 pb-16 pt-[120px] sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1180px]">

          {/* ================= PAGE INTRO ================= */}
          <section className="mb-8">
            <div className="flex flex-col items-center text-center">

              {/* SMALL LABEL */}
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#900505]/10 bg-[#900505]/5 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#900505]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#900505]">
                  ECA Club Portal
                </span>
              </div>

              {/* TITLE */}
              <h1 className="text-[28px] font-bold tracking-[-0.02em] text-[#2B1616] sm:text-[32px]">
                Start a New Club
              </h1>

              {/* DESCRIPTION */}
              <p className="mt-2 max-w-[600px] text-[13px] font-normal leading-6 text-[#777070] sm:text-[14px]">
                Submit your club proposal by completing the required details.
                Please review all information carefully before proceeding.
              </p>

            </div>
          </section>

          {/* ================= PROGRESS ================= */}
          <section className="mb-7">
            <div className="relative mx-auto max-w-[940px]">

              {/* CONNECTING LINE */}
              <div className="absolute left-[14%] right-[14%] top-[34px] hidden h-px bg-[#900505]/10 md:block" />

              <div className="relative z-10 grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-5">

                {steps.map((step) => (
                  <div
                    key={step.id}
                    className={`
                      group relative flex items-center gap-3
                      rounded-[16px] border px-3.5 py-3
                      transition-all duration-300

                      ${
                        step.active
                          ? `
                            border-[#900505]/20
                            bg-white
                            shadow-[0_8px_25px_rgba(90,5,5,0.08)]
                          `
                          : `
                            border-[#E8DEDE]
                            bg-[#FCFBFB]
                            shadow-[0_2px_10px_rgba(0,0,0,0.025)]
                          `
                      }
                    `}
                  >

                    {/* STEP NUMBER */}
                    <div
                      className={`
                        absolute -top-2.5 right-3
                        flex h-5 min-w-5 items-center justify-center
                        rounded-full px-1.5
                        text-[9px] font-bold

                        ${
                          step.active
                            ? "bg-[#900505] text-white"
                            : "border border-[#E7DADA] bg-white text-[#A99C9C]"
                        }
                      `}
                    >
                      {step.id}
                    </div>

                    {/* IMAGE */}
                    <div
                      className={`
                        flex h-[46px] w-[46px] shrink-0
                        items-center justify-center
                        overflow-hidden
                        rounded-[12px]
                        border
                        bg-[#FFF8F8]

                        ${
                          step.active
                            ? "border-[#900505]/25"
                            : "border-[#E9DEDE]"
                        }
                      `}
                    >
                      <img
                        src={step.image}
                        alt={step.title}
                        className={`
                          h-full w-full object-cover
                          transition-all duration-300
                          ${step.active ? "opacity-100" : "opacity-65"}
                        `}
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="min-w-0 flex-1">

                      <p
                        className={`
                          truncate text-[13px] font-semibold leading-5
                          ${
                            step.active
                              ? "text-[#900505]"
                              : "text-[#5F5757]"
                          }
                        `}
                      >
                        {step.title}
                      </p>

                      <p className="mt-0.5 truncate text-[10.5px] font-medium text-[#A09797]">
                        {step.subtitle}
                      </p>

                    </div>

                    {/* ACTIVE BAR */}
                    {step.active && (
                      <div className="absolute bottom-0 left-5 right-5 h-[2px] rounded-full bg-[#900505]" />
                    )}

                  </div>
                ))}

              </div>
            </div>
          </section>

          {/* ================= FORM CARD ================= */}
          <section className="mx-auto w-full max-w-[1080px]">

            <div
              className="
                overflow-hidden
                rounded-[20px]
                border border-[#E9DEDE]
                bg-white
                shadow-[0_12px_40px_rgba(70,20,20,0.055)]
              "
            >

              {/* FORM HEADER */}
              <div className="border-b border-[#F0E8E8] px-6 py-5 sm:px-8">

                <div className="flex items-start justify-between gap-6">

                  {/* LEFT */}
                  <div>
                    <div className="mb-1.5 flex items-center gap-2">

                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#900505] text-[10px] font-bold text-white">
                        1
                      </span>

                      <span className="text-[10px] font-bold uppercase tracking-[0.13em] text-[#900505]/60">
                        Step 1 of 3
                      </span>

                    </div>

                    <h2 className="text-[18px] font-semibold tracking-[-0.01em] text-[#2C1A1A]">
                      Club Information
                    </h2>

                    <p className="mt-1 max-w-[600px] text-[12px] leading-5 text-[#8C8383]">
                      Enter the basic information about the club you would like
                      to start.
                    </p>
                  </div>

                  {/* STATUS */}
                  <div className="hidden shrink-0 items-center gap-2 rounded-full bg-[#900505]/5 px-3 py-1.5 sm:flex">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#900505]" />

                    <span className="text-[10px] font-semibold text-[#900505]">
                      In Progress
                    </span>
                  </div>

                </div>
              </div>

              {/* ================= ACTUAL FORM ================= */}
              <div className="px-6 py-6 sm:px-8 sm:py-7 lg:px-10 lg:py-8">
                <NewClubInfoForm />
              </div>

            </div>

            {/* ================= BOTTOM HELP TEXT ================= */}
            <div className="mt-4 flex items-center justify-center gap-1.5 text-center">
              <span className="text-[11px] text-[#9A9191]">
                Please ensure that the information provided is accurate before
                moving to the next step.
              </span>
            </div>

          </section>

        </div>
      </main>
    </div>
  );
};

export default StartNewClub;