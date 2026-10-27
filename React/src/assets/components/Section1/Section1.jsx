import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Counter from "../Effects/Counter";
import { useGoogleLogin } from "@react-oauth/google";

/* ------------------------------------------------------------------ */
/* API Configuration */
/* ------------------------------------------------------------------ */

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

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
  const navigate = useNavigate();

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginType, setLoginType] = useState(null);

  /* ---------------------------------------------------------------- */
  /* Common Authentication Function */
  /* ---------------------------------------------------------------- */

  const authenticateWithBackend = async (code, type) => {
    const endpoint =
      type === "club"
        ? "/auth/club/google"
        : "/auth/google";

    const result = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    const data = await result.json();

    if (!result.ok) {
      throw new Error(
        data.message || "Google authentication failed."
      );
    }

    return data;
  };

  /* ---------------------------------------------------------------- */
  /* Student Google Login */
  /* ---------------------------------------------------------------- */

  const studentLogin = useGoogleLogin({
    flow: "auth-code",

    onSuccess: async (response) => {
      setIsLoggingIn(true);
      setLoginType("student");
      setLoginError("");

      try {
        if (!response.code) {
          throw new Error(
            "Google authorization code was not received."
          );
        }

        const data = await authenticateWithBackend(
          response.code,
          "student"
        );

        console.log(
          "Student login successful:",
          data.email
        );

        navigate("/studentpage", {
          replace: true,
        });
      } catch (error) {
        console.error("Student login error:", error);

        setLoginError(
          error.message ||
            "Unable to log in. Please try again."
        );
      } finally {
        setIsLoggingIn(false);
        setLoginType(null);
      }
    },

    onError: () => {
      setIsLoggingIn(false);
      setLoginType(null);
      setLoginError(
        "Google sign-in failed or was cancelled. Please try again."
      );
    },
  });

  /* ---------------------------------------------------------------- */
  /* Club Google Login */
  /* ---------------------------------------------------------------- */

  const clubLogin = useGoogleLogin({
    flow: "auth-code",

    onSuccess: async (response) => {
      setIsLoggingIn(true);
      setLoginType("club");
      setLoginError("");

      try {
        if (!response.code) {
          throw new Error(
            "Google authorization code was not received."
          );
        }

        const data = await authenticateWithBackend(
          response.code,
          "club"
        );

        if (data.role !== "club" || !data.clubId) {
          throw new Error(
            "Club authentication failed. Invalid club session."
          );
        }

        console.log(
          "Club login successful:",
          data.clubName,
          data.clubId
        );

        navigate("/ClubDashboard", {
          replace: true,
        });
      } catch (error) {
        console.error("Club login error:", error);

        setLoginError(
          error.message ||
            "Unable to log in as a club. Please try again."
        );
      } finally {
        setIsLoggingIn(false);
        setLoginType(null);
      }
    },

    onError: () => {
      setIsLoggingIn(false);
      setLoginType(null);
      setLoginError(
        "Club Google sign-in failed or was cancelled."
      );
    },
  });

  /* ---------------------------------------------------------------- */
  /* UI */
  /* ---------------------------------------------------------------- */

  return (
    <section className="relative flex min-h-screen w-full items-start overflow-hidden bg-linear-to-b from-[#931913] to-[#580e07]">

      {/* Background Image */}

      <img
        src="/images/skit2.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-10"
      />

      {/* Main Content */}

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 pb-8 pt-24 lg:pb-6 lg:pt-20">

        {/* Heading */}

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[30px] font-bold tracking-[0.08em] text-amber-50 lg:text-[34px]"
        >
          Orbix
        </motion.h1>

        {/* Description */}

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

        {/* Login Buttons */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:gap-5"
        >

          {/* Student Login */}

          <button
            type="button"
            onClick={() => {
              setLoginError("");
              setLoginType("student");
              studentLogin();
            }}
            disabled={isLoggingIn}
            className="w-52 rounded-full border-2 border-amber-50 bg-white px-5 py-2.5 text-sm font-bold text-[#900505] transition-all duration-200 ease-linear hover:cursor-pointer hover:bg-transparent hover:text-amber-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoggingIn && loginType === "student"
              ? "Logging in..."
              : "Login as a Student"}
          </button>

          {/* Club Login */}

          <button
            type="button"
            onClick={() => {
              setLoginError("");
              setLoginType("club");
              clubLogin();
            }}
            disabled={isLoggingIn}
            className="flex w-52 items-center justify-center rounded-full border-2 border-amber-50 bg-white px-5 py-2.5 text-sm font-bold text-[#900505] transition-all duration-200 ease-linear hover:cursor-pointer hover:bg-transparent hover:text-amber-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoggingIn && loginType === "club"
              ? "Logging in..."
              : "Login as a Club"}
          </button>

        </motion.div>

        {/* Login Error */}

        {loginError && (
          <div
            role="alert"
            className="mt-4 max-w-md rounded-xl border border-red-200/40 bg-red-950/50 px-4 py-3 text-center text-sm text-white"
          >
            {loginError}
          </div>
        )}

        {/* Hero / Stats Area */}

        <div className="relative mt-8 flex w-full max-w-6xl justify-center">

          {/* Desktop Stat Card - Left */}

          <StatCard
            label="Students Registered in Clubs"
            end={1250}
            from="left"
            className="absolute left-0 top-10 z-20 hidden lg:block xl:left-2"
          />

          {/* Desktop Stat Card - Right */}

          <StatCard
            label="Clubs Registered in College"
            end={33}
            from="right"
            className="absolute right-0 top-10 z-20 hidden lg:block xl:right-2"
          />

          {/* Tablet / Mobile Stat Cards */}

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

          {/* Main Image */}

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