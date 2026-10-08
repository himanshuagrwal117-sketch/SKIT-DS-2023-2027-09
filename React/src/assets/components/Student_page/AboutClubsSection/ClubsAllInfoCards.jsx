import React, { useEffect, useMemo, useState } from "react";
import {
  Users,
  PartyPopper,
  CircleStar,
  Phone,
  Images,
  Linkedin,
  Instagram,
  Globe,
  University,
  Plus,
  UserStar,
  CircleCheck,
  ArrowUpRight,
  GraduationCap,
  UserRound,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ClubsAllInfoCards = ({
  id,
  clubname,
  memebers,
  events,
  volunteers,
  cat,
  stars,
  about,
  faculty,
  student,
  url,
  logo,
  gallery = [],
  Joined,
  Volunteer,
}) => {

  // =====================================================
  // TEMPORARY STUDENT COORDINATOR DETAILS
  //
  // Later these values will come from ClubDetailedInfo.
  // =====================================================
  const STUDENT_COORDINATOR_1_YEAR = "3rd Year";
  const STUDENT_COORDINATOR_1_BRANCH = "CSE";

  const STUDENT_COORDINATOR_2_YEAR = "3rd Year";
  const STUDENT_COORDINATOR_2_BRANCH = "CSE";


  // =====================================================
  // ABOUT WORD LIMIT
  // =====================================================
  const ABOUT_WORD_LIMIT = 42;


  // =====================================================
  // CATEGORY STYLES
  // =====================================================
  const categoryStyles = {
    Tech: "bg-[#eaf1ff] text-[#315fa8]",
    Cultural: "bg-[#f5eafa] text-[#86449c]",
    Social: "bg-[#e8f6ee] text-[#347a54]",
    Literary: "bg-[#fff0e5] text-[#a45d2e]",
    Artistic: "bg-[#fff4dd] text-[#946719]",
  };


  // =====================================================
  // ABOUT TEXT WORD LIMIT
  // =====================================================
  const limitedAbout = useMemo(() => {

    if (!about) {
      return "Club information will be available soon.";
    }

    const words = about.trim().split(/\s+/);

    if (words.length <= ABOUT_WORD_LIMIT) {
      return about;
    }

    return `${words.slice(0, ABOUT_WORD_LIMIT).join(" ")}...`;

  }, [about]);


  // =====================================================
  // FACULTY COORDINATORS
  // Maximum 2
  // =====================================================
  const facultyCoordinators = Array.isArray(faculty)
    ? faculty.slice(0, 2)
    : faculty
    ? [faculty]
    : [];


  // =====================================================
  // STUDENT COORDINATORS
  // Maximum 2
  // =====================================================
  const studentCoordinators = Array.isArray(student)
    ? student.slice(0, 2)
    : student
    ? [student]
    : [];


  // =====================================================
  // GALLERY / SLIDESHOW
  //
  // FIRST SLIDE:
  // Club logo
  //
  // NEXT SLIDES:
  // Gallery images
  //
  // For now "url" is used as fallback for logo because
  // current storage may not contain separate logo variable.
  //
  // Once storage is updated:
  //
  // logo: "/images/codefiesta-logo.png"
  //
  // gallery: [
  //   "/images/codefiesta-1.jpg",
  //   "/images/codefiesta-2.jpg",
  //   "/images/codefiesta-3.jpg"
  // ]
  // =====================================================
  const slideshowImages = useMemo(() => {

    const images = [];

    const clubLogo = logo || url;

    if (clubLogo) {
      images.push({
        type: "logo",
        src: clubLogo,
      });
    }

    if (Array.isArray(gallery)) {

      gallery.forEach((image) => {

        if (image) {
          images.push({
            type: "gallery",
            src: image,
          });
        }

      });

    }

    return images;

  }, [logo, url, gallery]);


  // =====================================================
  // CURRENT SLIDE
  // =====================================================
  const [currentSlide, setCurrentSlide] = useState(0);


  // =====================================================
  // RESET SLIDE WHEN CLUB CHANGES
  // =====================================================
  useEffect(() => {

    setCurrentSlide(0);

  }, [id]);


  // =====================================================
  // AUTO SLIDESHOW
  // =====================================================
  useEffect(() => {

    if (slideshowImages.length <= 1) {
      return;
    }

    const interval = setInterval(() => {

      setCurrentSlide((previousSlide) => {

        if (previousSlide === slideshowImages.length - 1) {
          return 0;
        }

        return previousSlide + 1;

      });

    }, 3500);

    return () => clearInterval(interval);

  }, [slideshowImages.length]);


  // =====================================================
  // PREVIOUS SLIDE
  // =====================================================
  const previousSlide = () => {

    if (slideshowImages.length <= 1) {
      return;
    }

    setCurrentSlide((previousSlideIndex) => {

      if (previousSlideIndex === 0) {
        return slideshowImages.length - 1;
      }

      return previousSlideIndex - 1;

    });

  };


  // =====================================================
  // NEXT SLIDE
  // =====================================================
  const nextSlide = () => {

    if (slideshowImages.length <= 1) {
      return;
    }

    setCurrentSlide((previousSlideIndex) => {

      if (previousSlideIndex === slideshowImages.length - 1) {
        return 0;
      }

      return previousSlideIndex + 1;

    });

  };


  // =====================================================
  // JOIN CLUB
  //
  // Membership limit logic will be added later.
  // =====================================================
  const handleJoinClub = () => {

    if (Joined) {
      return;
    }

    console.log("Join Club:", clubname);

  };


  // =====================================================
  // APPLY AS VOLUNTEER
  //
  // Volunteer limit logic will be added later.
  // =====================================================
  const handleVolunteer = () => {

    if (Volunteer) {
      return;
    }

    console.log("Apply as Volunteer:", clubname);

  };


  return (
    <article key={id} id={`club-${id}`} className="relative mb-3 w-full overflow-hidden rounded-[20px] border border-[#d8d2cf] bg-white shadow-[0_8px_24px_rgba(50,25,20,0.10)]">

      <div className="grid min-h-[315px] grid-cols-[220px_1fr]">


        {/* =====================================================
            LEFT — CLUB LOGO + GALLERY SLIDESHOW
        ===================================================== */}
        <div className="relative min-h-full overflow-hidden border-r border-black/[0.07] bg-[#f5f2f0]">


          {/* =================================================
              SLIDES
          ================================================= */}
          {slideshowImages.length > 0 ? (

            slideshowImages.map((image, index) => (

              <div key={`${image.src}-${index}`} className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "pointer-events-none opacity-0"} ${image.type === "logo" ? "bg-[#f8f6f5] p-7" : "bg-[#ececec]"}`}>

                <img src={image.src} alt={image.type === "logo" ? `${clubname} Logo` : `${clubname} Gallery ${index}`} className={image.type === "logo" ? "h-full w-full object-contain" : "h-full w-full object-cover"} />

              </div>

            ))

          ) : (

            /* ===============================================
               PLACEHOLDER

               Once logo/gallery paths are added in storage,
               this automatically gets replaced.
            =============================================== */
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#f7f4f2] px-6 text-center">

              <div className="flex h-16 w-16 items-center justify-center rounded-[18px] bg-[#983530]/8 text-[#983530]">
                <Images size={27} strokeWidth={1.5} />
              </div>

              <p className="mt-3 text-[13px] font-semibold text-[#555]">
                {clubname}
              </p>

              <p className="mt-1 text-[11px] text-[#aaa]">
                Club logo & gallery
              </p>

            </div>

          )}



          {/* =================================================
              IMAGE COUNTER
          ================================================= */}
          {slideshowImages.length > 1 && (

            <div className="absolute right-3 top-3 z-20 rounded-full bg-black/45 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
              {currentSlide + 1}/{slideshowImages.length}
            </div>

          )}



          {/* =================================================
              SLIDESHOW ARROWS
          ================================================= */}
          {slideshowImages.length > 1 && (

            <>
              <button type="button" onClick={previousSlide} aria-label="Previous club image" className="absolute left-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-[#983530]">
                <ChevronLeft size={16} />
              </button>

              <button type="button" onClick={nextSlide} aria-label="Next club image" className="absolute right-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-[#983530]">
                <ChevronRight size={16} />
              </button>
            </>

          )}



          {/* =================================================
              SLIDE DOTS
          ================================================= */}
          {slideshowImages.length > 1 && (

            <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/35 px-2.5 py-1.5 backdrop-blur-sm">

              {slideshowImages.map((_, index) => (

                <button key={index} type="button" aria-label={`Show image ${index + 1}`} onClick={() => setCurrentSlide(index)} className={`h-1.5 rounded-full transition-all duration-300 ${index === currentSlide ? "w-4 bg-white" : "w-1.5 bg-white/50"}`} />

              ))}

            </div>

          )}

        </div>



        {/* =====================================================
            RIGHT — CLUB INFORMATION
        ===================================================== */}
        <div className="flex min-w-0 flex-col px-5 py-4">


          {/* =====================================================
              HEADER
          ===================================================== */}
          <div className="flex items-start justify-between gap-4">


            {/* CLUB NAME + CATEGORY */}
            <div className="min-w-0">

              <div className="flex flex-wrap items-center gap-2">

                <h3 className="text-[25px] font-semibold leading-tight tracking-[-0.025em] text-[#292929]">
                  {clubname}
                </h3>


                {/* CATEGORY */}
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${categoryStyles[cat] || "bg-[#f1f1f1] text-[#666]"}`}>
                  {cat}
                </span>


                {/* MEMBER STATUS */}
                {Joined && (

                  <div className="flex items-center gap-1 rounded-full bg-[#e9f7ef] px-2.5 py-1 text-[11px] font-semibold text-[#27814d]">

                    <CircleCheck size={13} strokeWidth={2.5} />

                    Member

                  </div>

                )}


                {/* VOLUNTEER STATUS */}
                {Volunteer && (

                  <div className="flex items-center gap-1 rounded-full bg-[#fff3dd] px-2.5 py-1 text-[11px] font-semibold text-[#98671d]">

                    <CircleCheck size={13} strokeWidth={2.5} />

                    Volunteer

                  </div>

                )}

              </div>


              <p className="mt-1 text-[12px] font-medium text-[#999]">
                Student-led community at SKIT Jaipur
              </p>

            </div>



            {/* =====================================================
                SOCIAL LINKS
            ===================================================== */}
            <div className="flex shrink-0 items-center gap-1.5">

              <button type="button" title="LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/[0.08] bg-[#f8f8f8] text-[#666] transition-colors duration-200 hover:border-[#0071c7]/20 hover:bg-[#0071c7]/10 hover:text-[#0071c7]">
                <Linkedin size={15} strokeWidth={1.8} />
              </button>

              <button type="button" title="Instagram" className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/[0.08] bg-[#f8f8f8] text-[#666] transition-colors duration-200 hover:border-[#c13584]/20 hover:bg-[#c13584]/10 hover:text-[#c13584]">
                <Instagram size={15} strokeWidth={1.8} />
              </button>

              <button type="button" title="Website" className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/[0.08] bg-[#f8f8f8] text-[#666] transition-colors duration-200 hover:border-[#983530]/20 hover:bg-[#983530]/10 hover:text-[#983530]">
                <Globe size={15} strokeWidth={1.8} />
              </button>

              <button type="button" title="College Page" className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/[0.08] bg-[#f8f8f8] text-[#666] transition-colors duration-200 hover:border-[#983530]/20 hover:bg-[#983530]/10 hover:text-[#983530]">
                <University size={15} strokeWidth={1.8} />
              </button>

              <button type="button" title="WhatsApp" className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/[0.08] bg-[#f8f8f8] transition-colors duration-200 hover:bg-[#eaf8ef]">

                <img src="/images/whatsapp.png" alt="WhatsApp" className="h-[16px] w-[16px] object-contain" />

              </button>

            </div>

          </div>



          {/* =====================================================
              CLUB STATS — SINGLE COMPACT LINE
          ===================================================== */}
          <div className="mt-3 flex w-full items-center rounded-[10px] border border-[#983530]/10 bg-[#983530]/[0.035] px-2 py-1.5">


            {/* MEMBERS */}
            <div className="flex flex-1 items-center justify-center gap-2 border-r border-black/[0.07] px-2">

              <Users size={14} className="shrink-0 text-[#983530]" />

              <p className="text-[12px] font-semibold text-[#444]">
                <span className="font-bold text-[#292929]">
                  {memebers}
                </span>{" "}
                Members
              </p>

            </div>



            {/* EVENTS */}
            <div className="flex flex-1 items-center justify-center gap-2 border-r border-black/[0.07] px-2">

              <PartyPopper size={14} className="shrink-0 text-[#983530]" />

              <p className="text-[12px] font-semibold text-[#444]">
                <span className="font-bold text-[#292929]">
                  {events}+
                </span>{" "}
                Events
              </p>

            </div>



            {/* VOLUNTEERS */}
            <div className="flex flex-1 items-center justify-center gap-2 border-r border-black/[0.07] px-2">

              <UserStar size={14} className="shrink-0 text-[#983530]" />

              <p className="text-[12px] font-semibold text-[#444]">
                <span className="font-bold text-[#292929]">
                  {volunteers}+
                </span>{" "}
                Volunteers
              </p>

            </div>



            {/* ACHIEVEMENTS */}
            <div className="flex flex-1 items-center justify-center gap-2 px-2">

              <CircleStar size={14} className="shrink-0 text-[#9a6b00]" />

              <p className="text-[12px] font-semibold text-[#444]">
                <span className="font-bold text-[#292929]">
                  {stars}
                </span>{" "}
                Achievements
              </p>

            </div>

          </div>



          {/* =====================================================
              ABOUT
          ===================================================== */}
          <div className="mt-3">

            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#983530]">
              About the Club
            </p>

            <p className="max-w-[1050px] text-[13px] leading-[1.55] text-[#626262]">
              {limitedAbout}
            </p>

          </div>



          {/* =====================================================
              COORDINATORS
          ===================================================== */}
          <div className="mt-3 grid grid-cols-2 gap-2.5">


            {/* =================================================
                FACULTY COORDINATORS
            ================================================= */}
            <div className="rounded-[10px] border border-black/[0.06] bg-[#faf9f8] px-3 py-2.5">

              <div className="mb-2 flex items-center gap-2">

                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#983530]/10 text-[#983530]">
                  <GraduationCap size={14} />
                </div>

                <p className="text-[11px] font-semibold text-[#444]">
                  Faculty Coordinators
                </p>

              </div>


              <div className="grid grid-cols-2 gap-3">

                {[0, 1].map((index) => {

                  const coordinator = facultyCoordinators[index];

                  const coordinatorName =
                    typeof coordinator === "object"
                      ? coordinator?.name
                      : coordinator;

                  return (
                    <div key={index} className="min-w-0 border-l-2 border-[#983530]/15 pl-2.5">

                      <p className="truncate text-[12px] font-semibold text-[#444]">
                        {coordinatorName || "Not Assigned"}
                      </p>

                    </div>
                  );

                })}

              </div>

            </div>



            {/* =================================================
                STUDENT COORDINATORS
            ================================================= */}
            <div className="rounded-[10px] border border-black/[0.06] bg-[#faf9f8] px-3 py-2.5">

              <div className="mb-2 flex items-center gap-2">

                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#983530]/10 text-[#983530]">
                  <UserRound size={14} />
                </div>

                <p className="text-[11px] font-semibold text-[#444]">
                  Student Coordinators
                </p>

              </div>


              <div className="grid grid-cols-2 gap-3">

                {[0, 1].map((index) => {

                  const coordinator = studentCoordinators[index];

                  const coordinatorName =
                    typeof coordinator === "object"
                      ? coordinator?.name
                      : coordinator;


                  // =============================================
                  // TEMPORARY YEAR + BRANCH
                  //
                  // Later replace these with:
                  //
                  // coordinator?.year
                  // coordinator?.branch
                  // =============================================
                  const coordinatorYear =
                    index === 0
                      ? STUDENT_COORDINATOR_1_YEAR
                      : STUDENT_COORDINATOR_2_YEAR;


                  const coordinatorBranch =
                    index === 0
                      ? STUDENT_COORDINATOR_1_BRANCH
                      : STUDENT_COORDINATOR_2_BRANCH;


                  return (
                    <div key={index} className="min-w-0 border-l-2 border-[#983530]/15 pl-2.5">

                      <p className="truncate text-[12px] font-semibold text-[#444]">
                        {coordinatorName || "Not Assigned"}
                      </p>


                      {coordinatorName && (

                        <p className="mt-0.5 truncate text-[10px] font-medium text-[#888]">
                          {coordinatorYear} • {coordinatorBranch}
                        </p>

                      )}

                    </div>
                  );

                })}

              </div>

            </div>

          </div>



          {/* =====================================================
              BOTTOM ACTIONS
          ===================================================== */}
          <div className="mt-auto flex items-center justify-between gap-4 pt-3">


            {/* =================================================
                INFORMATION BUTTONS
            ================================================= */}
            <div className="flex items-center gap-2">


              {/* PAST EVENTS */}
              <button type="button" className="group flex h-10 items-center gap-2 rounded-[9px] border border-[#983530]/25 bg-[#fff7f6] px-3.5 text-[12px] font-semibold text-[#983530] shadow-[0_3px_10px_rgba(152,53,48,0.08)] transition-colors duration-200 hover:bg-[#983530] hover:text-white">

                <PartyPopper size={15} />

                Past Events

                <ArrowUpRight size={13} className="transition-transform duration-200 group-hover:-translate-y-[1px] group-hover:translate-x-[1px]" />

              </button>



              {/* CONTACT */}
              <button type="button" className="flex h-10 items-center gap-2 rounded-[9px] border border-[#983530]/25 bg-[#fff7f6] px-3.5 text-[12px] font-semibold text-[#983530] shadow-[0_3px_10px_rgba(152,53,48,0.08)] transition-colors duration-200 hover:bg-[#983530] hover:text-white">

                <Phone size={15} />

                Contact

              </button>



              {/* GALLERY */}
              <button type="button" className="flex h-10 items-center gap-2 rounded-[9px] border border-[#983530]/25 bg-[#fff7f6] px-3.5 text-[12px] font-semibold text-[#983530] shadow-[0_3px_10px_rgba(152,53,48,0.08)] transition-colors duration-200 hover:bg-[#983530] hover:text-white">

                <Images size={15} />

                Gallery

              </button>

            </div>



            {/* =================================================
                MEMBERSHIP ACTIONS
            ================================================= */}
            <div className="flex shrink-0 items-center gap-2">


              {/* JOIN CLUB */}
              <button type="button" onClick={handleJoinClub} disabled={Joined} className={`flex h-10 min-w-[125px] items-center justify-center gap-2 rounded-[9px] px-4 text-[13px] font-semibold transition-colors duration-200 ${Joined ? "cursor-not-allowed border border-black/[0.06] bg-[#ededed] text-[#999]" : "bg-[#983530] text-white shadow-[0_4px_12px_rgba(152,53,48,0.18)] hover:bg-[#842c28]"}`}>

                {Joined ? (
                  <>
                    <CircleCheck size={16} />
                    Joined
                  </>
                ) : (
                  <>
                    <Plus size={16} />
                    Join Club
                  </>
                )}

              </button>



              {/* APPLY AS VOLUNTEER */}
              <button type="button" onClick={handleVolunteer} disabled={Volunteer} className={`flex h-10 min-w-[165px] items-center justify-center gap-2 rounded-[9px] px-4 text-[13px] font-semibold transition-colors duration-200 ${Volunteer ? "cursor-not-allowed border border-black/[0.06] bg-[#ededed] text-[#999]" : "border border-[#983530] bg-white text-[#983530] hover:bg-[#983530] hover:text-white"}`}>

                {Volunteer ? (
                  <>
                    <CircleCheck size={16} />
                    Volunteering
                  </>
                ) : (
                  <>
                    <UserStar size={16} />
                    Apply as Volunteer
                  </>
                )}

              </button>

            </div>

          </div>

        </div>

      </div>

    </article>
  );
};

export default ClubsAllInfoCards;