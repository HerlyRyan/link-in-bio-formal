import { useRef } from "react";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { createPortal } from "react-dom";

import { FiAlertCircle, FiExternalLink, FiMail, FiX } from "react-icons/fi";

import { useModalAccessibility } from "../../hooks/useModalAccessibility";

export const ExternalLinkModal = ({
  isOpen,
  onClose,
  onConfirm,
  linkTitle,
  linkUrl,
  type = "external",
}) => {
  const shouldReduceMotion = useReducedMotion();
  const modalRef = useRef(null);

  const isEmail = type === "email";

  useModalAccessibility({
    isOpen,
    onClose,
    modalRef,
  });

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="external-link-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.2,
          }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
          className="
            fixed
            inset-0
            z-9999

            flex
            items-center
            justify-center

            bg-brand-text/50

            px-5
            py-6

            backdrop-blur-sm
          "
        >
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="external-link-title"
            aria-describedby="external-link-description"
            initial={
              shouldReduceMotion
                ? {
                    opacity: 0,
                  }
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
            exit={
              shouldReduceMotion
                ? {
                    opacity: 0,
                  }
                : {
                    opacity: 0,
                    scale: 0.98,
                    y: 8,
                  }
            }
            transition={{
              duration: shouldReduceMotion ? 0 : 0.2,
              ease: "easeOut",
            }}
            className="
              relative

              w-full
              max-w-md
              overflow-hidden

              rounded-3xl

              border
              border-brand-dark/10

              bg-brand-card

              shadow-xl

              focus:outline-none
            "
          >
            {/* Header */}
            <header
              className="
                flex
                items-center
                justify-between
                gap-4

                border-b
                border-brand-dark/10

                px-5
                py-4

                sm:px-6
                sm:py-5
              "
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
                  aria-hidden="true"
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center

                    rounded-xl

                    bg-brand-secondary/50

                    text-brand-primary
                  "
                >
                  {isEmail ? (
                    <FiMail size={18} />
                  ) : (
                    <FiExternalLink size={18} />
                  )}
                </span>

                <h2
                  id="external-link-title"
                  className="
                    min-w-0

                    text-sm
                    font-bold

                    text-brand-text

                    sm:text-base
                  "
                >
                  {isEmail ? "Buka Aplikasi Email?" : "Buka Tautan Eksternal?"}
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup dialog"
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center

                  rounded-full

                  text-brand-muted

                  transition-colors
                  duration-200

                  hover:bg-brand-secondary/40
                  hover:text-brand-text

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-brand-primary
                "
              >
                <FiX aria-hidden="true" size={19} />
              </button>
            </header>

            {/* Content */}
            <div
              className="
                px-5
                py-5

                sm:px-6
                sm:py-6
              "
            >
              {/* Information */}
              <div
                className="
                  flex
                  items-start
                  gap-3

                  rounded-2xl

                  bg-brand-secondary/30

                  p-4
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center

                    rounded-xl

                    bg-brand-card

                    text-brand-primary
                  "
                >
                  <FiAlertCircle size={17} />
                </span>

                <p
                  id="external-link-description"
                  className="
                    min-w-0
                    pt-0.5

                    text-xs
                    font-medium
                    leading-5

                    text-brand-muted

                    sm:text-sm
                    sm:leading-6
                  "
                >
                  {isEmail ? (
                    <>
                      Anda akan membuka aplikasi email untuk menghubungi{" "}
                      <span className="font-bold text-brand-text">
                        DPM FK UNTAR
                      </span>
                      .
                    </>
                  ) : (
                    <>
                      Anda akan meninggalkan halaman DPM FK UNTAR dan membuka{" "}
                      <span className="font-bold text-brand-text">
                        {linkTitle}
                      </span>{" "}
                      di tab baru.
                    </>
                  )}
                </p>
              </div>

              {/* Destination */}
              <div className="mt-5">
                <span
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.14em]

                    text-brand-muted
                  "
                >
                  Tujuan
                </span>

                <div
                  className="
                    custom-scrollbar

                    mt-2
                    max-h-20
                    overflow-y-auto
                    break-all

                    rounded-xl

                    border
                    border-brand-dark/10

                    bg-brand-bg/60

                    px-3
                    py-2.5

                    font-mono
                    text-[11px]
                    leading-5

                    text-brand-muted
                  "
                >
                  {isEmail ? linkUrl?.replace(/^mailto:/, "") : linkUrl}
                </div>
              </div>
            </div>

            {/* Actions */}
            <footer
              className="
                flex
                gap-3

                border-t
                border-brand-dark/10

                bg-brand-bg/35

                px-5
                py-4

                sm:px-6
              "
            >
              <button
                type="button"
                onClick={onClose}
                className="
                  inline-flex
                  min-h-11
                  flex-1
                  items-center
                  justify-center

                  rounded-lg

                  border
                  border-brand-dark/15

                  bg-transparent

                  px-4

                  text-sm
                  font-semibold

                  text-brand-text

                  transition-colors
                  duration-200

                  hover:bg-brand-secondary/30

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-brand-primary
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-brand-card
                "
              >
                Batal
              </button>

              <button
                type="button"
                onClick={onConfirm}
                className="
                  inline-flex
                  min-h-11
                  flex-1
                  items-center
                  justify-center
                  gap-2

                  rounded-lg

                  bg-brand-primary

                  px-4

                  text-sm
                  font-semibold

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
                Lanjutkan
                {isEmail ? (
                  <FiMail aria-hidden="true" size={15} />
                ) : (
                  <FiExternalLink aria-hidden="true" size={15} />
                )}
              </button>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};
