import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  X,
  CalendarDays,
  MapPin,
  Trophy,
  Tag,
  UserRound,
  Phone,
  Clock3,
  ArrowUpRight,
  Users,
  CheckCircle2,
  AlertCircle,
  Timer,
  ShieldCheck,
  Info,
  BookOpen,
  ListChecks,
  Mail,
  Globe,
  Copy,
  ExternalLink,
  Sparkles,
  Check,
  ChevronDown,
  ClipboardCheck,
  CalendarCheck,
} from "lucide-react";

const EventRegistrationPopup = ({
  isOpen,
  onClose,
  event,
  onRegister,
}) => {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const eventName = event?.name || "Event Name";
  const eventClub = event?.club || "Club Name";

  const eventDate = event?.date || "Date to be announced";
  const eventVenue = event?.venue || "Venue to be announced";
  const eventCategory = event?.category || "Campus Event";
  const eventPoints = event?.points ?? 0;

  const eventBrief =
    event?.brief ||
    event?.description ||
    "Discover the event, connect with fellow students, and be part of an exciting campus experience. More event details will be announced soon.";

  const poster = event?.poster || event?.image || event?.imageUrl;

  const facultyCoordinator = event?.facultyCoordinator || {};
  const studentCoordinator = event?.studentCoordinator || {};

  /* -------------------------------------------------------
     REGISTRATION INFORMATION
  ------------------------------------------------------- */

  const registrationOpen = event?.registrationOpen ?? true;

  const registrationDeadline =
    event?.registrationDeadline || "Registration deadline not specified";

  const capacity = event?.capacity ?? null;
  const registeredCount = event?.registeredCount ?? 0;

  const seatsRemaining =
    capacity !== null
      ? Math.max(capacity - registeredCount, 0)
      : null;

  const isFull =
    capacity !== null && registeredCount >= capacity;

  const canRegister = registrationOpen && !isFull;

  const eventAgenda = Array.isArray(event?.agenda) ? event.agenda : [];
  const eventHighlights = Array.isArray(event?.highlights)
    ? event.highlights
    : [];
  const eventRequirements = Array.isArray(event?.requirements)
    ? event.requirements
    : [];
  const eventFaqs = Array.isArray(event?.faqs) ? event.faqs : [];
  const eventTags = Array.isArray(event?.tags) ? event.tags : [];
  const eventEligibility = event?.eligibility || "";
  const eventInstructions = event?.instructions || "";
  const eventWebsite = event?.website || "";
  const eventContactEmail = event?.contactEmail || "";
  const registrationUrl = event?.registrationUrl || "";

  const handleCopyEventLink = async () => {
    try {
      if (!navigator?.clipboard?.writeText) return;
      await navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      window.setTimeout(() => setLinkCopied(false), 1800);
    } catch (error) {
      console.error("Unable to copy the event link:", error);
    }
  };

  /* -------------------------------------------------------
     COORDINATOR CARD
  ------------------------------------------------------- */

  const CoordinatorCard = ({
    title,
    coordinator,
    fallbackName,
  }) => {
    const name =
      typeof coordinator === "string"
        ? coordinator
        : coordinator?.name || fallbackName;

    const phone =
      typeof coordinator === "object"
        ? coordinator?.phone || coordinator?.number
        : null;

    return (
      <div className="flex min-w-0 flex-1 gap-3 rounded-xl border border-[#eee5e3] bg-[#fffdfc] p-3.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f8eae8] text-[#851f1b]">
          <UserRound size={18} strokeWidth={1.8} />
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#9a7774]">
            {title}
          </p>

          <p className="mt-1 break-words text-sm font-semibold text-[#302321]">
            {name}
          </p>

          {phone && (
            <a
              href={`tel:${phone}`}
              className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-[#8b302a] transition-colors hover:text-[#58100c]"
            >
              <Phone size={12} />
              <span>{phone}</span>
            </a>
          )}
        </div>
      </div>
    );
  };

  /* -------------------------------------------------------
     REGISTRATION STATUS
  ------------------------------------------------------- */

  const RegistrationStatus = () => {
    if (!registrationOpen) {
      return (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-3.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
            <AlertCircle size={18} />
          </div>

          <div>
            <p className="text-sm font-bold text-red-700">
              Registration closed
            </p>

            <p className="mt-0.5 text-xs leading-5 text-red-600">
              Registration for this event is currently unavailable.
            </p>
          </div>
        </div>
      );
    }

    if (isFull) {
      return (
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
            <Users size={18} />
          </div>

          <div>
            <p className="text-sm font-bold text-amber-800">
              Event is full
            </p>

            <p className="mt-0.5 text-xs leading-5 text-amber-700">
              All available registration slots have been filled.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-3.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-700">
          <CheckCircle2 size={18} />
        </div>

        <div>
          <p className="text-sm font-bold text-green-700">
            Registration is open
          </p>

          <p className="mt-0.5 text-xs leading-5 text-green-600">
            You can register for this event right now.
          </p>
        </div>
      </div>
    );
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#160706]/65 p-3 backdrop-blur-md sm:p-5"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Event details: ${eventName}`}
        className="relative flex max-h-[92dvh] w-full max-w-[1000px] flex-col overflow-hidden rounded-2xl bg-white shadow-[0_30px_100px_rgba(0,0,0,0.3)] sm:rounded-[24px]"
      >
        {/* CLOSE BUTTON */}

        <button
          type="button"
          onClick={onClose}
          aria-label="Close event details"
          className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-[#eee5e3] bg-white/95 text-[#781f1b] shadow-sm transition-all duration-200 hover:rotate-90 hover:bg-[#781f1b] hover:text-white sm:right-5 sm:top-5"
        >
          <X size={18} strokeWidth={2} />
        </button>

        {/* HEADER */}

        <div className="shrink-0 border-b border-[#f0e8e6] px-5 py-5 pr-16 sm:px-7 sm:py-5 sm:pr-20">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#922b25]" />

            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#922b25] sm:text-[11px]">
              Orbix · Event Details
            </p>
          </div>

          <p className="mt-1.5 text-xs text-[#8b8583]">
            Organized by {eventClub}
          </p>
        </div>

        {/* MAIN CONTENT */}

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 gap-6 p-5 sm:p-7 lg:grid-cols-[0.78fr_1.22fr] lg:gap-8">

            {/* LEFT: EVENT POSTER */}

            <section className="min-w-0">
              <div className="relative overflow-hidden rounded-2xl border border-[#eee4e1] bg-[#f7efed]">
                <div className="relative aspect-[4/4.5] max-h-[430px] w-full">
                  {poster ? (
                    <img
                      src={poster}
                      alt={`${eventName} poster`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#9b302a] via-[#7c1c17] to-[#430d0a] p-6 text-center text-white">
                      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/25 bg-white/10">
                        <CalendarDays size={30} strokeWidth={1.4} />
                      </div>

                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-100/80">
                        You're invited to
                      </p>

                      <h3 className="mt-3 max-w-full break-words text-2xl font-bold leading-tight sm:text-3xl">
                        {eventName}
                      </h3>

                      <div className="mt-5 h-px w-12 bg-amber-200/70" />

                      <p className="mt-4 text-xs text-white/75">
                        {eventClub}
                      </p>

                      <span className="mt-5 rounded-full border border-white/25 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-amber-100">
                        {eventCategory}
                      </span>
                    </div>
                  )}
                </div>

                {/* POSTER FOOTER */}

                <div className="border-t border-[#eee4e1] bg-white px-4 py-3.5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#302321]">
                        {eventClub}
                      </p>

                      <p className="mt-0.5 text-xs text-[#938783]">
                        SKIT Jaipur
                      </p>
                    </div>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f8eae8] text-[#851f1b]">
                      <Users size={19} strokeWidth={1.7} />
                    </div>
                  </div>
                </div>
              </div>

              {/* POINTS CARD */}

              <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-[#ead4b5] bg-gradient-to-r from-[#fff9ee] to-[#fffdf8] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f6e6c8] text-[#9b6518]">
                    <Trophy size={19} strokeWidth={1.8} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#48341d]">
                      Earn points
                    </p>

                    <p className="mt-0.5 text-xs text-[#967c59]">
                      For your campus activity
                    </p>
                  </div>
                </div>

                <p className="shrink-0 text-xl font-bold text-[#975d11]">
                  {eventPoints}
                  <span className="ml-1 text-xs font-medium">
                    pts
                  </span>
                </p>
              </div>

              {/* EXTRA EVENT HIGHLIGHTS */}

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-[#eee5e3] bg-[#fffdfc] p-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck
                      size={16}
                      className="text-[#8c2923]"
                    />

                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#927b77]">
                      Verified
                    </span>
                  </div>

                  <p className="mt-1.5 text-xs font-semibold text-[#3d302d]">
                    Official campus event
                  </p>
                </div>

                <div className="rounded-xl border border-[#eee5e3] bg-[#fffdfc] p-3">
                  <div className="flex items-center gap-2">
                    <Trophy
                      size={16}
                      className="text-[#9b6518]"
                    />

                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#927b77]">
                      Reward
                    </span>
                  </div>

                  <p className="mt-1.5 text-xs font-semibold text-[#3d302d]">
                    {eventPoints} activity points
                  </p>
                </div>
              </div>
            </section>

            {/* RIGHT: EVENT DETAILS */}

            <section className="flex min-w-0 flex-col">

              {/* TITLE AND CATEGORY */}

              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f8e9e7] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8c2923]">
                  <Tag size={12} />
                  {eventCategory}
                </span>

                <h2 className="mt-3 break-words text-2xl font-bold leading-tight tracking-tight text-[#29201f] sm:text-[30px]">
                  {eventName}
                </h2>

                <p className="mt-2 text-sm text-[#827876]">
                  Organized by{" "}
                  <span className="font-semibold text-[#5a302c]">
                    {eventClub}
                  </span>
                </p>
              </div>

              {/* DATE AND VENUE */}

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex min-w-0 items-start gap-3 rounded-xl border border-[#eee8e6] bg-[#fdfbfa] p-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f8e9e7] text-[#8c2923]">
                    <CalendarDays size={17} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#a09693]">
                      Event date
                    </p>

                    <p className="mt-1 break-words text-sm font-semibold leading-snug text-[#352927]">
                      {eventDate}
                    </p>

                    {event?.time && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-[#89807d]">
                        <Clock3 size={12} />
                        {event.time}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex min-w-0 items-start gap-3 rounded-xl border border-[#eee8e6] bg-[#fdfbfa] p-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f8e9e7] text-[#8c2923]">
                    <MapPin size={17} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#a09693]">
                      Venue
                    </p>

                    <p className="mt-1 break-words text-sm font-semibold leading-snug text-[#352927]">
                      {eventVenue}
                    </p>
                  </div>
                </div>
              </div>

              {/* EVENT BRIEF */}

              <div className="mt-6">
                <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[#5c302c]">
                  About this event
                </h3>

                <p className="mt-2.5 whitespace-pre-line text-sm leading-6 text-[#756a67]">
                  {eventBrief}
                </p>
              </div>

              {/* REGISTRATION INFORMATION */}

              <div className="mt-6 rounded-2xl border border-[#eee4e1] bg-[#fdfbfa] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[#5c302c]">
                      Registration information
                    </h3>

                    <p className="mt-1 text-xs text-[#978b88]">
                      Check availability before registering.
                    </p>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f8e9e7] text-[#8c2923]">
                    <Timer size={17} />
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-[#eee5e3] bg-white p-3">
                    <div className="flex items-center gap-2">
                      <CalendarDays
                        size={15}
                        className="text-[#8c2923]"
                      />

                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#9b8b87]">
                        Registration deadline
                      </span>
                    </div>

                    <p className="mt-2 text-sm font-semibold text-[#352927]">
                      {registrationDeadline}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#eee5e3] bg-white p-3">
                    <div className="flex items-center gap-2">
                      <Users
                        size={15}
                        className="text-[#8c2923]"
                      />

                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#9b8b87]">
                        Available seats
                      </span>
                    </div>

                    <p className="mt-2 text-sm font-semibold text-[#352927]">
                      {seatsRemaining !== null
                        ? `${seatsRemaining} seats remaining`
                        : "Limited seats"}
                    </p>
                  </div>
                </div>
              </div>

              {/* REGISTRATION STATUS */}

              <div className="mt-4">
                <RegistrationStatus />
              </div>

              {/* OPTIONAL EVENT HIGHLIGHTS */}
              {eventHighlights.length > 0 && (
                <section className="mt-6 rounded-2xl border border-[#eee4e1] bg-white p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f8e9e7] text-[#8c2923]">
                      <Sparkles size={19} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-[#352927]">
                        Event highlights
                      </h3>
                      <p className="mt-1 text-xs leading-5 text-[#8b7d79]">
                        A quick look at what this event offers.
                      </p>
                    </div>
                  </div>

                  <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {eventHighlights.map((highlight, index) => (
                      <li
                        key={`${String(highlight)}-${index}`}
                        className="flex items-start gap-2.5 rounded-xl bg-[#fdf9f8] p-3"
                      >
                        <CheckCircle2
                          size={16}
                          className="mt-0.5 shrink-0 text-[#8c2923]"
                        />
                        <span className="text-sm leading-5 text-[#625451]">
                          {typeof highlight === "string"
                            ? highlight
                            : highlight?.title || highlight?.label || "Event highlight"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* EVENT AGENDA */}
              {eventAgenda.length > 0 && (
                <section className="mt-6 rounded-2xl border border-[#eee4e1] bg-[#fffdfc] p-4 sm:p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f8e9e7] text-[#8c2923]">
                      <CalendarCheck size={19} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#352927]">
                        Event schedule
                      </h3>
                      <p className="mt-1 text-xs text-[#8b7d79]">
                        Review the planned activities and timings.
                      </p>
                    </div>
                  </div>

                  <ol className="mt-5 space-y-4">
                    {eventAgenda.map((item, index) => {
                      const agendaTitle =
                        typeof item === "string"
                          ? item
                          : item?.title || item?.activity || `Activity ${index + 1}`;
                      const agendaTime =
                        typeof item === "object"
                          ? item?.time || item?.startTime || ""
                          : "";
                      const agendaDescription =
                        typeof item === "object"
                          ? item?.description || item?.details || ""
                          : "";

                      return (
                        <li
                          key={`${agendaTitle}-${index}`}
                          className="relative flex gap-3"
                        >
                          <div className="flex flex-col items-center">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#e8c9c5] bg-[#f8e9e7] text-[11px] font-bold text-[#8c2923]">
                              {index + 1}
                            </span>
                            {index < eventAgenda.length - 1 && (
                              <span className="mt-1 min-h-6 w-px flex-1 bg-[#eadbd8]" />
                            )}
                          </div>

                          <div className="min-w-0 flex-1 pb-1">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <h4 className="text-sm font-semibold text-[#352927]">
                                {agendaTitle}
                              </h4>
                              {agendaTime && (
                                <span className="rounded-full bg-[#f8e9e7] px-2.5 py-1 text-[10px] font-semibold text-[#8c2923]">
                                  {agendaTime}
                                </span>
                              )}
                            </div>
                            {agendaDescription && (
                              <p className="mt-1 text-xs leading-5 text-[#827572]">
                                {agendaDescription}
                              </p>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </section>
              )}

              {/* ELIGIBILITY AND REQUIREMENTS */}
              {(eventEligibility || eventRequirements.length > 0) && (
                <section className="mt-6 rounded-2xl border border-[#eee4e1] bg-white p-4 sm:p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f8e9e7] text-[#8c2923]">
                      <ClipboardCheck size={19} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#352927]">
                        Eligibility and requirements
                      </h3>
                      <p className="mt-1 text-xs text-[#8b7d79]">
                        Check these details before you register.
                      </p>
                    </div>
                  </div>

                  {eventEligibility && (
                    <div className="mt-4 rounded-xl border border-[#f0e4e1] bg-[#fdf9f8] p-3.5">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#9b7772]">
                        Who can participate?
                      </p>
                      <p className="mt-1.5 whitespace-pre-line text-sm leading-6 text-[#625451]">
                        {eventEligibility}
                      </p>
                    </div>
                  )}

                  {eventRequirements.length > 0 && (
                    <ul className="mt-3 space-y-2">
                      {eventRequirements.map((requirement, index) => (
                        <li
                          key={`${String(requirement)}-${index}`}
                          className="flex items-start gap-2.5"
                        >
                          <Check
                            size={15}
                            className="mt-1 shrink-0 text-[#8c2923]"
                          />
                          <span className="text-sm leading-6 text-[#756a67]">
                            {typeof requirement === "string"
                              ? requirement
                              : requirement?.label || requirement?.text || "Requirement"}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              )}

              {/* IMPORTANT PARTICIPANT INSTRUCTIONS */}
              {eventInstructions && (
                <section className="mt-6 rounded-2xl border border-[#ead4b5] bg-gradient-to-br from-[#fffaf0] to-[#fffdf9] p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f6e6c8] text-[#975d11]">
                      <Info size={19} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-[#48341d]">
                        Important instructions
                      </h3>
                      <p className="mt-2 whitespace-pre-line text-sm leading-6 text-[#79684e]">
                        {eventInstructions}
                      </p>
                    </div>
                  </div>
                </section>
              )}

              {/* EVENT TAGS */}
              {eventTags.length > 0 && (
                <section className="mt-5">
                  <div className="flex items-center gap-2">
                    <Tag size={15} className="text-[#8c2923]" />
                    <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[#5c302c]">
                      Event tags
                    </h3>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {eventTags.map((tag, index) => (
                      <span
                        key={`${String(tag)}-${index}`}
                        className="rounded-full border border-[#eee0dd] bg-[#fffaf9] px-3 py-1.5 text-xs font-medium text-[#76534f]"
                      >
                        {typeof tag === "string" ? tag : tag?.label || tag?.name || "Event"}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* FREQUENTLY ASKED QUESTIONS */}
              {eventFaqs.length > 0 && (
                <section className="mt-6 rounded-2xl border border-[#eee4e1] bg-white p-4 sm:p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f8e9e7] text-[#8c2923]">
                      <BookOpen size={19} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#352927]">
                        Frequently asked questions
                      </h3>
                      <p className="mt-1 text-xs text-[#8b7d79]">
                        Answers shared by the event organizer.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 divide-y divide-[#f0e8e6]">
                    {eventFaqs.map((faq, index) => {
                      const question =
                        typeof faq === "string"
                          ? faq
                          : faq?.question || `Question ${index + 1}`;
                      const answer =
                        typeof faq === "object"
                          ? faq?.answer || faq?.response || ""
                          : "";

                      const isExpanded = expandedFaq === index;

                      return (
                        <div key={`${question}-${index}`} className="py-1">
                          <button
                            type="button"
                            aria-expanded={isExpanded}
                            onClick={() =>
                              setExpandedFaq(isExpanded ? null : index)
                            }
                            className="flex w-full items-center justify-between gap-3 py-3 text-left"
                          >
                            <span className="text-sm font-semibold leading-5 text-[#493734]">
                              {question}
                            </span>
                            <ChevronDown
                              size={17}
                              className={`shrink-0 text-[#8c2923] transition-transform ${
                                isExpanded ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          {isExpanded && (
                            <p className="whitespace-pre-line pb-3 text-sm leading-6 text-[#756a67]">
                              {answer || "Please contact the event coordinator for more information."}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* ORGANIZER LINKS AND EVENT SHARING */}
              {(eventWebsite || eventContactEmail || registrationUrl) && (
                <section className="mt-6 rounded-2xl border border-[#eee4e1] bg-[#fffdfc] p-4 sm:p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f8e9e7] text-[#8c2923]">
                      <Globe size={19} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#352927]">
                        Useful links
                      </h3>
                      <p className="mt-1 text-xs text-[#8b7d79]">
                        Additional resources provided by the organizer.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-2">
                    {eventWebsite && (
                      <a
                        href={eventWebsite}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between gap-3 rounded-xl border border-[#eee5e3] bg-white px-3.5 py-3 text-sm font-medium text-[#6e302b] transition-colors hover:bg-[#fff7f5]"
                      >
                        <span className="flex items-center gap-2">
                          <Globe size={15} />
                          Event website
                        </span>
                        <ExternalLink size={15} />
                      </a>
                    )}

                    {registrationUrl && (
                      <a
                        href={registrationUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between gap-3 rounded-xl border border-[#eee5e3] bg-white px-3.5 py-3 text-sm font-medium text-[#6e302b] transition-colors hover:bg-[#fff7f5]"
                      >
                        <span className="flex items-center gap-2">
                          <ArrowUpRight size={15} />
                          External registration page
                        </span>
                        <ExternalLink size={15} />
                      </a>
                    )}

                    {eventContactEmail && (
                      <a
                        href={`mailto:${eventContactEmail}`}
                        className="flex items-center justify-between gap-3 rounded-xl border border-[#eee5e3] bg-white px-3.5 py-3 text-sm font-medium text-[#6e302b] transition-colors hover:bg-[#fff7f5]"
                      >
                        <span className="flex min-w-0 items-center gap-2">
                          <Mail size={15} className="shrink-0" />
                          <span className="truncate">{eventContactEmail}</span>
                        </span>
                        <ArrowUpRight size={15} />
                      </a>
                    )}
                  </div>
                </section>
              )}

              {/* QUICK EVENT SUMMARY */}
              <section className="mt-6 rounded-2xl border border-[#eee4e1] bg-[#fdfbfa] p-4">
                <div className="flex items-center gap-2">
                  <ListChecks size={17} className="text-[#8c2923]" />
                  <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[#5c302c]">
                    Before you register
                  </h3>
                </div>

                <ul className="mt-3 space-y-2.5">
                  <li className="flex items-start gap-2.5 text-xs leading-5 text-[#756a67]">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#8c2923]" />
                    Confirm that the event date and venue work for you.
                  </li>
                  <li className="flex items-start gap-2.5 text-xs leading-5 text-[#756a67]">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#8c2923]" />
                    Read any eligibility rules or requirements listed above.
                  </li>
                  <li className="flex items-start gap-2.5 text-xs leading-5 text-[#756a67]">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#8c2923]" />
                    Contact a coordinator if you need clarification.
                  </li>
                  <li className="flex items-start gap-2.5 text-xs leading-5 text-[#756a67]">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#8c2923]" />
                    Check the registration status before submitting your details.
                  </li>
                </ul>
              </section>

              {/* COPY EVENT LINK */}
              <button
                type="button"
                onClick={handleCopyEventLink}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#eadbd8] bg-white px-4 py-3 text-xs font-semibold text-[#7a3731] transition-colors hover:bg-[#fff8f6] focus:outline-none focus:ring-4 focus:ring-[#922b25]/10"
              >
                {linkCopied ? <Check size={15} /> : <Copy size={15} />}
                {linkCopied ? "Page link copied" : "Copy this page link"}
              </button>

              {/* COORDINATOR INFORMATION */}

              <div className="mt-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[#5c302c]">
                    Contact coordinators
                  </h3>

                  <span className="text-[10px] text-[#a09693]">
                    Need help?
                  </span>
                </div>

                <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                  <CoordinatorCard
                    title="Faculty coordinator"
                    coordinator={facultyCoordinator}
                    fallbackName="To be announced"
                  />

                  <CoordinatorCard
                    title="Student coordinator"
                    coordinator={studentCoordinator}
                    fallbackName="To be announced"
                  />
                </div>
              </div>

              {/* REGISTRATION BUTTON */}

              <div className="mt-7 border-t border-[#f0e8e6] pt-5">
                <button
                  type="button"
                  disabled={!canRegister}
                  onClick={() => {
                    if (canRegister && onRegister) {
                      onRegister(event);
                    }
                  }}
                  className={`group flex w-full items-center justify-center gap-2.5 rounded-xl px-5 py-4 text-sm font-bold text-white transition-all duration-200 focus:outline-none focus:ring-4 ${
                    canRegister
                      ? "bg-gradient-to-r from-[#922b25] to-[#711914] shadow-[0_8px_20px_rgba(120,31,27,0.2)] hover:-translate-y-0.5 hover:from-[#a3332c] hover:to-[#841e18] hover:shadow-[0_12px_26px_rgba(120,31,27,0.3)] focus:ring-[#922b25]/20 active:translate-y-0"
                      : "cursor-not-allowed bg-[#b8aaa7] opacity-80"
                  }`}
                >
                  {canRegister ? (
                    <>
                      Register for this event

                      <ArrowUpRight
                        size={18}
                        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </>
                  ) : (
                    <>
                      {isFull
                        ? "Event is Full"
                        : "Registration Closed"}

                      <AlertCircle size={18} />
                    </>
                  )}
                </button>

                <p className="mt-3 text-center text-[11px] leading-5 text-[#9a8e8b]">
                  {canRegister
                    ? "Be part of the experience. Register and join your campus community."
                    : "Registration is currently unavailable for this event."}
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default EventRegistrationPopup;