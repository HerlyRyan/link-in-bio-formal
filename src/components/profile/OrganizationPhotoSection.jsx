// src/components/profile/OrganizationPhotoSection.jsx

import { useState } from "react";

import { FiMaximize2 } from "react-icons/fi";

import { PhotoLightbox } from "./PhotoLightbox";

export const OrganizationPhotoSection = ({ src, alt }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section
        aria-labelledby="organization-photo-title"
        className="
          relative
          w-full
          overflow-hidden

          py-6

          sm:py-8
          lg:py-10
        "
      >
        {/* Photo composition */}
        <div
          className="
            relative

            flex
            items-center
            justify-center
          "
        >
          {/* Left blurred image */}
          <div
            aria-hidden="true"
            className="
              absolute
              left-0
              top-1/2

              h-[72%]
              w-[32%]

              -translate-y-1/2

              overflow-hidden

              rounded-2xl

              sm:w-[34%]
            "
          >
            <img
              src={src}
              alt=""
              draggable={false}
              className="
                h-full
                w-full

                scale-110

                select-none

                object-cover
                object-center

                blur-[7px]
                saturate-[0.7]
              "
            />

            <div
              className="
                absolute
                inset-0

                bg-brand-accent/35
              "
            />

            <div
              className="
                absolute
                inset-0

                bg-brand-dark/10
              "
            />
          </div>

          {/* Right blurred image */}
          <div
            aria-hidden="true"
            className="
              absolute
              right-0
              top-1/2

              h-[72%]
              w-[32%]

              -translate-y-1/2

              overflow-hidden

              rounded-2xl

              sm:w-[34%]
            "
          >
            <img
              src={src}
              alt=""
              draggable={false}
              className="
                h-full
                w-full

                scale-110

                select-none

                object-cover
                object-center

                blur-[7px]
                saturate-[0.7]
              "
            />

            <div
              className="
                absolute
                inset-0

                bg-brand-accent/35
              "
            />

            <div
              className="
                absolute
                inset-0

                bg-brand-dark/10
              "
            />
          </div>

          {/* Main image */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label={`Perbesar ${alt}`}
            className="
              group
              relative
              z-10

              w-[76%]
              max-w-3xl

              overflow-hidden

              rounded-2xl

              border
              border-brand-dark/10

              bg-brand-card

              shadow-[0_14px_35px_rgba(32,40,8,0.12)]

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-brand-primary
              focus-visible:ring-offset-2
              focus-visible:ring-offset-brand-bg

              sm:w-[72%]
              lg:w-[68%]
            "
          >
            <img
              src={src}
              alt={alt}
              draggable={false}
              decoding="async"
              className="
                block

                aspect-[16/9]

                h-auto
                w-full

                select-none

                object-cover
                object-center
              "
            />

            {/* Inner highlight */}
            <span
              aria-hidden="true"
              className="
                pointer-events-none

                absolute
                inset-0

                rounded-2xl

                ring-1
                ring-inset
                ring-white/35
              "
            />

            {/* Lightbox indicator */}
            <span
              aria-hidden="true"
              className="
                absolute
                bottom-3
                right-3

                flex
                h-9
                w-9
                items-center
                justify-center

                rounded-full

                bg-brand-text/65

                text-white

                opacity-0

                backdrop-blur-sm

                transition-opacity
                duration-200

                group-hover:opacity-100
                group-focus-visible:opacity-100
              "
            >
              <FiMaximize2 size={16} />
            </span>
          </button>
        </div>

        {/* Photo caption */}
        <div
          className="
            mx-auto
            mt-7
            max-w-xl

            px-5

            text-center

            sm:mt-8
          "
        >
          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.18em]

              text-brand-primary

              sm:text-[11px]
            "
          >
            Kebersamaan
          </p>

          <h2
            id="organization-photo-title"
            className="
              mt-2

              text-lg
              font-bold
              tracking-[-0.02em]

              text-brand-text

              sm:text-xl
            "
          >
            DPM FK UNTAR
          </h2>

          <p
            className="
              mx-auto
              mt-2

              max-w-lg

              text-xs
              font-medium
              leading-6

              text-brand-muted

              sm:text-sm
            "
          >
            Bersama menjalankan amanah, menyuarakan aspirasi, dan membangun
            lingkungan kemahasiswaan yang lebih baik.
          </p>
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
