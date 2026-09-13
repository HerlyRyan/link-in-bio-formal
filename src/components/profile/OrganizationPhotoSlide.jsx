// src/components/profile/OrganizationPhotoSlide.jsx

import { useState } from "react";

import { FiMaximize2, FiUsers } from "react-icons/fi";

import { PhotoLightbox } from "./PhotoLightbox";

export const OrganizationPhotoSlide = ({ photo }) => {
  const [isOpen, setIsOpen] = useState(false);

  const isPortrait = photo.type === "portrait";

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={`Perbesar ${photo.alt}`}
        className="
          group
          relative

          block
          w-full

          overflow-hidden

          rounded-[1.5rem]

          border
          border-brand-dark/10

          bg-brand-dark

          text-left

          shadow-[0_16px_40px_rgba(32,40,8,0.14)]

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-brand-primary
          focus-visible:ring-offset-2
          focus-visible:ring-offset-brand-bg

          sm:rounded-[1.75rem]
        "
      >
        {isPortrait ? (
          <PortraitImage photo={photo} />
        ) : (
          <LandscapeImage photo={photo} />
        )}

        {/* Global darkening */}
        <span
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0

            bg-brand-text/10
          "
        />

        {/* Bottom readability */}
        <span
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0

            bg-linear-to-t

            from-brand-text/90
            via-brand-text/20
            to-transparent
          "
        />

        {/* Content */}
        <div
          className="
            pointer-events-none

            absolute
            inset-x-0
            bottom-0

            z-20

            p-5

            sm:p-7
            lg:p-8
          "
        >
          <div className="max-w-xl">
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <span
                aria-hidden="true"
                className="
                  flex
                  h-7
                  w-7
                  shrink-0
                  items-center
                  justify-center

                  rounded-full

                  border
                  border-white/20

                  bg-white/10

                  text-white

                  backdrop-blur-sm

                  sm:h-8
                  sm:w-8
                "
              >
                <FiUsers size={14} />
              </span>

              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.2em]

                  text-white/80

                  sm:text-[10px]
                "
              >
                {photo.eyebrow}
              </p>
            </div>

            <h2
              className="
                mt-3

                max-w-md

                text-2xl
                font-extrabold
                leading-[1.08]
                tracking-[-0.04em]

                text-white

                sm:mt-4
                sm:text-3xl

                lg:text-4xl
              "
            >
              {photo.title}
            </h2>

            <div
              aria-hidden="true"
              className="
                mt-3

                h-px
                w-12

                bg-brand-secondary/80

                sm:mt-4
                sm:w-16
              "
            />

            {photo.description && (
              <p
                className="
                  mt-3

                  max-w-lg

                  text-xs
                  font-medium
                  leading-5

                  text-white/80

                  sm:mt-4
                  sm:text-sm
                  sm:leading-6

                  lg:text-[15px]
                  lg:leading-7
                "
              >
                {photo.description}
              </p>
            )}
          </div>
        </div>

        {/* Expand */}
        <span
          aria-hidden="true"
          className="
            absolute
            right-3
            top-3

            z-30

            flex
            h-10
            w-10
            items-center
            justify-center

            rounded-full

            border
            border-white/20

            bg-brand-text/35

            text-white

            backdrop-blur-md

            transition-colors
            duration-200

            group-hover:bg-brand-text/60

            sm:right-4
            sm:top-4
            sm:h-11
            sm:w-11
          "
        >
          <FiMaximize2 size={16} />
        </span>
      </button>

      <PhotoLightbox
        isOpen={isOpen}
        src={photo.src}
        alt={photo.alt}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

const LandscapeImage = ({ photo }) => (
  <img
    src={photo.src}
    alt={photo.alt}
    draggable={false}
    decoding="async"
    className="
      block

      aspect-[4/5]
      h-full
      w-full

      select-none

      object-cover
      object-center

      transition-transform
      duration-700
      ease-out

      group-hover:scale-[1.02]

      sm:aspect-[16/10]
      lg:aspect-[16/9]
    "
  />
);

const PortraitImage = ({ photo }) => (
  <div
    className="
      relative

      aspect-[4/5]
      w-full

      overflow-hidden

      sm:aspect-[16/10]
      lg:aspect-[16/9]
    "
  >
    {/* Blurred background */}
    <img
      src={photo.src}
      alt=""
      aria-hidden="true"
      draggable={false}
      decoding="async"
      className="
        absolute
        inset-0

        h-full
        w-full

        scale-110

        select-none

        object-cover
        object-center

        blur-xl
      "
    />

    <span
      aria-hidden="true"
      className="
        absolute
        inset-0

        bg-brand-text/45
      "
    />

    {/* Original portrait */}
    <img
      src={photo.src}
      alt={photo.alt}
      draggable={false}
      decoding="async"
      className="
        relative
        z-10

        h-full
        w-full

        select-none

        object-contain
        object-center

        transition-transform
        duration-700
        ease-out

        group-hover:scale-[1.01]
      "
    />
  </div>
);
