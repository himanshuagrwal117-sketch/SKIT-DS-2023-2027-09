
import React, { useState } from "react";
import {
  Users,
  UserPlus,
  DoorOpen,
  ArrowDown01,
  ChevronDown,
  Coins,
  Search,
  CalendarDays,
  GraduationCap,
  Building2,
  SlidersHorizontal,
  ArrowUpDown,
  UserRound,
} from "lucide-react";

const MemebrsInfoDashboard = () => {
  const [activeFilter, setActiveFilter] = useState("All Members");
  const [sortBy, setSortBy] = useState("Newest first");
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data — API integration baad mein kar sakte ho
  const members = [
    {
      name: "Himanshu Agrawal",
      rollNo: "23ESKCX043",
      coins: 5,
      branch: "Data Science",
      year: "3rd Year",
      joined: "12 Mar, 2024",
      status: "Active",
    },
  ];

  const filters = [
    {
      label: "All Members",
      count: "23",
      icon: Users,
      color: "text-[#8e2020]",
      bg: "bg-[#fff1ee]",
    },
    {
      label: "Recently Joined",
      count: "+14",
      icon: UserPlus,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Left Members",
      count: "-3",
      icon: DoorOpen,
      color: "text-red-600",
      bg: "bg-red-50",
    },
  ];

  const filteredMembers = members.filter((member) => {
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      member.name.toLowerCase().includes(query) ||
      member.rollNo.toLowerCase().includes(query) ||
      member.branch.toLowerCase().includes(query);

    // Sample member data contains active members only.
    const matchesFilter =
      activeFilter === "All Members" ||
      (activeFilter === "Recently Joined" &&
        member.status === "Recently Joined") ||
      (activeFilter === "Left Members" &&
        member.status === "Left");

    return matchesSearch && matchesFilter;
  });

  const sortedMembers = [...filteredMembers].sort((a, b) => {
    if (sortBy === "Name A–Z") {
      return a.name.localeCompare(b.name);
    }

    if (sortBy === "Most Coins") {
      return b.coins - a.coins;
    }

    return 0;
  });

  return (
    <div className="flex h-full min-h-0 w-full flex-col gap-5 bg-[#faf9f8] p-3 sm:gap-6 sm:p-5 lg:p-6">

      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-7 w-1 rounded-full bg-[#8e2020]" />
            <h1 className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
              Members Management
            </h1>
          </div>

          <p className="mt-2 pl-3 text-sm text-gray-500">
            Manage club members, track activity and view member details.
          </p>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-xl border border-[#f0d9d6] bg-white px-3 py-2.5">
          <Users size={18} className="text-[#8e2020]" />
          <span className="text-sm font-semibold text-gray-700">
            Member Directory
          </span>
        </div>
      </div>

      {/* Filter tabs and sorting */}
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {filters.map((filter) => {
            const Icon = filter.icon;
            const isActive = activeFilter === filter.label;

            return (
              <button
                key={filter.label}
                type="button"
                onClick={() => setActiveFilter(filter.label)}
                className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-200 ${
                  isActive
                    ? "border-[#8e2020] bg-[#8e2020] text-white shadow-sm"
                    : "border-gray-200 bg-white text-gray-700 hover:border-[#d7aaa6] hover:bg-[#fff8f7]"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      isActive ? "bg-white/15" : filter.bg
                    }`}
                  >
                    <Icon
                      size={19}
                      className={isActive ? "text-white" : filter.color}
                    />
                  </span>

                  <span className="text-sm font-semibold">
                    {filter.label}
                  </span>
                </span>

                <span
                  className={`text-sm font-extrabold ${
                    isActive
                      ? "text-white"
                      : filter.color
                  }`}
                >
                  {filter.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-2">
          <span className="hidden text-sm font-medium text-gray-500 sm:block">
            Sort by
          </span>

          <div className="relative w-full sm:w-48">
            <ArrowUpDown
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8e2020]"
            />

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort members"
              className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-10 text-sm font-medium text-gray-700 outline-none transition focus:border-[#8e2020] focus:ring-2 focus:ring-[#8e2020]/10"
            >
              <option value="Newest first">Newest first</option>
              <option value="Name A–Z">Name A–Z</option>
              <option value="Most Coins">Most Coins</option>
            </select>

            <ChevronDown
              size={17}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Member list panel */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

        {/* Panel heading */}
        <div className="flex flex-col gap-4 border-b border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div>
            <h2 className="text-base font-bold text-gray-900">
              Member Directory
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              View member information and joining details.
            </p>
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search name, ID or branch..."
              aria-label="Search members"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#8e2020] focus:bg-white focus:ring-2 focus:ring-[#8e2020]/10"
            />
          </div>
        </div>

        {/* Desktop table headings */}
        <div className="hidden grid-cols-[minmax(180px,1.5fr)_minmax(120px,1fr)_minmax(100px,0.8fr)_minmax(90px,0.7fr)_minmax(120px,1fr)] items-center gap-4 bg-gray-50/80 px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-500 lg:grid">
          <span>Member</span>
          <span>Branch</span>
          <span>Academic Year</span>
          <span>Coins</span>
          <span>Joined Date</span>
        </div>

        {/* Member rows */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          {sortedMembers.length > 0 ? (
            sortedMembers.map((member) => (
              <div
                key={member.rollNo}
                className="grid grid-cols-1 gap-4 border-b border-gray-100 p-4 transition-colors hover:bg-[#fffaf9] sm:p-5 lg:grid-cols-[minmax(180px,1.5fr)_minmax(120px,1fr)_minmax(100px,0.8fr)_minmax(90px,0.7fr)_minmax(120px,1fr)] lg:items-center lg:gap-4 lg:px-5"
              >
                {/* Member identity */}
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#a33a34] to-[#580e07] text-sm font-bold text-white shadow-sm">
                    {member.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-gray-900">
                      {member.name}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      ID: {member.rollNo}
                    </p>
                  </div>
                </div>

                {/* Mobile labels + branch */}
                <div className="flex items-center justify-between gap-3 lg:block">
                  <span className="text-xs font-medium text-gray-500 lg:hidden">
                    Branch
                  </span>

                  <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Building2
                      size={15}
                      className="hidden text-gray-400 xl:block"
                    />
                    {member.branch}
                  </span>
                </div>

                {/* Academic year */}
                <div className="flex items-center justify-between gap-3 lg:block">
                  <span className="text-xs font-medium text-gray-500 lg:hidden">
                    Academic Year
                  </span>

                  <span className="inline-flex items-center gap-2 text-sm text-gray-700">
                    <GraduationCap
                      size={16}
                      className="hidden text-gray-400 xl:block"
                    />
                    {member.year}
                  </span>
                </div>

                {/* Coins */}
                <div className="flex items-center justify-between gap-3 lg:block">
                  <span className="text-xs font-medium text-gray-500 lg:hidden">
                    Coins
                  </span>

                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-800">
                    <Coins size={14} />
                    {member.coins}
                  </span>
                </div>

                {/* Joining date */}
                <div className="flex items-center justify-between gap-3 lg:block">
                  <span className="text-xs font-medium text-gray-500 lg:hidden">
                    Joined Date
                  </span>

                  <span className="inline-flex items-center gap-2 text-sm text-gray-600">
                    <CalendarDays
                      size={15}
                      className="text-gray-400"
                    />
                    {member.joined}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="flex min-h-56 flex-col items-center justify-center px-5 py-10 text-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff1ee] text-[#8e2020]">
                <UserRound size={25} />
              </div>

              <h3 className="text-base font-bold text-gray-800">
                No members found
              </h3>

              <p className="mt-1 max-w-xs text-sm leading-6 text-gray-500">
                Try another search or choose a different member filter.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilter("All Members");
                }}
                className="mt-4 rounded-lg px-4 py-2 text-sm font-semibold text-[#8e2020] transition hover:bg-[#fff1ee]"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-2 border-t border-gray-100 bg-gray-50/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <p className="text-xs text-gray-500">
            Showing{" "}
            <span className="font-bold text-gray-800">
              {sortedMembers.length}
            </span>{" "}
            sample {sortedMembers.length === 1 ? "member" : "members"}
          </p>

          <p className="text-xs text-gray-400">
            Orbix · Members Management
          </p>
        </div>
      </div>
    </div>
  );
};

export default MemebrsInfoDashboard;