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

// =====================================================
// DASHBOARD RIGHT SECTION
// =====================================================

const DashBoardRightSection = ({
  ActiveState,
  club,
  clubId,
}) => {

  // =====================================================
  // CLUB INFORMATION
  // =====================================================

  const clubData = {
    id: club?.id ?? clubId ?? null,
    name: club?.name ?? "",
    email: club?.email ?? "",
  };

  // =====================================================
  // COMMON PROPS FOR ALL DASHBOARD COMPONENTS
  // =====================================================

  const commonProps = {
    club: clubData,
    clubId: clubData.id,
    clubName: clubData.name,
    clubEmail: clubData.email,
  };

  // =====================================================
  // RENDER ACTIVE DASHBOARD SECTION
  // =====================================================

  const renderContent = () => {
    switch (ActiveState) {

      // ================= DASHBOARD =================

      case "dashboard":
        return <Dashboard {...commonProps} />;

      // ================= CLUB INFORMATION =================

      case "club information":
        return <ClubInfoDashboard {...commonProps} />;

      // ================= EVENTS =================

      case "events":
        return <EventsInfoDashbaord {...commonProps} />;

      // ================= MEMBERS =================

      case "member info":
        return <MemebrsInfoDashboard {...commonProps} />;

      // ================= VOLUNTEERS =================

      case "volunteer info":
        return <VolunteersInfoDashboard {...commonProps} />;

      // ================= PENDING EVENTS =================

      case "pending event":
        return <PendingEventsDashboard {...commonProps} />;

      // ================= DOCUMENTS =================

      case "documents":
        return <DocumenetsDashboard {...commonProps} />;

      // ================= ACHIEVEMENTS =================

      case "achievements":
        return <AchivementsDashboard {...commonProps} />;

      // ================= GALLERY =================

      case "gallery":
        return <Gallery {...commonProps} />;

      // ================= REGISTRATIONS =================

      case "registrations":
        return (
          <EmptySection
            title="Event Registrations"
            description="Manage student registrations and participant records for your club events."
          />
        );

      // ================= SETTINGS =================

      case "settings":
        return (
          <EmptySection
            title="Club Settings"
            description="Manage your club information, preferences, social links and dashboard settings."
          />
        );

      // ================= DEFAULT =================

      default:
        return <Dashboard {...commonProps} />;
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

// =====================================================
// TEMPORARY EMPTY SECTION
// =====================================================

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