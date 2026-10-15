
import { motion } from "framer-motion";
import UpComingEventCard from "./UpComingEventCard";

const events = [
  {
    id: 1,
    category: "Technical",
    title: "Tech Event",
    tags: ["Technology", "Innovation"],
    venue: "SKIT Jaipur",
    date: "Coming Soon",
    time: "To be announced",
    coordinators: [],
    poster: "",
  },
  {
    id: 2,
    category: "Cultural",
    title: "Cultural Event",
    tags: ["Culture", "Activities"],
    venue: "SKIT Jaipur",
    date: "Coming Soon",
    time: "To be announced",
    coordinators: [],
    poster: "",
  },
  {
    id: 3,
    category: "Workshop",
    title: "Workshop",
    tags: ["Learning", "Skills"],
    venue: "SKIT Jaipur",
    date: "Coming Soon",
    time: "To be announced",
    coordinators: [],
    poster: "",
  },
  {
    id: 4,
    category: "Sports",
    title: "Sports Event",
    tags: ["Sports", "Teamwork"],
    venue: "SKIT Jaipur",
    date: "Coming Soon",
    time: "To be announced",
    coordinators: [],
    poster: "",
  },
];

export default function UpComingEventSection() {
  return (
    <section className="w-full px-4 py-8 text-white md:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="mb-1 text-sm text-indigo-400">
            DISCOVER
          </p>
          <h2 className="text-2xl font-bold md:text-3xl">
            Upcoming Events
          </h2>
        </div>
      </div>

      <motion.div
        className="flex gap-5 overflow-x-auto pb-5"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {events.map((event) => (
          <UpComingEventCard
            key={event.id}
            category={event.category}
            title={event.title}
            tags={event.tags}
            venue={event.venue}
            date={event.date}
            time={event.time}
            coordinators={event.coordinators}
            poster={event.poster}
          />
        ))}
      </motion.div>
    </section>
  );
}
