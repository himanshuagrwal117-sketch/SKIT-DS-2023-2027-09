import React from "react";
import { Link } from "react-router-dom";
import { UserRound } from "lucide-react";

const Header2 = () => {
  return (
    <header className="absolute z-50 flex h-24 w-full items-center justify-between px-4">

      {/* ================= LOGOS ================= */}
      <div className="flex h-full items-center gap-4">

        <img
          src="/images/LOGO1.png"
          alt="SKIT Logo"
          className="h-[80%] object-contain"
        />

        <img
          src="/images/eca logo.png"
          alt="ECA Logo"
          className="h-[80%] object-contain"
        />

      </div>


      {/* ================= NAVIGATION ================= */}
      <nav className="flex items-center gap-1 text-[13px] font-bold text-amber-50">

        {/* HOME */}
        <Link
          to="/studentpage"
          className="rounded-md px-3 py-2 transition-all duration-200 hover:bg-white hover:text-[#900505]"
        >
          Home
        </Link>


        {/* EXPLORE CLUBS */}
        <Link
          to="/clubs"
          className="rounded-md px-3 py-2 transition-all duration-200 hover:bg-white hover:text-[#900505]"
        >
          Explore Clubs
        </Link>


        {/* SODECA SECTION */}
        <Link
          to="/sodeca"
          className="rounded-md px-3 py-2 transition-all duration-200 hover:bg-white hover:text-[#900505]"
        >
          SODECA
        </Link>


        {/* ALL EVENTS */}
        <Link
          to="/events"
          className="rounded-md px-3 py-2 transition-all duration-200 hover:bg-white hover:text-[#900505]"
        >
          All Events
        </Link>


        {/* START NEW CLUB */}
        <Link
          to="/start-club"
          className="rounded-md px-3 py-2 transition-all duration-200 hover:bg-white hover:text-[#900505]"
        >
          Start a New Club
        </Link>


        {/* ABOUT US */}
        <Link
          to="/aboutus"
          className="rounded-md px-3 py-2 transition-all duration-200 hover:bg-white hover:text-[#900505]"
        >
          About Us
        </Link>


        {/* HELP */}
        <Link
          to="/help"
          className="rounded-md px-3 py-2 transition-all duration-200 hover:bg-white hover:text-[#900505]"
        >
          Help
        </Link>

      </nav>


      {/* ================= PROFILE ================= */}
      <Link
        to="/profile"
        className="
          flex items-center gap-2
          rounded-full
          border border-white/30
          bg-white/10
          px-4 py-2
          text-[13px]
          font-semibold
          text-white
          backdrop-blur-sm
          transition-all duration-200
          hover:bg-white
          hover:text-[#900505]
        "
      >
        <UserRound size={18} strokeWidth={2.3} />

        <span>My Profile</span>
      </Link>

    </header>
  );
};

export default Header2;