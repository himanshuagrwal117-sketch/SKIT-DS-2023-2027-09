import React from "react";
import { UserRound, Mail, Phone, Hash } from "lucide-react";

const NewClubStudentForm = () => {
  return (
    <div className="w-full">

      {/* ================= FORM CONTENT ================= */}
      <div className="grid grid-cols-1 gap-7 lg:grid-cols-[0.36fr_0.64fr]">

        {/* ================= LEFT IMAGE ================= */}
        <div className="relative hidden min-h-[430px] overflow-hidden rounded-[18px] lg:block">

          <img
            src="/images/newclub.jpeg"
            alt="Student Coordinator"
            className="h-full w-full object-cover"
          />

          {/* IMAGE OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#500303]/85 via-[#700505]/20 to-transparent" />

          {/* IMAGE CONTENT */}
          <div className="absolute bottom-0 left-0 right-0 p-6">

            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/15 backdrop-blur-md">
              <UserRound
                size={17}
                strokeWidth={2}
                className="text-white"
              />
            </div>

            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/65">
              Step 2
            </p>

            <h3 className="mt-1 text-[20px] font-semibold tracking-[-0.01em] text-white">
              Student Coordinator
            </h3>

            <p className="mt-2 max-w-[280px] text-[12px] leading-5 text-white/70">
              Add the details of the student who will coordinate and manage
              club activities.
            </p>

          </div>
        </div>

        {/* ================= RIGHT FORM ================= */}
        <div className="flex flex-col">

          {/* FORM INTRO */}
          <div className="mb-6">

            <div className="mb-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#900505]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#900505]/60">
                Coordinator Details
              </span>
            </div>

            <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-[#2C1A1A]">
              Student Coordinator Information
            </h3>

            <p className="mt-1.5 max-w-[600px] text-[12px] leading-5 text-[#8C8383]">
              Enter the details of the student coordinator responsible for the
              proposed club.
            </p>

          </div>

          {/* ================= FORM ================= */}
          <form className="space-y-5">

            {/* NAME + EMAIL */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* NAME */}
              <div>
                <label className="mb-2 block text-[12px] font-semibold text-[#493D3D]">
                  Student Coordinator Name
                  <span className="ml-1 text-[#900505]">*</span>
                </label>

                <div className="group relative">

                  <UserRound
                    size={16}
                    strokeWidth={1.8}
                    className="
                      absolute left-3.5 top-1/2
                      -translate-y-1/2
                      text-[#AAA0A0]
                      transition-colors
                      group-focus-within:text-[#900505]
                    "
                  />

                  <input
                    type="text"
                    placeholder="Enter full name"
                    className="
                      h-[46px] w-full
                      rounded-[11px]
                      border border-[#E2DADA]
                      bg-[#FCFBFB]
                      pl-10 pr-4

                      text-[13px]
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

              {/* EMAIL */}
              <div>
                <label className="mb-2 block text-[12px] font-semibold text-[#493D3D]">
                  College Email
                  <span className="ml-1 text-[#900505]">*</span>
                </label>

                <div className="group relative">

                  <Mail
                    size={16}
                    strokeWidth={1.8}
                    className="
                      absolute left-3.5 top-1/2
                      -translate-y-1/2
                      text-[#AAA0A0]
                      transition-colors
                      group-focus-within:text-[#900505]
                    "
                  />

                  <input
                    type="email"
                    placeholder="example@skit.ac.in"
                    className="
                      h-[46px] w-full
                      rounded-[11px]
                      border border-[#E2DADA]
                      bg-[#FCFBFB]
                      pl-10 pr-4

                      text-[13px]
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

            </div>

            {/* PHONE + COLLEGE ID */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* PHONE */}
              <div>
                <label className="mb-2 block text-[12px] font-semibold text-[#493D3D]">
                  Contact Number
                  <span className="ml-1 text-[#900505]">*</span>
                </label>

                <div className="group relative">

                  <Phone
                    size={16}
                    strokeWidth={1.8}
                    className="
                      absolute left-3.5 top-1/2
                      -translate-y-1/2
                      text-[#AAA0A0]
                      transition-colors
                      group-focus-within:text-[#900505]
                    "
                  />

                  <input
                    type="tel"
                    placeholder="Enter contact number"
                    className="
                      h-[46px] w-full
                      rounded-[11px]
                      border border-[#E2DADA]
                      bg-[#FCFBFB]
                      pl-10 pr-4

                      text-[13px]
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

              {/* COLLEGE ID */}
              <div>
                <label className="mb-2 block text-[12px] font-semibold text-[#493D3D]">
                  College ID
                  <span className="ml-1 text-[#900505]">*</span>
                </label>

                <div className="group relative">

                  <Hash
                    size={16}
                    strokeWidth={1.8}
                    className="
                      absolute left-3.5 top-1/2
                      -translate-y-1/2
                      text-[#AAA0A0]
                      transition-colors
                      group-focus-within:text-[#900505]
                    "
                  />

                  <input
                    type="text"
                    placeholder="Enter college ID"
                    className="
                      h-[46px] w-full
                      rounded-[11px]
                      border border-[#E2DADA]
                      bg-[#FCFBFB]
                      pl-10 pr-4

                      text-[13px]
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

            </div>

            {/* ================= INFO NOTE ================= */}
            <div className="rounded-[12px] border border-[#900505]/8 bg-[#900505]/[0.025] px-4 py-3">

              <p className="text-[11px] leading-5 text-[#857A7A]">
                Please provide the coordinator's official college details.
                These details may be used for verification and club-related
                communication.
              </p>

            </div>

            {/* ================= BUTTONS ================= */}
            <div className="flex items-center justify-between border-t border-[#EFE8E8] pt-5">

              <button
                type="button"
                className="
                  h-[42px]
                  rounded-[10px]
                  border border-[#DDD4D4]
                  bg-white
                  px-5

                  text-[12px]
                  font-semibold
                  text-[#6E6464]

                  transition-all duration-200

                  hover:border-[#900505]/20
                  hover:bg-[#FAF7F7]
                  hover:text-[#900505]
                "
              >
                Back
              </button>

              <button
                type="submit"
                className="
                  h-[42px]
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
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default NewClubStudentForm;