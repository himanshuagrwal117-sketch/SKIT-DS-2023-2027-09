import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
  Bell,
  CalendarDays,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  UserRound,
} from "lucide-react";

import DashboardLeftSection from "./DashboardLeft/DashboardLeftSection";
import DashBoardRightSection from "./DashBoardRight/DashBoardRightSection";

// =====================================================
// API CONFIGURATION
// =====================================================

const API_URL = (
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000"
).replace(/\/+$/, "");

// =====================================================
// CLUB DASHBOARD
// =====================================================

const ClubDashboardPage = () => {
  const navigate = useNavigate();

  const [ActiveState, setActiveState] = useState("dashboard");

  const [club, setClub] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [profileOpen, setProfileOpen] = useState(false);

  const [loggingOut, setLoggingOut] = useState(false);

  const profileRef = useRef(null);

  // =====================================================
  // FETCH LOGGED-IN CLUB INFORMATION
  // =====================================================

  useEffect(() => {
    let active = true;

    const fetchClub = async () => {
      try {
        const response = await fetch(
          `${API_URL}/auth/club/me`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.status === 401 || response.status === 403) {
          if (active) {
            navigate("/", { replace: true });
          }
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch club information");
        }

        const data = await response.json();

        if (
          !data.authenticated ||
          data.role !== "club" ||
          !data.clubId
        ) {
          if (active) {
            navigate("/", { replace: true });
          }
          return;
        }

        if (active) {
          setClub({
            id: data.clubId,
            name: data.clubName,
            email: data.email,
          });
        }
      } catch (err) {
        console.error("Club fetch error:", err);

        if (active) {
          setError(
            "Unable to load club information. Please try again."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchClub();

    return () => {
      active = false;
    };
  }, [navigate]);

  // =====================================================
  // CLOSE PROFILE DROPDOWN ON OUTSIDE CLICK
  // =====================================================

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      const response = await fetch(`${API_URL}/logout`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      navigate("/", { replace: true });
    } catch (err) {
      console.error("Logout error:", err);

      setError("Logout failed. Please try again.");
    } finally {
      setLoggingOut(false);
      setProfileOpen(false);
    }
  };

  // =====================================================
  // LOADING SCREEN
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F4F4]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[#7D0505] border-t-transparent rounded-full animate-spin" />

          <p className="text-sm text-gray-600">
            Loading your club dashboard...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR SCREEN
  // =====================================================

  if (error && !club) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F4F4] px-4">
        <p className="text-[#7D0505] font-medium text-center">
          {error}
        </p>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-4 rounded-lg bg-[#7D0505] px-5 py-2 text-sm font-medium text-white"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!club) {
    return null;
  }

  // =====================================================
  // DASHBOARD UI
  // =====================================================

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

            {/* PROFILE DROPDOWN */}

            <div
              ref={profileRef}
              className="relative ml-1"
            >

              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                aria-expanded={profileOpen}
                aria-label="Club profile menu"
                className="
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
                    flex h-[34px] w-[34px]
                    shrink-0
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-full
                    border border-white/20
                    bg-white/10
                  "
                >
                  <UserRound
                    size={17}
                    className="text-white"
                  />
                </div>

                {/* DYNAMIC CLUB NAME */}

                <div className="hidden min-w-0 text-left md:block">

                  <p
                    className="
                      max-w-[150px]
                      truncate
                      text-[10.5px]
                      font-semibold
                      leading-none
                      text-white
                    "
                  >
                    {club.name}
                  </p>

                  <p
                    className="
                      mt-1
                      max-w-[150px]
                      truncate
                      text-[8.5px]
                      leading-none
                      text-white/45
                    "
                  >
                    Club Account
                  </p>

                </div>

                <ChevronDown
                  size={13}
                  strokeWidth={2}
                  className="hidden text-white/45 md:block"
                />

              </button>

              {/* DROPDOWN CONTENT */}

              {profileOpen && (
                <div
                  className="
                    absolute right-0 top-[52px]
                    z-[100]
                    w-[250px]
                    overflow-hidden
                    rounded-[14px]
                    border border-[#E7DEDE]
                    bg-white
                    shadow-[0_12px_35px_rgba(0,0,0,0.15)]
                  "
                >

                  {/* CLUB DETAILS */}

                  <div className="border-b border-gray-100 px-4 py-4">

                    <p className="truncate text-sm font-semibold text-gray-900">
                      {club.name}
                    </p>

                    <p className="mt-1 truncate text-xs text-gray-500">
                      {club.email}
                    </p>

                    <p className="mt-2 text-[11px] text-gray-400">
                      Club ID: {club.id}
                    </p>

                  </div>

                  {/* LOGOUT */}

                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="
                      flex w-full
                      items-center
                      gap-3
                      px-4 py-3
                      text-left
                      text-sm
                      font-medium
                      text-red-700
                      transition-colors
                      hover:bg-red-50
                      disabled:opacity-50
                    "
                  >
                    <LogOut size={16} />

                    {loggingOut
                      ? "Logging out..."
                      : "Logout"}
                  </button>

                </div>
              )}

            </div>

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
              club={club}
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
              club={club}
              clubId={club.id}
            />
          </div>

        </section>

      </main>

      {/* LOGOUT ERROR MESSAGE */}

      {error && club && (
        <div
          role="alert"
          className="
            fixed bottom-5 right-5 z-[200]
            max-w-sm rounded-lg
            bg-red-50 px-5 py-3
            text-sm text-red-700
            shadow-lg
          "
        >
          {error}
        </div>
      )}

    </div>
  );
};

export default ClubDashboardPage;