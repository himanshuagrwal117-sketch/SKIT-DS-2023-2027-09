import React, { useState } from "react";
import { ArrowRight, LayoutGrid, UsersRound } from "lucide-react";

import ClubDetailData from "../../Storage/ClubDetailedInfo";
import ClubsAllInfoCards from "./ClubsAllInfoCards";

const AboutClubSection = ({ aboutEventRef }) => {

  // ================= CATEGORY STATE =================
  const [Category, setCategory] = useState("Tech");

  // ================= CATEGORY NAVIGATION =================
  const categories = [
    { id: "Tech", label: "Technical Clubs" },
    { id: "Cultural", label: "Cultural Clubs" },
    { id: "Social", label: "Social Clubs" },
    { id: "Literary", label: "Literary Clubs" },
    { id: "Artistic", label: "Artistic Clubs" },
  ];

  // ================= FILTERED CLUBS =================
  const filteredClubs = ClubDetailData.filter((club) => club.cat === Category);

  return (
    <section ref={aboutEventRef} className="w-full py-8">

      {/* ================= SECTION HEADER ================= */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4 px-1">

        <div>

          <div className="mb-2 flex items-center gap-3">
            <span className="h-[2px] w-7 rounded-full bg-white/70" />

            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/65">
              Discover Your Community
            </p>
          </div>

          <h2 className="text-[34px] font-semibold leading-tight tracking-[-0.03em] text-white">
            Explore All Clubs
          </h2>

          <p className="mt-1.5 max-w-[580px] text-[12px] leading-5 text-white/60">
            Discover student communities, explore their activities and find the clubs that match your interests.
          </p>

        </div>


        {/* TOTAL CLUBS */}
        <div className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-white backdrop-blur-sm">
          <UsersRound size={16} strokeWidth={2} />

          <span className="text-[12px] font-semibold">
            {ClubDetailData.length} Clubs
          </span>
        </div>

      </div>


      {/* ================= MAIN CLUBS CONTAINER ================= */}
      <div className="w-full overflow-hidden rounded-[22px] bg-white shadow-[0_15px_45px_rgba(0,0,0,0.10)]">

        {/* ================= CATEGORY NAVIGATION ================= */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/5 px-6 py-5">

          <div className="flex flex-wrap items-center gap-2">

            {categories.map((category) => (

              <button
                key={category.id}
                onClick={() => setCategory(category.id)}
                className={`cursor-pointer rounded-lg px-4 py-2.5 text-[12px] font-semibold transition-colors duration-200 ${
                  Category === category.id
                    ? "bg-[#983530] text-white"
                    : "bg-[#f5f3f2] text-[#666] hover:bg-[#983530]/10 hover:text-[#983530]"
                }`}
              >
                {category.label}
              </button>

            ))}

          </div>


          {/* CATEGORY COUNT */}
          <div className="flex items-center gap-2 text-[#777]">

            <LayoutGrid size={15} strokeWidth={2} />

            <span className="text-[11px] font-medium">
              Showing {filteredClubs.length} clubs
            </span>

          </div>

        </div>


        {/* ================= CATEGORY INFORMATION ================= */}
        <div className="flex items-center justify-between border-b border-black/5 bg-[#fcfbfa] px-7 py-4">

          <div>

            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#983530]/60">
              Selected Category
            </p>

            <h3 className="mt-1 text-[18px] font-semibold tracking-[-0.02em] text-[#292929]">
              {categories.find((category) => category.id === Category)?.label}
            </h3>

          </div>


          <div className="flex items-center gap-2 text-[#983530]">

            <span className="text-[11px] font-semibold">
              {filteredClubs.length} Available
            </span>

            <ArrowRight size={15} strokeWidth={2} />

          </div>

        </div>


        {/* ================= CLUB CARDS ================= */}
        <div className="flex w-full flex-col items-center gap-5 p-6">

          {filteredClubs.length > 0 ? (

            filteredClubs.map((club) => (

              <ClubsAllInfoCards
                key={club.id}
                id={club.id}
                clubname={club.name}
                memebers={club.memebers}
                events={club.events}
                volunteers={club.volunteers}
                cat={club.cat}
                stars={club.stars}
                about={club.info}
                faculty={club.faculty}
                student={club.student}
                url={club.url}
                Joined={club.Joined}
                Volunteer={club.Volunteer}
              />

            ))

          ) : (

            /* ================= EMPTY CATEGORY ================= */
            <div className="flex min-h-[200px] w-full flex-col items-center justify-center text-center">

              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#983530]/10 text-[#983530]">
                <UsersRound size={22} />
              </div>

              <h3 className="text-[15px] font-semibold text-[#333]">
                No clubs available
              </h3>

              <p className="mt-1 text-[12px] text-[#999]">
                There are currently no clubs listed in this category.
              </p>

            </div>

          )}

        </div>

      </div>

    </section>
  );
};

export default AboutClubSection;