
import React, { useState } from "react";
import {
  Video,
  Images,
  GalleryVerticalEnd,
  CalendarDays,
} from "lucide-react";

import AllEvents from "./AllEvents";
import UpComingEvents from "./UpComingEvents";
import TodayEvent from "./TodayEvent";

const eventTabs = [
  {
    id: "total events",
    label: "All Events",
    icon: GalleryVerticalEnd,
  },
  {
    id: "upcoming events",
    label: "Upcoming Events",
    icon: Images,
  },
  {
    id: "todays event",
    label: "Today's Events",
    icon: Video,
  },
];

const EventsInfoDashbaord = () => {
  const [eventoption, seteventoption] = useState("total events");

  return (
    <div className="flex h-full min-h-0 w-full flex-col gap-6 bg-white p-4 sm:p-6 lg:p-8">

      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#8e2020]/10 text-[#8e2020]">
            <CalendarDays size={23} />
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
              Events Management
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Manage and explore your club events in one place.
            </p>
          </div>
        </div>
      </div>

      {/* Event Navigation */}
      <div className="border-b border-gray-200">
        <div
          role="tablist"
          aria-label="Event categories"
          className="flex flex-wrap items-center gap-2 pb-3"
        >
          {eventTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = eventoption === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => seteventoption(tab.id)}
                className={`
                  inline-flex min-h-10 items-center justify-center
                  gap-2 rounded-lg border px-4 py-2
                  text-sm font-semibold
                  transition-all duration-200 ease-in-out
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#8e2020]
                  focus-visible:ring-offset-2
                  ${
                    isActive
                      ? "border-[#8e2020] bg-[#8e2020] text-white shadow-sm"
                      : "border-gray-200 bg-white text-gray-600 hover:border-[#8e2020]/50 hover:bg-[#8e2020]/5 hover:text-[#8e2020]"
                  }
                `}
              >
                <Icon size={17} strokeWidth={2} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Event Content */}
      <div className="min-h-0 w-full flex-1 overflow-y-auto">
        {eventoption === "total events" && <AllEvents />}

        {eventoption === "upcoming events" && <UpComingEvents />}

        {eventoption === "todays event" && <TodayEvent />}
      </div>
    </div>
  );
};

export default EventsInfoDashbaord;