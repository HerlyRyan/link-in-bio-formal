// src/components/vision/VisionMissionCarousel.jsx

import { useRef } from "react";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { visionMissionConfig } from "../../config/visionMission";
import { useCarousel } from "../../hooks/useCarousel";
import { VisionMissionSlide } from "./VisionMissionSlide";

/**
 * Static carousel data.
 *
 * Diletakkan di module scope karena data tidak berubah
 * selama lifecycle component.
 */
const slides = [
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

const SWIPE_THRESHOLD = 50;

export const VisionMissionCarousel = () => {
  const shouldReduceMotion = useReducedMotion();

  const touchStartX = useRef(null);

  const { currentIndex, previous, next } = useCarousel(slides.length);

  const currentSlide = slides[currentIndex];

  /**
   * Keyboard navigation.
   */
  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      previous();
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    }
  };

  /**
   * Save initial horizontal touch position.
   *
   * useRef digunakan karena nilai ini tidak
   * mempengaruhi tampilan component.
   */
  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  /**
   * Detect horizontal swipe.
   */
  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) {
      return;
    }

    const touchEndX = event.changedTouches[0].clientX;

    const difference = touchStartX.current - touchEndX;

    if (difference > SWIPE_THRESHOLD) {
      next();
    } else if (difference < -SWIPE_THRESHOLD) {
      previous();
    }

    touchStartX.current = null;
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
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="
          relative
          mt-8

          rounded-3xl

          border
          border-brand-dark/10

          bg-brand-secondary/35

          p-4

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-brand-primary
          focus-visible:ring-offset-2
          focus-visible:ring-offset-brand-bg

          sm:p-5
        "
      >
        {/* Navigation */}
        <div
          className="
            flex
            items-center
            justify-between
            gap-4

            px-1
            pb-4
          "
        >
          {/* Counter + instruction */}
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <span
              className="
                flex
                h-8
                min-w-16
                items-center
                justify-center

                rounded-full

                bg-brand-card/75

                px-3

                text-xs
                font-bold
                tabular-nums

                text-brand-text/70
              "
            >
              {String(currentIndex + 1).padStart(2, "0")}

              <span
                className="
                  mx-1
                  text-brand-muted/60
                "
              >
                /
              </span>

              {String(slides.length).padStart(2, "0")}
            </span>

            <span
              className="
                hidden

                text-xs
                font-semibold

                text-brand-muted

                sm:inline
              "
            >
              Gunakan tombol panah untuk berpindah
            </span>
          </div>

          {/* Navigation buttons */}
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <CarouselButton
              onClick={previous}
              label="Bagian sebelumnya"
              icon={FiChevronLeft}
            />

            <CarouselButton
              onClick={next}
              label="Bagian berikutnya"
              icon={FiChevronRight}
            />
          </div>
        </div>

        {/* Content surface */}
        <div
          className="
            overflow-hidden

            rounded-2xl

            border
            border-brand-dark/10

            bg-brand-card
          "
        >
          {/* Fixed height */}
          <div
            aria-live="polite"
            className="
              h-72

              overflow-hidden

              sm:h-80
            "
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentSlide.id}
                initial={
                  shouldReduceMotion
                    ? {
                        opacity: 0,
                      }
                    : {
                        opacity: 0,
                        x: 14,
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
                        x: -14,
                      }
                }
                transition={{
                  duration: shouldReduceMotion ? 0.1 : 0.22,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  h-full

                  overflow-y-auto
                  overscroll-contain

                  px-5
                  py-6

                  vision-scrollbar

                  sm:px-7
                  sm:py-7
                "
              >
                <VisionMissionSlide slide={currentSlide} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Reusable carousel navigation button.
 */
const CarouselButton = ({ onClick, label, icon: Icon }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="
        flex
        h-11
        w-11
        items-center
        justify-center

        rounded-full

        border
        border-brand-dark/10

        bg-brand-card
        text-brand-text

        transition-colors
        duration-200

        hover:bg-brand-secondary/35

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-brand-primary
      "
    >
      <Icon size={18} aria-hidden="true" />
    </button>
  );
};
