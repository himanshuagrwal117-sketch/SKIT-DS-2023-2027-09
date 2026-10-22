
import React, { useState, useRef } from "react";
import {
  Search,
  ChevronDown,
  ShieldCheck,
  Users,
  CalendarDays,
  Trophy,
  Mail,
  GraduationCap,
  HelpCircle,
  ArrowRight,
  X,
  Sparkles,
} from "lucide-react";

import Header2 from "../../Header2/Header2";

/* ============================================================
   HERO PNG IMAGE

   STEP 1:
   Place your transparent PNG inside:
   public/images/

   STEP 2:
   Replace the path below with your image filename.

   Example:
   const HERO_IMAGE = "/images/help-illustration.png";

   Leave empty ("") until you add your PNG.
============================================================ */

const HERO_IMAGE = "/images/eca logo.png";

/* ============================================================
   FAQ CATEGORIES
============================================================ */

const categories = [
  {
    id: "account",
    title: "Account & Login",
    description: "Login, access and account security",
    icon: ShieldCheck,
  },
  {
    id: "clubs",
    title: "Clubs & Membership",
    description: "Explore clubs, join and participate",
    icon: Users,
  },
  {
    id: "events",
    title: "Events & Activities",
    description: "Events, registration and participation",
    icon: CalendarDays,
  },
  {
    id: "profile",
    title: "Profile & Achievements",
    description: "Student records, points and certificates",
    icon: Trophy,
  },
  {
    id: "eca",
    title: "About ECA",
    description: "Extracurricular activities and coordination",
    icon: GraduationCap,
  },
  {
    id: "support",
    title: "Technical Support",
    description: "Errors, reporting and troubleshooting",
    icon: HelpCircle,
  },
];

/* ============================================================
   FREQUENTLY ASKED QUESTIONS
============================================================ */

const faqs = [
  // ACCOUNT & LOGIN
  {
    category: "account",
    question: "How do I log in to Orbix?",
    answer:
      "Open Orbix, select 'Login as a Student', and sign in using your verified SKIT Google account ending with @skit.ac.in.",
  },
  {
    category: "account",
    question: "Can I log in using my personal Gmail account?",
    answer:
      "No. Student authentication is restricted to verified SKIT college email accounts. Personal Gmail accounts are not accepted for student login.",
  },
  {
    category: "account",
    question: "Why am I redirected to the login page after signing in?",
    answer:
      "This can happen if your authentication session cannot be verified, your browser blocks the required cookies, or a network request fails. Refresh the page and try signing in again. If the issue continues, contact the technical team.",
  },
  {
    category: "account",
    question: "Is my Google password stored by Orbix?",
    answer:
      "Orbix uses Google authentication and does not need your Google account password. You should enter your password only on Google's official sign-in page, never in a form claiming to be Orbix support.",
  },
  {
    category: "account",
    question: "Can I access Orbix from my mobile phone?",
    answer:
      "Orbix is a web-based platform and can be opened in a mobile browser. Some pages may still be undergoing responsive design improvements.",
  },

  // CLUBS & MEMBERSHIP
  {
    category: "clubs",
    question: "What is the purpose of the Explore Clubs section?",
    answer:
      "Explore Clubs is intended to help students discover college clubs, understand their activities, and find relevant opportunities to participate.",
  },
  {
    category: "clubs",
    question: "How can I join a college club?",
    answer:
      "Explore the available clubs and follow their published membership or recruitment instructions. Until online membership management is fully available, contact the respective club coordinator.",
  },
  {
    category: "clubs",
    question: "Can a student be a member of multiple clubs?",
    answer:
      "Membership eligibility depends on the applicable SKIT and ECA guidelines. Check the current rules or contact the concerned club coordinator for confirmation.",
  },
  {
    category: "clubs",
    question: "What is the difference between a club volunteer and a club coordinator?",
    answer:
      "A volunteer supports club activities and events, while a coordinator takes greater responsibility for organizing, managing, and conducting club activities. Official eligibility and responsibilities depend on college guidelines.",
  },
  {
    category: "clubs",
    question: "Can students start a new club?",
    answer:
      "Orbix includes a Start a New Club section intended to guide students interested in proposing a new club. Actual approval is subject to the college's official review and authorization process.",
  },

  // EVENTS
  {
    category: "events",
    question: "Where can I find upcoming college events?",
    answer:
      "Visit the Upcoming Events section on the Student Page. Published event information may include event details and relevant participation instructions.",
  },
  {
    category: "events",
    question: "How do I register for an event?",
    answer:
      "Follow the registration instructions provided by the organizing club or event coordinator. Integrated event registration is a planned Orbix capability and may not be available for every event yet.",
  },
  {
    category: "events",
    question: "Can I participate in events organized by other clubs?",
    answer:
      "Participation depends on the event's eligibility criteria. Read the event rules and registration information before applying.",
  },
  {
    category: "events",
    question: "How can I volunteer for a college event?",
    answer:
      "Contact the event's organizing club or coordinator and follow its volunteer selection process. Orbix aims to support more structured volunteer management in the future.",
  },
  {
    category: "events",
    question: "Where can I find information about past events?",
    answer:
      "Past event information may be shared by the organizing clubs or ECA. Orbix is planned to support historical event records and student participation information.",
  },

  // PROFILE & ACHIEVEMENTS
  {
    category: "profile",
    question: "What information will my Student Profile contain?",
    answer:
      "The Student Profile is designed to bring together relevant student information, club participation, official positions, achievements, certificates, and activity records as these features are implemented.",
  },
  {
    category: "profile",
    question: "What are Orbix student points?",
    answer:
      "Student points are intended to represent a student's recognized participation and contributions to college and club activities. The detailed calculation and approval rules must be defined by the authorized college or ECA team.",
  },
  {
    category: "profile",
    question: "Why are my points not updating?",
    answer:
      "The points displayed in some current Orbix interface components may still be sample values. Live points calculation and synchronization will require integration with verified student activity records.",
  },
  {
    category: "profile",
    question: "Will Orbix store my event certificates?",
    answer:
      "Certificate and achievement management is part of Orbix's planned student record system. Availability will depend on implementation and verification by authorized coordinators.",
  },
  {
    category: "profile",
    question: "Will my previous club positions be recorded?",
    answer:
      "Orbix's planned database supports academic-year-based position history, so official roles such as volunteer, core member, and coordinator can be recorded without overwriting previous years.",
  },

  // ABOUT ECA
  {
    category: "eca",
    question: "What is ECA at SKIT?",
    answer:
      "ECA refers to Extracurricular Activities at SKIT. It is associated with the coordination and support of extracurricular participation, student clubs, and college activities.",
  },
  {
    category: "eca",
    question: "What is the role of ECA in student development?",
    answer:
      "Extracurricular activities provide opportunities to develop teamwork, leadership, communication, creativity, event management, and practical organizational skills beyond classroom learning.",
  },
  {
    category: "eca",
    question: "How are college clubs connected with ECA?",
    answer:
      "College clubs participate in extracurricular activities under applicable institutional coordination and guidelines. Their responsibilities, approvals, and reporting processes are determined by the college and ECA.",
  },
  {
    category: "eca",
    question: "What is the ECA Core Team?",
    answer:
      "The ECA Core Team is involved in coordinating extracurricular initiatives and supporting activities across clubs. The exact responsibilities and membership may change according to the academic year and college arrangements.",
  },
  {
    category: "eca",
    question: "How can I contact ECA for club-related queries?",
    answer:
      "For official club matters, contact the relevant club coordinator or ECA representatives through the communication channels provided by the college. Use only verified contact details.",
  },
  {
    category: "eca",
    question: "What is SODECA?",
    answer:
      "SODECA is included as a dedicated section in the Orbix navigation. Its official description, responsibilities, and available features should be confirmed with the SKIT ECA team before publishing detailed information.",
  },

  // TECHNICAL SUPPORT
  {
    category: "support",
    question: "What should I do if an Orbix page is not loading?",
    answer:
      "Check your internet connection, refresh the page, and try again in an updated browser. If the problem continues, note the page URL and any visible error message before contacting the technical team.",
  },
  {
    category: "support",
    question: "What does 'Failed to fetch' mean?",
    answer:
      "It usually means the browser could not complete a request to the server. Possible reasons include connectivity problems, server errors, or browser security restrictions. Share the exact error with the technical team.",
  },
  {
    category: "support",
    question: "How can I report incorrect information on Orbix?",
    answer:
      "Contact the responsible club coordinator or authorized ECA representative with the incorrect information and supporting details. The technical team can then review the issue with the relevant authority.",
  },
  {
    category: "support",
    question: "How can I suggest a new feature for Orbix?",
    answer:
      "Use the contact section below to prepare an email describing your suggestion, why it is useful, and which students or clubs would benefit from it.",
  },
];

/* ============================================================
   INTERACTIVE HERO ILLUSTRATION

   Features:
   - Floating animation
   - Mouse-follow 3D tilt
   - Hover zoom
   - Smooth return to original position
   - Reduced-motion support
============================================================ */

const HeroIllustration = () => {
  const imageRef = useRef(null);
  const [imageFailed, setImageFailed] = useState(false);

  const handleMouseMove = (event) => {
    if (!imageRef.current) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * 14;
    const rotateX = (0.5 - y) * 14;

    imageRef.current.style.transform = `
      perspective(900px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.05)
    `;
  };

  const handleMouseLeave = () => {
    if (!imageRef.current) return;

    imageRef.current.style.transform = `
      perspective(900px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;
  };

  const hasImage = Boolean(HERO_IMAGE.trim()) && !imageFailed;

  return (
    <div
      className="
        relative flex
        h-[220px] w-full
        items-center justify-center
        sm:h-[260px]
        lg:h-[300px]
      "
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Decorative blurred glow */}
      <div
        className="
          pointer-events-none
          absolute h-44 w-44
          rounded-full
          bg-amber-300/20
          blur-[70px]
          sm:h-56 sm:w-56
        "
      />

      {/* Decorative orbit rings */}
      <div
        className="
          pointer-events-none
          absolute h-[190px] w-[190px]
          rounded-full
          border border-white/10
          sm:h-[240px] sm:w-[240px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute h-[150px] w-[150px]
          rounded-full
          border border-amber-200/10
          sm:h-[190px] sm:w-[190px]
        "
      />

      {/* Decorative sparkles */}
      <Sparkles
        size={22}
        className="
          pointer-events-none
          absolute left-[12%] top-[16%]
          text-amber-200/80
          animate-pulse
        "
      />

      <Sparkles
        size={16}
        className="
          pointer-events-none
          absolute bottom-[15%] right-[12%]
          text-white/70
          animate-pulse
        "
      />

      {/* Floating image */}
      <div
        className="
          relative z-10
          flex h-full w-full
          items-center justify-center
          motion-safe:animate-[orbixFloat_5s_ease-in-out_infinite]
        "
      >
        <div
          ref={imageRef}
          className="
            flex h-full w-full
            items-center justify-center
            transition-transform duration-300 ease-out
            will-change-transform
          "
        >
          {hasImage ? (
            <img
              src={HERO_IMAGE}
              alt="Orbix Help Center illustration"
              onError={() => setImageFailed(true)}
              draggable={false}
              className="
                max-h-[240px]
                w-full max-w-[340px]
                select-none
                object-contain
                drop-shadow-[0_22px_28px_rgba(0,0,0,0.22)]
                sm:max-h-[270px]
                lg:max-h-[300px]
              "
            />
          ) : (
            /* Placeholder until you add your PNG */
            <div
              className="
                flex h-[180px] w-[220px]
                flex-col items-center justify-center
                gap-3 rounded-3xl
                border border-dashed border-white/30
                bg-white/5
                text-center
                backdrop-blur-sm
              "
            >
              <HelpCircle
                size={42}
                strokeWidth={1.5}
                className="text-amber-200"
              />

              <p className="text-sm font-semibold text-white">
                Your PNG Illustration
              </p>

              <p className="text-xs text-white/60">
                Add image path in HERO_IMAGE
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   HELP PAGE
============================================================ */

const HelpPage = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openFaq, setOpenFaq] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  /* ================= FILTER FAQs ================= */

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      activeCategory === "all" ||
      faq.category === activeCategory;

    const searchText = search.toLowerCase().trim();

    const matchesSearch = `${faq.question} ${faq.answer}`
      .toLowerCase()
      .includes(searchText);

    return matchesCategory && matchesSearch;
  });

  /* ================= SUPPORT FORM ================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace with your verified support email.
    const supportEmail = "YOUR_SUPPORT_EMAIL@example.com";

    if (supportEmail.includes("YOUR_SUPPORT_EMAIL")) {
      alert("Please configure the official Orbix support email first.");
      return;
    }

    const subject = encodeURIComponent("Orbix Help Request");

    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );

    window.location.href =
      `mailto:${supportEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-[#faf7f5] text-stone-800">
      {/* ================= HEADER ================= */}
      <Header2 />

      {/* ================= MAIN CONTENT ================= */}
      <main
        className="
          mx-auto max-w-7xl
          px-4 pb-8 pt-28
          sm:px-6 lg:px-8
        "
      >
        {/* ================= HERO ================= */}
        <section
          className="
            relative overflow-hidden
            rounded-3xl
            bg-gradient-to-r
            from-[#931913]
            to-[#580e07]
            px-6 py-8
            text-white
            sm:px-10 sm:py-10
            lg:px-12
          "
        >
          {/* Background decorative glow */}
          <div
            className="
              pointer-events-none
              absolute -right-20 -top-20
              h-72 w-72 rounded-full
              bg-white/5 blur-3xl
            "
          />

          <div
            className="
              relative z-10
              grid items-center gap-6
              lg:grid-cols-[1.15fr_0.85fr]
            "
          >
            {/* LEFT: TEXT */}
            <div className="relative z-20">
              <p
                className="
                  text-xs font-semibold
                  uppercase tracking-[0.2em]
                  text-amber-200
                  sm:text-sm
                "
              >
                Orbix Help Center
              </p>

              <h1
                className="
                  mt-4 text-3xl
                  font-bold leading-tight
                  sm:text-4xl lg:text-5xl
                "
              >
                How can we{" "}
                <span className="text-amber-200">
                  help you?
                </span>
              </h1>

              <p
                className="
                  mt-4 max-w-xl
                  text-sm leading-7
                  text-white/80
                  sm:text-base
                "
              >
                Find answers about student accounts,
                clubs, events, achievements, ECA and
                technical support at SKIT Jaipur.
              </p>

              <div
                className="
                  mt-6 flex flex-wrap
                  items-center gap-3
                  text-xs text-white/70
                "
              >
                <span>Student Support</span>

                <span className="h-1 w-1 rounded-full bg-amber-200" />

                <span>Club Information</span>

                <span className="h-1 w-1 rounded-full bg-amber-200" />

                <span>ECA Guidance</span>
              </div>
            </div>

            {/* RIGHT: INTERACTIVE PNG */}
            <HeroIllustration />
          </div>
        </section>

        {/* ================= SEARCH ================= */}
        <div className="relative mx-auto -mt-6 max-w-2xl z-20">
          <Search
            size={20}
            className="
              absolute left-4 top-1/2
              -translate-y-1/2
              text-stone-400
            "
          />

          <input
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setOpenFaq(null);
            }}
            placeholder="Search your question..."
            aria-label="Search FAQs"
            className="
              w-full rounded-2xl
              border border-stone-200
              bg-white py-4 pl-12 pr-12
              text-sm shadow-lg
              outline-none
              focus:border-[#900505]
            "
          />

          {search && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setOpenFaq(null);
              }}
              aria-label="Clear search"
              className="
                absolute right-4 top-1/2
                -translate-y-1/2
                text-stone-400
                hover:text-[#900505]
              "
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* ================= CATEGORIES ================= */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-[#35120f]">
            Browse by category
          </h2>

          <p className="mt-2 text-sm text-stone-500">
            Select a topic to find answers relevant to your needs.
          </p>

          <div
            className="
              mt-6 grid grid-cols-1 gap-4
              sm:grid-cols-2 lg:grid-cols-3
            "
          >
            {categories.map(
              ({ id, title, description, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(
                      activeCategory === id ? "all" : id
                    );
                    setOpenFaq(null);
                  }}
                  aria-pressed={activeCategory === id}
                  className={`
                    group rounded-2xl border
                    bg-white p-5 text-left
                    transition-all duration-200
                    hover:-translate-y-1
                    hover:shadow-md
                    ${
                      activeCategory === id
                        ? "border-[#900505] ring-2 ring-[#900505]/10"
                        : "border-stone-200"
                    }
                  `}
                >
                  <div
                    className="
                      flex h-11 w-11
                      items-center justify-center
                      rounded-xl
                      bg-[#900505]/10
                      text-[#900505]
                    "
                  >
                    <Icon size={23} />
                  </div>

                  <h3 className="mt-4 font-semibold text-[#35120f]">
                    {title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-stone-500">
                    {description}
                  </p>
                </button>
              )
            )}
          </div>
        </section>

        {/* ================= FAQs ================= */}
        <section className="mt-14">
          <div
            className="
              mb-5 flex flex-wrap
              items-center justify-between gap-3
            "
          >
            <div>
              <h2 className="text-2xl font-bold text-[#35120f]">
                Frequently asked questions
              </h2>

              <p className="mt-2 text-sm text-stone-500">
                {filteredFaqs.length} questions available
              </p>
            </div>

            {(activeCategory !== "all" || search) && (
              <button
                type="button"
                onClick={() => {
                  setActiveCategory("all");
                  setSearch("");
                  setOpenFaq(null);
                }}
                className="
                  text-sm font-semibold
                  text-[#900505]
                  hover:underline
                "
              >
                Clear filters
              </button>
            )}
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaq === faq.question;

              return (
                <div
                  key={faq.question}
                  className="
                    overflow-hidden rounded-2xl
                    border border-stone-200
                    bg-white
                    transition-all duration-200
                    hover:border-[#900505]/25
                  "
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() =>
                      setOpenFaq(
                        isOpen ? null : faq.question
                      )
                    }
                    className="
                      flex w-full
                      items-center justify-between
                      gap-4 p-5 text-left
                    "
                  >
                    <span
                      className="
                        text-sm font-semibold
                        text-[#35120f]
                        sm:text-base
                      "
                    >
                      {faq.question}
                    </span>

                    <ChevronDown
                      size={19}
                      className={`
                        shrink-0
                        text-[#900505]
                        transition-transform duration-200
                        ${isOpen ? "rotate-180" : ""}
                      `}
                    />
                  </button>

                  {isOpen && (
                    <p
                      className="
                        border-t border-stone-100
                        px-5 py-4
                        text-sm leading-7
                        text-stone-600
                      "
                    >
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}

            {filteredFaqs.length === 0 && (
              <div
                className="
                  rounded-2xl
                  border border-stone-200
                  bg-white p-8 text-center
                "
              >
                <HelpCircle
                  size={30}
                  className="mx-auto text-stone-400"
                />

                <p className="mt-3 font-semibold text-stone-700">
                  No matching questions found
                </p>

                <p className="mt-2 text-sm text-stone-500">
                  Try another keyword or clear your filters.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ================= CONTACT SUPPORT ================= */}
        <section
          className="
            mt-14 grid gap-8
            rounded-3xl
            border border-stone-200
            bg-white p-6
            sm:p-8
            lg:grid-cols-2 lg:p-10
          "
        >
          <div>
            <div
              className="
                flex h-12 w-12
                items-center justify-center
                rounded-xl
                bg-[#900505]/10
                text-[#900505]
              "
            >
              <Mail size={24} />
            </div>

            <h2 className="mt-5 text-2xl font-bold text-[#35120f]">
              Still need help?
            </h2>

            <p className="mt-3 max-w-md text-sm leading-7 text-stone-500">
              Couldn't find your answer? Describe your issue
              and contact the Orbix support team.
            </p>

            <div
              className="
                mt-6 flex items-center gap-2
                text-sm font-medium
                text-[#900505]
              "
            >
              We're here to help
              <ArrowRight size={17} />
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input
              required
              aria-label="Your name"
              placeholder="Your name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="
                w-full rounded-xl
                border border-stone-200
                px-4 py-3 text-sm
                outline-none
                focus:border-[#900505]
              "
            />

            <input
              required
              type="email"
              aria-label="College email"
              placeholder="College email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="
                w-full rounded-xl
                border border-stone-200
                px-4 py-3 text-sm
                outline-none
                focus:border-[#900505]
              "
            />

            <textarea
              required
              aria-label="Describe your issue"
              placeholder="Describe your issue..."
              rows={4}
              maxLength={2000}
              value={form.message}
              onChange={(e) =>
                setForm({
                  ...form,
                  message: e.target.value,
                })
              }
              className="
                w-full resize-y
                rounded-xl
                border border-stone-200
                px-4 py-3 text-sm
                outline-none
                focus:border-[#900505]
              "
            />

            <button
              type="submit"
              className="
                flex items-center justify-center gap-2
                rounded-xl
                bg-[#900505]
                px-6 py-3
                font-semibold text-white
                transition-all duration-200
                hover:bg-[#720404]
              "
            >
              Contact Support
              <ArrowRight size={17} />
            </button>

            <p className="text-xs leading-5 text-stone-400">
              This form opens your email application.
              It does not create a support ticket in Orbix.
            </p>
          </form>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="py-8 text-center text-xs text-stone-400">
          Orbix · Student & Club Engagement Portal · SKIT Jaipur
        </footer>
      </main>

      {/* ================= FLOAT ANIMATION ================= */}
      <style>
        {`
          @keyframes orbixFloat {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-12px);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default HelpPage;
