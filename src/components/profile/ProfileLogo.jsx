import { motion, useReducedMotion } from "framer-motion";

export const ProfileLogo = ({ src, alt }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              scale: 0.96,
              y: 6,
            }
      }
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.4,
        ease: "easeOut",
      }}
      className="
        flex
        h-24
        w-24
        items-center
        justify-center

        overflow-hidden
        rounded-full

        border
        border-brand-dark/15

        bg-white/70

        p-1

        shadow-[0_4px_14px_rgba(32,40,8,0.06)]

        backdrop-blur-sm

        sm:h-28
        sm:w-28
      "
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        decoding="async"
        className="
          h-full
          w-full

          select-none
          object-contain
        "
      />
    </motion.div>
  );
};
