
<<<<<<< HEAD
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  UserRound,
  Trophy,
  Menu,
  X,
  House,
  Users,
  GraduationCap,
  CalendarDays,
  PlusCircle,
  Info,
  CircleHelp,
} from "lucide-react";

const Header2 = () => {
  // Replace with actual backend data when available
  const studentPoints = 250;

  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    {
      label: "Home",
      path: "/studentpage",
      icon: House,
    },
    {
      label: "Explore Clubs",
      path: "/clubs",
      icon: Users,
    },
    {
      label: "SODECA",
      path: "/sodeca",
      icon: GraduationCap,
    },
    {
      label: "All Events",
      path: "/events",
      icon: CalendarDays,
    },
    {
      label: "Start a New Club",
      path: "/start-club",
      icon: PlusCircle,
    },
    {
      label: "About Us",
      path: "/aboutus",
      icon: Info,
    },
    {
      label: "Help",
      path: "/help",
      icon: CircleHelp,
    },
  ];

  const isActive = (path) => location.pathname === path;

  const closeMenu = () => setMenuOpen(false);

  const navLinkClass = (path) =>
    `flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-semibold transition-all duration-200 ${
      isActive(path)
        ? "bg-white text-[#900505]"
        : "text-white/90 hover:bg-white hover:text-[#900505]"
    }`;

  return (
    <header className="absolute left-0 top-0 z-50 w-full">
      {/* ================= DESKTOP HEADER ================= */}
      <div className="flex min-h-24 items-center justify-between gap-4 px-4 py-3 lg:px-6 xl:px-8">

        {/* LOGOS */}
        <Link
          to="/studentpage"
          aria-label="Go to JoinSphere home"
          className="flex h-16 shrink-0 items-center gap-3 sm:gap-4"
        >
          <img
            src="/images/LOGO1.png"
            alt="SKIT Logo"
            className="h-[85%] max-w-[90px] object-contain sm:max-w-[110px]"
          />

          <img
            src="/images/eca logo.png"
            alt="ECA Logo"
            className="h-[85%] max-w-[90px] object-contain sm:max-w-[110px]"
          />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 xl:flex"
        >
          {navigation.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              aria-current={isActive(path) ? "page" : undefined}
              className={navLinkClass(path)}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* RIGHT SIDE ACTIONS */}
        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">

          {/* STUDENT POINTS */}
          <div
            title="Your student points"
            className="flex items-center gap-2 rounded-full border border-amber-300/40 bg-amber-400/15 px-3 py-2 text-[12px] font-semibold text-amber-100 backdrop-blur-sm transition-colors hover:bg-amber-400/25 sm:px-4 sm:text-[13px]"
          >
            <Trophy
              size={17}
              strokeWidth={2.3}
              className="shrink-0 text-amber-300"
            />

            <span className="hidden sm:inline">My Points:</span>

            <span className="font-bold text-amber-300">
              {studentPoints}
            </span>
          </div>

          {/* PROFILE */}
          <Link
            to="/profile"
            aria-current={isActive("/profile") ? "page" : undefined}
            className={`hidden items-center gap-2 rounded-full border px-3 py-2 text-[13px] font-semibold backdrop-blur-sm transition-all duration-200 sm:flex sm:px-4 ${
              isActive("/profile")
                ? "border-white bg-white text-[#900505]"
                : "border-white/30 bg-white/10 text-white hover:bg-white hover:text-[#900505]"
            }`}
          >
            <UserRound size={17} strokeWidth={2.3} />
            <span>My Profile</span>
          </Link>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/25 bg-white/10 text-white transition hover:bg-white hover:text-[#900505] xl:hidden"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      {/* ================= MOBILE / TABLET MENU ================= */}
      {menuOpen && (
        <div className="absolute left-0 right-0 top-full z-50 px-4 pb-4 xl:hidden">
          <nav
            aria-label="Mobile navigation"
            className="mx-auto max-w-2xl rounded-2xl border border-white/15 bg-[#700e09]/95 p-3 shadow-2xl backdrop-blur-xl"
          >
            {navigation.map(({ label, path, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={closeMenu}
                aria-current={isActive(path) ? "page" : undefined}
                className={`mb-1 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition last:mb-0 ${
                  isActive(path)
                    ? "bg-white text-[#900505]"
                    : "text-white/90 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            ))}

            {/* MOBILE PROFILE LINK */}
            <div className="my-2 border-t border-white/15" />

            <Link
              to="/profile"
              onClick={closeMenu}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                isActive("/profile")
                  ? "bg-white text-[#900505]"
                  : "text-white/90 hover:bg-white/10 hover:text-white"
              }`}
            >
              <UserRound size={18} />
              My Profile
            </Link>
          </nav>
        </div>
      )}
=======
import React from "react";
import { Link } from "react-router-dom";
import { UserRound, Trophy, Bell } from "lucide-react";

const Header2 = () => {
  // Sample points — replace with backend data later
  const studentPoints = 250;

  // Sample notification count — replace with backend data later
  const notificationCount = 3;

  const navLinks = [
    { name: "Home", path: "/studentpage" },
    { name: "Explore Clubs", path: "/clubs" },
    { name: "SODECA", path: "/sodeca" },
    { name: "All Events", path: "/events" },
    { name: "Start a New Club", path: "/start-club" },
    { name: "About Us", path: "/aboutus" },
    { name: "Help", path: "/help" },
  ];

  return (
    <header
      className="
        fixed top-3 left-3 right-3 z-50
        flex h-[72px]
        items-center justify-between
        gap-3
        rounded-2xl
        px-4 lg:px-5

        bg-gradient-to-r
        from-[#931913]/95
        to-[#580e07]/95

        backdrop-blur-2xl
        backdrop-saturate-150

        border border-white/20

        shadow-[0_8px_32px_rgba(55,5,5,0.25)]

        transition-all duration-300
      "
    >
      {/* ================= LOGOS ================= */}
      <div className="flex h-full shrink-0 items-center gap-3">
        <img
          src="/images/LOGO1.png"
          alt="SKIT Logo"
          className="h-[78%] w-auto object-contain"
        />

        <img
          src="/images/eca logo.png"
          alt="ECA Logo"
          className="h-[78%] w-auto object-contain"
        />
      </div>

      {/* ================= NAVIGATION ================= */}
      <nav
        className="
          flex min-w-0 items-center justify-center
          gap-4 lg:gap-5 xl:gap-7
          text-[10px] xl:text-[11px]
          font-semibold
          text-amber-50
        "
      >
        {navLinks.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="
              relative
              whitespace-nowrap
              py-2

              transition-colors duration-200

              hover:text-amber-200
            "
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* ================= RIGHT SECTION ================= */}
      <div className="flex shrink-0 items-center gap-2">

        {/* STUDENT POINTS */}
        <div
          className="
            flex items-center gap-1.5
            rounded-full

            border border-amber-200/35
            bg-white/10
            backdrop-blur-md

            px-3 py-2

            text-[11px]
            font-semibold
            text-amber-50

            shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]
          "
          title="Your Total Points"
        >
          <Trophy
            size={15}
            strokeWidth={2.2}
            className="text-amber-300"
          />

          <span className="whitespace-nowrap">
            {studentPoints.toLocaleString()} Points
          </span>
        </div>

        {/* ================= NOTIFICATION BUTTON ================= */}
        <button
          type="button"
          aria-label="Notifications"
          title="Notifications"
          className="
            relative
            flex h-9 w-9
            items-center justify-center
            rounded-full

            border border-white/30
            bg-white/10
            backdrop-blur-md

            text-white

            transition-all duration-200

            hover:border-white/60
            hover:bg-white/90
            hover:text-[#900505]

            cursor-pointer
          "
        >
          <Bell size={17} strokeWidth={2.2} />

          {notificationCount > 0 && (
            <span
              className="
                absolute -right-1 -top-1
                flex h-[16px] min-w-[16px]
                items-center justify-center

                rounded-full
                bg-amber-400
                px-1

                text-[9px]
                font-bold
                text-[#580e07]

                border border-[#580e07]
              "
            >
              {notificationCount > 9
                ? "9+"
                : notificationCount}
            </span>
          )}
        </button>

        {/* ================= DIVIDER ================= */}
        <div className="mx-1 h-6 w-px bg-white/25" />

        {/* ================= MY PROFILE ================= */}
        <Link
          to="/student-profile"
          className="
            flex items-center gap-1.5
            rounded-full

            border border-white/30
            bg-white/10
            backdrop-blur-md

            px-3 py-2

            text-[11px]
            font-semibold
            text-white

            transition-all duration-200

            hover:border-white/60
            hover:bg-white/90
            hover:text-[#900505]
          "
        >
          <UserRound size={15} strokeWidth={2.2} />

          <span className="whitespace-nowrap">
            My Profile
          </span>
        </Link>
      </div>
>>>>>>> origin
    </header>
  );
};

export default Header2;
