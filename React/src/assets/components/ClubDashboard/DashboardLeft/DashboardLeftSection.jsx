import React from "react";

import {
  LayoutDashboard,
  LibraryBig,
  CalendarHeart,
  UserRound,
  Users,
  ClipboardClock,
  Files,
  Award,
  Image,
  UserCheck,
  Settings,
  ChevronRight,
  PanelLeft,
} from "lucide-react";

const DashboardLeftSection = ({
  setActiveState,
  ActiveState,
}) => {

  /* =====================================================
      MENU DATA
  ===================================================== */

  const menuSections = [
    {
      title: "Overview",
      items: [
        {
          id: "dashboard",
          label: "Dashboard",
          icon: LayoutDashboard,
        },
        {
          id: "club information",
          label: "Club Information",
          icon: LibraryBig,
        },
        {
          id: "events",
          label: "Events",
          icon: CalendarHeart,
        },
        {
          id: "member info",
          label: "Members",
          icon: UserRound,
        },
        {
          id: "volunteer info",
          label: "Volunteers",
          icon: Users,
        },
      ],
    },

    {
      title: "Management",
      items: [
        {
          id: "registrations",
          label: "Registrations",
          icon: UserCheck,
        },
        {
          id: "pending event",
          label: "Event Requests",
          icon: ClipboardClock,
          badge: 3,
        },
        {
          id: "documents",
          label: "Documents",
          icon: Files,
        },
      ],
    },

    {
      title: "Club Profile",
      items: [
        {
          id: "achievements",
          label: "Achievements & Badges",
          icon: Award,
        },
        {
          id: "gallery",
          label: "Gallery",
          icon: Image,
        },
      ],
    },
  ];


  /* =====================================================
      NAVIGATION ITEM
  ===================================================== */

  const NavItem = ({ item }) => {

    const Icon = item.icon;
    const isActive = ActiveState === item.id;

    return (
      <button
        type="button"
        onClick={() => setActiveState(item.id)}
        className={`
          group
          relative
          flex
          h-[42px]
          w-full
          items-center
          rounded-[10px]
          px-2.5
          text-left

          transition-all
          duration-200

          ${
            isActive
              ? `
                bg-[#900505]
                text-white
                shadow-[0_5px_16px_rgba(144,5,5,0.14)]
              `
              : `
                text-[#655C5C]
                hover:bg-[#900505]/[0.045]
                hover:text-[#900505]
              `
          }
        `}
      >

        {/* ACTIVE LEFT INDICATOR */}
        {isActive && (
          <span
            className="
              absolute
              -left-[1px]
              top-1/2
              h-[18px]
              w-[3px]
              -translate-y-1/2
              rounded-r-full
              bg-white
            "
          />
        )}


        {/* ICON */}
        <div
          className={`
            mr-2.5
            flex
            h-[28px]
            w-[28px]
            shrink-0
            items-center
            justify-center
            rounded-[8px]

            transition-all
            duration-200

            ${
              isActive
                ? "bg-white/10 text-white"
                : `
                  bg-[#900505]/[0.055]
                  text-[#900505]
                  group-hover:bg-[#900505]/[0.08]
                `
            }
          `}
        >
          <Icon
            size={14.5}
            strokeWidth={1.9}
          />
        </div>


        {/* LABEL */}
        <span
          className={`
            min-w-0
            flex-1
            truncate
            text-[11.5px]

            ${
              isActive
                ? "font-semibold"
                : "font-medium"
            }
          `}
        >
          {item.label}
        </span>


        {/* BADGE */}
        {item.badge !== undefined && (
          <span
            className={`
              ml-1.5
              flex
              min-w-[19px]
              items-center
              justify-center
              rounded-full
              px-1.5
              py-[2px]

              text-[8.5px]
              font-bold

              ${
                isActive
                  ? "bg-white/15 text-white"
                  : "bg-[#900505]/10 text-[#900505]"
              }
            `}
          >
            {item.badge}
          </span>
        )}


        {/* ACTIVE ARROW */}
        {isActive && item.badge === undefined && (
          <ChevronRight
            size={12}
            strokeWidth={2.2}
            className="ml-1 text-white/60"
          />
        )}

      </button>
    );
  };


  return (
    <aside
      className="
        flex
        h-full
        w-[250px]
        shrink-0
        flex-col
        bg-[#FCFAFA]
        px-3
        py-4
      "
    >

      {/* =====================================================
          WORKSPACE HEADER
      ===================================================== */}

      <div className="px-1.5">

        <div className="flex items-center gap-2.5">

          <div
            className="
              flex
              h-[34px]
              w-[34px]
              shrink-0
              items-center
              justify-center
              rounded-[9px]

              border
              border-[#900505]/[0.06]

              bg-[#900505]/[0.055]
              text-[#900505]
            "
          >
            <PanelLeft
              size={15}
              strokeWidth={1.9}
            />
          </div>


          <div className="min-w-0">

            <p
              className="
                truncate
                text-[11.5px]
                font-semibold
                text-[#342A2A]
              "
            >
              Club Workspace
            </p>

            <p
              className="
                mt-0.5
                truncate
                text-[9px]
                text-[#A19898]
              "
            >
              Management panel
            </p>

          </div>

        </div>

      </div>


      {/* DIVIDER */}
      <div className="my-4 h-px w-full bg-[#EEE7E7]" />


      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <nav
        className="
          min-h-0
          flex-1
          overflow-y-auto
          pr-0.5

          [&::-webkit-scrollbar]:w-[3px]
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-[#900505]/10
        "
      >

        {menuSections.map((section, sectionIndex) => (

          <div
            key={section.title}
            className={
              sectionIndex === menuSections.length - 1
                ? ""
                : "mb-4"
            }
          >

            {/* SECTION TITLE */}
            <p
              className="
                mb-1.5
                px-2.5

                text-[8px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-[#AAA0A0]
              "
            >
              {section.title}
            </p>


            {/* ITEMS */}
            <div className="space-y-[3px]">

              {section.items.map((item) => (
                <NavItem
                  key={item.id}
                  item={item}
                />
              ))}

            </div>

          </div>

        ))}

      </nav>


      {/* =====================================================
          SETTINGS
      ===================================================== */}

      <div
        className="
          mt-3
          border-t
          border-[#EEE7E7]
          pt-3
        "
      >

        <button
          type="button"
          onClick={() => setActiveState("settings")}
          className={`
            group
            relative
            flex
            h-[42px]
            w-full
            items-center
            rounded-[10px]
            px-2.5

            transition-all
            duration-200

            ${
              ActiveState === "settings"
                ? `
                  bg-[#900505]
                  text-white
                  shadow-[0_5px_16px_rgba(144,5,5,0.14)]
                `
                : `
                  text-[#655C5C]
                  hover:bg-[#900505]/[0.045]
                  hover:text-[#900505]
                `
            }
          `}
        >

          {ActiveState === "settings" && (
            <span
              className="
                absolute
                -left-[1px]
                top-1/2
                h-[18px]
                w-[3px]
                -translate-y-1/2
                rounded-r-full
                bg-white
              "
            />
          )}


          <div
            className={`
              mr-2.5
              flex
              h-[28px]
              w-[28px]
              items-center
              justify-center
              rounded-[8px]

              ${
                ActiveState === "settings"
                  ? "bg-white/10"
                  : "bg-[#900505]/[0.055] text-[#900505]"
              }
            `}
          >
            <Settings
              size={14.5}
              strokeWidth={1.9}
            />
          </div>


          <span className="flex-1 text-left text-[11.5px] font-medium">
            Club Settings
          </span>


          {ActiveState === "settings" && (
            <ChevronRight
              size={12}
              strokeWidth={2.2}
              className="text-white/60"
            />
          )}

        </button>

      </div>

    </aside>
  );
};

export default DashboardLeftSection;