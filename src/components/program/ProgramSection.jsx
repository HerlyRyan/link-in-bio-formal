/* eslint-disable react-hooks/refs */
// src/components/program/ProgramSection.jsx

import { useRef, useState } from "react";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { programs } from "../../config/programs";
import { ProgramCard } from "./ProgramCard";

export const ProgramSection = () => {
  const shouldReduceMotion = useReducedMotion();

  const [activeIndex, setActiveIndex] = useState(0);

  const directionRef = useRef(1);

  const totalPrograms = programs.length;
  const activeProgram = programs[activeIndex];

  const goToProgram = (index) => {
    if (index === activeIndex) return;

    directionRef.current = index > activeIndex ? 1 : -1;

    setActiveIndex(index);
  };

  const goPrevious = () => {
    directionRef.current = -1;

    setActiveIndex((current) =>
      current === 0 ? totalPrograms - 1 : current - 1,
    );
  };

  const goNext = () => {
    directionRef.current = 1;

    setActiveIndex((current) =>
      current === totalPrograms - 1 ? 0 : current + 1,
    );
  };

  if (!activeProgram) return null;

  return (
    <motion.section
      initial={
        shouldReduceMotion
          ? {
              opacity: 0,
            }
          : {
              opacity: 0,
              y: 14,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.1,
      }}
      transition={{
        duration: shouldReduceMotion ? 0.15 : 0.45,
        ease: "easeOut",
      }}
      aria-labelledby="program-section-title"
      className="
        w-full
        min-w-0
        max-w-full
        overflow-hidden
      "
    >
      {/* Heading */}
      <div
        className="
          mx-auto
          w-full
          max-w-2xl
          text-center
        "
      >
        <p
          className="
            text-[11px]
            font-bold
            uppercase
            tracking-[0.18em]
            text-brand-primary

            sm:text-xs
          "
        >
          Program Kerja
        </p>

        <h2
          id="program-section-title"
          className="
            mt-3

            text-2xl
            font-bold
            tracking-[-0.03em]
            text-brand-text

            sm:text-3xl
          "
        >
          Program Kerja DPM FK UNTAR
        </h2>
      </div>

      {/* Program selector */}
      <div
        className="
          mt-7

          w-full
          min-w-0
          max-w-full

          overflow-hidden
        "
      >
        <div
          className="
            flex
            w-full
            min-w-0
            max-w-full
            gap-2

            overflow-x-auto
            overflow-y-hidden

            overscroll-x-contain

            pb-1

            [scrollbar-width:none]
            [-webkit-overflow-scrolling:touch]

            [&::-webkit-scrollbar]:hidden

            sm:flex-wrap
            sm:justify-center
            sm:overflow-x-visible
          "
        >
          {programs.map((program, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={program.id}
                type="button"
                onClick={() => goToProgram(index)}
                aria-pressed={isActive}
                className={`
                  shrink-0

                  rounded-full

                  border

                  px-4
                  py-2.5

                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.08em]

                  transition-colors
                  duration-200

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-brand-primary
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-brand-card

                  ${
                    isActive
                      ? `
                        border-brand-primary
                        bg-brand-primary
                        text-white
                      `
                      : `
                        border-brand-dark/10
                        bg-brand-card
                        text-brand-muted

                        hover:border-brand-primary/25
                        hover:bg-brand-secondary/20
                        hover:text-brand-text
                      `
                  }
                `}
              >
                {program.shortName}
              </button>
            );
          })}
        </div>
      </div>

      {/* Carousel frame */}
      <div
        className="
          mt-5

          w-full
          min-w-0
          max-w-full

          overflow-hidden

          rounded-[1.75rem]

          border
          border-brand-primary/20

          bg-brand-secondary/15

          p-2.5

          shadow-[0_12px_30px_rgba(32,40,8,0.06)]

          sm:p-3
        "
      >
        {/* Slide viewport */}
        <div
          className="
            relative

            w-full
            min-w-0
            max-w-full

            overflow-hidden

            rounded-[1.35rem]

            bg-brand-card
          "
        >
          <AnimatePresence
            initial={false}
            custom={directionRef.current}
            mode="wait"
          >
            <motion.div
              key={activeProgram.id}
              custom={directionRef.current}
              variants={slideVariants}
              initial={shouldReduceMotion ? false : "enter"}
              animate="center"
              exit={shouldReduceMotion ? undefined : "exit"}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.28,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                w-full
                min-w-0
                max-w-full
              "
            >
              <ProgramCard program={activeProgram} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div
          className="
            flex
            w-full
            items-center
            justify-between
            gap-3

            px-1
            pb-1
            pt-4

            sm:px-2
            sm:pb-2
          "
        >
          <CarouselButton
            label="Program sebelumnya"
            icon={FiChevronLeft}
            onClick={goPrevious}
          />

          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <span
              className="
                text-sm
                font-bold
                tabular-nums
                text-brand-text
              "
            >
              {String(activeIndex + 1).padStart(2, "0")}
            </span>

            <span
              className="
                text-xs
                text-brand-muted
              "
            >
              /
            </span>

            <span
              className="
                text-xs
                font-semibold
                tabular-nums
                text-brand-muted
              "
            >
              {String(totalPrograms).padStart(2, "0")}
            </span>
          </div>

          <CarouselButton
            label="Program berikutnya"
            icon={FiChevronRight}
            onClick={goNext}
          />
        </div>
      </div>
    </motion.section>
  );
};

const slideVariants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 24 : -24,
  }),

  center: {
    opacity: 1,
    x: 0,
  },

  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -24 : 24,
  }),
};

const CarouselButton = ({ label, icon: Icon, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="
        flex
        h-11
        w-11
        shrink-0
        items-center
        justify-center

        rounded-full

        border
        border-brand-dark/10

        bg-brand-card

        text-brand-text

        transition-colors
        duration-200

        hover:border-brand-primary/25
        hover:bg-brand-secondary/25

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-brand-primary
        focus-visible:ring-offset-2
        focus-visible:ring-offset-brand-card
      "
    >
      <Icon size={18} aria-hidden="true" />
    </button>
  );
};
