import React, { useState } from 'react';
import { Search, ChevronDown, ShieldCheck, Users, CalendarDays, Trophy, Mail } from 'lucide-react';
import Header2 from '../../Header2/Header2';

const categories = [
  { id: 'account', title: 'Account & Login', icon: ShieldCheck },
  { id: 'clubs', title: 'Clubs & Membership', icon: Users },
  { id: 'events', title: 'Events & Activities', icon: CalendarDays },
  { id: 'profile', title: 'Profile & Achievements', icon: Trophy },
];

const faqs = [
  {
    category: 'account',
    question: 'How do I log in to Orbix?',
    answer: 'Sign in using your verified SKIT Google account ending in @skit.ac.in.',
  },
  {
    category: 'account',
    question: 'Why can’t I access my student dashboard?',
    answer: 'Check your internet connection and college account. Try signing in again if the problem continues.',
  },
  {
    category: 'clubs',
    question: 'How can I join a club?',
    answer: 'Explore the clubs section and follow the available membership instructions. Contact the club coordinator if you need help.',
  },
  {
    category: 'clubs',
    question: 'Can I join multiple clubs?',
    answer: 'Membership depends on the applicable college and ECA rules. Confirm the current requirements with your coordinator.',
  },
  {
    category: 'events',
    question: 'Where can I find upcoming events?',
    answer: 'Visit the Upcoming Events section on your student page to explore published activities.',
  },
  {
    category: 'events',
    question: 'How can I volunteer for an event?',
    answer: 'Contact the organizing club or follow the volunteering instructions published for that event.',
  },
  {
    category: 'profile',
    question: 'Where can I view my achievements?',
    answer: 'Visit your Student Profile Dashboard to view available achievement and certificate information.',
  },
  {
    category: 'profile',
    question: 'What if my points are incorrect?',
    answer: 'Contact the organizing club coordinator with the event details so your record can be checked.',
  },
];

const HelpPage = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      activeCategory === 'all' || faq.category === activeCategory;

    const matchesSearch =
      `${faq.question} ${faq.answer}`
        .toLowerCase()
        .includes(search.toLowerCase().trim());

    return matchesCategory && matchesSearch;
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const supportEmail = 'YOUR_SUPPORT_EMAIL@example.com';

    if (supportEmail.includes('YOUR_SUPPORT_EMAIL')) {
      alert('Please configure the official Orbix support email first.');
      return;
    }

    const subject = encodeURIComponent('Orbix Help Request');
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );

    window.location.href =
      `mailto:${supportEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-[#faf7f5] text-stone-800">
      <Header2 />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Hero */}
        <section className="rounded-3xl bg-gradient-to-r from-[#931913] to-[#580e07] px-6 py-10 text-white sm:px-10 sm:py-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-200">
            Orbix Help Center
          </p>

          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-5xl">
            How can we <span className="text-amber-200">help you?</span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
            Find answers about student accounts, clubs, events and achievements
            at SKIT Jaipur.
          </p>
        </section>

        {/* Search */}
        <div className="relative mx-auto -mt-6 max-w-2xl">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
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
            className="w-full rounded-2xl border border-stone-200 bg-white py-4 pl-12 pr-4 text-sm shadow-lg outline-none focus:border-[#900505]"
          />
        </div>

        {/* Categories */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-[#35120f]">
            Browse by category
          </h2>
          <p className="mt-2 text-sm text-stone-500">
            Select a topic to find relevant answers.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map(({ id, title, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setActiveCategory(activeCategory === id ? 'all' : id);
                  setOpenFaq(null);
                }}
                aria-pressed={activeCategory === id}
                className={`rounded-2xl border bg-white p-5 text-left transition hover:-translate-y-1 hover:shadow-md ${
                  activeCategory === id
                    ? 'border-[#900505] ring-2 ring-[#900505]/10'
                    : 'border-stone-200'
                }`}
              >
                <Icon size={25} className="text-[#900505]" />
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-2 text-xs text-stone-500">
                  Explore related questions
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="mt-14">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-bold text-[#35120f]">
              Frequently asked questions
            </h2>

            {activeCategory !== 'all' && (
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className="text-sm font-semibold text-[#900505]"
              >
                Clear filter
              </button>
            )}
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq, index) => (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-stone-200 bg-white"
              >
                <button
                  type="button"
                  aria-expanded={openFaq === index}
                  onClick={() =>
                    setOpenFaq(openFaq === index ? null : index)
                  }
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="text-sm font-semibold sm:text-base">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={19}
                    className={`shrink-0 text-[#900505] transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {openFaq === index && (
                  <p className="border-t border-stone-100 px-5 py-4 text-sm leading-7 text-stone-600">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}

            {filteredFaqs.length === 0 && (
              <p className="rounded-2xl bg-white p-8 text-center text-sm text-stone-500">
                No matching questions found. Try another search.
              </p>
            )}
          </div>
        </section>

        {/* Contact Form */}
        <section className="mt-14 grid gap-8 rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 lg:grid-cols-2 lg:p-10">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#900505]/10 text-[#900505]">
              <Mail size={24} />
            </div>

            <h2 className="mt-5 text-2xl font-bold text-[#35120f]">
              Still need help?
            </h2>
            <p className="mt-3 max-w-md text-sm leading-7 text-stone-500">
              Tell us about your issue and prepare an email for the Orbix
              support team.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              required
              aria-label="Your name"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-[#900505]"
            />

            <input
              required
              type="email"
              aria-label="College email"
              placeholder="College email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-[#900505]"
            />

            <textarea
              required
              aria-label="Describe your issue"
              placeholder="Describe your issue..."
              rows={4}
              maxLength={2000}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full resize-y rounded-xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-[#900505]"
            />

            <button
              type="submit"
              className="w-full rounded-xl bg-[#900505] px-5 py-3 font-semibold text-white transition hover:bg-[#720404] sm:w-auto"
            >
              Contact Support →
            </button>

            <p className="text-xs leading-5 text-stone-400">
              This form opens your email application. It does not create a
              support ticket in Orbix.
            </p>
          </form>
        </section>

        <footer className="py-8 text-center text-xs text-stone-400">
          Orbix · Student & Club Engagement Portal · SKIT Jaipur
        </footer>
      </main>
    </div>
  );
};

export default HelpPage;
