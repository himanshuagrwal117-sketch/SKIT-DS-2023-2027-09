import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Counter from "../Effects/Counter";

/* ------------------------------------------------------------------ */
/*  StatCard – reusable animated number card (was Block1 / Block2)     */
/* ------------------------------------------------------------------ */
const StatCard = ({ label, end, from = "left", className = "" }) => {
  return (
    <motion.div
      className={`w-full max-w-64 lg:w-56 rounded-2xl bg-white px-5 py-5 text-center shadow-xl ${className}`}
      initial={{ opacity: 0, x: from === "left" ? -150 : 150 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <p className="text-[15px] font-semibold leading-snug text-[#ac3d3d]">
        {label}
      </p>
      <p className="mt-2 text-5xl font-extrabold leading-none text-[#ac3d3d]">
        <Counter end={end} duration={2000} />
      </p>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/*  Section1 – hero section (was Bg + About + Block1 + Block2)         */
/* ------------------------------------------------------------------ */
const Section1 = () => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-linear-to-b from-[#931913] to-[#580e07]">
      {/* Background image (was Bg) */}
      <img
        src="/images/skit2.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-10"
      />

      {/* Content (was About) */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 pt-20 pb-16 md:pt-24">
        <h1 className="text-3xl font-bold tracking-wide text-amber-50 md:text-3xl">
          Orbix
        </h1>

        <p className="mt-5 max-w-3xl text-center text-sm leading-relaxed text-amber-50/90 md:text-[15px]">
          Orbix is a one-stop digital portal for all clubs at SKIT Jaipur,
          designed to keep students connected and engaged. The platform provides
          complete information about every club, including their activities,
          coordinators, member strength, and achievements. Students can easily
          explore clubs, join the ones that match their interests, and stay
          updated with upcoming and past events. With Orbix, discovering
          opportunities, connecting with peers, and being a part of vibrant
          campus life becomes seamless and exciting.
        </p>

        {/* Login buttons */}
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <Link to="/studentpage">
            <button className="w-52 rounded-full border-2 border-amber-50 bg-white px-6 py-3 text-sm font-bold text-[#900505] transition-all duration-200 ease-linear hover:cursor-pointer hover:bg-transparent hover:text-amber-50">
              Login as a Student
            </button>
          </Link>
          <Link to="/ClubDashboard">
            <button className="w-52 rounded-full border-2 border-amber-50 bg-white px-6 py-3 text-sm font-bold text-[#900505] transition-all duration-200 ease-linear hover:cursor-pointer hover:bg-transparent hover:text-amber-50">
              Login as a Club
            </button>
          </Link>
        </div>

        {/* Stats + hero image */}
        <div className="relative mt-12 flex w-full flex-col items-center gap-6">
          {/* Cards: stacked row on small screens, floating beside image on lg+ */}
          <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row lg:hidden">
            <StatCard
              label="Students Registered in Clubs"
              end={1250}
              from="left"
            />
            <StatCard
              label="Clubs Registered in College"
              end={33}
              from="right"
            />
          </div>

          <StatCard
            label="Students Registered in Clubs"
            end={1250}
            from="left"
            className="hidden lg:block absolute left-0 top-1/3 z-20"
          />
          <StatCard
            label="Clubs Registered in College"
            end={33}
            from="right"
            className="hidden lg:block absolute right-0 top-1/3 z-20"
          />

          <img
            src="/images/webimg.png"
            alt="Orbix platform preview"
            className="h-auto w-full max-w-3xl object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Section1;
