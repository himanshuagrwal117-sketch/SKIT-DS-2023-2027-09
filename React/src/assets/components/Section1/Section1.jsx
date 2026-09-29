import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Counter from "../Effects/Counter";
import { useGoogleLogin } from "@react-oauth/google";

/* ------------------------------------------------------------------ */
/* StatCard */
/* ------------------------------------------------------------------ */

const StatCard = ({ label, end, from = "left", className = "" }) => {
  return (
    <motion.div
      className={`w-full max-w-64 rounded-2xl bg-white px-5 py-4 text-center shadow-xl ${className}`}
      initial={{
        opacity: 0,
        x: from === "left" ? -100 : 100,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
    >
      <p className="text-[14px] font-semibold leading-tight text-[#ac3d3d]">
        {label}
      </p>

      <p className="mt-2 text-4xl font-extrabold leading-none text-[#ac3d3d]">
        <Counter end={end} duration={1800} />
      </p>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/* Section1 */
/* ------------------------------------------------------------------ */

const Section1 = () => {
  /* ----------------------------- */
  /* Google Login */
  /* ----------------------------- */

  const login = useGoogleLogin({
    flow: "auth-code",

    onSuccess: async (response) => {
      try {
        const result = await fetch("http://localhost:5000/auth/google", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: response.code,
          }),
        });

        const data = await result.json();

        if (result.ok) {
          window.location.href = "/studentpage";
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    },

    onError: () => {
      console.log("Google login failed");
    },
  });

  /* ----------------------------- */
  /* UI */
  /* ----------------------------- */

  return (
    <section className="relative flex min-h-screen w-full items-start overflow-hidden bg-linear-to-b from-[#931913] to-[#580e07]">
      {/* ------------------------------------------------------------ */}
      {/* Background Image */}
      {/* ------------------------------------------------------------ */}

      <img
        src="/images/skit2.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-10"
      />

      {/* ------------------------------------------------------------ */}
      {/* Main Content */}
      {/* ------------------------------------------------------------ */}

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 pb-8 pt-24 lg:pb-6 lg:pt-20">

        {/* ---------------------------------------------------------- */}
        {/* Logo / Heading */}
        {/* ---------------------------------------------------------- */}

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[30px] font-bold tracking-[0.08em] text-amber-50 lg:text-[34px]"
        >
          Orbix
        </motion.h1>

        {/* ---------------------------------------------------------- */}
        {/* Description */}
        {/* ---------------------------------------------------------- */}

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-3 max-w-3xl text-center text-[13px] leading-relaxed text-amber-50/90 lg:text-[14px]"
        >
          Orbix is a one-stop digital portal for all clubs at SKIT Jaipur,
          designed to keep students connected and engaged. Explore clubs,
          discover activities, connect with peers, and stay updated with
          upcoming events — all in one place.
        </motion.p>

        {/* ---------------------------------------------------------- */}
        {/* Login Buttons */}
        {/* ---------------------------------------------------------- */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:gap-5"
        >
          {/* Student Login */}

          <button
            onClick={() => login()}
            className="w-52 rounded-full border-2 border-amber-50 bg-white px-5 py-2.5 text-sm font-bold text-[#900505] transition-all duration-200 ease-linear hover:cursor-pointer hover:bg-transparent hover:text-amber-50"
          >
            Login as a Student
          </button>

          {/* Club Login */}

          <Link to="/ClubDashboard">
            <button
              className="w-52 rounded-full border-2 border-amber-50 bg-white px-5 py-2.5 text-sm font-bold text-[#900505] transition-all duration-200 ease-linear hover:cursor-pointer hover:bg-transparent hover:text-amber-50"
            >
              Login as a Club
            </button>
          </Link>
        </motion.div>

        {/* ---------------------------------------------------------- */}
        {/* Hero / Stats Area */}
        {/* ---------------------------------------------------------- */}

        <div className="relative mt-8 flex w-full max-w-6xl justify-center">

          {/* ======================================================== */}
          {/* DESKTOP STAT CARD - LEFT */}
          {/* ======================================================== */}

          <StatCard
            label="Students Registered in Clubs"
            end={1250}
            from="left"
            className="absolute left-0 top-10 z-20 hidden lg:block xl:left-2"
          />

          {/* ======================================================== */}
          {/* DESKTOP STAT CARD - RIGHT */}
          {/* ======================================================== */}

          <StatCard
            label="Clubs Registered in College"
            end={33}
            from="right"
            className="absolute right-0 top-10 z-20 hidden lg:block xl:right-2"
          />

          {/* ======================================================== */}
          {/* TABLET / MOBILE STAT CARDS */}
          {/* ======================================================== */}

          <div className="mb-5 flex w-full justify-center gap-3 lg:hidden">
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

          {/* ======================================================== */}
          {/* MAIN IMAGE */}
          {/* ======================================================== */}

          <motion.img
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            src="/images/webimg.png"
            alt="Orbix platform preview"
            className="h-[65%] w-[60%] max-w-4xl object-contain drop-shadow-2xl lg:max-w-[850px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Section1;