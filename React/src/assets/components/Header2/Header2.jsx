
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
    </header>
  );
};

export default Header2;
