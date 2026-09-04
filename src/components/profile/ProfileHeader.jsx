import { motion } from "framer-motion";

import { ProfileLogo } from "./ProfileLogo";
import { profileConfig } from "../../config/profile";

import {
  profileHeaderVariants,
  profileItemVariants,
} from "../../animations/variants";

export const ProfileHeader = () => {
  const { name, badge, description, logo } = profileConfig;

  return (
    <motion.header
      variants={profileHeaderVariants}
      initial="hidden"
      animate="visible"
      className="
        grid
        w-full
        grid-cols-1
        gap-3

        md:grid-cols-[180px_1fr]
        md:gap-4
      "
    >
      {/* Logo Card */}
      <motion.div
        variants={profileItemVariants}
        className="
          flex
          min-h-36
          items-center
          justify-center

          rounded-2xl
          border-2
          border-brand-text/85

          bg-brand-card
          p-5

          shadow-[3px_3px_0_0_var(--color-brand-text)]

          md:min-h-44
        "
      >
        <ProfileLogo src={logo.src} alt={logo.alt} />
      </motion.div>

      {/* Identity Card */}
      <motion.div
        variants={profileItemVariants}
        className="
          flex
          min-h-44
          flex-col
          justify-center

          rounded-2xl
          border-2
          border-brand-text/85

          bg-brand-card

          p-5

          shadow-[4px_4px_0_0_var(--color-brand-text)]

          sm:p-6
        "
      >
        <div>
          <span
            className="
              inline-flex
              items-center
              justify-center

              rounded-lg
              border-2
              border-brand-text/80

              bg-brand-primary

              px-3
              py-1.5

              text-[10px]
              font-bold
              uppercase
              tracking-[0.14em]
              text-white

              sm:text-[11px]
            "
          >
            {badge}
          </span>
        </div>

        <h1
          className="
            mt-3

            text-2xl
            font-bold
            tracking-tight
            text-brand-text

            sm:text-3xl
          "
        >
          {name}
        </h1>

        <p
          className="
            mt-3
            max-w-xl

            text-[13px]
            leading-6
            text-brand-text/75

            sm:text-sm
          "
        >
          {description}
        </p>
      </motion.div>
    </motion.header>
  );
};
