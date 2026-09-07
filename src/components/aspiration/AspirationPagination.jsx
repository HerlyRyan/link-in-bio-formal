// src/components/aspiration/AspirationPagination.jsx

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export const AspirationPagination = ({
  currentPage,
  totalPages,
  hasResults,
  onPrevious,
  onNext,
}) => {
  if (!hasResults) {
    return null;
  }

  const isFirstPage = currentPage === 1;

  const isLastPage = currentPage === totalPages;

  return (
    <div
      className="
        flex
        shrink-0
        items-center
        justify-between
        gap-4

        border-t
        border-brand-dark/10

        px-4
        py-3.5

        sm:px-5
      "
    >
      <PaginationButton
        onClick={onPrevious}
        disabled={isFirstPage}
        label="Halaman sebelumnya"
        icon={FiChevronLeft}
      />

      <p
        className="
          text-xs
          font-semibold
          tabular-nums

          text-brand-muted
        "
      >
        Halaman <span className="text-brand-text">{currentPage}</span> dari{" "}
        <span className="text-brand-text">{totalPages}</span>
      </p>

      <PaginationButton
        onClick={onNext}
        disabled={isLastPage}
        label="Halaman berikutnya"
        icon={FiChevronRight}
      />
    </div>
  );
};

const PaginationButton = ({ onClick, disabled, label, icon: Icon }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="
        flex
        h-10
        w-10
        items-center
        justify-center

        rounded-full

        border
        border-brand-dark/10

        bg-brand-card
        text-brand-text

        transition-colors
        duration-200

        hover:bg-brand-secondary/30

        disabled:cursor-not-allowed
        disabled:opacity-35

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-brand-primary
      "
    >
      <Icon size={18} aria-hidden="true" />
    </button>
  );
};
