import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { createPortal } from "react-dom";

import { FiAlertCircle, FiExternalLink, FiX, FiMail } from "react-icons/fi";

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

  useModalAccessibility({
    isOpen,
    onClose,
  });

  if (typeof document === "undefined") {
    return null;
  }

  const isEmail = type === "email";

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="external-link-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
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

            bg-black/45

            p-4

            backdrop-blur-sm
          "
        >
          <motion.div
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
              duration: 0.2,
              ease: "easeOut",
            }}
            className="
              relative

              w-full
              max-w-sm
              overflow-hidden

              rounded-2xl

              border-2
              border-brand-text/85

              bg-brand-card

              shadow-[5px_5px_0_0_var(--color-brand-text)]
            "
          >
            {/* Header */}
            <header
              className="
                flex
                items-center
                justify-between
                gap-4

                border-b-2
                border-brand-text/85

                bg-brand-secondary/15

                px-5
                py-4

                sm:px-6
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
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center

                    rounded-lg

                    border-2
                    border-brand-text/80

                    bg-brand-primary

                    text-white

                    shadow-[2px_2px_0_0_var(--color-brand-text)]
                  "
                >
                  {isEmail ? (
                    <FiMail size={16} />
                  ) : (
                    <FiExternalLink size={16} />
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
                aria-label="Tutup konfirmasi tautan eksternal"
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center

                  rounded-lg

                  border-2
                  border-brand-text/80

                  bg-white

                  text-brand-text

                  shadow-[2px_2px_0_0_var(--color-brand-text)]

                  transition-all
                  duration-150

                  hover:-translate-x-px
                  hover:-translate-y-px

                  active:translate-x-px
                  active:translate-y-px
                  active:shadow-none

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-brand-primary
                  focus-visible:ring-offset-2
                "
              >
                <FiX aria-hidden="true" size={18} />
              </button>
            </header>

            {/* Content */}
            <div
              className="
                px-5
                py-5

                sm:px-6
              "
            >
              {/* Information */}
              <div
                className="
                  flex
                  items-start
                  gap-3

                  rounded-xl

                  border-2
                  border-brand-text/80

                  bg-brand-secondary/15

                  p-4

                  shadow-[2px_2px_0_0_var(--color-brand-text)]
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center

                    rounded-lg

                    border-2
                    border-brand-text/80

                    bg-white

                    text-brand-primary
                  "
                >
                  <FiAlertCircle size={16} />
                </span>

                <p
                  id="external-link-description"
                  className="
                    min-w-0
                    text-xs
                    font-medium
                    leading-5
                    text-brand-text/80
                    sm:text-sm
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
                    tracking-[0.12em]
                    text-brand-text/65
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

                    rounded-lg

                    border-2
                    border-brand-text/75

                    bg-brand-bg/40

                    px-3
                    py-2.5

                    font-mono
                    text-[11px]
                    leading-4
                    text-brand-text/75
                  "
                >
                  {isEmail ? linkUrl.replace(/^mailto:/, "") : linkUrl}
                </div>
              </div>
            </div>

            {/* Actions */}
            <footer
              className="
                flex
                gap-3

                border-t-2
                border-brand-text/85

                bg-brand-bg/60

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

                  border-2
                  border-brand-text/80

                  bg-white

                  px-3

                  text-xs
                  font-semibold
                  text-brand-text

                  shadow-[2px_2px_0_0_var(--color-brand-text)]

                  transition-all
                  duration-150

                  hover:bg-brand-secondary/15

                  active:translate-x-px
                  active:translate-y-px
                  active:shadow-none

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-brand-primary
                  focus-visible:ring-offset-2

                  sm:text-sm
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

                  border-2
                  border-brand-text/85

                  bg-brand-primary

                  px-3

                  text-xs
                  font-semibold
                  text-white

                  shadow-[2px_2px_0_0_var(--color-brand-text)]

                  transition-all
                  duration-150

                  hover:bg-brand-primary/90

                  active:translate-x-px
                  active:translate-y-px
                  active:shadow-none

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-brand-primary
                  focus-visible:ring-offset-2

                  sm:text-sm
                "
              >
                Lanjutkan
                <FiExternalLink aria-hidden="true" size={14} />
              </button>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};
