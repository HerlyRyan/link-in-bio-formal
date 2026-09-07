// src/components/aspiration/AspirationDriveModal.jsx

import { useRef } from "react";
import { createPortal } from "react-dom";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { FiX } from "react-icons/fi";

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
    <div
      className="
        relative
        shrink-0

        border-b
        border-brand-dark/10

        px-5
        py-5

        sm:px-6
        sm:py-6
      "
    >
      <div className="pr-14">
        <p
          className="
            text-[10px]
            font-bold
            uppercase
            tracking-[0.18em]

            text-brand-primary

            sm:text-[11px]
          "
        >
          Aspirasi Mahasiswa
        </p>

        <h2
          id="aspiration-drive-modal-title"
          className="
            mt-2

            text-xl
            font-bold
            tracking-[-0.025em]

            text-brand-text

            sm:text-2xl
          "
        >
          Pilih Form Aspirasi
        </h2>

        <p
          className="
            mt-2

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

      <button
        type="button"
        onClick={onClose}
        aria-label="Tutup modal aspirasi"
        className="
          absolute
          right-4
          top-4

          flex
          h-11
          w-11
          items-center
          justify-center

          rounded-full

          text-brand-muted

          transition-colors
          duration-200

          hover:bg-brand-secondary/30
          hover:text-brand-text

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-brand-primary
          focus-visible:ring-offset-2
          focus-visible:ring-offset-brand-card
        "
      >
        <FiX size={20} aria-hidden="true" />
      </button>
    </div>
  );
};
