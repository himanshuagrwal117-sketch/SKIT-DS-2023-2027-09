import React, { useEffect, useState } from "react";
import {
  Users,
  UserRoundPlus,
  ArrowRight,
  GraduationCap,
  Heart,
  Clock3,
  CheckCircle2,
  Plus,
  Sparkles,
  X,
  Info,
  BriefcaseBusiness,
  Pencil,
  LogOut,
} from "lucide-react";

const WelcomePanel = () => {

  // =====================================================
  // LOGGED-IN STUDENT
  // =====================================================
  const [user, setUser] = useState({
    name: "",
    email: "",
    studentId: "",
  });

  const [loading, setLoading] = useState(true);


  // =====================================================
  // CLUB EDITING AVAILABILITY
  //
  // true  = testing / editing allowed
  // false = editing restricted
  //
  // Later this value should come from backend.
  // =====================================================
  const CLUB_EDITING_ALLOWED = true;


  // =====================================================
  // JOINED CLUBS
  // Maximum 2 = Major + Minor
  // =====================================================
  const [joinedClubs, setJoinedClubs] = useState([
    {
      id: 1,
      name: "CodeFiesta",
      interest: "Major Interest",

      upcoming: {
        id: "meeting-1",
        type: "Meeting",
        name: "Core Team Meeting",
        attending: false,
      },
    },

    {
      id: 2,
      name: "Toastmasters Club",
      interest: "Minor Interest",

      upcoming: {
        id: "event-1",
        type: "Event",
        name: "SpeakSphere",
        attending: false,
      },
    },
  ]);


  // =====================================================
  // VOLUNTEER CLUB
  // Maximum 1
  // =====================================================
  const [volunteerClub, setVolunteerClub] = useState({
    id: 3,
    name: "Photography Club",
    role: "Graphic Designer",

    upcoming: {
      id: "volunteer-event-1",
      type: "Event",
      name: "Campus Photo Walk",
      attending: false,
    },
  });


  // =====================================================
  // ACTIVITY POPUP
  // =====================================================
  const [popupData, setPopupData] = useState(null);


  // =====================================================
  // EDIT MODE
  // =====================================================
  const [editMode, setEditMode] = useState(false);


  // =====================================================
  // EDIT RESTRICTION MESSAGE
  // =====================================================
  const [editRestrictionMessage, setEditRestrictionMessage] = useState(false);


  // =====================================================
  // LEAVE CLUB POPUP
  // =====================================================
  const [leaveClubData, setLeaveClubData] = useState(null);

  const [leaveReason, setLeaveReason] = useState("");

  const [leaveSuggestion, setLeaveSuggestion] = useState("");


  // =====================================================
  // CLUB LIMITS
  // =====================================================
  const MAX_JOINED_CLUBS = 2;

  const canJoinClub = joinedClubs.length < MAX_JOINED_CLUBS;

  const canJoinVolunteer = !volunteerClub;


  // =====================================================
  // SECTION PATHS
  // =====================================================
  const CLUB_SECTION_PATH = "#about-clubs";

  // CHANGE THIS LATER
  const VOLUNTEER_SECTION_PATH = "#volunteer-clubs";


  // =====================================================
  // GET LOGGED-IN USER
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
          studentId: data.studentId || data.email?.split("@")[0] || "",
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


  // =====================================================
  // NAVIGATION
  // =====================================================
  const goToClubSection = () => {

    if (!canJoinClub) return;

    window.location.href = CLUB_SECTION_PATH;

  };


  const goToVolunteerSection = () => {

    if (!canJoinVolunteer) return;

    window.location.href = VOLUNTEER_SECTION_PATH;

  };


  // =====================================================
  // EDIT CLUBS
  // =====================================================
  const handleEditClubs = () => {

    if (!CLUB_EDITING_ALLOWED) {

      setEditRestrictionMessage(true);

      return;

    }


    setEditMode((previous) => !previous);

  };


  // =====================================================
  // OPEN LEAVE CLUB POPUP
  // =====================================================
  const openLeaveClubPopup = (type, club) => {

    setLeaveReason("");

    setLeaveSuggestion("");


    setLeaveClubData({
      type: type,
      id: club.id,
      name: club.name,
    });

  };


  // =====================================================
  // CLOSE LEAVE CLUB POPUP
  // =====================================================
  const closeLeaveClubPopup = () => {

    setLeaveClubData(null);

    setLeaveReason("");

    setLeaveSuggestion("");

  };


  // =====================================================
  // CONFIRM LEAVE CLUB
  // =====================================================
  const confirmLeaveClub = () => {

    if (!leaveClubData) return;


    if (!leaveReason.trim() || !leaveSuggestion.trim()) {
      return;
    }


    // MEMBER CLUB
    if (leaveClubData.type === "member") {

      setJoinedClubs((previousClubs) =>
        previousClubs.filter(
          (club) => club.id !== leaveClubData.id
        )
      );

    }


    // VOLUNTEER CLUB
    if (leaveClubData.type === "volunteer") {

      setVolunteerClub(null);

    }


    closeLeaveClubPopup();

  };


  // =====================================================
  // OPEN MEMBER ACTIVITY POPUP
  // =====================================================
  const openMemberActivityPopup = (club) => {

    if (!club.upcoming) return;


    setPopupData({
      source: "member",
      clubId: club.id,
      clubName: club.name,
      role: null,
      activity: club.upcoming,
    });

  };


  // =====================================================
  // OPEN VOLUNTEER ACTIVITY POPUP
  // =====================================================
  const openVolunteerActivityPopup = () => {

    if (!volunteerClub?.upcoming) return;


    setPopupData({
      source: "volunteer",
      clubId: volunteerClub.id,
      clubName: volunteerClub.name,
      role: volunteerClub.role,
      activity: volunteerClub.upcoming,
    });

  };


  // =====================================================
  // CLOSE ACTIVITY POPUP
  // =====================================================
  const closePopup = () => {

    setPopupData(null);

  };


  // =====================================================
  // CONFIRM EVENT / MEETING
  // =====================================================
  const confirmActivity = () => {

    if (!popupData) return;


    // MEMBER CLUB
    if (popupData.source === "member") {

      setJoinedClubs((previousClubs) =>
        previousClubs.map((club) => {

          if (club.id !== popupData.clubId) {
            return club;
          }


          return {
            ...club,

            upcoming: {
              ...club.upcoming,
              attending: true,
            },
          };

        })
      );

    }


    // VOLUNTEER CLUB
    if (popupData.source === "volunteer") {

      setVolunteerClub((previousClub) => {

        if (!previousClub) return previousClub;


        return {
          ...previousClub,

          upcoming: {
            ...previousClub.upcoming,
            attending: true,
          },
        };

      });

    }


    closePopup();

  };


  // =====================================================
  // MEMBER ACTION TEXT
  // =====================================================
  const getMemberButtonText = (activity) => {

    if (!activity) return "";


    if (activity.attending) {

      if (activity.type === "Meeting") {
        return "Attending Meeting";
      }


      return "You are attending this event";

    }


    if (activity.type === "Meeting") {
      return "Attend Meeting";
    }


    return "Register for Event";

  };


  // =====================================================
  // COMPONENT
  // =====================================================
  return (
    <section className="relative w-full min-h-[590px] overflow-hidden rounded-[28px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">


      {/* ================= BACKGROUND ================= */}
      <img
        src="/images/bg3.png"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.055]"
      />

      <div className="pointer-events-none absolute -left-32 -top-32 h-[350px] w-[350px] rounded-full bg-[#983530]/5 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 right-[25%] h-[400px] w-[400px] rounded-full bg-[#983530]/5 blur-3xl" />


      {/* ================= MAIN GRID ================= */}
      <div className="relative z-10 grid min-h-[590px] w-full grid-cols-[42%_58%]">


        {/* =====================================================
            LEFT — STUDENT INFORMATION
        ===================================================== */}
        <div className="relative flex flex-col justify-center px-10 py-10 xl:px-12">


          {/* ================= CLEAR SEPARATOR ================= */}
          <div className="absolute bottom-9 right-0 top-9 w-[2px] rounded-full bg-gradient-to-b from-transparent via-[#983530]/25 to-transparent" />


          {/* LABEL */}
          <div className="mb-4 flex items-center gap-3">

            <span className="h-[2px] w-7 rounded-full bg-[#983530]" />

            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#983530]">
              Student Dashboard
            </p>

          </div>


          {/* WELCOME */}
          <div>

            <h1 className="text-[38px] font-semibold leading-[1.08] tracking-[-0.035em] text-[#1f1f1f] xl:text-[42px]">
              Welcome to JoinSphere,
            </h1>

            <h2 className="mt-1 min-h-[46px] text-[38px] font-semibold leading-[1.08] tracking-[-0.035em] text-[#983530] xl:text-[42px]">
              {loading ? "Welcome!" : user.name}
            </h2>

          </div>


          {/* STUDENT INFO */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-[14px] font-medium text-[#777]">

            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#983530]" />

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

            <span>
              {loading
                ? "Loading student information..."
                : user.email}
            </span>

          </div>


          {/* DESCRIPTION */}
          <p className="mt-6 max-w-[500px] text-[15px] font-normal leading-[1.7] text-[#606060]">
            Discover communities that match your interests, stay connected with your clubs and keep track of upcoming meetings, activities and events.
          </p>


          {/* ================= MEMBERSHIP SUMMARY ================= */}
          <div className="mt-7 grid grid-cols-2 gap-3">


            {/* INTEREST CLUBS */}
            <div className="rounded-[14px] border border-black/[0.05] bg-[#f8f7f6] p-4">

              <div className="mb-2.5 flex items-center justify-between">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#983530]/10 text-[#983530]">
                  <GraduationCap size={18} />
                </div>

                <span className="text-[13px] font-bold text-[#983530]">
                  {joinedClubs.length}/{MAX_JOINED_CLUBS}
                </span>

              </div>

              <p className="text-[15px] font-semibold text-[#333]">
                Interest Clubs
              </p>

              <p className="mt-0.5 text-[12px] text-[#999]">
                Major + Minor
              </p>

            </div>


            {/* VOLUNTEER CLUB */}
            <div className="rounded-[14px] border border-black/[0.05] bg-[#f8f7f6] p-4">

              <div className="mb-2.5 flex items-center justify-between">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#983530]/10 text-[#983530]">
                  <Users size={17} />
                </div>

                <span className="text-[13px] font-bold text-[#983530]">
                  {volunteerClub ? "1/1" : "0/1"}
                </span>

              </div>

              <p className="text-[15px] font-semibold text-[#333]">
                Volunteer Club
              </p>

              <p className="mt-0.5 text-[12px] text-[#999]">
                One club maximum
              </p>

            </div>

          </div>

        </div>



        {/* =====================================================
            RIGHT — CLUB DASHBOARD
        ===================================================== */}
        <div className="flex flex-col justify-center px-8 py-8 xl:px-10">


          {/* ================= RIGHT HEADER ================= */}
          <div className="mb-5 flex items-end justify-between gap-4">

            <div>

              <div className="mb-1.5 flex items-center gap-2">

                <Heart
                  size={15}
                  className="text-[#983530]"
                />

                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#983530]">
                  Your Communities
                </p>

              </div>


              <h3 className="text-[25px] font-semibold tracking-[-0.025em] text-[#252525]">
                My Clubs
              </h3>

            </div>



            {/* ================= EDIT CLUB BUTTON ================= */}
            <div className="flex items-center gap-2">

              <div className="rounded-full bg-[#983530]/8 px-3.5 py-2 text-[12px] font-semibold text-[#983530]">
                {joinedClubs.length + (volunteerClub ? 1 : 0)} Active
              </div>


              <button
                type="button"
                onClick={handleEditClubs}
                className={`flex h-[38px] items-center gap-2 rounded-[9px] px-4 text-[12px] font-semibold transition-all duration-200 ${
                  editMode
                    ? "bg-[#983530] text-white"
                    : "border border-[#983530]/20 bg-[#983530]/5 text-[#983530] hover:bg-[#983530] hover:text-white"
                }`}
              >

                {editMode ? (
                  <>
                    <CheckCircle2 size={15} />
                    Done Editing
                  </>
                ) : (
                  <>
                    <Pencil size={14} />
                    Edit Clubs
                  </>
                )}

              </button>

            </div>

          </div>



          {/* ================= EDIT MODE INFORMATION ================= */}
          {editMode && (

            <div className="mb-3 flex items-center justify-between rounded-[10px] border border-[#983530]/10 bg-[#983530]/5 px-4 py-2.5">

              <p className="text-[12px] font-medium text-[#6b5553]">
                Editing mode is active. Select the exit icon beside a club if you want to leave it.
              </p>

              <span className="ml-3 shrink-0 text-[10px] font-bold uppercase tracking-[0.1em] text-[#983530]">
                Editing
              </span>

            </div>

          )}



          {/* =====================================================
              JOINED CLUBS
          ===================================================== */}
          <div className="overflow-hidden rounded-[18px] border border-black/[0.06] bg-white shadow-[0_6px_25px_rgba(0,0,0,0.04)]">


            {/* HEADER */}
            <div className="flex items-center justify-between border-b border-black/[0.05] bg-[#faf9f8] px-4 py-3.5">

              <div>

                <p className="text-[15px] font-semibold text-[#333]">
                  Joined Clubs
                </p>

                <p className="mt-0.5 text-[12px] text-[#999]">
                  Major & Minor interests
                </p>

              </div>


              <span className="text-[13px] font-semibold text-[#777]">
                {joinedClubs.length}/{MAX_JOINED_CLUBS}
              </span>

            </div>



            {/* ================= CLUB LIST ================= */}
            <div className="divide-y divide-black/[0.05]">

              {joinedClubs.length > 0 ? (

                joinedClubs.map((club) => (

                  <div
                    key={club.id}
                    className="flex min-h-[86px] items-center justify-between gap-3 px-4 py-3.5"
                  >


                    {/* CLUB INFORMATION */}
                    <div className="flex min-w-0 items-center gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#983530]/10 text-[#983530]">
                        <GraduationCap size={19} />
                      </div>


                      <div className="min-w-0">

                        <p className="truncate text-[15px] font-semibold text-[#333]">
                          {club.name}
                        </p>

                        <p className="mt-0.5 text-[12px] font-medium text-[#983530]">
                          {club.interest}
                        </p>

                      </div>

                    </div>



                    {/* =================================================
                        NORMAL MODE — ACTIVITY INFORMATION
                    ================================================= */}
                    {!editMode && club.upcoming && (

                      <div className="ml-auto flex min-w-[285px] max-w-[330px] items-center justify-between gap-3 rounded-[11px] bg-[#f7f6f5] px-3.5 py-2.5">


                        {/* ACTIVITY */}
                        <div className="min-w-0">

                          <div className="mb-0.5 flex items-center gap-1.5">

                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#2f9e62]" />

                            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#777]">
                              {club.upcoming.type}
                            </p>

                          </div>


                          <p className="truncate text-[13px] font-semibold text-[#444]">
                            {club.upcoming.name}
                          </p>

                        </div>



                        {/* ACTIVITY ACTION */}
                        {club.upcoming.attending ? (

                          <button
                            type="button"
                            onClick={() =>
                              openMemberActivityPopup(club)
                            }
                            className="flex shrink-0 items-center gap-1 rounded-lg bg-[#e9f7ef] px-3 py-2 text-[11px] font-semibold text-[#26844e]"
                          >

                            <CheckCircle2 size={13} />

                            {club.upcoming.type === "Meeting"
                              ? "Attending"
                              : "Registered"}

                          </button>

                        ) : (

                          <button
                            type="button"
                            onClick={() =>
                              openMemberActivityPopup(club)
                            }
                            className="shrink-0 rounded-lg bg-[#983530] px-3 py-2 text-[11px] font-semibold text-white transition-colors duration-200 hover:bg-[#842c28]"
                          >

                            {getMemberButtonText(
                              club.upcoming
                            )}

                          </button>

                        )}

                      </div>

                    )}



                    {/* ================= NO ACTIVITY ================= */}
                    {!editMode && !club.upcoming && (

                      <div className="ml-auto flex items-center gap-1.5 text-[12px] font-medium text-[#aaa]">

                        <Clock3 size={14} />

                        No upcoming activity

                      </div>

                    )}



                    {/* =================================================
                        EDIT MODE — LEAVE ONLY
                    ================================================= */}
                    {editMode && (

                      <button
                        type="button"
                        title={`Leave ${club.name}`}
                        onClick={() =>
                          openLeaveClubPopup(
                            "member",
                            club
                          )
                        }
                        className="ml-auto flex h-10 items-center justify-center gap-2 rounded-[9px] border border-[#983530]/15 bg-[#983530]/5 px-3.5 text-[12px] font-semibold text-[#983530] transition-colors duration-200 hover:bg-[#983530] hover:text-white"
                      >

                        <LogOut size={15} />

                        Leave Club

                      </button>

                    )}

                  </div>

                ))

              ) : (

                <div className="flex min-h-[90px] items-center justify-center px-4 text-center">

                  <p className="text-[13px] text-[#999]">
                    You haven't joined an interest club yet.
                  </p>

                </div>

              )}

            </div>



            {/* =====================================================
                JOIN CLUB
                HIDDEN COMPLETELY WHILE EDITING
            ===================================================== */}
            {!editMode && (

              <div className="border-t border-black/[0.05] bg-[#faf9f8] p-3">

                <button
                  type="button"
                  disabled={!canJoinClub}
                  onClick={goToClubSection}
                  className={`group flex h-[42px] w-full items-center justify-center gap-2 rounded-[10px] text-[13px] font-semibold transition-all duration-200 ${
                    canJoinClub
                      ? "bg-[#983530] text-white hover:bg-[#842c28]"
                      : "cursor-not-allowed bg-[#e8e8e8] text-[#aaa]"
                  }`}
                >

                  {canJoinClub ? (

                    <>
                      <Plus size={16} />

                      {joinedClubs.length === 0
                        ? "Join a Club"
                        : "Join Another Club"}

                      <ArrowRight
                        size={15}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </>

                  ) : (

                    <>
                      <CheckCircle2 size={16} />
                      Club Limit Reached
                    </>

                  )}

                </button>

              </div>

            )}

          </div>



          {/* =====================================================
              VOLUNTEER CLUB
          ===================================================== */}
          <div className="mt-3 overflow-hidden rounded-[18px] border border-black/[0.06] bg-white shadow-[0_6px_25px_rgba(0,0,0,0.04)]">


            {/* HEADER */}
            <div className="flex items-center justify-between border-b border-black/[0.05] bg-[#faf9f8] px-4 py-3">

              <div className="flex items-center gap-2">

                <Sparkles
                  size={15}
                  className="text-[#983530]"
                />

                <div>

                  <p className="text-[14px] font-semibold text-[#333]">
                    Volunteer Club
                  </p>

                  <p className="text-[11px] text-[#999]">
                    Different from your Major & Minor clubs
                  </p>

                </div>

              </div>


              <span className="text-[12px] font-semibold text-[#777]">
                {volunteerClub ? "1/1" : "0/1"}
              </span>

            </div>



            {/* ================= VOLUNTEER EXISTS ================= */}
            {volunteerClub ? (

              <div className="flex min-h-[84px] items-center justify-between gap-3 px-4 py-3.5">


                {/* VOLUNTEER CLUB INFO */}
                <div className="flex min-w-0 items-center gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#983530] text-white">
                    <Users size={18} />
                  </div>


                  <div className="min-w-0">

                    <p className="truncate text-[15px] font-semibold text-[#333]">
                      {volunteerClub.name}
                    </p>


                    <div className="mt-1 flex items-center gap-1.5 text-[#983530]">

                      <BriefcaseBusiness size={12} />

                      <p className="text-[12px] font-semibold">
                        {volunteerClub.role}
                      </p>

                    </div>

                  </div>

                </div>



                {/* =================================================
                    NORMAL MODE — VOLUNTEER ACTIVITY
                ================================================= */}
                {!editMode && volunteerClub.upcoming && (

                  <div className="ml-auto flex min-w-[285px] max-w-[330px] items-center justify-between gap-3 rounded-[11px] bg-[#f7f6f5] px-3.5 py-2.5">


                    <div className="min-w-0">

                      <div className="mb-0.5 flex items-center gap-1.5">

                        <span className="h-1.5 w-1.5 rounded-full bg-[#2f9e62]" />

                        <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#777]">
                          {volunteerClub.upcoming.type}
                        </p>

                      </div>


                      <p className="truncate text-[13px] font-semibold text-[#444]">
                        {volunteerClub.upcoming.name}
                      </p>

                    </div>



                    {volunteerClub.upcoming.attending ? (

                      <button
                        type="button"
                        onClick={
                          openVolunteerActivityPopup
                        }
                        className="flex shrink-0 items-center gap-1 rounded-lg bg-[#e9f7ef] px-3 py-2 text-[11px] font-semibold text-[#26844e]"
                      >

                        <CheckCircle2 size={13} />

                        Attending

                      </button>

                    ) : (

                      <button
                        type="button"
                        onClick={
                          openVolunteerActivityPopup
                        }
                        className="shrink-0 rounded-lg bg-[#983530] px-3 py-2 text-[11px] font-semibold text-white transition-colors duration-200 hover:bg-[#842c28]"
                      >

                        View & Attend

                      </button>

                    )}

                  </div>

                )}



                {/* ================= NO UPCOMING ================= */}
                {!editMode && !volunteerClub.upcoming && (

                  <div className="ml-auto flex items-center gap-1.5 text-[12px] font-medium text-[#aaa]">

                    <Clock3 size={14} />

                    No upcoming activity

                  </div>

                )}



                {/* =================================================
                    EDIT MODE — VOLUNTEER LEAVE
                ================================================= */}
                {editMode && (

                  <button
                    type="button"
                    title={`Leave ${volunteerClub.name}`}
                    onClick={() =>
                      openLeaveClubPopup(
                        "volunteer",
                        volunteerClub
                      )
                    }
                    className="ml-auto flex h-10 items-center justify-center gap-2 rounded-[9px] border border-[#983530]/15 bg-[#983530]/5 px-3.5 text-[12px] font-semibold text-[#983530] transition-colors duration-200 hover:bg-[#983530] hover:text-white"
                  >

                    <LogOut size={15} />

                    Leave Volunteer Club

                  </button>

                )}

              </div>

            ) : (

              /* =================================================
                  NO VOLUNTEER CLUB
              ================================================= */
              !editMode && (

                <div className="p-3">

                  <button
                    type="button"
                    onClick={
                      goToVolunteerSection
                    }
                    disabled={
                      !canJoinVolunteer
                    }
                    className="group flex h-[42px] w-full items-center justify-center gap-2 rounded-[10px] border border-[#983530] bg-white text-[13px] font-semibold text-[#983530] transition-colors duration-200 hover:bg-[#983530] hover:text-white"
                  >

                    <UserRoundPlus size={16} />

                    Apply as Volunteer

                    <ArrowRight
                      size={15}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />

                  </button>

                </div>

              )

            )}

          </div>

        </div>

      </div>



      {/* =====================================================
          EDIT RESTRICTION POPUP
      ===================================================== */}
      {editRestrictionMessage && (

        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40">

          <div className="w-[420px] rounded-[18px] bg-white p-6">


            <div className="flex justify-end">

              <button
                type="button"
                onClick={() =>
                  setEditRestrictionMessage(false)
                }
              >

                <X size={21} />

              </button>

            </div>


            <p className="text-[18px] font-semibold text-[#333]">
              Club editing is currently unavailable
            </p>


            <p className="mt-2 text-[14px] leading-6 text-[#777]">
              You can edit your club list only at the end of the academic year.
            </p>


            <button
              type="button"
              onClick={() =>
                setEditRestrictionMessage(false)
              }
              className="mt-5 rounded-lg bg-[#983530] px-5 py-2.5 text-[13px] font-semibold text-white"
            >

              Okay

            </button>

          </div>

        </div>

      )}



      {/* =====================================================
          LEAVE CLUB POPUP
      ===================================================== */}
      {leaveClubData && (

        <div className="fixed inset-0 z-[1001] flex items-center justify-center bg-black/40">

          <div className="w-[500px] rounded-[18px] bg-white p-6">


            {/* POPUP HEADER */}
            <div className="flex items-start justify-between">

              <div>

                <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#983530]">
                  Leave Club
                </p>


                <h3 className="mt-1 text-[22px] font-semibold text-[#292929]">
                  Leave {leaveClubData.name}?
                </h3>

              </div>


              <button
                type="button"
                onClick={
                  closeLeaveClubPopup
                }
              >

                <X size={21} />

              </button>

            </div>


            <p className="mt-3 text-[14px] leading-6 text-[#777]">
              Before leaving the club, please tell us why you want to leave and share a suggestion that may help the club improve.
            </p>



            {/* ================= REASON ================= */}
            <div className="mt-5">

              <label className="mb-2 block text-[14px] font-semibold text-[#444]">
                Reason for leaving
              </label>


              <textarea
                value={leaveReason}
                onChange={(event) =>
                  setLeaveReason(
                    event.target.value
                  )
                }
                placeholder="Tell us why you want to leave this club..."
                className="min-h-[90px] w-full resize-none rounded-[10px] border border-black/10 px-3 py-2.5 text-[13px] text-[#444] outline-none transition-colors focus:border-[#983530]"
              />

            </div>



            {/* ================= SUGGESTION ================= */}
            <div className="mt-4">

              <label className="mb-2 block text-[14px] font-semibold text-[#444]">
                Suggestion for the club
              </label>


              <textarea
                value={leaveSuggestion}
                onChange={(event) =>
                  setLeaveSuggestion(
                    event.target.value
                  )
                }
                placeholder="Share a suggestion for improvement..."
                className="min-h-[90px] w-full resize-none rounded-[10px] border border-black/10 px-3 py-2.5 text-[13px] text-[#444] outline-none transition-colors focus:border-[#983530]"
              />

            </div>



            {/* ================= POPUP ACTIONS ================= */}
            <div className="mt-5 flex justify-end gap-2">

              <button
                type="button"
                onClick={
                  closeLeaveClubPopup
                }
                className="rounded-lg border border-black/10 px-4 py-2.5 text-[13px] font-semibold text-[#555]"
              >

                Cancel

              </button>


              <button
                type="button"
                disabled={
                  !leaveReason.trim() ||
                  !leaveSuggestion.trim()
                }
                onClick={
                  confirmLeaveClub
                }
                className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-semibold ${
                  leaveReason.trim() &&
                  leaveSuggestion.trim()
                    ? "bg-[#983530] text-white hover:bg-[#842c28]"
                    : "cursor-not-allowed bg-[#e8e8e8] text-[#aaa]"
                }`}
              >

                <LogOut size={15} />

                Confirm Leave

              </button>

            </div>

          </div>

        </div>

      )}



      {/* =====================================================
          EVENT / MEETING POPUP

          FUNCTIONALITY ONLY.
          FINAL UI WILL BE DESIGNED LATER.
      ===================================================== */}
      {popupData && (

        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40">

          <div className="w-[500px] bg-white p-6">


            <div className="flex justify-end">

              <button
                type="button"
                onClick={
                  closePopup
                }
              >

                <X size={21} />

              </button>

            </div>


            <div className="text-[14px] leading-7 text-[#444]">

              <Info
                size={22}
                className="mb-3"
              />


              <p>
                Club: {popupData.clubName}
              </p>


              {popupData.role && (

                <p>
                  Volunteer Role: {popupData.role}
                </p>

              )}


              <p>
                Type: {popupData.activity.type}
              </p>


              <p>
                Name: {popupData.activity.name}
              </p>


              {/* =========================================
                  COMPLETE EVENT / MEETING DATA
                  WILL COME FROM UPCOMING STORAGE LATER.

                  FINAL POPUP UI WILL ALSO BE DESIGNED
                  SEPARATELY.
              ========================================= */}


              {!popupData.activity.attending && (

                <button
                  type="button"
                  onClick={
                    confirmActivity
                  }
                  className="mt-4 rounded-lg bg-[#983530] px-4 py-2.5 text-[13px] font-semibold text-white"
                >

                  {popupData.source === "member" &&
                  popupData.activity.type === "Event"
                    ? "Register for Event"
                    : popupData.activity.type === "Meeting"
                    ? "Attend Meeting"
                    : "Attend Event"}

                </button>

              )}


              {popupData.activity.attending && (

                <p className="mt-4 font-semibold text-[#26844e]">
                  You are attending this{" "}
                  {popupData.activity.type.toLowerCase()}.
                </p>

              )}

            </div>

          </div>

        </div>

      )}

    </section>
  );
};

export default WelcomePanel;