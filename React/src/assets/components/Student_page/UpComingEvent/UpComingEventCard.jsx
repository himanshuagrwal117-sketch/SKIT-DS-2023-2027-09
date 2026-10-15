
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, CalendarDays, Clock, Users } from "lucide-react";

const categoryStyles = {
  Technical: "bg-blue-500/15 text-blue-400 border-blue-400/30",
  Cultural: "bg-purple-500/15 text-purple-400 border-purple-400/30",
  Sports: "bg-green-500/15 text-green-400 border-green-400/30",
  Workshop: "bg-orange-500/15 text-orange-400 border-orange-400/30",
  default: "bg-gray-500/15 text-gray-400 border-gray-400/30",
};

export default function UpComingEventCard({
  category = "Technical",
  poster = "",
  title = "Upcoming Event",
  tags = [],
  venue = "",
  date = "",
  time = "",
  coordinators = [],
}) {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  useEffect(() => {
    if (!isRegisterOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsRegisterOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isRegisterOpen]);

  const categoryClass =
    categoryStyles[category] || categoryStyles.default;

  return (
    <>
      {/* Event Card */}
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.25 }}
        className="group relative min-w-[280px] max-w-[320px] overflow-hidden
        rounded-2xl border border-white/10 bg-[#111827] text-white
        shadow-lg"
      >
        {/* Event Poster */}
        <div className="relative h-44 overflow-hidden">
          {poster ? (
            <img
              src={poster}
              alt={title}
              className="h-full w-full object-cover transition-transform
              duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full items-center justify-center
            bg-gradient-to-br from-indigo-900 to-slate-800">
              <span className="text-5xl font-bold text-white/20">
                {title.charAt(0)}
              </span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t
          from-black/80 via-transparent to-black/10" />

          <span
            className={`absolute left-3 top-3 rounded-full border
            px-3 py-1 text-xs font-semibold ${categoryClass}`}
          >
            {category}
          </span>
        </div>

        {/* Event Information */}
        <div className="space-y-4 p-4">
          <div>
            <h3 className="text-lg font-bold text-white">
              {title}
            </h3>

            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  className="rounded-full bg-white/5 px-2 py-1
                  text-xs text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2 text-sm text-gray-300">
            {venue && (
              <p className="flex items-center gap-2">
                <MapPin size={16} />
                {venue}
              </p>
            )}

            {date && (
              <p className="flex items-center gap-2">
                <CalendarDays size={16} />
                {date}
              </p>
            )}

            {time && (
              <p className="flex items-center gap-2">
                <Clock size={16} />
                {time}
              </p>
            )}

            {coordinators.length > 0 && (
              <p className="flex items-center gap-2">
                <Users size={16} />
                {coordinators.join(", ")}
              </p>
            )}
          </div>

          {/* Register Button */}
          <button
            type="button"
            onClick={() => setIsRegisterOpen(true)}
            className="w-full rounded-lg bg-indigo-600 px-4 py-2.5
            font-semibold text-white transition-colors
            hover:bg-indigo-500 focus:outline-none
            focus:ring-2 focus:ring-indigo-400"
          >
            Register
          </button>
        </div>
      </motion.div>

      {/* Registration Popup */}
      <AnimatePresence>
        {isRegisterOpen && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center
            justify-center bg-black/40 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setIsRegisterOpen(false);
              }
            }}
          >
            {/* Empty Popup */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Event registration"
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative h-[220px] w-full max-w-[380px]
              rounded-2xl border border-white/15 bg-[#111827]
              shadow-2xl"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsRegisterOpen(false)}
                aria-label="Close popup"
                className="absolute right-3 top-3 rounded-full
                p-2 text-gray-400 transition hover:bg-white/10
                hover:text-white focus:outline-none
                focus:ring-2 focus:ring-indigo-400"
              >
                <X size={22} />
              </button>

              {/* Popup intentionally left blank */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
