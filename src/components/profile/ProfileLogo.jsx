import { motion, useReducedMotion } from "framer-motion";

export const ProfileLogo = ({ src, alt }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          scale: shouldReduceMotion ? 1 : 0.94,
        },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.4,
            ease: "easeOut",
          },
        },
      }}
      className="
        relative
        flex
        items-center
        justify-center
      "
    >
      <div
        className="
          relative

          h-24
          w-24

          overflow-hidden
          rounded-full

          border-2
          border-brand-text/85

          bg-white

          shadow-[3px_3px_0_0_var(--color-brand-text)]

          sm:h-28
          sm:w-28
        "
      >
        <img
          src={src}
          alt={alt}
          className="
            h-full
            w-full
            object-cover
          "
          decoding="async"
        />
      </div>
    </motion.div>
  );
};
