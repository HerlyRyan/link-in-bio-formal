// src/components/gallery/GalleryItem.jsx

import { motion, useReducedMotion } from "framer-motion";

import { GalleryImage } from "./GalleryImage";

export const GalleryItem = ({ item, index, onOpen, className = "" }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(index)}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -2,
            }
      }
      whileTap={
        shouldReduceMotion
          ? undefined
          : {
              y: 1,
            }
      }
      aria-label={`Buka gambar ${index + 1}: ${item.alt}`}
      className={`
            group
            relative

            h-full
            w-full

            min-h-0
            min-w-0

            overflow-hidden

            rounded-xl

            border-2
            border-brand-text/80

            bg-brand-card

            text-left

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-brand-primary
            focus-visible:ring-offset-2

            ${className}
        `}
    >
      <GalleryImage
        src={item.src}
        alt={item.alt}
        position={item.position}
        fit="cover"
      />

      <div
        aria-hidden="true"
        className="
          absolute
          inset-0

          bg-linear-to-t
          from-brand-text/40
          via-transparent
          to-transparent

          opacity-0

          transition-opacity
          duration-200

          group-hover:opacity-100
        "
      />

      {item.title && (
        <div
          className="
            absolute
            bottom-0
            left-0
            right-0

            translate-y-2

            p-3

            opacity-0

            transition-all
            duration-200

            group-hover:translate-y-0
            group-hover:opacity-100
          "
        >
          <p
            className="
              line-clamp-2
              text-xs
              font-bold
              text-white
            "
          >
            {item.title}
          </p>
        </div>
      )}
    </motion.button>
  );
};
