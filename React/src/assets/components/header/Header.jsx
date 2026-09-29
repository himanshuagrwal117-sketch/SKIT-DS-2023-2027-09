import React from "react";
import { Calendar, Bell } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="absolute z-50 flex h-24 w-full items-center justify-between p-2">

      {/* ================= LOGOS ================= */}
      <div className="flex h-full w-1/8 items-center justify-between">

        {/* SKIT Logo */}
        <a
          href="https://www.skit.ac.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="h-full cursor-pointer"
        >
          <img
            src="/images/LOGO1.png"
            alt="SKIT Logo"
            className="h-full object-contain"
          />
        </a>

        {/* ECA Logo */}
        <Link
          to="/"
          className="h-full cursor-pointer"
        >
          <img
            src="/images/eca logo.png"
            alt="ECA Logo"
            className="h-full object-contain"
          />
        </Link>

      </div>


      {/* ================= NAVIGATION ================= */}
      <nav className="mr-5 flex h-1/3 w-[42%] items-center justify-between text-[13px] font-bold text-amber-50">

        {/* HOME */}
        <Link
          to="/"
          className="rounded-sm bg-transparent px-2.5 py-1.5 transition-all duration-200 ease-linear hover:bg-white hover:text-amber-800"
        >
          Home
        </Link>


        {/* SKIT PAGE */}
        <a
          href="https://www.skit.ac.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm bg-transparent px-2.5 py-1.5 transition-all duration-200 ease-linear hover:bg-white hover:text-amber-800"
        >
          SKIT Page
        </a>


        {/* ABOUT US */}
        <Link
          to="/aboutus"
          className="rounded-sm bg-transparent px-2.5 py-1.5 transition-all duration-200 ease-linear hover:bg-white hover:text-amber-800"
        >
          About Us
        </Link>


        {/* CONTACT US */}
        <Link
          to="/contactus"
          className="rounded-sm bg-transparent px-2.5 py-1.5 transition-all duration-200 ease-linear hover:bg-white hover:text-amber-800"
        >
          Contact Us
        </Link>


        {/* HELP */}
        <Link
          to="/help"
          className="rounded-sm bg-transparent px-2.5 py-1.5 transition-all duration-200 ease-linear hover:bg-white hover:text-amber-800"
        >
          Help
        </Link>

      </nav>


      {/* ================= RIGHT ICONS ================= */}
      <div className="flex h-full w-[9%] items-center gap-6">

        {/* CALENDAR */}
        <Link
          to="/calendar"
          aria-label="Calendar"
          className="cursor-pointer rounded-full p-2 text-white transition-all duration-200 hover:bg-white hover:text-[#aa1e1e]"
        >
          <Calendar
            size={20}
            strokeWidth={2.7}
          />
        </Link>


        {/* NOTIFICATIONS */}
        <Link
          to="/notifications"
          aria-label="Notifications"
          className="cursor-pointer rounded-full p-2 text-white transition-all duration-200 hover:bg-white hover:text-[#aa1e1e]"
        >
          <Bell
            size={20}
            strokeWidth={2.7}
          />
        </Link>

      </div>

    </header>
  );
};

export default Header;