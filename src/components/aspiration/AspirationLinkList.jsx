// src/components/aspiration/AspirationLinkList.jsx

import { FiArrowUpRight, FiFolder } from "react-icons/fi";

export const AspirationLinkList = ({ links = [], onSelect }) => {
  if (links.length === 0) {
    return <EmptyState />;
  }

  return (
    <div
      className="
        flex
        flex-col
        gap-3
      "
    >
      {links.map((link) => (
        <AspirationLinkItem key={link.id} link={link} onSelect={onSelect} />
      ))}
    </div>
  );
};

const AspirationLinkItem = ({ link, onSelect }) => {
  const Icon = link.icon || FiFolder;

  return (
    <button
      type="button"
      onClick={() => onSelect?.(link)}
      className="
        group

        flex
        min-h-18
        w-full
        items-center
        gap-3.5

        rounded-2xl

        border
        border-brand-dark/10

        bg-brand-bg/55

        px-4
        py-3.5

        text-left

        transition
        duration-200

        hover:border-brand-primary/30
        hover:bg-brand-secondary/25

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-brand-primary
        focus-visible:ring-offset-2
        focus-visible:ring-offset-brand-card
      "
    >
      <span
        aria-hidden="true"
        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center

          rounded-xl

          bg-brand-primary/10
          text-brand-primary

          transition-colors
          duration-200

          group-hover:bg-brand-primary/15
        "
      >
        <Icon size={20} />
      </span>

      <span
        className="
          min-w-0
          flex-1
        "
      >
        <span
          className="
            block

            text-sm
            font-bold

            text-brand-text

            sm:text-[15px]
          "
        >
          {link.title}
        </span>

        {link.description && (
          <span
            className="
              mt-1
              block

              text-xs
              font-medium
              leading-5

              text-brand-muted

              sm:text-sm
            "
          >
            {link.description}
          </span>
        )}
      </span>

      <FiArrowUpRight
        size={18}
        aria-hidden="true"
        className="
          shrink-0

          text-brand-muted

          transition
          duration-200

          group-hover:-translate-y-0.5
          group-hover:translate-x-0.5
          group-hover:text-brand-primary
        "
      />
    </button>
  );
};

const EmptyState = () => {
  return (
    <div
      className="
        flex
        h-full
        min-h-0
        flex-1
        items-center
        justify-center

        px-4
        text-center
      "
    >
      <div>
        <p
          className="
            text-sm
            font-semibold

            text-brand-text
          "
        >
          Tidak ada link yang Anda cari.
        </p>

        <p
          className="
            mt-1

            text-xs
            font-medium
            leading-5

            text-brand-muted
          "
        >
          Coba gunakan kata kunci lain.
        </p>
      </div>
    </div>
  );
};
