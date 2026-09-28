import React from "react";
import { Calendar, Bell } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-full flex h-24 absolute justify-between items-center p-2 z-2">

      {/* Logos */}
      <div className="h-full w-1/8 flex justify-between items-center">
        <img
          src="./images/LOGO1.png"
          alt="SKIT Logo"
          className="h-full"
        />

        <img
          src="./images/eca logo.png"
          alt="ECA Logo"
          className="h-full"
        />
      </div>

      {/* Navigation */}
      <div className="flex h-1/3 w-[35%] justify-between items-center text-amber-50 z-1 text-[13px] font-bold mr-5">

        <button
          onClick={() => window.location.href = "https://www.skit.ac.in/"}
          className="bg-transparent rounded-sm pt-1.5 pl-2.5 pr-2.5 pb-1.5 hover:bg-white hover:text-amber-800 hover:cursor-pointer ease-linear duration-200 transition-all"
        >
          SKIT Page
        </button>

        <Link to="/aboutus">
          <button
            className="bg-transparent rounded-sm pt-1.5 pl-2.5 pr-2.5 pb-1.5 hover:bg-white hover:text-amber-800 hover:cursor-pointer ease-linear duration-200 transition-all"
          >
            About us
          </button>
        </Link>

        <button
          className="bg-transparent rounded-sm pt-1.5 pl-2.5 pr-2.5 pb-1.5 hover:bg-white hover:text-amber-800 hover:cursor-pointer ease-linear duration-200 transition-all"
        >
          Contact Us
        </button>

        <button
          className="bg-transparent rounded-sm pt-1.5 pl-2.5 pr-2.5 pb-1.5 hover:bg-white hover:text-amber-800 hover:cursor-pointer ease-linear duration-200 transition-all"
        >
          Help
        </button>

      </div>

      {/* Calendar & Notification */}
      <div className="flex w-[9%] gap-6 items-center h-full">

        <button className="rounded-full text-[#ffffff] hover:bg-white hover:text-[#aa1e1e] p-2 cursor-pointer">
          <Calendar size={20} strokeWidth={2.7} />
        </button>

        <button className="rounded-full text-[#ffffff] hover:bg-white hover:text-[#aa1e1e] p-2 cursor-pointer">
          <Bell size={20} strokeWidth={2.7} />
        </button>

      </div>

    </div>
  );
};

export default Header;
