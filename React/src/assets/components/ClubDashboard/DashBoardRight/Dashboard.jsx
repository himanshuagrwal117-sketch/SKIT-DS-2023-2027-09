import React from "react";

import {
  CalendarHeart,
  Plus,
  CalendarClock,
  Radio,
  ClipboardClock,
  Award,
  Users,
  UserPlus,
  UserMinus,
  TrendingUp,
  Instagram,
  Linkedin,
  Mail,
  Globe,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Sparkles,
} from "lucide-react";

/* ================= EXISTING DASHBOARD COMPONENTS ================= */

import Gallery from "./Gallery/Gallery";
import MemebrsInfoDashboard from "./MemebrsInfoDashboard";
import VolunteersInfoDashboard from "./VolunteersInfoDashboard";
import PendingEventsDashboard from "./PendingEventsDashboard";
import DocumenetsDashboard from "./Documents/DocumenetsDashboard";
import ClubInfoDashboard from "./ClubInfoDashboard";
import AchivementsDashboard from "./Achivements/AchivementsDashboard";
import EventsInfoDashbaord from "./EventsDashboard/EventsInfoDashbaord";


/* ================================================================
   DASHBOARD OVERVIEW
================================================================ */

const DashboardOverview = () => {

  const eventStats = [
    {
      title: "Total Events",
      value: "21",
      description: "All club events",
      icon: CalendarHeart,
    },
    {
      title: "Upcoming",
      value: "03",
      description: "Scheduled events",
      icon: CalendarClock,
    },
    {
      title: "Today's Events",
      value: "01",
      description: "Happening today",
      icon: Radio,
    },
    {
      title: "Event Requests",
      value: "00",
      description: "Awaiting approval",
      icon: ClipboardClock,
    },
  ];


  return (
    <div className="w-full">

      {/* =====================================================
          WELCOME BANNER
      ===================================================== */}

      <section
        className="
          relative
          mb-6
          overflow-hidden
          rounded-[18px]
          bg-[#900505]
        "
      >

        {/* BACKGROUND IMAGE */}
        <div
          className="
            absolute inset-0
            bg-[url('/images/bg14.png')]
            bg-cover
            bg-center
            opacity-20
          "
        />

        {/* SUBTLE OVERLAY */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-r
            from-[#670303]/90
            via-[#900505]/75
            to-[#A50A0A]/60
          "
        />


        {/* CONTENT */}
        <div
          className="
            relative z-10
            flex min-h-[155px]
            flex-col
            justify-between
            gap-6
            px-6 py-6

            sm:flex-row
            sm:items-center

            lg:px-7
          "
        >

          {/* LEFT */}
          <div>

            <div className="mb-2 flex items-center gap-2">

              <Sparkles
                size={13}
                strokeWidth={2}
                className="text-white/60"
              />

              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-white/55
                "
              >
                Club Dashboard
              </span>

            </div>


            <h2
              className="
                text-[23px]
                font-semibold
                tracking-[-0.02em]
                text-white

                sm:text-[26px]
              "
            >
              Hello, CodeFiesta Club
            </h2>


            <p
              className="
                mt-2
                max-w-[500px]
                text-[12px]
                leading-5
                text-white/65
              "
            >
              Here's an overview of your club activities, members,
              volunteers and upcoming events.
            </p>

          </div>


          {/* RIGHT */}
          <div className="flex items-center gap-5">

            {/* DECORATIVE IMAGE */}
            <div
              className="
                hidden h-[95px] w-[95px]
                overflow-hidden
                opacity-90
                lg:block
              "
            >
              <img
                src="/images/kki.svg"
                alt=""
                className="h-full w-full object-contain"
              />
            </div>


            {/* NEW EVENT BUTTON */}
            <button
              type="button"
              className="
                flex h-[42px]
                shrink-0
                items-center
                justify-center
                gap-2

                rounded-[10px]

                border border-white/20
                bg-white

                px-4

                text-[11px]
                font-semibold
                text-[#900505]

                shadow-[0_8px_20px_rgba(0,0,0,0.10)]

                transition-all
                duration-200

                hover:-translate-y-[1px]
                hover:bg-[#FFF8F8]

                active:translate-y-0
              "
            >
              <Plus
                size={15}
                strokeWidth={2.5}
              />

              Start New Event
            </button>

          </div>

        </div>

      </section>



      {/* =====================================================
          EVENT STATISTICS
      ===================================================== */}

      <section className="mb-6">

        <div className="mb-3 flex items-end justify-between">

          <div>
            <h3
              className="
                text-[14px]
                font-semibold
                text-[#332929]
              "
            >
              Event Overview
            </h3>

            <p className="mt-0.5 text-[10.5px] text-[#9A9090]">
              Quick summary of club events
            </p>
          </div>


          <button
            type="button"
            className="
              flex items-center gap-1
              text-[10.5px]
              font-semibold
              text-[#900505]
              transition-opacity
              hover:opacity-70
            "
          >
            View all events

            <ArrowUpRight
              size={12}
              strokeWidth={2}
            />
          </button>

        </div>


        <div
          className="
            grid
            grid-cols-1
            gap-3

            sm:grid-cols-2
            xl:grid-cols-4
          "
        >

          {eventStats.map((stat) => {

            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="
                  group
                  rounded-[15px]
                  border border-[#EAE2E2]
                  bg-white
                  p-4

                  transition-all
                  duration-200

                  hover:-translate-y-[2px]
                  hover:border-[#900505]/15
                  hover:shadow-[0_8px_24px_rgba(90,20,20,0.06)]
                "
              >

                <div className="flex items-start justify-between">

                  <div
                    className="
                      flex h-9 w-9
                      items-center
                      justify-center
                      rounded-[10px]
                      bg-[#900505]/[0.055]
                      text-[#900505]
                    "
                  >
                    <Icon
                      size={16}
                      strokeWidth={1.9}
                    />
                  </div>


                  <ArrowUpRight
                    size={13}
                    className="
                      text-[#C8BFBF]
                      transition-colors
                      group-hover:text-[#900505]
                    "
                  />

                </div>


                <div className="mt-4">

                  <p
                    className="
                      text-[27px]
                      font-semibold
                      tracking-[-0.03em]
                      text-[#302525]
                    "
                  >
                    {stat.value}
                  </p>


                  <p
                    className="
                      mt-1
                      text-[11.5px]
                      font-semibold
                      text-[#514747]
                    "
                  >
                    {stat.title}
                  </p>


                  <p className="mt-0.5 text-[9.5px] text-[#A09797]">
                    {stat.description}
                  </p>

                </div>

              </div>
            );
          })}

        </div>

      </section>



      {/* =====================================================
          MEMBERS + VOLUNTEERS
      ===================================================== */}

      <section
        className="
          mb-6
          grid
          grid-cols-1
          gap-4
          xl:grid-cols-2
        "
      >

        {/* =================================================
            MEMBERS
        ================================================= */}

        <div
          className="
            rounded-[17px]
            border border-[#E9E1E1]
            bg-white
            p-5
          "
        >

          {/* HEADER */}
          <div className="flex items-start justify-between">

            <div className="flex items-center gap-3">

              <div
                className="
                  flex h-10 w-10
                  items-center justify-center
                  rounded-[11px]
                  bg-[#900505]/[0.06]
                  text-[#900505]
                "
              >
                <Users
                  size={18}
                  strokeWidth={1.9}
                />
              </div>


              <div>

                <p
                  className="
                    text-[11px]
                    font-semibold
                    text-[#625858]
                  "
                >
                  Total Members
                </p>


                <div className="mt-0.5 flex items-center gap-2">

                  <span
                    className="
                      text-[28px]
                      font-semibold
                      tracking-[-0.03em]
                      text-[#302525]
                    "
                  >
                    24
                  </span>


                  <span
                    className="
                      flex items-center gap-0.5
                      rounded-full
                      bg-[#238A55]/10
                      px-2 py-0.5

                      text-[9px]
                      font-semibold
                      text-[#238A55]
                    "
                  >
                    <TrendingUp
                      size={10}
                      strokeWidth={2}
                    />

                    8.3%
                  </span>

                </div>

              </div>

            </div>


            <span
              className="
                rounded-full
                bg-[#900505]/5
                px-2.5 py-1
                text-[9px]
                font-semibold
                text-[#900505]
              "
            >
              Active
            </span>

          </div>


          {/* MEMBER STATS */}
          <div className="mt-5 grid grid-cols-2 gap-3">

            {/* NEW */}
            <div
              className="
                rounded-[13px]
                border border-[#EAE3E3]
                bg-[#FCFBFB]
                p-3.5
              "
            >

              <div className="flex items-center gap-2">

                <div
                  className="
                    flex h-7 w-7
                    items-center justify-center
                    rounded-[8px]
                    bg-[#238A55]/10
                    text-[#238A55]
                  "
                >
                  <UserPlus
                    size={14}
                    strokeWidth={2}
                  />
                </div>

                <span
                  className="
                    text-[10.5px]
                    font-medium
                    text-[#716767]
                  "
                >
                  New Members
                </span>

              </div>


              <p
                className="
                  mt-4
                  text-[23px]
                  font-semibold
                  text-[#238A55]
                "
              >
                +3
              </p>


              <p className="mt-0.5 text-[9px] text-[#AAA0A0]">
                This month
              </p>

            </div>


            {/* LEFT */}
            <div
              className="
                rounded-[13px]
                border border-[#EAE3E3]
                bg-[#FCFBFB]
                p-3.5
              "
            >

              <div className="flex items-center gap-2">

                <div
                  className="
                    flex h-7 w-7
                    items-center justify-center
                    rounded-[8px]
                    bg-[#900505]/[0.06]
                    text-[#900505]
                  "
                >
                  <UserMinus
                    size={14}
                    strokeWidth={2}
                  />
                </div>


                <span
                  className="
                    text-[10.5px]
                    font-medium
                    text-[#716767]
                  "
                >
                  Members Left
                </span>

              </div>


              <p
                className="
                  mt-4
                  text-[23px]
                  font-semibold
                  text-[#900505]
                "
              >
                -1
              </p>


              <p className="mt-0.5 text-[9px] text-[#AAA0A0]">
                This month
              </p>

            </div>

          </div>

        </div>



        {/* =================================================
            VOLUNTEERS
        ================================================= */}

        <div
          className="
            rounded-[17px]
            border border-[#E9E1E1]
            bg-white
            p-5
          "
        >

          {/* HEADER */}
          <div className="flex items-start justify-between">

            <div className="flex items-center gap-3">

              <div
                className="
                  flex h-10 w-10
                  items-center justify-center
                  rounded-[11px]
                  bg-[#900505]/[0.06]
                  text-[#900505]
                "
              >
                <Award
                  size={18}
                  strokeWidth={1.9}
                />
              </div>


              <div>

                <p
                  className="
                    text-[11px]
                    font-semibold
                    text-[#625858]
                  "
                >
                  Total Volunteers
                </p>


                <div className="mt-0.5 flex items-center gap-2">

                  <span
                    className="
                      text-[28px]
                      font-semibold
                      tracking-[-0.03em]
                      text-[#302525]
                    "
                  >
                    24
                  </span>


                  <span
                    className="
                      flex items-center gap-0.5
                      rounded-full
                      bg-[#238A55]/10
                      px-2 py-0.5

                      text-[9px]
                      font-semibold
                      text-[#238A55]
                    "
                  >
                    <TrendingUp
                      size={10}
                      strokeWidth={2}
                    />

                    12%
                  </span>

                </div>

              </div>

            </div>


            <span
              className="
                rounded-full
                bg-[#900505]/5
                px-2.5 py-1
                text-[9px]
                font-semibold
                text-[#900505]
              "
            >
              Active
            </span>

          </div>


          {/* VOLUNTEER STATS */}
          <div className="mt-5 grid grid-cols-2 gap-3">

            {/* NEW */}
            <div
              className="
                rounded-[13px]
                border border-[#EAE3E3]
                bg-[#FCFBFB]
                p-3.5
              "
            >

              <div className="flex items-center gap-2">

                <div
                  className="
                    flex h-7 w-7
                    items-center justify-center
                    rounded-[8px]
                    bg-[#238A55]/10
                    text-[#238A55]
                  "
                >
                  <UserPlus
                    size={14}
                    strokeWidth={2}
                  />
                </div>


                <span
                  className="
                    text-[10.5px]
                    font-medium
                    text-[#716767]
                  "
                >
                  New Volunteers
                </span>

              </div>


              <p
                className="
                  mt-4
                  text-[23px]
                  font-semibold
                  text-[#238A55]
                "
              >
                +3
              </p>


              <p className="mt-0.5 text-[9px] text-[#AAA0A0]">
                This month
              </p>

            </div>


            {/* LEFT */}
            <div
              className="
                rounded-[13px]
                border border-[#EAE3E3]
                bg-[#FCFBFB]
                p-3.5
              "
            >

              <div className="flex items-center gap-2">

                <div
                  className="
                    flex h-7 w-7
                    items-center justify-center
                    rounded-[8px]
                    bg-[#900505]/[0.06]
                    text-[#900505]
                  "
                >
                  <UserMinus
                    size={14}
                    strokeWidth={2}
                  />
                </div>


                <span
                  className="
                    text-[10.5px]
                    font-medium
                    text-[#716767]
                  "
                >
                  Volunteers Left
                </span>

              </div>


              <p
                className="
                  mt-4
                  text-[23px]
                  font-semibold
                  text-[#900505]
                "
              >
                -1
              </p>


              <p className="mt-0.5 text-[9px] text-[#AAA0A0]">
                This month
              </p>

            </div>

          </div>

        </div>

      </section>



      {/* =====================================================
          BOTTOM SECTION
      ===================================================== */}

      <section
        className="
          grid grid-cols-1
          gap-4
          xl:grid-cols-[1fr_0.42fr]
        "
      >

        {/* UPCOMING EVENT */}
        <div
          className="
            rounded-[17px]
            border border-[#E9E1E1]
            bg-white
            p-5
          "
        >

          <div className="flex items-center justify-between">

            <div>
              <h3 className="text-[13px] font-semibold text-[#332929]">
                Next Upcoming Event
              </h3>

              <p className="mt-0.5 text-[10px] text-[#A09797]">
                Your nearest scheduled club activity
              </p>
            </div>


            <CalendarDays
              size={18}
              strokeWidth={1.8}
              className="text-[#900505]"
            />

          </div>


          <div
            className="
              mt-4
              flex flex-col
              justify-between
              gap-4

              rounded-[13px]
              border border-[#900505]/10
              bg-[#900505]/[0.025]
              p-4

              sm:flex-row
              sm:items-center
            "
          >

            <div>

              <p
                className="
                  text-[12px]
                  font-semibold
                  text-[#443838]
                "
              >
                Upcoming Club Event
              </p>


              <div
                className="
                  mt-2
                  flex flex-wrap
                  items-center
                  gap-4
                  text-[10px]
                  text-[#8E8484]
                "
              >

                <span className="flex items-center gap-1.5">
                  <CalendarDays size={12} />
                  12 October 2026
                </span>

                <span className="flex items-center gap-1.5">
                  <Clock3 size={12} />
                  11:00 AM
                </span>

              </div>

            </div>


            <button
              type="button"
              className="
                flex h-9
                items-center justify-center
                gap-1.5
                rounded-[9px]

                border border-[#900505]/15
                bg-white
                px-3

                text-[10px]
                font-semibold
                text-[#900505]

                transition-all
                hover:bg-[#900505]
                hover:text-white
              "
            >
              View Event

              <ArrowUpRight size={12} />
            </button>

          </div>

        </div>



        {/* SOCIAL LINKS */}
        <div
          className="
            rounded-[17px]
            border border-[#E9E1E1]
            bg-white
            p-5
          "
        >

          <h3 className="text-[13px] font-semibold text-[#332929]">
            Club Links
          </h3>

          <p className="mt-0.5 text-[10px] text-[#A09797]">
            Social and contact channels
          </p>


          <div className="mt-5 flex flex-wrap gap-2.5">

            <SocialButton
              icon={Instagram}
              label="Instagram"
            />

            <SocialButton
              icon={Linkedin}
              label="LinkedIn"
            />

            <SocialButton
              icon={Mail}
              label="Email"
            />

            <SocialButton
              icon={Globe}
              label="Website"
            />

          </div>

        </div>

      </section>

    </div>
  );
};



/* ================================================================
   SOCIAL BUTTON
================================================================ */

const SocialButton = ({
  icon: Icon,
  label,
}) => {

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className="
        group
        flex h-10 w-10
        items-center justify-center

        rounded-[10px]

        border border-[#E7DEDE]
        bg-[#FCFBFB]

        text-[#776D6D]

        transition-all
        duration-200

        hover:-translate-y-[2px]
        hover:border-[#900505]/20
        hover:bg-[#900505]
        hover:text-white
        hover:shadow-[0_5px_15px_rgba(144,5,5,0.12)]
      "
    >
      <Icon
        size={16}
        strokeWidth={1.8}
      />
    </button>
  );
};



/* ================================================================
   DASHBOARD + RIGHT CONTENT CONTROLLER
================================================================ */

const Dashboard = ({
  ActiveState = "dashboard",
}) => {

  const renderContent = () => {

    switch (ActiveState) {

      case "dashboard":
        return <DashboardOverview />;


      case "club information":
        return <ClubInfoDashboard />;


      case "events":
        return <EventsInfoDashbaord />;


      case "member info":
        return <MemebrsInfoDashboard />;


      case "volunteer info":
        return <VolunteersInfoDashboard />;


      case "pending event":
        return <PendingEventsDashboard />;


      case "documents":
        return <DocumenetsDashboard />;


      case "achievements":
        return <AchivementsDashboard />;


      case "gallery":
        return <Gallery />;


      /* ================================================
         NEW SIDEBAR OPTIONS
      ================================================ */

      case "registrations":
        return (
          <ComingSoon
            title="Event Registrations"
            description="Manage student registrations and participant records for your club events."
          />
        );


      case "settings":
        return (
          <ComingSoon
            title="Club Settings"
            description="Manage club preferences, contact details, social links and dashboard settings."
          />
        );


      default:
        return <DashboardOverview />;

    }

  };


  return (
    <div
      className="
        min-h-full
        w-full
        bg-[#FDFBFB]
        p-5

        sm:p-6
        lg:p-7
      "
    >
      {renderContent()}
    </div>
  );
};



/* ================================================================
   TEMPORARY PAGE FOR NEW MODULES
================================================================ */

const ComingSoon = ({
  title,
  description,
}) => {

  return (
    <div
      className="
        flex min-h-[450px]
        w-full
        items-center
        justify-center
      "
    >

      <div className="max-w-[430px] text-center">

        <div
          className="
            mx-auto
            flex h-12 w-12
            items-center justify-center
            rounded-[14px]
            bg-[#900505]/[0.06]
            text-[#900505]
          "
        >
          <ClipboardClock
            size={20}
            strokeWidth={1.8}
          />
        </div>


        <h2
          className="
            mt-4
            text-[18px]
            font-semibold
            text-[#332929]
          "
        >
          {title}
        </h2>


        <p
          className="
            mx-auto
            mt-2
            max-w-[360px]
            text-[11.5px]
            leading-5
            text-[#918787]
          "
        >
          {description}
        </p>


        <span
          className="
            mt-4
            inline-flex
            rounded-full
            border border-[#900505]/10
            bg-[#900505]/5
            px-3 py-1.5

            text-[9px]
            font-bold
            uppercase
            tracking-[0.12em]
            text-[#900505]
          "
        >
          Module Coming Soon
        </span>

      </div>

    </div>
  );
};


export default Dashboard;