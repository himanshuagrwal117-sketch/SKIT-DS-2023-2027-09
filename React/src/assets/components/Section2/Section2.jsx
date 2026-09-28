import React, { useEffect, useState } from "react";
import { X, MoveUpRight } from "lucide-react";
import ClubData from "../Storage/ClubInfoHome";

/* ------------------------------------------------------------------ */
/*  DATA – one entry per category card (add / edit cards here only)    */
/* ------------------------------------------------------------------ */
const CATEGORIES = [
  {
    id: "Cultural",
    title: "Cultural Clubs",
    button: "View All Cultural Clubs",
    image: "./images/g1.png",
    imageOffset: "bottom-0",
    text: "Cultural Clubs celebrate diversity, traditions, and creative expression. They promote music, dance, drama, and cultural heritage through events and performances. Students get a chance to showcase talent and learn teamwork. These clubs create vibrant campus life and joyful memories.",
  },
  {
    id: "Tech",
    title: "Technical Clubs",
    button: "View All Technical Clubs",
    image: "./images/technical.png",
    imageOffset: "-bottom-3",
    text: "Technical Clubs encourage innovation, problem-solving, and hands-on learning beyond the classroom. They provide a platform to explore coding, robotics, electronics, and emerging technologies. Members work on real-world projects, competitions, and workshops. These clubs help build strong technical skills and industry readiness.",
  },
  {
    id: "Social",
    title: "Social Clubs",
    button: "View All Social Clubs",
    image: "./images/social.png",
    imageOffset: "-bottom-3",
    text: "Social Clubs focus on community service, leadership, and social responsibility. They organize awareness drives, campaigns, and outreach programs. Members work together to create positive change in society. These clubs develop empathy, teamwork, and leadership qualities.",
  },
  {
    id: "Artistic",
    title: "Artistic Clubs",
    button: "View All Artistic Clubs",
    image: "./images/artistic.png",
    imageOffset: "bottom-0",
    text: "Artistic Clubs encourage creativity through art, design, and visual expression. They provide opportunities to explore drawing, painting, crafts, and digital art. Members enhance imagination and aesthetic sense. These clubs turn ideas into meaningful and expressive creations.",
  },
  {
    id: "Literary",
    title: "Literary Clubs",
    button: "View All Literary Clubs",
    image: "./images/literary.png",
    imageOffset: "-bottom-7",
    text: "Literary Clubs nurture a love for language, literature, and creative writing. They provide a space for debates, poetry, storytelling, and discussions. Members enhance communication, critical thinking, and expression skills. These clubs inspire ideas, creativity, and intellectual growth.",
  },
];

/* ------------------------------------------------------------------ */
/*  PopBlockDivs – one club row inside the popup                       */
/* ------------------------------------------------------------------ */
const PopBlockDivs = ({ serial, name, info, image, link }) => {
  return (
    <div className="shrink-0 w-full flex flex-col sm:flex-row gap-5 p-4 rounded-2xl bg-white border border-[#eadfdd] shadow-sm hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <div className="w-full h-48 sm:w-56 sm:h-auto sm:min-h-44 shrink-0 rounded-xl overflow-hidden bg-[#f1ecea]">
        <img className="h-full w-full object-cover" src={image} alt={name} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-center gap-3 mb-2">
          <span className="shrink-0 h-8 w-8 rounded-full bg-[#931913] text-white text-sm font-semibold flex items-center justify-center">
            {serial}
          </span>
          <h2 className="text-xl md:text-2xl font-semibold leading-tight text-[#1f1f1f]">
            {name}
          </h2>
        </div>

        <p className="text-sm md:text-[15px] leading-relaxed text-[#555] mb-4">
          {info}
        </p>

        <button
          onClick={() => window.open(link, "_blank", "noopener,noreferrer")}
          className="mt-auto self-start flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#ffcd42] text-sm font-semibold text-black hover:cursor-pointer hover:bg-[#f5bd1f] hover:scale-[1.02] transition-all duration-300"
        >
          More Information
          <MoveUpRight size={16} />
        </button>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  PopupScreen – modal listing clubs of the chosen category           */
/* ------------------------------------------------------------------ */
const PopupScreen = ({ onClose, category }) => {
  useEffect(() => {
    // Disable background scroll while popup is open
    document.body.style.overflow = "hidden";

    // Close on Escape key
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const clubs = ClubData.filter((club) => club.cat === category);
  const title =
    CATEGORIES.find((c) => c.id === category)?.title ?? "Clubs";

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl h-[85vh] flex flex-col rounded-3xl overflow-hidden bg-[#faf6f5] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="shrink-0 flex items-center justify-between px-6 md:px-8 py-5 bg-linear-to-r from-[#931913] to-[#b94c47] text-white">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold font-rubik leading-tight">
              {title}
            </h1>
            <p className="text-sm text-white/80 mt-1">
              {clubs.length} {clubs.length === 1 ? "club" : "clubs"} available
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="h-10 w-10 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/30 hover:cursor-pointer transition-colors duration-300"
          >
            <X size={22} />
          </button>
        </div>

        {/* Club list (scrolls) */}
        <div className="flex-1 overflow-y-auto p-5 md:p-8 flex flex-col gap-5">
          {clubs.length > 0 ? (
            clubs.map((club, index) => (
              <PopBlockDivs
                key={club.id}
                serial={index + 1}
                name={club.name}
                info={club.info}
                image={club.url}
                link={club.link}
              />
            ))
          ) : (
            <p className="m-auto text-[#555] text-lg">
              No clubs found in this category yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Cardblock – the five category banners                              */
/* ------------------------------------------------------------------ */
const Cardblock = () => {
  const [flagForPop, setFlagForPop] = useState(false);
  const [category, setCategory] = useState("");

  const openPopup = (id) => {
    setCategory(id);
    setFlagForPop(true);
  };

  return (
    <div className="flex flex-col gap-24 w-full max-w-7xl mt-20">
      {CATEGORIES.map((item, i) => {
        const imageOnLeft = i % 2 === 0; // alternate: left, right, left...

        return (
          <div
            key={item.id}
            className="relative overflow-visible w-full min-h-64 flex items-center py-8 px-6 md:px-10 rounded-3xl bg-linear-to-l from-[#b94c47] to-[#931913] shadow-lg"
          >
            {/* Image (sticks out above the card, desktop only) */}
            <div
              className={`hidden md:block absolute ${item.imageOffset} h-[135%] w-[28%] ${
                imageOnLeft ? "left-8" : "right-8"
              }`}
            >
              <img
                className="h-full w-full object-contain drop-shadow-xl"
                src={item.image}
                alt={item.title}
              />
            </div>

            {/* Text */}
            <div
              className={`w-full md:w-[64%] flex flex-col text-white ${
                imageOnLeft
                  ? "md:ml-[34%] text-left items-start"
                  : "md:mr-[34%] md:text-right md:items-end text-left items-start"
              }`}
            >
              <h2 className="text-4xl md:text-5xl lg:text-[56px] leading-tight font-medium font-rubik mb-3">
                {item.title}
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-white/90 max-w-2xl">
                {item.text}
              </p>
              <button
                onClick={() => openPopup(item.id)}
                className="mt-6 px-6 py-2.5 bg-[#ffcd42] text-black text-sm md:text-base font-semibold rounded-full hover:cursor-pointer hover:bg-white hover:scale-[1.03] transition-all duration-300"
              >
                {item.button}
              </button>
            </div>
          </div>
        );
      })}

      {flagForPop && (
        <PopupScreen onClose={() => setFlagForPop(false)} category={category} />
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Section2 – default export                                          */
/* ------------------------------------------------------------------ */
const Section2 = () => {
  return (
    <section className="w-full min-h-screen bg-white flex flex-col items-center px-6 md:px-12 py-16 md:py-20">
      <h1 className="w-full text-center text-4xl md:text-[54px] leading-tight font-bold bg-linear-to-r from-[#b92922] to-[#580e07] bg-clip-text text-transparent">
        Event Name
      </h1>

      <Cardblock />
    </section>
  );
};

export default Section2;
