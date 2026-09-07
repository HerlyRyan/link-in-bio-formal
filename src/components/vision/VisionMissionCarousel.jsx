/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useRef, useState } from "react";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { visionMissionConfig } from "../../config/visionMission";
import { useCarousel } from "../../hooks/useCarousel";
import { VisionMissionSlide } from "./VisionMissionSlide";

export const VisionMissionCarousel = () => {
  const shouldReduceMotion = useReducedMotion();

  const sectionRef = useRef(null);

  const slides = useMemo(() => {
    return [
      {
        id: "vision",
        type: "text",
        eyebrow: "Visi",
        title: "Visi DPM FK UNTAR",
        content: visionMissionConfig.vision,
      },

      {
        id: "missions",
        type: "list",
        eyebrow: "Misi",
        title: "Misi DPM FK UNTAR",
        items: visionMissionConfig.missions,
      },

      {
        id: "functions",
        type: "functions",
        eyebrow: "Fungsi",
        title: "Fungsi DPM",
        items: visionMissionConfig.functions,
      },
    ];
  }, []);

  const { currentIndex, setCurrentIndex, previous, next } = useCarousel(
    slides.length,
  );

  const [touchStartX, setTouchStartX] = useState(null);

  const currentSlide = slides[currentIndex];

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) return;

    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        previous();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        next();
      }
    };

    element.addEventListener("keydown", handleKeyDown);

    return () => {
      element.removeEventListener("keydown", handleKeyDown);
    };
  }, [previous, next]);

  const handleTouchStart = (event) => {
    setTouchStartX(event.touches[0].clientX);
  };

  const handleTouchEnd = (event) => {
    if (touchStartX === null) {
      return;
    }

    const touchEndX = event.changedTouches[0].clientX;

    const difference = touchStartX - touchEndX;

    const SWIPE_THRESHOLD = 50;

    if (difference > SWIPE_THRESHOLD) {
      next();
    }

    if (difference < -SWIPE_THRESHOLD) {
      previous();
    }

    setTouchStartX(null);
  };

  return (
    <section aria-labelledby="vision-mission-title" className="w-full">
      {/* Section heading */}
      <div className="text-center">
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
          Tentang DPM
        </p>

        <h2
          id="vision-mission-title"
          className="
            mt-3

            text-2xl
            font-bold
            tracking-[-0.025em]

            text-brand-text

            sm:text-3xl
          "
        >
          {visionMissionConfig.title}
        </h2>

        <p
          className="
            mx-auto
            mt-4
            max-w-2xl

            text-sm
            font-medium
            leading-7

            text-brand-muted

            sm:text-base
          "
        >
          Mengenal arah, tujuan, dan peran DPM FK UNTAR dalam menjalankan fungsi
          kelembagaan mahasiswa.
        </p>
      </div>

      {/* Carousel */}
      <div
        ref={sectionRef}
        tabIndex={0}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="
          relative
          mt-8

          overflow-hidden

          rounded-3xl

          bg-brand-secondary

          px-5
          py-7

          sm:px-8
          sm:py-9

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-brand-primary
          focus-visible:ring-offset-2
          focus-visible:ring-offset-brand-bg
        "
      >
        {/* Header navigation */}
        <div
          className="
            mb-6

            flex
            items-center
            justify-between
            gap-4
          "
        >
          <span
            className="
              text-xs
              font-bold
              tracking-wide

              text-brand-text/65
            "
          >
            {String(currentIndex + 1).padStart(2, "0")}

            {" / "}

            {String(slides.length).padStart(2, "0")}
          </span>

          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <button
              type="button"
              onClick={previous}
              aria-label="Bagian sebelumnya"
              className="
                flex
                h-10
                w-10
                items-center
                justify-center

                rounded-full

                bg-brand-card/70
                text-brand-text

                transition-colors

                hover:bg-brand-card

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-brand-primary
              "
            >
              <FiChevronLeft size={18} aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Bagian berikutnya"
              className="
                flex
                h-10
                w-10
                items-center
                justify-center

                rounded-full

                bg-brand-card/70
                text-brand-text

                transition-colors

                hover:bg-brand-card

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-brand-primary
              "
            >
              <FiChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Fixed content area */}
        <div
          aria-live="polite"
          className="
            h-72

            overflow-hidden

            sm:h-80
            lg:h-80
          "
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={
                shouldReduceMotion
                  ? {
                      opacity: 0,
                    }
                  : {
                      opacity: 0,
                      x: 18,
                    }
              }
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={
                shouldReduceMotion
                  ? {
                      opacity: 0,
                    }
                  : {
                      opacity: 0,
                      x: -18,
                    }
              }
              transition={{
                duration: shouldReduceMotion ? 0.1 : 0.25,
                ease: "easeOut",
              }}
              className="
                h-full
                overflow-y-auto

                overscroll-contain

                pr-2

                vision-scrollbar
              "
            >
              <VisionMissionSlide slide={currentSlide} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
