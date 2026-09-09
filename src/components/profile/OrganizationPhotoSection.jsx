// src/components/profile/OrganizationPhotoSection.jsx

import { useState } from "react";

import {
  FiMaximize2,
  FiUsers,
} from "react-icons/fi";

import { PhotoLightbox } from "./PhotoLightbox";

export const OrganizationPhotoSection = ({
  src,
  alt,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section
        aria-labelledby="organization-photo-title"
        className="
          w-full

          py-6

          sm:py-8
          lg:py-10
        "
      >
        <div
          className="
            w-full
          "
        >
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label={`Perbesar ${alt}`}
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
            {/* Background photo */}
            <img
              src={src}
              alt={alt}
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

            {/* Global darkening */}
            <span
              aria-hidden="true"
              className="
                pointer-events-none

                absolute
                inset-0

                bg-brand-text/15
              "
            />

            {/* Bottom readability gradient */}
            <span
              aria-hidden="true"
              className="
                pointer-events-none

                absolute
                inset-0

                bg-linear-to-t

                from-brand-text/90
                via-brand-text/35
                to-transparent
              "
            />

            {/* Left-side readability layer */}
            <span
              aria-hidden="true"
              className="
                pointer-events-none

                absolute
                inset-0

                bg-linear-to-r

                from-brand-text/35
                via-transparent
                to-transparent
              "
            />

            {/* Inner outline */}
            <span
              aria-hidden="true"
              className="
                pointer-events-none

                absolute
                inset-0

                rounded-[1.5rem]

                ring-1
                ring-inset
                ring-white/20

                sm:rounded-[1.75rem]
              "
            />

            {/* Content */}
            <div
              className="
                absolute
                inset-x-0
                bottom-0

                z-10

                p-5

                sm:p-7
                lg:p-8
              "
            >
              <div
                className="
                  max-w-xl
                "
              >
                {/* Eyebrow */}
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
                    <FiUsers
                      size={14}
                    />
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
                    Kebersamaan
                  </p>
                </div>

                {/* Heading */}
                <h2
                  id="organization-photo-title"
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
                  DPM FK UNTAR
                </h2>

                {/* Accent line */}
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

                {/* Description */}
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
                  Bersama menjalankan amanah,
                  menyuarakan aspirasi, dan
                  membangun lingkungan
                  kemahasiswaan yang lebih baik.
                </p>
              </div>
            </div>

            {/* Expand action */}
            <span
              aria-hidden="true"
              className="
                absolute
                right-3
                top-3

                z-20

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

                transition
                duration-200

                group-hover:bg-brand-text/60

                sm:right-4
                sm:top-4
                sm:h-11
                sm:w-11
              "
            >
              <FiMaximize2
                size={16}
              />
            </span>
          </button>
        </div>
      </section>

      <PhotoLightbox
        isOpen={isOpen}
        src={src}
        alt={alt}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};