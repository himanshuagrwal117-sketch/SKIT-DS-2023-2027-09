import React from "react";
import Header from "../header/Header";
import { motion } from "framer-motion";
import {
  Users,
  Target,
  CalendarDays,
  MessageCircle,
  Code2,
  ArrowUpRight,
} from "lucide-react";

/* -------------------------------------------------------
   Animation Variants
------------------------------------------------------- */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.65,
      ease: "easeOut",
    },
  },
};

const container = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

/* -------------------------------------------------------
   Reusable Information Section
------------------------------------------------------- */

const InfoSection = ({ icon: Icon, title, children }) => {
  return (
    <motion.div
      variants={fadeUp}
      className="group border-b border-black/8 pb-8 last:border-none"
    >
      {/* Section Heading */}

      <div className="mb-4 flex items-center gap-3">

        {/* Icon */}
        <div
          className="
            flex h-9 w-9 items-center justify-center
            rounded-xl
            bg-[#983530]/10
            text-[#983530]
            transition-all duration-300
            group-hover:bg-[#983530]
            group-hover:text-white
          "
        >
          <Icon size={17} strokeWidth={2.2} />
        </div>

        {/* Title */}
        <h2
          className="
            text-[20px]
            font-semibold
            tracking-[-0.02em]
            text-[#242424]
            md:text-[22px]
          "
        >
          {title}
        </h2>
      </div>

      {/* Content */}

      <div
        className="
          text-[14px]
          leading-[1.85]
          text-[#666666]
          md:text-[15px]
        "
      >
        {children}
      </div>
    </motion.div>
  );
};

/* -------------------------------------------------------
   About Us Page
------------------------------------------------------- */

const AboutUsHome = () => {
  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-linear-to-b
        from-[#931913]
        to-[#580e07]
      "
    >

      {/* =====================================================
          HEADER
      ===================================================== */}

      <Header />


      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div
          className="
            absolute
            -right-40
            top-32
            h-[500px]
            w-[500px]
            rounded-full
            bg-white/5
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -left-40
            top-[750px]
            h-[450px]
            w-[450px]
            rounded-full
            bg-white/5
            blur-3xl
          "
        />

      </div>


      {/* =====================================================
          MAIN PAGE
      ===================================================== */}

      <main
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1400px]
          px-5
          pb-20
          pt-32
          md:px-8
          lg:px-12
        "
      >

        {/* ===================================================
            HERO / INTRO
        =================================================== */}

        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          className="mb-12"
        >

          {/* Small Label */}

          <motion.div
            variants={fadeUp}
            className="mb-4 flex items-center gap-3"
          >

            <span className="h-[2px] w-8 bg-white/70" />

            <span
              className="
                text-[11px]
                font-bold
                uppercase
                tracking-[0.22em]
                text-white/70
              "
            >
              About the Platform
            </span>

          </motion.div>


          {/* Main Heading + Description */}

          <motion.div
            variants={fadeUp}
            className="
              flex
              flex-col
              justify-between
              gap-6
              lg:flex-row
              lg:items-end
            "
          >

            {/* Heading */}

            <h1
              className="
                max-w-3xl
                text-[38px]
                font-semibold
                leading-[1.08]
                tracking-[-0.035em]
                text-white
                md:text-[48px]
                lg:text-[54px]
              "
            >
              Connecting students with{" "}

              <span className="text-white/65">
                campus opportunities.
              </span>

            </h1>


            {/* Intro */}

            <p
              className="
                max-w-md
                text-[14px]
                leading-7
                text-white/70
                md:text-[15px]
              "
            >
              One organized digital space for discovering clubs, exploring
              events, meeting teams and becoming a part of student life at
              SKIT Jaipur.
            </p>

          </motion.div>

        </motion.div>


        {/* ===================================================
            MAIN WHITE CARD
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: "easeOut",
          }}
          className="
            grid
            overflow-visible
            rounded-[28px]
            bg-white
            shadow-[0_25px_80px_rgba(0,0,0,0.22)]
            lg:grid-cols-[1.15fr_0.85fr]
          "
        >

          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="
              space-y-8
              p-7
              md:p-10
              lg:p-12
            "
          >

            {/* =================================================
                WHO WE ARE
            ================================================= */}

            <InfoSection
              icon={Users}
              title="Who We Are"
            >

              <p>
                JoinSphere is the unified digital platform for student clubs
                and campus engagement at SKIT Jaipur. It brings student
                communities, club activities and participation opportunities
                together in one organized and accessible space.
              </p>

              <p className="mt-4">
                Instead of searching across multiple sources, students can
                discover everything related to campus clubs through a single
                hub — making it easier to explore interests, connect with teams
                and participate in meaningful extracurricular activities.
              </p>

            </InfoSection>


            {/* =================================================
                OUR PURPOSE
            ================================================= */}

            <InfoSection
              icon={Target}
              title="Our Purpose"
            >

              <p>
                Our purpose is to simplify and strengthen student involvement
                on campus. Students often miss opportunities because
                information is scattered across different channels or because
                participation processes are unclear.
              </p>

              <p className="mt-4">
                JoinSphere centralizes club information, event updates and
                participation pathways so every student can easily discover
                where they belong and how they can contribute.
              </p>

            </InfoSection>


            {/* =================================================
                WHAT JOINSPHERE OFFERS
            ================================================= */}

            <InfoSection
              icon={Users}
              title="What JoinSphere Offers"
            >

              <p className="mb-4">
                Students can explore registered student clubs at SKIT Jaipur
                from one place. Each club profile provides useful information
                including:
              </p>


              <div
                className="
                  grid
                  gap-2.5
                  sm:grid-cols-2
                "
              >

                {[
                  "Club overview & mission",
                  "Domains & focus areas",
                  "Major achievements",
                  "Past & ongoing activities",
                  "Coordinator details",
                  "Core team information",
                ].map((item) => (

                  <motion.div
                    key={item}
                    whileHover={{
                      y: -2,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-xl
                      bg-[#f8f6f4]
                      px-4
                      py-3
                      text-[13px]
                      font-medium
                      text-[#555]
                      transition-all
                      hover:bg-[#983530]/8
                    "
                  >

                    <span
                      className="
                        h-1.5
                        w-1.5
                        shrink-0
                        rounded-full
                        bg-[#983530]
                      "
                    />

                    {item}

                  </motion.div>

                ))}

              </div>

            </InfoSection>


            {/* =================================================
                EVENT ACCESS
            ================================================= */}

            <InfoSection
              icon={CalendarDays}
              title="Event & Activity Access"
            >

              <p className="mb-4">
                Stay informed about opportunities happening across campus,
                including:
              </p>


              <div className="flex flex-wrap gap-2">

                {[
                  "Upcoming Events",
                  "Workshops",
                  "Competitions",
                  "Club Activities",
                  "Recruitments",
                  "Volunteer Opportunities",
                ].map((item) => (

                  <motion.span
                    key={item}
                    whileHover={{
                      y: -2,
                    }}
                    className="
                      cursor-default
                      rounded-full
                      border
                      border-[#983530]/15
                      bg-[#983530]/5
                      px-4
                      py-2
                      text-[12px]
                      font-semibold
                      text-[#983530]
                      transition-all
                      hover:bg-[#983530]
                      hover:text-white
                    "
                  >
                    {item}
                  </motion.span>

                ))}

              </div>

            </InfoSection>


            {/* =================================================
                COORDINATOR
            ================================================= */}

            <InfoSection
              icon={MessageCircle}
              title="Coordinator & Contact Transparency"
            >

              <p>
                Each club section includes coordinator and leadership details
                so students know exactly whom to reach out to. This improves
                communication and creates a clearer path for students who want
                to participate or become part of a club.
              </p>

            </InfoSection>


            {/* =================================================
                WEBSITE DEVELOPER
            ================================================= */}

            <motion.div
              variants={fadeUp}
              whileHover={{
                y: -3,
              }}
              transition={{
                duration: 0.25,
              }}
              className="
                relative
                overflow-hidden
                rounded-2xl
                bg-linear-to-r
                from-[#931913]
                to-[#68100b]
                p-6
                text-white
                shadow-lg
              "
            >

              {/* Decoration */}

              <div
                className="
                  absolute
                  -right-12
                  -top-12
                  h-36
                  w-36
                  rounded-full
                  bg-white/5
                "
              />

              <div
                className="
                  absolute
                  -bottom-16
                  right-16
                  h-28
                  w-28
                  rounded-full
                  bg-white/5
                "
              />


              {/* Content */}

              <div
                className="
                  relative
                  flex
                  items-center
                  justify-between
                  gap-5
                "
              >

                <div className="flex items-center gap-4">

                  {/* Icon */}

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-white/10
                    "
                  >
                    <Code2 size={20} />
                  </div>


                  {/* Developer Info */}

                  <div>

                    <p
                      className="
                        mb-1
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.18em]
                        text-white/60
                      "
                    >
                      Website Developer
                    </p>

                    <h3 className="text-[18px] font-semibold">
                      Himanshu Agrawal
                    </h3>

                    <p className="mt-1 text-[12px] text-white/65">
                      +91 9887748272
                    </p>

                  </div>

                </div>


                <ArrowUpRight
                  size={20}
                  className="text-white/60"
                />

              </div>

            </motion.div>

          </motion.div>


          {/* =================================================
              RIGHT IMAGE SECTION
          ================================================= */}

          <div
            className="
              relative
              hidden
              p-5
              lg:block
            "
          >

            <div
              className="
                sticky
                top-28
                flex
                h-[calc(100vh-9rem)]
                min-h-[620px]
                flex-col
                gap-4
              "
            >

              {/* ===============================================
                  MAIN IMAGE
              =============================================== */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: 40,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                }}
                className="
                  group
                  relative
                  h-[58%]
                  overflow-hidden
                  rounded-[22px]
                "
              >

                <img
                  src="/images/skit2.png"
                  alt="SKIT Campus"
                  className="
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-[1.04]
                  "
                />


                {/* Image Overlay */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-linear-to-t
                    from-black/55
                    via-black/5
                    to-transparent
                  "
                />


                {/* Image Text */}

                <div
                  className="
                    absolute
                    bottom-6
                    left-6
                  "
                >

                  <p
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.2em]
                      text-white/70
                    "
                  >
                    Campus Life
                  </p>

                  <h3
                    className="
                      mt-1
                      text-[22px]
                      font-semibold
                      text-white
                    "
                  >
                    Discover. Connect. Participate.
                  </h3>

                </div>

              </motion.div>


              {/* ===============================================
                  SECOND IMAGE
              =============================================== */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: 40,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.15,
                  ease: "easeOut",
                }}
                className="
                  group
                  relative
                  flex-1
                  overflow-hidden
                  rounded-[22px]
                "
              >

                <img
                  src="/images/newclub.jpeg"
                  alt="Student Activities"
                  className="
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-[1.04]
                  "
                />

                <div
                  className="
                    absolute
                    inset-0
                    bg-linear-to-t
                    from-[#62120e]/45
                    via-transparent
                    to-transparent
                  "
                />

              </motion.div>

            </div>

          </div>

        </motion.div>

      </main>

    </div>
  );
};

export default AboutUsHome;