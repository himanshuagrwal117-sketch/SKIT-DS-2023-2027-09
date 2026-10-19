import React from "react";
import {
  Building2,
  Layers3,
  AlignLeft,
  Target,
  ArrowRight,
  Info,
} from "lucide-react";

const NewClubInfoForm = () => {
  return (
    <div className="w-full">

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.34fr_0.66fr]">

        {/* =====================================================
            LEFT IMAGE SECTION
        ===================================================== */}
        <div className="relative hidden min-h-[500px] overflow-hidden rounded-[18px] lg:block">

          <img
            src="/images/newclub.jpeg"
            alt="Start a New Club"
            className="h-full w-full object-cover"
          />

          {/* IMAGE OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#4B0202]/90 via-[#700505]/25 to-transparent" />

          {/* IMAGE CONTENT */}
          <div className="absolute bottom-0 left-0 right-0 p-6">

            <div
              className="
                mb-4
                flex h-10 w-10
                items-center justify-center
                rounded-full
                border border-white/20
                bg-white/10
                backdrop-blur-md
              "
            >
              <Building2
                size={18}
                strokeWidth={1.8}
                className="text-white"
              />
            </div>

            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/60">
              Create Something New
            </p>

            <h3 className="mt-1.5 text-[21px] font-semibold tracking-[-0.02em] text-white">
              Build Your Club
            </h3>

            <p className="mt-2 max-w-[270px] text-[12px] leading-5 text-white/70">
              Define your club's identity, purpose and primary area of
              interest to begin your proposal.
            </p>

          </div>
        </div>

        {/* =====================================================
            RIGHT FORM SECTION
        ===================================================== */}
        <div className="flex flex-col">

          {/* FORM INTRO */}
          <div className="mb-6">

            <div className="mb-2 flex items-center gap-2">

              <span className="h-1.5 w-1.5 rounded-full bg-[#900505]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#900505]/60">
                Basic Information
              </span>

            </div>

            <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-[#2C1A1A]">
              Tell us about your club
            </h3>

            <p className="mt-1.5 max-w-[580px] text-[12px] leading-5 text-[#8C8383]">
              Provide the basic details that will help us understand your
              proposed club and its purpose.
            </p>

          </div>

          {/* =====================================================
              FORM
          ===================================================== */}
          <form className="space-y-5">

            {/* CLUB NAME */}
            <div>

              <label className="mb-2 block text-[12px] font-semibold text-[#493D3D]">
                Club Name
                <span className="ml-1 text-[#900505]">*</span>
              </label>

              <div className="group relative">

                <Building2
                  size={16}
                  strokeWidth={1.8}
                  className="
                    absolute left-3.5 top-1/2
                    -translate-y-1/2
                    text-[#AAA0A0]
                    transition-colors duration-200
                    group-focus-within:text-[#900505]
                  "
                />

                <input
                  type="text"
                  placeholder="Enter proposed club name"
                  className="
                    h-[46px] w-full
                    rounded-[11px]
                    border border-[#E2DADA]
                    bg-[#FCFBFB]

                    pl-10 pr-4

                    text-[13px]
                    font-normal
                    text-[#332929]

                    placeholder:text-[#B5ACAC]

                    outline-none
                    transition-all duration-200

                    hover:border-[#900505]/25

                    focus:border-[#900505]/45
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#900505]/5
                  "
                />

              </div>

            </div>

            {/* CATEGORY + MAIN FOCUS */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* CLUB CATEGORY */}
              <div>

                <label className="mb-2 block text-[12px] font-semibold text-[#493D3D]">
                  Club Category
                  <span className="ml-1 text-[#900505]">*</span>
                </label>

                <div className="group relative">

                  <Layers3
                    size={16}
                    strokeWidth={1.8}
                    className="
                      pointer-events-none
                      absolute left-3.5 top-1/2
                      -translate-y-1/2
                      text-[#AAA0A0]
                      transition-colors duration-200
                      group-focus-within:text-[#900505]
                    "
                  />

                  <select
                    defaultValue=""
                    className="
                      h-[46px] w-full
                      appearance-none
                      rounded-[11px]

                      border border-[#E2DADA]
                      bg-[#FCFBFB]

                      pl-10 pr-10

                      text-[13px]
                      text-[#554A4A]

                      outline-none
                      transition-all duration-200

                      hover:border-[#900505]/25

                      focus:border-[#900505]/45
                      focus:bg-white
                      focus:ring-4
                      focus:ring-[#900505]/5
                    "
                  >
                    <option value="" disabled>
                      Select category
                    </option>

                    <option value="technical">
                      Technical
                    </option>

                    <option value="non-technical">
                      Non-Technical
                    </option>

                    <option value="cultural">
                      Cultural
                    </option>

                    <option value="literary">
                      Literary
                    </option>

                    <option value="social">
                      Social
                    </option>

                    <option value="artistic">
                      Artistic
                    </option>
                  </select>

                  {/* CUSTOM SELECT ARROW */}
                  <div
                    className="
                      pointer-events-none
                      absolute right-4 top-1/2
                      -translate-y-1/2
                      text-[10px]
                      text-[#978D8D]
                    "
                  >
                    ▼
                  </div>

                </div>

              </div>

              {/* CLUB MAIN FOCUS */}
              <div>

                <label className="mb-2 block text-[12px] font-semibold text-[#493D3D]">
                  Club Main Focus
                  <span className="ml-1 text-[#900505]">*</span>
                </label>

                <div className="group relative">

                  <Target
                    size={16}
                    strokeWidth={1.8}
                    className="
                      pointer-events-none
                      absolute left-3.5 top-1/2
                      -translate-y-1/2
                      text-[#AAA0A0]
                      transition-colors duration-200
                      group-focus-within:text-[#900505]
                    "
                  />

                  <select
                    defaultValue=""
                    className="
                      h-[46px] w-full
                      appearance-none
                      rounded-[11px]

                      border border-[#E2DADA]
                      bg-[#FCFBFB]

                      pl-10 pr-10

                      text-[13px]
                      text-[#554A4A]

                      outline-none
                      transition-all duration-200

                      hover:border-[#900505]/25

                      focus:border-[#900505]/45
                      focus:bg-white
                      focus:ring-4
                      focus:ring-[#900505]/5
                    "
                  >
                    <option value="" disabled>
                      Select primary focus
                    </option>

                    <option>Gaming</option>
                    <option>Painting & Fine Arts</option>
                    <option>Dance</option>
                    <option>Music</option>
                    <option>Photography</option>
                    <option>Graphic Designing</option>
                    <option>Coding / Programming</option>
                    <option>AI & Machine Learning</option>
                    <option>Robotics</option>
                    <option>Entrepreneurship</option>
                    <option>Social Service</option>
                    <option>Environmental Awareness</option>
                    <option>Sports & Fitness</option>
                    <option>Public Speaking</option>
                    <option>Film Making</option>
                    <option>Book Club</option>
                    <option>Anime & Manga</option>
                  </select>

                  {/* CUSTOM SELECT ARROW */}
                  <div
                    className="
                      pointer-events-none
                      absolute right-4 top-1/2
                      -translate-y-1/2
                      text-[10px]
                      text-[#978D8D]
                    "
                  >
                    ▼
                  </div>

                </div>

              </div>

            </div>

            {/* CLUB DESCRIPTION */}
            <div>

              <div className="mb-2 flex items-center justify-between">

                <label className="text-[12px] font-semibold text-[#493D3D]">
                  Club Description
                  <span className="ml-1 text-[#900505]">*</span>
                </label>

                <span className="text-[10px] font-medium text-[#AAA0A0]">
                  Keep it clear and concise
                </span>

              </div>

              <div className="group relative">

                <AlignLeft
                  size={16}
                  strokeWidth={1.8}
                  className="
                    absolute left-3.5 top-3.5
                    text-[#AAA0A0]
                    transition-colors duration-200
                    group-focus-within:text-[#900505]
                  "
                />

                <textarea
                  rows="5"
                  placeholder="Describe the purpose, objectives and activities of the proposed club..."
                  className="
                    min-h-[125px] w-full
                    resize-none
                    rounded-[11px]

                    border border-[#E2DADA]
                    bg-[#FCFBFB]

                    py-3
                    pl-10 pr-4

                    text-[13px]
                    leading-5
                    text-[#332929]

                    placeholder:text-[#B5ACAC]

                    outline-none
                    transition-all duration-200

                    hover:border-[#900505]/25

                    focus:border-[#900505]/45
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#900505]/5
                  "
                />

              </div>

            </div>

            {/* =====================================================
                INFORMATION BOX
            ===================================================== */}
            <div
              className="
                flex items-start gap-3
                rounded-[12px]
                border border-[#900505]/10
                bg-[#900505]/[0.025]
                px-4 py-3
              "
            >

              <Info
                size={15}
                strokeWidth={2}
                className="mt-0.5 shrink-0 text-[#900505]/70"
              />

              <p className="text-[11px] leading-5 text-[#857A7A]">
                Your club proposal will be reviewed by the ECA team. Make sure
                the club name, category and purpose clearly represent the
                proposed club.
              </p>

            </div>

            {/* =====================================================
                BOTTOM ACTION
            ===================================================== */}
            <div className="flex items-center justify-between border-t border-[#EFE8E8] pt-5">

              {/* REQUIRED TEXT */}
              <p className="hidden text-[10.5px] text-[#A39A9A] sm:block">
                <span className="mr-1 text-[#900505]">*</span>
                Required fields
              </p>

              {/* CONTINUE BUTTON */}
              <button
                type="submit"
                className="
                  ml-auto
                  flex h-[43px]
                  items-center justify-center
                  gap-2

                  rounded-[10px]
                  bg-[#900505]
                  px-6

                  text-[12px]
                  font-semibold
                  text-white

                  shadow-[0_6px_18px_rgba(144,5,5,0.18)]

                  transition-all duration-200

                  hover:bg-[#780404]
                  hover:shadow-[0_8px_22px_rgba(144,5,5,0.24)]

                  active:scale-[0.98]
                "
              >
                Save & Continue

                <ArrowRight
                  size={15}
                  strokeWidth={2}
                />
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default NewClubInfoForm;