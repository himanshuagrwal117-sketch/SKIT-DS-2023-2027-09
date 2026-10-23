
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowLeft,
  ArrowUpRight,
  Award,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  CalendarCheck2,
  CalendarDays,
  ChevronRight,
  ClipboardList,
  Crown,
  FileBadge,
  GraduationCap,
  IdCard,
  Mail,
  Medal,
  ShieldCheck,
  Sparkles,
  Trophy,
  UserRound,
  UserRoundCheck,
  Users,
  CheckCircle2,
  Zap,
} from "lucide-react";

/* =========================================================
   STUDENT DATA
   Replace demo data with backend response later
========================================================= */

const student = {
  name: "Himanshu Agrawal",
  image: "/images/bd.webp",
  branch: "Data Science",
  section: "—",
  year: "—",
  semester: "6th Semester",
  collegeId: "B230765",
  rtuRollNo: "23ESKCX043",
  enrollmentNo: "—",
  email: "b230765@skit.ac.in",

  // null means value is not available yet
  points: null,
  achievementsCount: null,
};

/* =========================================================
   COLLEGE POSITIONS
========================================================= */

const positions = [
  {
    id: 1,
    title: "Club Coordinator",
    organization: "Not assigned",
    period: "Current academic year",
    icon: Crown,
    active: false,
  },
  {
    id: 2,
    title: "Club Core Member",
    organization: "Not assigned",
    period: "Current academic year",
    icon: ShieldCheck,
    active: false,
  },
];

/* =========================================================
   CLUB MEMBERSHIPS
========================================================= */

const memberClubs = [
  {
    id: 1,
    name: "Competitive Programming Club",
    joined: "12 Mar 2024",
    role: "Major Interest",
    image: "/images/bd.webp",
  },
  {
    id: 2,
    name: "Second Club Name",
    joined: "—",
    role: "Minor Interest",
    image: null,
  },
];

const responsibilityClubs = [
  {
    id: 1,
    name: "Competitive Programming Club",
    joined: "12 Mar 2024",
    role: "Graphic Designing",
    type: "Volunteer",
  },
];

/* =========================================================
   ACTIVITY TABS
========================================================= */

const activityTabs = [
  {
    id: "participated",
    label: "Participated",
    icon: CalendarCheck2,
  },
  {
    id: "registered",
    label: "Registered",
    icon: ClipboardList,
  },
  {
    id: "volunteered",
    label: "Volunteered",
    icon: Users,
  },
  {
    id: "coordinated",
    label: "Coordinated",
    icon: BriefcaseBusiness,
  },
  {
    id: "achievements",
    label: "Achievements",
    icon: Trophy,
    special: true,
  },
];

/* =========================================================
   SAMPLE ACTIVITY RECORDS
========================================================= */

const activityRecords = {
  participated: [
    {
      id: 1,
      title: "Event Name",
      club: "Organizing Club",
      date: "12 Sep 2026",
      status: "Participated",
    },
    {
      id: 2,
      title: "Another Event",
      club: "Organizing Club",
      date: "12 Sep 2026",
      status: "Participated",
    },
    {
      id: 3,
      title: "Student Activity",
      club: "Organizing Club",
      date: "12 Sep 2026",
      status: "Participated",
    },
  ],

  registered: [
    {
      id: 1,
      title: "Event Registration",
      club: "Organizing Club",
      date: "12 Sep 2026",
      status: "Registered",
    },
  ],

  volunteered: [
    {
      id: 1,
      title: "Volunteer Event",
      club: "Organizing Club",
      date: "12 Sep 2026",
      status: "Volunteered",
    },
    {
      id: 2,
      title: "Volunteer Activity",
      club: "Organizing Club",
      date: "12 Sep 2026",
      status: "Volunteered",
    },
  ],

  coordinated: [
    {
      id: 1,
      title: "Coordinated Event",
      club: "Organizing Club",
      date: "12 Sep 2026",
      status: "Coordinated",
    },
  ],

  achievements: [
    {
      id: 1,
      title: "Event Achievement",
      club: "Organizing Club",
      date: "12 Sep 2026",
      status: "Achievement",
      rank: 1,
    },
    {
      id: 2,
      title: "Another Event Achievement",
      club: "Organizing Club",
      date: "12 Sep 2026",
      status: "Achievement",
      rank: 2,
    },
    {
      id: 3,
      title: "Competition Achievement",
      club: "Organizing Club",
      date: "12 Sep 2026",
      status: "Achievement",
      rank: 3,
    },
  ],
};

/* =========================================================
   PAGE TOP STATS
========================================================= */

const TopStats = ({ onAchievementsClick }) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* POINTS CARD */}
      <div
        title="Total Points"
        className="
          group relative flex h-[76px] min-w-[138px]
          items-center gap-3 overflow-hidden rounded-[15px]
          border border-[#E8DADA] bg-white px-4
          shadow-[0_5px_18px_rgba(80,20,20,0.045)]
          transition-all duration-200 hover:-translate-y-0.5
          hover:shadow-[0_8px_24px_rgba(80,20,20,0.08)]
        "
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-[#F8EEEE] text-[#900505]">
          <Zap size={20} fill="currentColor" strokeWidth={1.7} />
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#998B8B]">
            Total Points
          </p>

          <p className="mt-1 text-[23px] font-extrabold leading-none tracking-[-0.035em] text-[#382C2C]">
            {student.points ?? "—"}
          </p>
        </div>
      </div>

      {/* ACHIEVEMENTS CARD */}
      <button
        type="button"
        onClick={onAchievementsClick}
        title="View Achievements"
        className="
          group relative flex h-[76px] min-w-[156px]
          items-center gap-3 overflow-hidden rounded-[15px]
          border border-[#E6C887] bg-gradient-to-br
          from-[#FFF8E7] via-[#FFF3D7] to-[#FBE9BC]
          px-4 text-left
          shadow-[0_5px_18px_rgba(140,100,30,0.07)]
          transition-all duration-200
          hover:-translate-y-0.5 hover:border-[#D3A94F]
          hover:shadow-[0_8px_24px_rgba(140,100,30,0.12)]
        "
      >
        <div className="pointer-events-none absolute -right-5 -top-6 h-20 w-20 rounded-full border-[13px] border-[#CBA44D]/[0.08]" />

        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] border border-[#E9D29A] bg-white/75 text-[#B08025]">
          <Trophy size={20} strokeWidth={1.9} />
        </div>

        <div className="relative">
          <p className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[#AA8749]">
            Achievements
          </p>

          <div className="mt-1 flex items-center gap-2">
            <p className="text-[23px] font-extrabold leading-none tracking-[-0.035em] text-[#7D5719]">
              {student.achievementsCount ?? "—"}
            </p>

            <ArrowUpRight
              size={14}
              className="text-[#A87D31] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
        </div>
      </button>
    </div>
  );
};

/* =========================================================
   SECTION HEADING
========================================================= */

const SectionHeading = ({
  eyebrow,
  title,
  description,
  compact = false,
}) => {
  return (
    <div className={compact ? "mb-3" : "mb-5"}>
      <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.17em] text-[#900505]/65">
        {eyebrow}
      </p>

      <h2
        className={`font-bold tracking-[-0.025em] text-[#302525] ${
          compact ? "text-[17px]" : "text-[19px] sm:text-[20px]"
        }`}
      >
        {title}
      </h2>

      {description && (
        <p className="mt-1 text-[11px] leading-[18px] text-[#938787]">
          {description}
        </p>
      )}
    </div>
  );
};

/* =========================================================
   LEFT STUDENT PROFILE
========================================================= */

const StudentInfoPanel = () => {
  const details = [
    { label: "Branch", value: student.branch, icon: GraduationCap },
    { label: "Section", value: student.section, icon: Users },
    { label: "Academic Year", value: student.year, icon: BookOpen },
    { label: "Semester", value: student.semester, icon: CalendarDays },
    { label: "RTU Roll Number", value: student.rtuRollNo, icon: IdCard },
    { label: "College ID", value: student.collegeId, icon: BadgeCheck },
    { label: "Enrollment Number", value: student.enrollmentNo, icon: FileBadge },
    { label: "College Email", value: student.email, icon: Mail },
  ];

  return (
    <section className="overflow-hidden rounded-[20px] border border-[#E6D7D7] bg-[#FFF9F9] shadow-[0_8px_30px_rgba(90,20,20,0.055)]">
      {/* MAROON PROFILE HEADER */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#700404] via-[#900505] to-[#AE2424] px-5 pb-6 pt-7">
        <div className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full border-[35px] border-white/[0.045]" />

        <div className="pointer-events-none absolute -bottom-16 -left-12 h-36 w-36 rounded-full bg-white/[0.045]" />

        <div className="relative flex flex-col items-center text-center">
          <div className="relative">
            <div className="h-[94px] w-[94px] overflow-hidden rounded-[24px] border-[4px] border-white/25 bg-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
              <img
                src={student.image}
                alt="Student profile"
                className="h-full w-full object-cover"
              />
            </div>

            <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-[3px] border-[#900505] bg-white text-[#900505]">
              <BadgeCheck size={14} />
            </span>
          </div>

          <h2 className="mt-4 text-[19px] font-bold tracking-[-0.025em] text-white">
            {student.name}
          </h2>

          <p className="mt-1 text-[11px] text-white/70">
            {student.branch}
          </p>

          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-white">
            <GraduationCap size={13} />
            SKIT Student
          </span>
        </div>
      </div>

      {/* DETAILS */}
      <div className="px-4 pb-5 pt-5">
        <div className="mb-3 flex items-center gap-2 px-1">
          <UserRound size={15} className="text-[#900505]" />

          <h3 className="text-[12px] font-bold text-[#403535]">
            Personal & Academic Details
          </h3>
        </div>

        <div className="space-y-1">
          {details.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-[10px] px-2.5 py-2.5 transition-colors hover:bg-white"
            >
              <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[9px] border border-[#F0E1E1] bg-white text-[#900505]">
                <Icon size={15} strokeWidth={1.8} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[9px] font-medium text-[#A09696]">
                  {label}
                </p>

                <p className="mt-0.5 break-words text-[11.5px] font-semibold text-[#403636]">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* =========================================================
   PREMIUM COLLEGE POSITIONS
========================================================= */

const StudentPositionPanel = () => {
  return (
    <section className="relative overflow-hidden rounded-[20px] border border-[#DEC995] bg-gradient-to-br from-[#FFF9E9] via-[#FFFDF7] to-[#F6E9CE] p-5 shadow-[0_8px_28px_rgba(118,82,27,0.07)]">
      <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full border-[22px] border-[#B98B39]/[0.06]" />

      <div className="relative">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Crown size={17} className="text-[#A67A2D]" />

              <h3 className="text-[14px] font-bold text-[#49371D]">
                College Positions
              </h3>
            </div>

            <p className="mt-1 text-[10px] text-[#A38A60]">
              Leadership & responsibilities
            </p>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-[#E4D0A7] bg-white/70">
            <Sparkles size={17} className="text-[#B68B43]" />
          </div>
        </div>

        <div className="space-y-2.5">
          {positions.map((position) => {
            const Icon = position.icon;

            return (
              <div
                key={position.id}
                className="rounded-[12px] border border-[#E9D8B8] bg-white/80 p-3"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#F7EDD9] text-[#A67A2D]">
                    <Icon size={17} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold text-[#483923]">
                      {position.title}
                    </p>

                    <p className="mt-1 text-[10px] text-[#87785F]">
                      {position.organization}
                    </p>

                    <p className="mt-1.5 text-[9px] text-[#AA9778]">
                      {position.period}
                    </p>
                  </div>

                  {position.active && (
                    <CheckCircle2
                      size={15}
                      className="text-[#A67A2D]"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-center gap-2 border-t border-[#E7D4B0] pt-3">
          <Award size={13} className="shrink-0 text-[#A67A2D]" />

          <p className="text-[9.5px] leading-4 text-[#8E7955]">
            Your official leadership history will appear here.
          </p>
        </div>
      </div>
    </section>
  );
};

/* =========================================================
   COMPACT CLUB ASSOCIATION CARD
========================================================= */

const ClubAssociationCard = ({
  club,
  responsibility = false,
}) => {
  return (
    <article className="group flex min-w-0 items-center gap-2.5 rounded-[11px] border border-[#ECE5E5] bg-[#FDFBFB] px-3 py-2.5 transition-all duration-200 hover:border-[#900505]/20 hover:bg-white hover:shadow-[0_5px_16px_rgba(70,20,20,0.04)]">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-[9px] bg-[#F5E9E9] text-[#900505]">
        {!responsibility && club.image ? (
          <img
            src={club.image}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : responsibility ? (
          <ShieldCheck size={17} strokeWidth={1.8} />
        ) : (
          <Users size={17} strokeWidth={1.8} />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h4
          className="truncate text-[11px] font-bold text-[#3C3030]"
          title={club.name}
        >
          {club.name}
        </h4>

        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="inline-flex items-center gap-1 text-[9px] text-[#918686]">
            <CalendarDays size={10} />
            {club.joined}
          </span>

          <span className="rounded-full bg-[#900505]/[0.06] px-1.5 py-0.5 text-[8.5px] font-semibold text-[#900505]">
            {club.role}
          </span>
        </div>

        {responsibility && (
          <p className="mt-1 text-[9px] font-medium text-[#9C8D8D]">
            {club.type}
          </p>
        )}
      </div>

      <ChevronRight
        size={14}
        className="shrink-0 text-[#B9AFAF] transition-transform group-hover:translate-x-0.5"
      />
    </article>
  );
};

/* =========================================================
   CLUB ASSOCIATIONS
========================================================= */

const ClubAssociations = () => {
  return (
    <section className="rounded-[18px] border border-[#EAE2E2] bg-white px-5 py-4 shadow-[0_8px_28px_rgba(60,20,20,0.035)] sm:px-6">
      <SectionHeading
        compact
        eyebrow="Your Campus Network"
        title="Club Associations"
        description="Memberships and club responsibilities."
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {/* MEMBER CLUBS */}
        <div className="min-w-0">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserRoundCheck size={14} className="text-[#900505]" />

              <h3 className="text-[11px] font-bold text-[#453838]">
                Joined as Member
              </h3>
            </div>

            <span className="rounded-full bg-[#F8EFEF] px-2 py-0.5 text-[9px] font-bold text-[#900505]">
              {memberClubs.length}
            </span>
          </div>

          <div className="space-y-2">
            {memberClubs.map((club) => (
              <ClubAssociationCard
                key={club.id}
                club={club}
              />
            ))}
          </div>
        </div>

        {/* VOLUNTEER & CORE TEAM */}
        <div className="min-w-0 xl:border-l xl:border-[#F0E9E9] xl:pl-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-[#900505]" />

              <h3 className="text-[11px] font-bold text-[#453838]">
                Volunteer & Core Team
              </h3>
            </div>

            <span className="rounded-full bg-[#F8EFEF] px-2 py-0.5 text-[9px] font-bold text-[#900505]">
              {responsibilityClubs.length}
            </span>
          </div>

          <div className="space-y-2">
            {responsibilityClubs.map((club) => (
              <ClubAssociationCard
                key={club.id}
                club={club}
                responsibility
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* =========================================================
   ACHIEVEMENT RANK ICONS
========================================================= */

const RankIcon = ({ rank }) => {
  const styles = {
    1: {
      background: "bg-[#FFF0C8]",
      border: "border-[#E7C16A]",
      text: "text-[#A87512]",
      label: "1st",
    },
    2: {
      background: "bg-[#F0F1F4]",
      border: "border-[#CDD0D8]",
      text: "text-[#737D90]",
      label: "2nd",
    },
    3: {
      background: "bg-[#F7E5D8]",
      border: "border-[#DEB393]",
      text: "text-[#A96D45]",
      label: "3rd",
    },
  };

  const current = styles[rank];

  if (!current) {
    return (
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[11px] bg-[#FFF3D7] text-[#AD7B20]">
        <Trophy size={20} />
      </div>
    );
  }

  return (
    <div
      className={`flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-[11px] border ${current.background} ${current.border} ${current.text}`}
    >
      <Medal size={17} strokeWidth={2} />

      <span className="mt-0.5 text-[9px] font-extrabold leading-none">
        {current.label}
      </span>
    </div>
  );
};

/* =========================================================
   ACTIVITY RECORD CARD
========================================================= */

const ActivityRecordCard = ({ record }) => {
  const isAchievement = record.status === "Achievement";

  const rankLabel =
    record.rank === 1
      ? "1st Position"
      : record.rank === 2
      ? "2nd Position"
      : record.rank === 3
      ? "3rd Position"
      : "Achievement";

  return (
    <article className="group flex min-w-0 items-center gap-3 rounded-[12px] border border-[#ECE5E5] bg-white p-3.5 transition-all duration-200 hover:border-[#900505]/20 hover:shadow-[0_6px_20px_rgba(80,20,20,0.05)]">
      {/* ICON */}
      {isAchievement ? (
        <RankIcon rank={record.rank} />
      ) : (
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[11px] bg-[#F7EFEF] text-[#900505]">
          {record.status === "Registered" ? (
            <ClipboardList size={20} />
          ) : record.status === "Volunteered" ? (
            <Users size={20} />
          ) : record.status === "Coordinated" ? (
            <BriefcaseBusiness size={20} />
          ) : (
            <CalendarCheck2 size={20} />
          )}
        </div>
      )}

      {/* CONTENT */}
      <div className="min-w-0 flex-1">
        <h4
          className="truncate text-[11.5px] font-bold text-[#403434]"
          title={record.title}
        >
          {record.title}
        </h4>

        <p className="mt-1 truncate text-[10px] font-medium text-[#900505]/80">
          {record.club}
        </p>

        <div className="mt-1.5 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[9.5px] text-[#938787]">
            <CalendarDays size={11} />
            {record.date}
          </span>

          <span
            className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${
              isAchievement
                ? "bg-[#FFF1CF] text-[#A27622]"
                : "bg-[#F6EEEE] text-[#900505]"
            }`}
          >
            {isAchievement ? rankLabel : record.status}
          </span>
        </div>
      </div>

      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] border border-[#EFE4E4] text-[#900505]">
        <ArrowUpRight size={15} />
      </span>
    </article>
  );
};

/* =========================================================
   STUDENT ACTIVITY HISTORY
========================================================= */

const StudentActivityHistory = ({
  activeTab,
  setActiveTab,
  sectionRef,
}) => {
  const currentTab = activityTabs.find(
    (tab) => tab.id === activeTab
  );

  const records = activityRecords[activeTab] || [];

  return (
    <section
      ref={sectionRef}
      className="min-w-0 scroll-mt-6 overflow-hidden rounded-[20px] border border-[#EAE2E2] bg-white shadow-[0_8px_28px_rgba(60,20,20,0.035)]"
    >
      {/* SECTION HEADER */}
      <div className="px-5 pb-0 pt-5 sm:px-6">
        <SectionHeading
          eyebrow="Your Journey"
          title="Activity History"
          description="Explore your event participation, contributions and achievements."
        />

        {/* COMPACT ACTIVITY BUTTONS */}
        <div className="overflow-x-auto pb-3">
          <div className="flex min-w-max items-center gap-1.5">
            {activityTabs.map(
              ({ id, label, icon: Icon, special }) => {
                const active = activeTab === id;

                let buttonStyle = "";

                if (special) {
                  buttonStyle = active
                    ? "border-[#C28E27] bg-[#D5A342] text-white shadow-[0_3px_10px_rgba(180,130,30,0.15)]"
                    : "border-[#E6C98C] bg-[#FFF3D8] text-[#A77925] hover:bg-[#FFE9B5]";
                } else {
                  buttonStyle = active
                    ? "border-[#900505] bg-[#900505] text-white shadow-[0_3px_10px_rgba(144,5,5,0.12)]"
                    : "border-[#EAE1E1] bg-[#FDFBFB] text-[#766A6A] hover:border-[#900505]/25 hover:text-[#900505]";
                }

                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveTab(id)}
                    aria-pressed={active}
                    className={`inline-flex h-[34px] shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-[9px] border px-2.5 text-[10px] font-semibold transition-all duration-200 ${buttonStyle}`}
                  >
                    <Icon size={12.5} strokeWidth={2} />

                    <span>{label}</span>

                    <span
                      className={`rounded-[4px] px-1 py-0.5 text-[8px] font-bold ${
                        active
                          ? "bg-white/20"
                          : special
                          ? "bg-[#F7E3B7]"
                          : "bg-[#F1E9E9]"
                      }`}
                    >
                      {(activityRecords[id] || []).length}
                    </span>
                  </button>
                );
              }
            )}
          </div>
        </div>
      </div>

      {/* ACTIVITY CONTENT */}
      <div className="border-t border-[#F0E8E8] bg-[#FDFBFB] p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-[12px] font-bold text-[#3D3131]">
              {currentTab?.label} Records
            </h3>

            <p className="mt-1 text-[10px] text-[#998E8E]">
              {records.length} records available
            </p>
          </div>

          <span className="rounded-full border border-[#E9DEDE] bg-white px-2.5 py-1.5 text-[9px] font-medium text-[#817474]">
            All Records
          </span>
        </div>

        {records.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
            {records.map((record) => (
              <ActivityRecordCard
                key={record.id}
                record={record}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[180px] flex-col items-center justify-center rounded-[13px] border border-dashed border-[#E7DADA] bg-white p-6 text-center">
            <ClipboardList
              size={23}
              className="text-[#B89A9A]"
            />

            <h4 className="mt-3 text-[12px] font-semibold text-[#514343]">
              No records found
            </h4>

            <p className="mt-1 text-[11px] text-[#A09393]">
              Your activity records will appear here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

/* =========================================================
   MAIN STUDENT PROFILE DASHBOARD
========================================================= */

const StudentProfileDashboard = () => {
  const [activeTab, setActiveTab] = useState("participated");

  const activitySectionRef = useRef(null);

  const handleAchievementsClick = () => {
    setActiveTab("achievements");

    activitySectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#F7F4F4]">
      {/* =====================================================
          TOP NAVBAR
      ===================================================== */}
      <header className="border-b border-[#750404] bg-[#790505]">
        <div className="mx-auto flex min-h-[76px] max-w-[1600px] flex-wrap items-center justify-between gap-3 px-5 py-3 sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-[11px] border border-white/15 bg-white/10">
              <GraduationCap size={19} className="text-white" />
            </div>

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/50">
                Orbix Student Portal
              </p>

              <h1 className="text-[17px] font-semibold text-white">
                My Student Profile
              </h1>
            </div>
          </div>

          <Link
            to="/studentpage"
            className="inline-flex h-9 items-center gap-2 rounded-[9px] border border-white/15 bg-white/10 px-3.5 text-[11px] font-semibold text-white transition-colors hover:bg-white/20"
          >
            <ArrowLeft size={15} />
            Back to Home
          </Link>
        </div>
      </header>

      {/* =====================================================
          PAGE CONTENT
      ===================================================== */}
      <main className="mx-auto w-full max-w-[1600px] px-4 pb-12 pt-7 sm:px-6 lg:px-10">
        {/* =================================================
            PAGE INTRO + POINTS & ACHIEVEMENTS
        ================================================= */}
        <div className="mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-center">
          {/* LEFT HEADING */}
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#900505]" />

              <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#900505]/65">
                Student Workspace
              </p>
            </div>

            <h2 className="text-[25px] font-bold tracking-[-0.03em] text-[#302525] sm:text-[29px]">
              Your Campus Journey
            </h2>

            <p className="mt-2 max-w-[620px] text-[12px] leading-5 text-[#8C8181]">
              View your academic profile, club memberships,
              leadership positions, event contributions and
              achievements in one place.
            </p>
          </div>

          {/* TOP RIGHT STATS */}
          <TopStats
            onAchievementsClick={handleAchievementsClick}
          />
        </div>

        {/* =================================================
            MAIN DASHBOARD GRID
        ================================================= */}
        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[285px_minmax(0,1fr)] xl:grid-cols-[310px_minmax(0,1fr)]">
          {/* LEFT PROFILE */}
          <aside className="flex min-w-0 flex-col gap-5">
            <StudentInfoPanel />

            <StudentPositionPanel />
          </aside>

          {/* RIGHT DASHBOARD */}
          <div className="flex min-w-0 flex-col gap-5">
            <ClubAssociations />

            <StudentActivityHistory
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              sectionRef={activitySectionRef}
            />
          </div>
        </div>

        {/* FOOTER */}
        <p className="mt-7 text-center text-[10px] text-[#A39999]">
          Orbix Student Portal · Student activity and engagement records
        </p>
      </main>
    </div>
  );
};

export default StudentProfileDashboard;
