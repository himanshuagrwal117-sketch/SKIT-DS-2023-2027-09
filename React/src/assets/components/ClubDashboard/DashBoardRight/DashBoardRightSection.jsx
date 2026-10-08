import React from "react";

import Gallery from "./Gallery/Gallery";
import Dashboard from "./Dashboard";

import MemebrsInfoDashboard from "./MemebrsInfoDashboard";
import VolunteersInfoDashboard from "./VolunteersInfoDashboard";
import PendingEventsDashboard from "./PendingEventsDashboard";
import DocumenetsDashboard from "./Documents/DocumenetsDashboard";
import ClubInfoDashboard from "./ClubInfoDashboard";
import AchivementsDashboard from "./Achivements/AchivementsDashboard";
import EventsInfoDashbaord from "./EventsDashboard/EventsInfoDashbaord";

const DashBoardRightSection = ({ ActiveState }) => {

  /* =====================================================
      RENDER ACTIVE DASHBOARD SECTION
  ===================================================== */

  const renderContent = () => {
    switch (ActiveState) {

      case "dashboard":
        return <Dashboard />;

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

      /* =================================================
          NEW SIDEBAR ITEMS
      ================================================= */

      case "registrations":
        return (
          <EmptySection
            title="Event Registrations"
            description="Manage student registrations and participant records for your club events."
          />
        );

      case "settings":
        return (
          <EmptySection
            title="Club Settings"
            description="Manage your club information, preferences, social links and dashboard settings."
          />
        );

      default:
        return <Dashboard />;
    }
  };


  return (
    <div
      className="
        min-h-full
        w-full
        min-w-0
        bg-[#FDFBFB]
      "
    >
      {renderContent()}
    </div>
  );
};


/* =====================================================
    TEMPORARY EMPTY SECTION
===================================================== */

const EmptySection = ({ title, description }) => {
  return (
    <div
      className="
        flex
        min-h-[500px]
        w-full
        items-center
        justify-center
        p-6
      "
    >
      <div className="max-w-[420px] text-center">

        <div
          className="
            mx-auto
            mb-4
            flex h-11 w-11
            items-center
            justify-center
            rounded-[12px]
            bg-[#900505]/[0.06]
          "
        >
          <span
            className="
              h-2.5 w-2.5
              rounded-full
              bg-[#900505]
            "
          />
        </div>

        <h2
          className="
            text-[17px]
            font-semibold
            tracking-[-0.02em]
            text-[#332929]
          "
        >
          {title}
        </h2>

        <p
          className="
            mx-auto
            mt-2
            max-w-[350px]
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


export default DashBoardRightSection;