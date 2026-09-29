import React, { useEffect, useState } from "react";
import {
  Users,
  UserRoundPlus,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

const WelcomePanel = () => {

  // =====================================================
  // LOGGED-IN STUDENT DATA
  // =====================================================
  const [user, setUser] = useState({
    name: "",
    email: "",
    studentId: "",
  });

  const [loading, setLoading] = useState(true);


  // =====================================================
  // GET LOGGED-IN USER FROM BACKEND
  // =====================================================
  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/auth/me",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          console.error("User is not authenticated");
          return;
        }

        const data = await response.json();

        setUser({
          name: data.name || "Student",
          email: data.email || "",
          studentId:
            data.studentId ||
            data.email?.split("@")[0] ||
            "",
        });

      } catch (error) {
        console.error(
          "Failed to fetch student information:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    getLoggedInUser();
  }, []);


  return (
    <section
      className="
        relative
        w-full
        min-h-[610px]
        overflow-hidden
        rounded-[28px]
        bg-white
        shadow-[0_20px_60px_rgba(0,0,0,0.08)]
      "
    >

      {/* =====================================================
          BACKGROUND IMAGE
      ===================================================== */}
      <img
        src="/images/bg3.png"
        alt=""
        className="
          pointer-events-none
          absolute
          inset-0
          h-full
          w-full
          object-cover
          opacity-[0.07]
        "
      />


      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}
      <div
        className="
          pointer-events-none
          absolute
          -left-32
          -top-32
          h-[350px]
          w-[350px]
          rounded-full
          bg-[#983530]/5
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-40
          right-[25%]
          h-[400px]
          w-[400px]
          rounded-full
          bg-[#983530]/5
          blur-3xl
        "
      />


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <div
        className="
          relative
          z-10
          flex
          min-h-[610px]
          w-full
          items-center
        "
      >

        {/* ===================================================
            LEFT CONTENT
        =================================================== */}
        <div
          className="
            flex
            w-[49%]
            flex-col
            justify-center
            px-12
            py-14
            xl:px-16
          "
        >

          {/* ================= STUDENT DASHBOARD LABEL ================= */}
          <div
            className="
              mb-5
              flex
              items-center
              gap-3
            "
          >
            <span
              className="
                h-[2px]
                w-7
                rounded-full
                bg-[#983530]
              "
            />

            <p
              className="
                text-[11px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-[#983530]
              "
            >
              Student Dashboard
            </p>
          </div>


          {/* =================================================
              WELCOME HEADING
          ================================================= */}
          <div>

            <h1
              className="
                text-[42px]
                font-semibold
                leading-[1.08]
                tracking-[-0.035em]
                text-[#1f1f1f]
                xl:text-[46px]
              "
            >
              Welcome to JoinSphere,
            </h1>


            {/* DYNAMIC STUDENT NAME */}
            <h2
              className="
                mt-1
                min-h-[50px]
                text-[42px]
                font-semibold
                leading-[1.08]
                tracking-[-0.035em]
                text-[#983530]
                xl:text-[46px]
              "
            >
              {loading ? "Welcome!" : user.name}
            </h2>

          </div>


          {/* =================================================
              STUDENT INFORMATION
          ================================================= */}
          <div
            className="
              mt-4
              flex
              flex-wrap
              items-center
              gap-2
              text-[13px]
              font-medium
              text-[#777]
            "
          >

            {/* STATUS DOT */}
            <span
              className="
                h-1.5
                w-1.5
                shrink-0
                rounded-full
                bg-[#983530]
              "
            />


            {/* STUDENT ID */}
            {!loading && user.studentId && (
              <>
                <span className="font-semibold text-[#555]">
                  {user.studentId}
                </span>

                <span className="text-[#bbb]">
                  •
                </span>
              </>
            )}


            {/* COLLEGE EMAIL */}
            <span>
              {loading
                ? "Loading student information..."
                : user.email}
            </span>

          </div>


          {/* =================================================
              DESCRIPTION
          ================================================= */}
          <p
            className="
              mt-7
              max-w-[600px]
              text-[14px]
              font-normal
              leading-[1.8]
              text-[#606060]
            "
          >
            Discover clubs, explore campus activities and stay connected
            with everything happening at SKIT Jaipur. Join communities
            that match your interests, volunteer with club teams and
            never miss an opportunity to participate.
          </p>


          {/* =================================================
              PRIMARY ACTION BUTTONS
          ================================================= */}
          <div
            className="
              mt-9
              flex
              flex-wrap
              items-center
              gap-3
            "
          >

            {/* ================= JOIN CLUB ================= */}
            <button
              className="
                group
                flex
                h-[46px]
                items-center
                justify-center
                gap-2.5
                rounded-lg
                border-2
                border-[#983530]
                bg-[#983530]
                px-5
                text-[13px]
                font-semibold
                text-white
                transition-all
                duration-300

                hover:-translate-y-[2px]
                hover:bg-[#842c28]
                hover:shadow-[0_8px_20px_rgba(152,53,48,0.22)]
              "
            >

              <UserRoundPlus
                size={18}
                strokeWidth={2.2}
              />

              <span>
                Join a Club
              </span>

              <ArrowRight
                size={15}
                strokeWidth={2.3}
                className="
                  ml-1
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />

            </button>


            {/* ================= VOLUNTEER ================= */}
            <button
              className="
                group
                flex
                h-[46px]
                items-center
                justify-center
                gap-2.5
                rounded-lg
                border-2
                border-[#983530]
                bg-white
                px-5
                text-[13px]
                font-semibold
                text-[#983530]
                transition-all
                duration-300

                hover:-translate-y-[2px]
                hover:bg-[#983530]
                hover:text-white
                hover:shadow-[0_8px_20px_rgba(152,53,48,0.18)]
              "
            >

              <Users
                size={18}
                strokeWidth={2.2}
              />

              <span>
                Apply as Volunteer
              </span>

              <ArrowRight
                size={15}
                strokeWidth={2.3}
                className="
                  ml-1
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />

            </button>

          </div>


          {/* =================================================
              TODAY'S EVENTS
          ================================================= */}
          <div
            className="
              mt-6
              flex
              items-center
            "
          >

            <button
              className="
                group
                flex
                items-center
                gap-3
                rounded-lg
                px-1
                py-2
                text-[13px]
                font-semibold
                text-[#555]
                transition-all
                duration-200

                hover:text-[#983530]
              "
            >

              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#983530]/10
                  text-[#983530]
                  transition-all
                  duration-200

                  group-hover:bg-[#983530]
                  group-hover:text-white
                "
              >

                <CalendarDays
                  size={18}
                  strokeWidth={2.2}
                />

              </div>


              <span>
                See Today's Events
              </span>


              <ArrowRight
                size={15}
                className="
                  transition-transform
                  duration-200
                  group-hover:translate-x-1
                "
              />

            </button>

          </div>

        </div>


        {/* ===================================================
            RIGHT VISUAL
        =================================================== */}
        <div
          className="
            relative
            flex
            min-h-[610px]
            w-[51%]
            items-center
            justify-center
            px-8
            py-10
          "
        >

          {/* Decorative Circle */}
          <div
            className="
              absolute
              h-[420px]
              w-[420px]
              rounded-full
              bg-[#983530]/5
            "
          />


          {/* Decorative Dot */}
          <div
            className="
              absolute
              right-[12%]
              top-[17%]
              h-3
              w-3
              rounded-full
              bg-[#983530]/30
            "
          />


          {/* Decorative Dot */}
          <div
            className="
              absolute
              bottom-[19%]
              left-[12%]
              h-2
              w-2
              rounded-full
              bg-[#983530]/25
            "
          />


          {/* =================================================
              MAIN IMAGE
          ================================================= */}
          <img
            src="/images/try2.jpeg"
            alt="JoinSphere Student Portal"
            className="
              relative
              z-10
              max-h-[500px]
              w-[95%]
              object-contain
              drop-shadow-[0_20px_30px_rgba(0,0,0,0.08)]
            "
          />

        </div>

      </div>

    </section>
  );
};

export default WelcomePanel;