
import React, { useMemo, useState } from "react";
import Header from "../header/Header";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Users,
  CalendarDays,
  UserRound,
  Settings,
  MessageCircle,
  ChevronDown,
  ArrowUpRight,
  HelpCircle,
  Mail,
  BookOpen,
  LifeBuoy,
  X,
  RotateCcw,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const categories = [
  { id: "all", label: "All topics", icon: BookOpen },
  { id: "clubs", label: "Clubs", icon: Users },
  { id: "events", label: "Events", icon: CalendarDays },
  { id: "account", label: "Account & access", icon: UserRound },
  { id: "technical", label: "Technical issues", icon: Settings },
];

const faqs = [
  {
    id: 1,
    category: "clubs",
    question: "What is JoinSphere?",
    answer:
      "JoinSphere is a centralized platform for discovering student clubs, exploring campus activities, and finding opportunities to participate in student life at SKIT Jaipur.",
  },
  {
    id: 2,
    category: "clubs",
    question: "How can I discover clubs at SKIT Jaipur?",
    answer:
      "Visit the Clubs section and explore the available club profiles. Read each club's overview, focus areas, achievements, activities, and team information to find communities that match your interests.",
  },
  {
    id: 3,
    category: "clubs",
    question: "How can I join a club?",
    answer:
      "Open the relevant club profile and check its recruitment or participation information. If a joining process is listed, follow those instructions. You can also contact the listed club coordinator for clarification.",
  },
  {
    id: 4,
    category: "clubs",
    question: "Where can I find club coordinator details?",
    answer:
      "Check the individual club profile for available coordinator and core-team information. Contact details may vary by club and should be used for club-related queries.",
  },
  {
    id: 5,
    category: "events",
    question: "Where can I find upcoming events and workshops?",
    answer:
      "Visit the Events or Activities section to explore the opportunities published on the platform, such as workshops, competitions, club activities, and recruitment announcements.",
  },
  {
    id: 6,
    category: "events",
    question: "How do I participate in an event?",
    answer:
      "Open the event information and read the eligibility criteria, dates, deadlines, and participation instructions. If the organizer has provided a registration link, follow it to complete registration.",
  },
  {
    id: 7,
    category: "account",
    question: "Do I need an account to explore clubs?",
    answer:
      "You can browse the club information made publicly available on the website. If a specific feature requires sign-in, follow the instructions displayed on that page.",
  },
  {
    id: 8,
    category: "account",
    question: "What should I do if I cannot access my account?",
    answer:
      "Check your login details and internet connection first. If the problem continues, use the website's available account recovery option, if provided, or contact the website administrator.",
  },
  {
    id: 9,
    category: "technical",
    question: "The website is not loading correctly. What can I do?",
    answer:
      "Refresh the page, check your internet connection, and try opening the website in an updated browser. You can also clear the browser cache or try another browser. If the issue persists, contact the website administrator.",
  },
  {
    id: 10,
    category: "technical",
    question: "How can I report incorrect club information?",
    answer:
      "Contact the website administrator or the relevant club coordinator and mention the club name, the information that appears incorrect, and the correction needed.",
  },
];

const supportCards = [
  {
    icon: Users,
    title: "Club-related queries",
    description:
      "Questions about club activities, recruitment, coordinators, or participation.",
    action: "Find a club coordinator",
    href: "#club-help",
  },
  {
    icon: LifeBuoy,
    title: "Website support",
    description:
      "Help with access problems, broken pages, or incorrect website information.",
    action: "View troubleshooting",
    href: "#technical",
  },
];

const HelpHome = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openFaq, setOpenFaq] = useState(null);

  const filteredFaqs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return faqs.filter((faq) => {
      const matchesCategory =
        activeCategory === "all" ||
        faq.category === activeCategory;

      const matchesSearch =
        !query ||
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const resetFilters = () => {
    setSearch("");
    setActiveCategory("all");
    setOpenFaq(null);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#faf8f6]">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#931913] via-[#7c1510] to-[#500b07]">
        <div className="pointer-events-none absolute -right-32 -top-36 h-[440px] w-[440px] rounded-full bg-white/[0.06] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-24 h-[380px] w-[380px] rounded-full bg-white/[0.05] blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-36 md:px-8 md:pb-28">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.div
              variants={fadeUp}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] px-4 py-2 text-xs font-semibold tracking-wide text-white/85"
            >
              <HelpCircle size={15} />
              JOINSPHERE SUPPORT CENTER
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl font-semibold leading-tight tracking-[-0.04em] text-white md:text-6xl"
            >
              How can we{" "}
              <span className="text-white/65">help you?</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/70 md:text-base"
            >
              Find answers about student clubs, campus events,
              participation, and using JoinSphere.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <main className="relative mx-auto -mt-10 max-w-7xl px-5 pb-20 md:px-8">
        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto max-w-3xl rounded-2xl border border-black/[0.05] bg-white p-3 shadow-[0_18px_55px_rgba(45,20,15,0.12)]"
        >
          <div className="flex items-center gap-3 px-2">
            <Search size={21} className="shrink-0 text-[#983530]" />

            <input
              type="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setOpenFaq(null);
              }}
              placeholder="Search your question..."
              aria-label="Search frequently asked questions"
              className="min-w-0 flex-1 bg-transparent py-3 text-sm text-[#242424] outline-none placeholder:text-[#a09a96] md:text-base"
            />

            {search && (
              <button
                onClick={() => {
                  setSearch("");
                  setOpenFaq(null);
                }}
                aria-label="Clear search"
                className="rounded-lg p-2 text-[#777] transition hover:bg-[#f6f0ed] hover:text-[#983530]"
              >
                <X size={17} />
              </button>
            )}
          </div>
          <p className="px-3 pb-1 text-xs text-[#99918c]">
            Try searching for clubs, events, registration, or login.
          </p>
        </motion.div>

        {/* Category navigation */}
        <section className="mt-16">
          <div className="mb-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#983530]">
              FIND YOUR ANSWER
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#242424] md:text-3xl">
              Browse help topics
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#77716d]">
              Choose a category to find the information you need.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
            {categories.map(({ id, label, icon: Icon }) => {
              const active = activeCategory === id;

              return (
                <button
                  key={id}
                  onClick={() => {
                    setActiveCategory(id);
                    setOpenFaq(null);
                  }}
                  aria-pressed={active}
                  className={`group rounded-2xl border p-4 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-md md:p-5 ${
                    active
                      ? "border-[#983530] bg-[#983530] text-white shadow-lg shadow-[#983530]/10"
                      : "border-[#eee7e2] bg-white text-[#292522] hover:border-[#983530]/40"
                  }`}
                >
                  <span
                    className={`mb-5 flex h-10 w-10 items-center justify-center rounded-xl ${
                      active
                        ? "bg-white/15 text-white"
                        : "bg-[#983530]/[0.07] text-[#983530]"
                    }`}
                  >
                    <Icon size={19} />
                  </span>

                  <span className="block text-sm font-semibold leading-5">
                    {label}
                  </span>

                  <span
                    className={`mt-2 block text-xs ${
                      active ? "text-white/65" : "text-[#99918c]"
                    }`}
                  >
                    {active ? "Selected" : "Explore answers"}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mt-16 scroll-mt-24">
          <div className="grid items-start gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            <div className="lg:sticky lg:top-28">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#983530]">
                FREQUENTLY ASKED QUESTIONS
              </p>

              <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-[#242424]">
                Answers to the things you want to know.
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#77716d]">
                Still looking for something? Search your question
                or switch categories to narrow down the results.
              </p>

              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-[#eee7e2] bg-white p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#983530]/[0.08] text-[#983530]">
                  <MessageCircle size={19} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#292522]">
                    Need more help?
                  </p>
                  <a
                    href="#contact"
                    className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-[#983530] hover:underline"
                  >
                    Explore support options <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-sm text-[#77716d]">
                  <span className="font-semibold text-[#292522]">
                    {filteredFaqs.length}
                  </span>{" "}
                  {filteredFaqs.length === 1 ? "answer" : "answers"} found
                </p>

                {(search || activeCategory !== "all") && (
                  <button
                    onClick={resetFilters}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#983530] hover:underline"
                  >
                    <RotateCcw size={13} />
                    Reset filters
                  </button>
                )}
              </div>

              <div className="overflow-hidden rounded-2xl border border-[#eee7e2] bg-white">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, index) => {
                    const isOpen = openFaq === faq.id;

                    return (
                      <div
                        key={faq.id}
                        className={
                          index !== filteredFaqs.length - 1
                            ? "border-b border-[#f0ebe7]"
                            : ""
                        }
                      >
                        <button
                          onClick={() =>
                            setOpenFaq(isOpen ? null : faq.id)
                          }
                          aria-expanded={isOpen}
                          aria-controls={`faq-answer-${faq.id}`}
                          className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-[#fcf9f7] md:px-6"
                        >
                          <span className="text-sm font-semibold leading-6 text-[#292522] md:text-[15px]">
                            {faq.question}
                          </span>

                          <span
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all ${
                              isOpen
                                ? "rotate-180 bg-[#983530] text-white"
                                : "bg-[#f7f1ed] text-[#983530]"
                            }`}
                          >
                            <ChevronDown size={17} />
                          </span>
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              id={`faq-answer-${faq.id}`}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              <p className="px-5 pb-5 text-sm leading-7 text-[#77716d] md:px-6 md:pb-6">
                                {faq.answer}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })
                ) : (
                  <div className="px-6 py-14 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#983530]/[0.07] text-[#983530]">
                      <Search size={23} />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-[#292522]">
                      No answers found
                    </h3>
                    <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#77716d]">
                      Try another keyword or browse all help topics.
                    </p>
                    <button
                      onClick={resetFilters}
                      className="mt-5 rounded-xl bg-[#983530] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#7c211c]"
                    >
                      Show all questions
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Support options */}
        <section id="contact" className="mt-20 scroll-mt-24">
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#931913] to-[#580e07] p-7 text-white md:p-11">
            <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-white/[0.05] blur-2xl" />

            <div className="relative">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] px-3 py-1.5 text-xs font-semibold text-white/80">
                <LifeBuoy size={14} />
                WE'RE HERE TO HELP
              </div>

              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                <div>
                  <h2 className="max-w-xl text-3xl font-semibold tracking-tight md:text-4xl">
                    Didn't find what you were looking for?
                  </h2>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-white/65">
                    Start with your club coordinator for club-related
                    questions, or contact the website administrator
                    for technical issues.
                  </p>
                </div>

                <a
                  href="#support-options"
                  className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#7c1510] transition hover:bg-[#f7ebe6] md:self-auto"
                >
                  View support options
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </div>

          <div
            id="support-options"
            className="mt-5 grid gap-4 md:grid-cols-2"
          >
            {supportCards.map(({ icon: Icon, title, description, action, href }) => (
              <a
                key={title}
                href={href}
                className="group flex gap-4 rounded-2xl border border-[#eee7e2] bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#983530]/30 hover:shadow-lg"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#983530]/[0.08] text-[#983530]">
                  <Icon size={21} />
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-[#292522]">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#77716d]">
                    {description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#983530]">
                    {action}
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-3 rounded-2xl border border-[#eee7e2] bg-white px-6 py-5 text-center sm:flex-row sm:text-left">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f7f1ed] text-[#983530]">
                <Mail size={18} />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#292522]">
                  Prefer direct assistance?
                </p>
                <p className="mt-1 text-xs text-[#77716d]">
                  Use the official contact details published by SKIT
                  or your club.
                </p>
              </div>
            </div>

            <span className="text-xs font-medium text-[#99918c]">
              JoinSphere · SKIT Jaipur
            </span>
          </div>
        </section>

        {/* Footer note */}
        <footer className="mt-12 border-t border-[#eae2dc] pt-6 text-center">
          <p className="text-xs leading-6 text-[#99918c]">
            JoinSphere Help Center · Making campus information
            easier to discover.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default HelpPage;