// src/components/profile/PhotoLightbox.jsx

import { useRef } from "react";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { createPortal } from "react-dom";

import { FiX } from "react-icons/fi";

import { useModalAccessibility } from "../../hooks/useModalAccessibility";

export const PhotoLightbox = ({ isOpen, src, alt, onClose }) => {
  const modalRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

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
          className="
            fixed
            inset-0
            z-50

            flex
            items-center
            justify-center

            bg-brand-text/85

            p-4

            backdrop-blur-sm

            sm:p-8
          "
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label="Foto DPM FK UNTAR"
            tabIndex={-1}
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    scale: 0.97,
                    y: 10,
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
            }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.22,
              ease: "easeOut",
            }}
            className="
              relative

              max-h-[90vh]
              w-full
              max-w-6xl

              overflow-hidden

              rounded-2xl

              bg-brand-card

              shadow-2xl

              focus:outline-none
            "
          >
            <img
              src={src}
              alt={alt}
              draggable={false}
              className="
                max-h-[90vh]
                w-full

                select-none

                object-contain
              "
            />

            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup foto"
              className="
                absolute
                right-3
                top-3

                flex
                h-11
                w-11
                items-center
                justify-center

                rounded-full

                border
                border-white/20

                bg-brand-text/70

                text-white

                backdrop-blur-md

                transition-colors

                hover:bg-brand-text

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-white
              "
            >
              <FiX size={20} aria-hidden="true" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};
