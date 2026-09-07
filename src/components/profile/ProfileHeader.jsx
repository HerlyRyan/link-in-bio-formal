// src/components/profile/ProfileHeader.jsx

import { motion, useReducedMotion } from "framer-motion";

import { profileConfig } from "../../config/profile";
import { ProfileLogo } from "./ProfileLogo";

export const ProfileHeader = () => {
  const shouldReduceMotion = useReducedMotion();

  const { name, badge, description, logo } = profileConfig;

  return (
    <motion.header
      initial={
        shouldReduceMotion
          ? {
              opacity: 0,
            }
          : {
              opacity: 0,
              y: 12,
            }
      }
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: shouldReduceMotion ? 0.15 : 0.45,
        ease: "easeOut",
      }}
      className="
        relative

        w-full
        overflow-hidden

        rounded-3xl

        border
        border-brand-dark/10

        bg-brand-card/75

        px-5
        py-10

        sm:px-8
        sm:py-11

        lg:px-12
        lg:py-12
      "
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0

          overflow-hidden
        "
      >
        {/* Left accent */}
        <div
          className="
            absolute

            -bottom-24
            -left-20

            h-48
            w-48

            rounded-full

            bg-brand-primary/5

            blur-3xl
          "
        />

        {/* Right accent */}
        <div
          className="
            absolute

            -right-20
            -top-20

            h-44
            w-44

            rounded-full

            bg-brand-accent/5

            blur-3xl
          "
        />
      </div>

      {/* Content */}
      <div
        className="
          relative
          z-10

          flex
          w-full
          flex-col
          items-center

          text-center
        "
      >
        {/* Logo */}
        <ProfileLogo src={logo.src} alt={logo.alt} />

        {/* Official account badge */}
        <div
          className="
            mt-5

            inline-flex
            min-h-8
            items-center
            justify-center

            rounded-full

            border
            border-brand-primary/40

            bg-brand-secondary/45

            px-4
            py-1.5

            text-[10px]
            font-extrabold
            uppercase
            tracking-[0.18em]

            text-brand-dark

            sm:text-[11px]
          "
        >
          {badge || "Official Account"}
        </div>

        {/* Organization name */}
        <h1
          className="
            mt-4

            text-3xl
            font-extrabold
            tracking-[-0.035em]

            text-brand-text

            sm:text-4xl

            lg:text-[2.65rem]
          "
        >
          {name}
        </h1>

        {/* Description */}
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
          {description}
        </p>

        {/* Divider */}
        <div
          aria-hidden="true"
          className="
            mt-6

            h-px
            w-16

            bg-brand-dark/20
          "
        />
      </div>
    </motion.header>
  );
};
