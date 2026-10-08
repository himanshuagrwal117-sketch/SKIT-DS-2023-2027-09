
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
    </header>
  );
};

export default Header2;