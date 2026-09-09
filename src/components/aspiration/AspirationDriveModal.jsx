// src/components/aspiration/AspirationDriveModal.jsx

import { useRef } from "react";
import { createPortal } from "react-dom";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { FiEdit3, FiX } from "react-icons/fi";

import { useModalAccessibility } from "../../hooks/useModalAccessibility";

import { AspirationSearch } from "./AspirationSearch";
import { AspirationLinkList } from "./AspirationLinkList";
import { AspirationPagination } from "./AspirationPagination";

import { useAspirationLinks } from "../../hooks/useAspirationLinks";

const ITEMS_PER_PAGE = 5;

export const AspirationDriveModal = ({
  isOpen,
  links = [],
  onClose,
  onSelect,
}) => {
  const modalRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useModalAccessibility({
    isOpen,
    onClose,
    modalRef,
  });

  const {
    searchQuery,
    setSearchQuery,

    currentPage,
    totalPages,

    filteredLinks,
    paginatedLinks,

    goToPreviousPage,
    goToNextPage,
  } = useAspirationLinks({
    links,
    isOpen,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  if (typeof document === "undefined") {
    return null;
  }

  const hasResults = filteredLinks.length > 0;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.2,
          }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose?.();
            }
          }}
          className="
            fixed
            inset-0
            z-50

            flex
            items-center
            justify-center

            bg-brand-text/75

            p-4

            backdrop-blur-sm

            sm:p-6
          "
        >
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="aspiration-drive-modal-title"
            tabIndex={-1}
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    scale: 0.97,
                    y: 12,
                  }
            }
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.98,
              y: 6,
            }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.24,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative

              flex
              h-[calc(100dvh-2rem)]
              w-full
              max-w-xl
              flex-col

              overflow-hidden

              rounded-3xl

              border
              border-brand-dark/10

              bg-brand-card

              shadow-[0_24px_70px_rgba(32,40,8,0.18)]

              focus:outline-none

              sm:h-[42rem]
            "
          >
            <ModalHeader onClose={onClose} />

            <AspirationSearch value={searchQuery} onChange={setSearchQuery} />

            <div
              className="
                min-h-0
                flex-1

                overflow-y-auto
                overscroll-contain

                p-4

                aspiration-modal-scrollbar

                sm:p-5
              "
            >
              <AspirationLinkList links={paginatedLinks} onSelect={onSelect} />
            </div>

            <AspirationPagination
              currentPage={currentPage}
              totalPages={totalPages}
              hasResults={hasResults}
              onPrevious={goToPreviousPage}
              onNext={goToNextPage}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

const ModalHeader = ({ onClose }) => {
  return (
    <header
      className="
        relative
        shrink-0

        border-b
        border-brand-dark/10

        bg-brand-card

        p-3

        sm:p-4
      "
    >
      <div
        className="
          relative
          overflow-hidden

          rounded-2xl

          border
          border-brand-primary/20

          bg-brand-bg/45

          px-4
          py-4

          sm:px-5
          sm:py-5
        "
      >
        {/* Decorative elements */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            overflow-hidden
          "
        >
          <div
            className="
              absolute
              -right-10
              -top-12

              h-32
              w-32

              rounded-full

              border
              border-brand-primary/10

              bg-brand-secondary/15
            "
          />

          <div
            className="
              absolute
              right-3
              top-8

              h-16
              w-16

              rounded-full

              border
              border-brand-primary/10
            "
          />

          <div
            className="
              absolute
              -bottom-16
              -left-12

              h-28
              w-28

              rounded-full

              bg-brand-primary/5
            "
          />

          <div
            className="
              absolute
              bottom-4
              right-5

              grid
              grid-cols-3
              gap-1.5

              opacity-40
            "
          >
            {Array.from({
              length: 6,
            }).map((_, index) => (
              <span
                key={index}
                className="
                  h-1
                  w-1

                  rounded-full

                  bg-brand-primary
                "
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div
          className="
            relative
            z-10

            pr-12

            sm:pr-14
          "
        >
          {/* Eyebrow + icon */}
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <span
              aria-hidden="true"
              className="
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center

                rounded-lg

                border
                border-brand-primary/15

                bg-brand-secondary/30

                text-brand-primary
              "
            >
              <FiEdit3 size={14} strokeWidth={2} />
            </span>

            <p
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.18em]

                text-brand-primary

                sm:text-[10px]
              "
            >
              Aspirasi Mahasiswa
            </p>
          </div>

          {/* Title */}
          <h2
            id="aspiration-drive-modal-title"
            className="
              mt-2.5

              text-lg
              font-bold
              tracking-[-0.025em]

              text-brand-text

              sm:text-xl
            "
          >
            Pilih Form Aspirasi
          </h2>

          {/* Description */}
          <p
            className="
              mt-1.5

              max-w-sm

              text-xs
              font-medium
              leading-5

              text-brand-muted

              sm:text-sm
              sm:leading-6
            "
          >
            Pilih formulir yang ingin dibuka untuk menyampaikan aspirasi.
          </p>
        </div>

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup modal aspirasi"
          className="
            absolute
            right-3
            top-3

            z-20

            flex
            h-10
            w-10
            items-center
            justify-center

            rounded-full

            border
            border-brand-dark/10

            bg-brand-card/85

            text-brand-muted

            backdrop-blur-sm

            transition-colors
            duration-200

            hover:border-brand-primary/20
            hover:bg-brand-secondary/30
            hover:text-brand-text

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-brand-primary
            focus-visible:ring-offset-2
            focus-visible:ring-offset-brand-bg

            sm:h-11
            sm:w-11
          "
        >
          <FiX size={19} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
};
