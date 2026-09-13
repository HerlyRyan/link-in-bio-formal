/* eslint-disable react-hooks/refs */
// src/components/profile/OrganizationPhotoSection.jsx

import { useRef, useState } from "react";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { organizationPhotos } from "../../config/profile";

import { OrganizationPhotoSlide } from "./OrganizationPhotoSlide";

export const OrganizationPhotoSection = () => {
  const shouldReduceMotion = useReducedMotion();

  const [activeIndex, setActiveIndex] = useState(0);

  const directionRef = useRef(1);

  const totalPhotos = organizationPhotos.length;
  const activePhoto = organizationPhotos[activeIndex];

  const goPrevious = () => {
    directionRef.current = -1;

    setActiveIndex((current) =>
      current === 0 ? totalPhotos - 1 : current - 1,
    );
  };

  const goNext = () => {
    directionRef.current = 1;

    setActiveIndex((current) =>
      current === totalPhotos - 1 ? 0 : current + 1,
    );
  };

  const goToPhoto = (index) => {
    if (index === activeIndex) return;

    directionRef.current = index > activeIndex ? 1 : -1;

    setActiveIndex(index);
  };

  if (!activePhoto) return null;

  return (
    <section
      aria-label="Dokumentasi DPM FK UNTAR"
      className="
        w-full
        min-w-0
        max-w-full

        overflow-hidden

        py-6

        sm:py-8
        lg:py-10
      "
    >
      {/* Carousel frame */}
      <div
        className="
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

          "
        >
          <AnimatePresence
            initial={false}
            custom={directionRef.current}
            mode="wait"
          >
            <motion.div
              key={activePhoto.id}
              custom={directionRef.current}
              variants={slideVariants}
              initial={shouldReduceMotion ? false : "enter"}
              animate="center"
              exit={shouldReduceMotion ? undefined : "exit"}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                w-full
                min-w-0
                max-w-full
              "
            >
              <OrganizationPhotoSlide photo={activePhoto} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        {totalPhotos > 1 && (
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
              label="Foto sebelumnya"
              icon={FiChevronLeft}
              onClick={goPrevious}
            />

            {/* Indicators */}
            <div
              className="
                flex
                items-center
                justify-center
                gap-2
              "
            >
              {organizationPhotos.map((photo, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => goToPhoto(index)}
                    aria-label={`Tampilkan foto ${index + 1}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`
                        h-2

                        rounded-full

                        transition-all
                        duration-200

                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-brand-primary
                        focus-visible:ring-offset-2
                        focus-visible:ring-offset-brand-secondary

                        ${
                          isActive
                            ? `
                              w-6
                              bg-brand-primary
                            `
                            : `
                              w-2
                              bg-brand-dark/20

                              hover:bg-brand-dark/35
                            `
                        }
                      `}
                  />
                );
              })}
            </div>

            <CarouselButton
              label="Foto berikutnya"
              icon={FiChevronRight}
              onClick={goNext}
            />
          </div>
        )}
      </div>
    </section>
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
        focus-visible:ring-offset-brand-secondary
      "
    >
      <Icon size={18} aria-hidden="true" />
    </button>
  );
};
