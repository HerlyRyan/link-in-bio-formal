// src/components/aspiration/AspirationSection.jsx

import { motion, useReducedMotion } from "framer-motion";

import { FiArrowUpRight } from "react-icons/fi";

export const AspirationSection = ({ onClick }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={
        shouldReduceMotion
          ? {
              opacity: 0,
            }
          : {
              opacity: 0,
              y: 14,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.25,
      }}
      transition={{
        duration: shouldReduceMotion ? 0.15 : 0.45,
        ease: "easeOut",
      }}
      aria-labelledby="aspiration-title"
      className="
        relative

        overflow-hidden

        rounded-3xl

        border
        border-brand-dark/10

        bg-brand-card

        px-5
        py-10

        sm:px-8
        sm:py-12

        lg:px-12
        lg:py-14
      "
    >
      {/* Background image */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0
        "
      >
        <img
          src="/background/aspiration-bg.webp"
          alt=""
          loading="lazy"
          decoding="async"
          draggable={false}
          className="
            h-full
            w-full

            select-none

            object-cover
            object-center
          "
        />

        {/* Readability overlay */}
        <div
          className="
            absolute
            inset-0

            bg-brand-card/45
          "
        />
      </div>

      {/* Content */}
      <div
        className="
          relative
          z-10

          mx-auto

          flex
          max-w-2xl
          flex-col
          items-center

          text-center
        "
      >
        <p
          className="
            text-[11px]
            font-extrabold
            uppercase
            tracking-[0.18em]

            text-brand-primary

            sm:text-xs
          "
        >
          Aspirasi Mahasiswa
        </p>

        <h2
          id="aspiration-title"
          className="
            mt-3

            text-2xl
            font-bold
            tracking-[-0.03em]

            text-brand-text

            sm:text-3xl
          "
        >
          Suara Mahasiswa Menjadi Perubahan
        </h2>

        <p
          className="
            mt-4

            max-w-xl

            text-sm
            font-medium
            leading-7

            text-brand-muted

            sm:text-base
          "
        >
          DPM FK UNTAR hadir sebagai wadah bagi mahasiswa untuk menyampaikan
          aspirasi, masukan, maupun permasalahan yang berkaitan dengan kehidupan
          akademik dan kemahasiswaan.
        </p>

        <button
          type="button"
          onClick={onClick}
          className="
            mt-7

            inline-flex
            min-h-11
            items-center
            justify-center
            gap-2

            rounded-lg

            bg-brand-primary

            px-6
            py-3

            text-sm
            font-bold

            text-white

            transition-colors
            duration-200

            hover:bg-brand-dark

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-brand-primary
            focus-visible:ring-offset-2
            focus-visible:ring-offset-brand-card
          "
        >
          Sampaikan Aspirasi
          <FiArrowUpRight size={17} aria-hidden="true" />
        </button>
      </div>
    </motion.section>
  );
};
