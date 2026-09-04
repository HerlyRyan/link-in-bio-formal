import { motion, useReducedMotion } from "framer-motion";
import { FiChevronRight, FiExternalLink } from "react-icons/fi";

export const LinkItem = ({
  title,
  icon,
  index,
  onClick,
  isSpecial,
  type,
  variant = "default",
}) => {
  const shouldReduceMotion = useReducedMotion();

  const renderTrailingIcon = () => {
    if (type === "internal") {
      return <FiChevronRight size={20} aria-hidden="true" />;
    }

    if (type === "email") {
      return null;
    }

    return <FiExternalLink size={18} aria-hidden="true" />;
  };

  const getCardClasses = () => {
    if (isSpecial) {
      return `
      bg-brand-primary
      text-white
      hover:bg-brand-primary/90
    `;
    }

    if (variant === "secondary") {
      return `
      bg-brand-secondary
      text-brand-text
      hover:bg-brand-secondary/90
    `;
    }

    if (variant === "social") {
      return `
      bg-brand-accent
      text-brand-text
      hover:bg-brand-accent/90
    `;
    }

    return `
    bg-brand-card
    text-brand-text
    hover:bg-brand-secondary/60
  `;
  };

  const getIconClasses = () => {
    if (isSpecial) {
      return `
      bg-brand-card
      text-brand-primary
    `;
    }

    if (variant === "social") {
      return `
      bg-brand-card
      text-brand-text
    `;
    }

    return `
    bg-brand-card
    text-brand-primary
  `;
  };

  const trailingIcon = renderTrailingIcon();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              y: 16,
            }
      }
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
        delay: shouldReduceMotion ? 0 : 0.15 + index * 0.08,
      }}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              x: -2,
              y: -2,
            }
      }
      whileTap={
        shouldReduceMotion
          ? undefined
          : {
              x: 2,
              y: 2,
            }
      }
      className={`
        group
        relative
        z-10

        flex
        h-full
        min-h-20
        w-full
        items-center
        justify-between

        gap-4
        rounded-2xl

        border-2
        border-brand-text/85

        p-4

        shadow-[3px_3px_0_0_var(--color-brand-text)]

        transition-colors
        duration-200

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-brand-primary
        focus-visible:ring-offset-2
        focus-visible:ring-offset-brand-bg

        ${getCardClasses()}
      `}
    >
      <div
        className="
          flex
          min-w-0
          items-center
          gap-3
        "
      >
        <span
          className={`
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center

            rounded-xl
            border-2
            border-brand-text/80

            transition-transform
            duration-200

            ${getIconClasses()}
          `}
        >
          {icon}
        </span>

        <span
          className="
            min-w-0
            text-left
            text-sm
            font-semibold
            leading-5

            sm:text-base
          "
        >
          {title}
        </span>
      </div>

      {trailingIcon && (
        <span
          className={`
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center

            rounded-lg

            transition-transform
            duration-200

            group-hover:translate-x-0.5

            ${isSpecial ? "text-white" : "text-brand-text/65"}
          `}
        >
          {trailingIcon}
        </span>
      )}
    </motion.button>
  );
};
