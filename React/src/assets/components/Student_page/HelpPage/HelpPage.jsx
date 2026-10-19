import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ChevronDown,
  ArrowUpRight,
  ShieldCheck,
  Users,
  CalendarDays,
  Trophy,
  UserRound,
  MessageCircle,
  Mail,
  CircleHelp,
  BookOpen,
  FileText,
  LifeBuoy,
  Sparkles,
  Send,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';

import Header2 from '../../Header2/Header2';

const helpCategories = [
  {
    id: 'account',
    title: 'Account & Login',
    description: 'Login, account access and student verification.',
    icon: ShieldCheck,
    color: 'bg-rose-50 text-[#900505]',
  },
  {
    id: 'clubs',
    title: 'Clubs & Membership',
    description: 'Discover clubs and understand membership.',
    icon: Users,
    color: 'bg-amber-50 text-amber-700',
  },
  {
    id: 'events',
    title: 'Events & Activities',
    description: 'Event participation, volunteering and attendance.',
    icon: CalendarDays,
    color: 'bg-orange-50 text-orange-700',
  },
  {
    id: 'profile',
    title: 'Profile & Achievements',
    description: 'Student information, certificates and points.',
    icon: Trophy,
    color: 'bg-yellow-50 text-yellow-700',
  },
];

const faqs = [
  {
    category: 'account',
    question: 'How do I log in to Orbix?',
    answer:
      'Open the Orbix homepage and select Login as a Student. Sign in using your verified SKIT Google account ending in @skit.ac.in. If login fails, check that you selected the correct college account and try again.',
  },
  {
    category: 'account',
    question: 'Why am I unable to access my student dashboard?',
    answer:
      'First, check your internet connection and confirm that you are signed in with your SKIT college account. You can try refreshing the page or signing in again. If the issue continues, contact the Orbix support team with the error details.',
  },
  {
    category: 'account',
    question: 'Can I use my personal Gmail account?',
    answer:
      'Student login is intended for verified @skit.ac.in accounts. A personal Gmail account may not be accepted by the college authentication system.',
  },
  {
    category: 'clubs',
    question: 'How can I discover clubs at SKIT?',
    answer:
      'Visit the student page and explore the clubs section to learn about available clubs and their activities. Membership application and approval options depend on the features currently enabled in Orbix.',
  },
  {
    category: 'clubs',
    question: 'How do I join a club?',
    answer:
      'Explore the club information and follow the available membership application instructions. If an application option is not available or your application status is unclear, contact the relevant club coordinator.',
  },
  {
    category: 'clubs',
    question: 'Can I participate in more than one club?',
    answer:
      'Club participation follows the college and ECA rules applicable to students. Confirm the current membership limits and any separate club arrangements with the relevant coordinator.',
  },
  {
    category: 'events',
    question: 'Where can I find upcoming events?',
    answer:
      'Check the upcoming events section on the student page. Event information and participation options depend on the details published by the organizing club.',
  },
  {
    category: 'events',
    question: 'How can I volunteer for an event?',
    answer:
      'Contact the organizing club or follow the volunteering instructions shared for that event. Keep any confirmation or contribution details for your records.',
  },
  {
    category: 'profile',
    question: 'Where can I view my achievements and certificates?',
    answer:
      'Open your student profile dashboard, if the relevant section is available. Achievement records and certificate links will depend on whether the information has been added and verified.',
  },
  {
    category: 'profile',
    question: 'What should I do if my points or activity records are incorrect?',
    answer:
      'Keep the event name, date and any supporting proof ready. Contact the organizing club coordinator to verify the record and request a correction through the appropriate college process.',
  },
];

const supportTopics = [
  'Login or account issue',
  'Club membership',
  'Event or volunteering',
  'Profile or achievements',
  'Other',
];

const HelpPage = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFaq, setOpenFaq] = useState(0);

  const [supportForm, setSupportForm] = useState({
    name: '',
    email: '',
    topic: supportTopics[0],
    message: '',
  });

  const [formError, setFormError] = useState('');
  const [copied, setCopied] = useState(false);

  const filteredFaqs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return faqs.filter((faq) => {
      const matchesCategory =
        activeCategory === 'all' || faq.category === activeCategory;

      const matchesSearch =
        !query ||
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const handleSupportChange = (event) => {
    const { name, value } = event.target;

    setSupportForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSupportSubmit = (event) => {
    event.preventDefault();
    setFormError('');

    const { name, email, topic, message } = supportForm;

    if (!name.trim() || !email.trim() || !message.trim()) {
      setFormError('Please fill in your name, email and message.');
      return;
    }

    const subject = encodeURIComponent(`[Orbix Support] ${topic}`);
    const body = encodeURIComponent(
      `Name: ${name.trim()}\n` +
        `Email: ${email.trim()}\n` +
        `Topic: ${topic}\n\n` +
        `Message:\n${message.trim()}`
    );

    // Replace this address with the official support email when available.
    const supportEmail = 'YOUR_SUPPORT_EMAIL@example.com';

    if (supportEmail.includes('YOUR_SUPPORT_EMAIL')) {
      setFormError(
        'The support email has not been configured yet. Please contact your Orbix administrator.'
      );
      return;
    }

    window.location.href = `mailto:${supportEmail}?subject=${subject}&body=${body}`;
  };

  const handleCopyEmail = async () => {
    const supportEmail = 'YOUR_SUPPORT_EMAIL@example.com';

    if (supportEmail.includes('YOUR_SUPPORT_EMAIL')) {
      setCopied(false);
      setFormError(
        'Add the official Orbix support email in the code before using this option.'
      );
      return;
    }

    try {
      await navigator.clipboard.writeText(supportEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setFormError('Unable to copy the email. Please copy it manually.');
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f5] text-[#292321]">
      <Header2 />

      <main className="mx-auto w-full max-w-[1440px] px-4 pb-16 pt-8 sm:px-6 lg:px-10 lg:pt-10">
        {/* HERO */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative isolate overflow-hidden rounded-[28px] bg-gradient-to-br from-[#931913] via-[#76120d] to-[#3f0906] px-6 py-10 shadow-[0_18px_55px_rgba(88,14,7,0.14)] sm:px-10 sm:py-14 lg:px-14 lg:py-16"
        >
          <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border border-white/10 sm:h-96 sm:w-96" />
          <div className="pointer-events-none absolute -right-4 -top-12 h-56 w-56 rounded-full border border-white/10 sm:h-72 sm:w-72" />
          <div className="pointer-events-none absolute -bottom-24 left-[42%] h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />

          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-200/25 bg-white/10 px-3.5 py-2 text-xs font-semibold tracking-wide text-amber-100 sm:text-sm">
                <Sparkles size={15} />
                ORBIX HELP CENTER
              </div>

              <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[52px]">
                How can we
                <span className="block text-amber-200">
                  help you today?
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
                Your guide to campus clubs, events and student life at SKIT.
                Find answers, explore helpful resources and get support when
                you need it.
              </p>

              <div className="mt-8 flex flex-wrap gap-3 text-xs font-medium text-white/80 sm:text-sm">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-2.5">
                  <ShieldCheck size={16} className="text-amber-200" />
                  Student support
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-2.5">
                  <Users size={16} className="text-amber-200" />
                  Club guidance
                </span>
              </div>
            </div>

            <div className="mx-auto hidden w-full max-w-sm lg:block">
              <div className="relative rounded-[26px] border border-white/15 bg-white/[0.08] p-5 backdrop-blur-sm">
                <div className="rounded-2xl bg-white p-6 shadow-xl">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#900505]/10 text-[#900505]">
                    <LifeBuoy size={26} />
                  </div>

                  <h2 className="mt-5 text-xl font-bold tracking-tight text-[#35120f]">
                    Need a little guidance?
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-stone-500">
                    Start with a quick search or browse the most common
                    student questions below.
                  </p>

                  <div className="mt-5 flex items-center gap-3 rounded-xl bg-[#faf5f2] p-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#900505] shadow-sm">
                      <Search size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-stone-800">
                        Find an answer
                      </p>
                      <p className="mt-0.5 text-xs text-stone-500">
                        Search our FAQs below
                      </p>
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="ml-auto text-[#900505]"
                    />
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 flex items-center gap-2 rounded-xl border border-stone-100 bg-white px-4 py-3 shadow-lg">
                  <CheckCircle2 size={19} className="text-emerald-600" />
                  <span className="text-xs font-semibold text-stone-700">
                    Your campus, connected.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* SEARCH */}
        <section className="mx-auto -mt-6 max-w-3xl px-2 sm:px-5">
          <div className="relative z-20 flex items-center rounded-2xl border border-stone-200/80 bg-white p-2 shadow-[0_12px_35px_rgba(41,35,33,0.08)]">
            <Search
              size={21}
              className="ml-3 shrink-0 text-stone-400"
            />
            <input
              type="search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setOpenFaq(0);
              }}
              placeholder="Search login, clubs, events, achievements..."
              aria-label="Search help articles"
              className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-stone-800 outline-none placeholder:text-stone-400 sm:px-4 sm:text-base"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="mr-1 rounded-xl px-3 py-2 text-xs font-semibold text-[#900505] hover:bg-rose-50"
              >
                Clear
              </button>
            )}
          </div>
        </section>

        {/* CATEGORY CARDS */}
        <section className="mt-14 sm:mt-16">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a34a3f]">
                Browse by topic
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#35120f] sm:text-3xl">
                What do you need help with?
              </h2>
              <p className="mt-2 text-sm leading-6 text-stone-500 sm:text-base">
                Choose a category to find relevant answers.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setSearch('');
                setOpenFaq(0);
              }}
              className="w-fit text-sm font-semibold text-[#900505] transition hover:text-[#c04a3d]"
            >
              View all topics
              <ArrowUpRight size={15} className="ml-1 inline" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {helpCategories.map((category, index) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;

              return (
                <motion.button
                  key={category.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(isActive ? 'all' : category.id);
                    setOpenFaq(0);
                  }}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.99 }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  aria-pressed={isActive}
                  className={`group flex h-full min-h-[175px] flex-col items-start rounded-2xl border bg-white p-5 text-left transition-all duration-200 sm:p-6 ${
                    isActive
                      ? 'border-[#900505]/40 shadow-[0_10px_30px_rgba(144,5,5,0.09)] ring-2 ring-[#900505]/5'
                      : 'border-stone-200/80 shadow-sm hover:border-[#900505]/20 hover:shadow-lg'
                  }`}
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-200 group-hover:scale-105 ${category.color}`}
                  >
                    <Icon size={23} strokeWidth={1.8} />
                  </div>

                  <div className="mt-5 flex w-full items-center justify-between gap-2">
                    <h3 className="text-base font-bold text-stone-800">
                      {category.title}
                    </h3>
                    <ArrowUpRight
                      size={17}
                      className="shrink-0 text-stone-400 transition group-hover:text-[#900505]"
                    />
                  </div>

                  <p className="mt-2 text-sm leading-6 text-stone-500">
                    {category.description}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="mt-16 grid items-start gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-12">
          <div className="lg:sticky lg:top-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a34a3f]">
              Knowledge base
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-[#35120f] sm:text-3xl">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-sm leading-7 text-stone-500 sm:text-base">
              Quick answers to common questions about using Orbix and getting
              involved in campus activities.
            </p>

            <div className="mt-6 rounded-2xl border border-[#eadbd5] bg-[#f5ebe6] p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#900505] shadow-sm">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#451b16]">
                    Still looking for an answer?
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">
                    Try a different keyword or send your question through the
                    support section below.
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      document
                        .getElementById('contact-support')
                        ?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#900505] hover:underline"
                  >
                    Contact support
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3 px-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#900505] shadow-sm">
                <CircleHelp size={19} />
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-700">
                  Student-first support
                </p>
                <p className="mt-1 text-xs leading-5 text-stone-500">
                  Clear guidance for your campus journey.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-semibold text-stone-600">
                {filteredFaqs.length}{' '}
                {filteredFaqs.length === 1 ? 'answer' : 'answers'} found
              </p>

              {(activeCategory !== 'all' || search) && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('all');
                    setSearch('');
                    setOpenFaq(0);
                  }}
                  className="text-xs font-semibold text-[#900505] hover:underline"
                >
                  Reset filters
                </button>
              )}
            </div>

            <div className="space-y-3">
              {filteredFaqs.map((faq, index) => {
                const isOpen = openFaq === index;
                const categoryName =
                  helpCategories.find((item) => item.id === faq.category)
                    ?.title || 'General';

                return (
                  <div
                    key={faq.question}
                    className={`overflow-hidden rounded-2xl border bg-white transition-all duration-200 ${
                      isOpen
                        ? 'border-[#900505]/20 shadow-[0_8px_28px_rgba(41,35,33,0.05)]'
                        : 'border-stone-200/80 shadow-sm hover:border-stone-300'
                    }`}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      className="flex w-full items-center gap-4 px-4 py-5 text-left sm:px-6"
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                          isOpen
                            ? 'bg-[#900505] text-white'
                            : 'bg-[#faf1ed] text-[#900505]'
                        }`}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block text-[13px] font-bold leading-6 text-stone-800 sm:text-[15px]">
                          {faq.question}
                        </span>
                        <span className="mt-1 block text-[10px] font-semibold uppercase tracking-wider text-stone-400 sm:text-[11px]">
                          {categoryName}
                        </span>
                      </span>

                      <ChevronDown
                        size={19}
                        className={`shrink-0 text-stone-400 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#900505]' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22 }}
                          className="overflow-hidden"
                        >
                          <div className="ml-[60px] border-t border-stone-100 px-4 pb-5 pt-4 sm:ml-[76px] sm:px-6">
                            <p className="text-sm leading-7 text-stone-600">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {filteredFaqs.length === 0 && (
                <div className="rounded-2xl border border-dashed border-stone-300 bg-white px-5 py-12 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#faf1ed] text-[#900505]">
                    <Search size={24} />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-stone-800">
                    No matching answers found
                  </h3>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-stone-500">
                    Try another search term or clear your filters to explore
                    all available questions.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearch('');
                      setActiveCategory('all');
                      setOpenFaq(0);
                    }}
                    className="mt-5 rounded-xl bg-[#900505] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#720404]"
                  >
                    Show all FAQs
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SUPPORT FORM */}
        <section
          id="contact-support"
          className="mt-16 scroll-mt-8 overflow-hidden rounded-[26px] border border-stone-200/80 bg-white shadow-sm lg:mt-20"
        >
          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
            <div className="relative isolate overflow-hidden bg-gradient-to-br from-[#931913] to-[#580e07] p-6 text-white sm:p-9 lg:p-10">
              <div className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full border border-white/10" />
              <div className="relative z-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-amber-200">
                  <MessageCircle size={24} />
                </div>

                <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-amber-200">
                  We are here to help
                </p>
                <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                  Can't find what you're looking for?
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/75">
                  Tell us what you need help with. Your message can be prepared
                  for the Orbix support team using your default email
                  application.
                </p>

                <div className="mt-8 space-y-4 border-t border-white/15 pt-6">
                  <div className="flex items-start gap-3">
                    <Mail
                      size={19}
                      className="mt-0.5 shrink-0 text-amber-200"
                    />
                    <div>
                      <p className="text-sm font-semibold">Email support</p>
                      <p className="mt-1 text-xs leading-5 text-white/65">
                        Configure the official Orbix support email to enable
                        direct contact.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FileText
                      size={19}
                      className="mt-0.5 shrink-0 text-amber-200"
                    />
                    <div>
                      <p className="text-sm font-semibold">
                        Helpful information
                      </p>
                      <p className="mt-1 text-xs leading-5 text-white/65">
                        Include the page name and a description of the issue.
                        Never include passwords or authentication tokens.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-8 lg:p-10">
              <div className="mb-7">
                <h3 className="text-xl font-bold tracking-tight text-[#35120f] sm:text-2xl">
                  Send us your question
                </h3>
                <p className="mt-2 text-sm leading-6 text-stone-500">
                  Fill in the details below to prepare a support email.
                </p>
              </div>

              <form onSubmit={handleSupportSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="support-name"
                      className="mb-2 block text-sm font-semibold text-stone-700"
                    >
                      Full name <span className="text-[#900505]">*</span>
                    </label>
                    <input
                      id="support-name"
                      name="name"
                      value={supportForm.name}
                      onChange={handleSupportChange}
                      placeholder="Enter your name"
                      autoComplete="name"
                      required
                      className="w-full rounded-xl border border-stone-200 bg-[#fdfcfb] px-4 py-3 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-[#900505]/50 focus:ring-4 focus:ring-[#900505]/5"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="support-email"
                      className="mb-2 block text-sm font-semibold text-stone-700"
                    >
                      College email <span className="text-[#900505]">*</span>
                    </label>
                    <input
                      id="support-email"
                      name="email"
                      type="email"
                      value={supportForm.email}
                      onChange={handleSupportChange}
                      placeholder="you@skit.ac.in"
                      autoComplete="email"
                      required
                      className="w-full rounded-xl border border-stone-200 bg-[#fdfcfb] px-4 py-3 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-[#900505]/50 focus:ring-4 focus:ring-[#900505]/5"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="support-topic"
                    className="mb-2 block text-sm font-semibold text-stone-700"
                  >
                    What do you need help with?
                  </label>
                  <select
                    id="support-topic"
                    name="topic"
                    value={supportForm.topic}
                    onChange={handleSupportChange}
                    className="w-full appearance-none rounded-xl border border-stone-200 bg-[#fdfcfb] px-4 py-3 text-sm text-stone-800 outline-none transition focus:border-[#900505]/50 focus:ring-4 focus:ring-[#900505]/5"
                  >
                    {supportTopics.map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="support-message"
                    className="mb-2 block text-sm font-semibold text-stone-700"
                  >
                    Describe your issue{' '}
                    <span className="text-[#900505]">*</span>
                  </label>
                  <textarea
                    id="support-message"
                    name="message"
                    value={supportForm.message}
                    onChange={handleSupportChange}
                    placeholder="Tell us what happened and what you were trying to do..."
                    rows={5}
                    maxLength={2000}
                    required
                    className="w-full resize-y rounded-xl border border-stone-200 bg-[#fdfcfb] px-4 py-3 text-sm leading-6 text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-[#900505]/50 focus:ring-4 focus:ring-[#900505]/5"
                  />
                  <p className="mt-2 text-right text-xs text-stone-400">
                    {supportForm.message.length}/2000
                  </p>
                </div>

                {formError && (
                  <p
                    role="alert"
                    className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm leading-6 text-rose-800"
                  >
                    {formError}
                  </p>
                )}

                <div className="flex flex-col gap-3 border-t border-stone-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-xs text-xs leading-5 text-stone-400">
                    Your form opens your email application. It does not submit
                    a ticket to a server.
                  </p>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#900505] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#720404] hover:shadow-md focus:outline-none focus:ring-4 focus:ring-[#900505]/15"
                  >
                    Prepare email
                    <Send size={16} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="mt-10 flex flex-col gap-4 rounded-2xl border border-[#eadbd5] bg-[#f5ebe6] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#900505] shadow-sm">
              <UserRound size={21} />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#35120f]">
                Your Orbix journey matters.
              </h3>
              <p className="mt-1 text-sm leading-6 text-stone-600">
                Explore clubs, discover opportunities and stay connected with
                campus life.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-[#d9b9ad] bg-white px-4 py-3 text-sm font-semibold text-[#900505] transition hover:border-[#900505]/40 hover:bg-[#fffaf8]"
          >
            Back to top
            <ExternalLink size={15} />
          </button>
        </section>

        <footer className="pb-2 pt-8 text-center">
          <p className="text-xs leading-6 text-stone-400">
            ORBIX · Student & Club Engagement Portal · SKIT Jaipur
          </p>
        </footer>
      </main>
    </div>
  );
};

export default HelpPage;