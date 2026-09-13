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
      {/* Carousel viewport */}
      <div
        className="
          relative

          w-full
          min-w-0
          max-w-full

          overflow-hidden

          rounded-[1.5rem]

          sm:rounded-[1.75rem]
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
            mt-4

            flex
            items-center
            justify-between
            gap-4
          "
        >
          <CarouselButton
            label="Foto sebelumnya"
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
            {organizationPhotos.map((photo, index) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => goToPhoto(index)}
                aria-label={`Tampilkan foto ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
                className={`
                    h-2
                    rounded-full

                    transition-all
                    duration-200

                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-brand-primary
                    focus-visible:ring-offset-2

                    ${
                      index === activeIndex
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
            ))}
          </div>

          <CarouselButton
            label="Foto berikutnya"
            icon={FiChevronRight}
            onClick={goNext}
          />
        </div>
      )}
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

const CarouselButton = ({ label, icon: Icon, onClick }) => (
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
