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
          bg-brand-card
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

            bg-brand-dark

            text-left

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-inset
            focus-visible:ring-brand-primary
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
            border-t
            border-brand-dark/10

            bg-brand-card

            px-5
            py-5

            sm:px-6
            sm:py-6
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
