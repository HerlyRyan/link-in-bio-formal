// src/components/program/ProgramCard.jsx

import { useState } from "react";

import { FiMaximize2 } from "react-icons/fi";

import { PhotoLightbox } from "../profile/PhotoLightbox";

export const ProgramCard = ({ program }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { shortName, title, image } = program;

  return (
    <>
      <article
        className="
          overflow-hidden

          rounded-[1.75rem]

          border
          border-brand-dark/10

          bg-brand-card

          p-2

          shadow-[0_12px_30px_rgba(32,40,8,0.07)]

          sm:p-2.5
        "
      >
        {/* Inner frame */}
        <div
          className="
            overflow-hidden

            rounded-[1.35rem]

            border
            border-brand-primary/20

            bg-brand-secondary/20

            p-1.5

            sm:rounded-[1.5rem]
            sm:p-2
          "
        >
          {/* Photo */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label={`Perbesar foto ${title}`}
            className="
              group
              relative

              block
              w-full

              overflow-hidden

              rounded-[1.05rem]

              border
              border-brand-dark/10

              bg-brand-dark

              text-left

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-inset
              focus-visible:ring-brand-primary

              sm:rounded-[1.2rem]
            "
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="
                aspect-[4/3]

                h-full
                w-full

                select-none

                object-cover
                object-center

                transition-transform
                duration-500
                ease-out

                group-hover:scale-[1.02]
              "
            />

            {/* Subtle dark layer */}
            <span
              aria-hidden="true"
              className="
                pointer-events-none

                absolute
                inset-0

                bg-brand-text/5

                transition-colors
                duration-200

                group-hover:bg-brand-text/10
              "
            />

            {/* Inner image outline */}
            <span
              aria-hidden="true"
              className="
                pointer-events-none

                absolute
                inset-0

                rounded-[1.05rem]

                ring-1
                ring-inset
                ring-white/15

                sm:rounded-[1.2rem]
              "
            />

            {/* Expand */}
            <span
              aria-hidden="true"
              className="
                absolute
                right-3
                top-3

                flex
                h-10
                w-10
                items-center
                justify-center

                rounded-full

                border
                border-white/20

                bg-brand-text/45

                text-white

                backdrop-blur-md

                transition-colors
                duration-200

                group-hover:bg-brand-text/70
              "
            >
              <FiMaximize2 size={16} />
            </span>
          </button>

          {/* Information */}
          <div
            className="
              px-3
              pb-3
              pt-5

              sm:px-4
              sm:pb-4
              sm:pt-6
            "
          >
            <p
              className="
                text-[10px]
                font-extrabold
                uppercase
                tracking-[0.18em]

                text-brand-primary

                sm:text-[11px]
              "
            >
              {shortName}
            </p>

            <h3
              className="
                mt-2

                text-lg
                font-bold
                leading-7
                tracking-[-0.025em]

                text-brand-text

                sm:text-xl
              "
            >
              {title}
            </h3>
          </div>
        </div>
      </article>

      <PhotoLightbox
        isOpen={isOpen}
        src={image.src}
        alt={image.alt}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};
