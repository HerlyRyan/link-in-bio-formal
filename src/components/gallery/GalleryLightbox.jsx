// src/components/gallery/GalleryLightbox.jsx

import {
  useCallback,
  useRef,
} from "react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  FiChevronLeft,
  FiChevronRight,
  FiX,
} from "react-icons/fi";

import { GalleryImage } from "./GalleryImage";
import { useModalAccessibility } from "../../hooks/useModalAccessibility";

export const GalleryLightbox = ({
  isOpen,
  item,
  activeIndex,
  totalItems,
  onClose,
  onPrevious,
  onNext,
}) => {
  const modalRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useModalAccessibility({
    isOpen,
    onClose: handleClose,
    modalRef,
  });

  if (!item && isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: shouldReduceMotion
              ? 0.1
              : 0.2,
          }}
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              handleClose();
            }
          }}
          className="
            fixed
            inset-0
            z-99999

            flex
            items-center
            justify-center

            bg-black/70

            p-4

            backdrop-blur-sm

            sm:p-6
          "
        >
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Gambar ${activeIndex + 1} dari ${totalItems}`}
            tabIndex={-1}
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    scale: 0.96,
                    y: 8,
                  }
            }
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    scale: 0.97,
                  }
            }
            transition={{
              duration: shouldReduceMotion
                ? 0.1
                : 0.2,
            }}
            className="
              relative

              flex
              max-h-[90dvh]
              w-full
              max-w-5xl
              flex-col

              overflow-hidden

              rounded-2xl

              border-2
              border-brand-text/85

              bg-brand-card

              shadow-[5px_5px_0_0_var(--color-brand-text)]
            "
          >
            <div
              className="
                flex
                items-center
                justify-between

                border-b-2
                border-brand-text/80

                px-4
                py-3
              "
            >
              <div className="min-w-0">
                <p
                  className="
                    truncate
                    text-sm
                    font-bold
                    text-brand-text
                  "
                >
                  {item.title || "Dokumentasi"}
                </p>

                <p
                  className="
                    mt-0.5
                    text-xs
                    font-medium
                    text-brand-muted
                  "
                >
                  {activeIndex + 1} / {totalItems}
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                aria-label="Tutup galeri"
                className="
                  flex
                  h-10
                  w-10

                  shrink-0
                  items-center
                  justify-center

                  rounded-lg

                  border-2
                  border-brand-text/80

                  bg-brand-card

                  text-brand-text

                  shadow-[2px_2px_0_0_var(--color-brand-text)]

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-brand-primary
                "
              >
                <FiX
                  size={18}
                  aria-hidden="true"
                />
              </button>
            </div>

            <div
              className="
                relative
                min-h-0
                flex-1
                bg-brand-text
              "
            >
              <div
                className="
                  flex
                  h-[60dvh]
                  max-h-162.5
                  min-h-72
                  items-center
                  justify-center
                "
              >
                <GalleryImage
                  key={item.id}
                  src={item.src}
                  alt={item.alt}
                  position="center"
                />
              </div>

              {totalItems > 1 && (
                <>
                  <button
                    type="button"
                    onClick={onPrevious}
                    aria-label="Gambar sebelumnya"
                    className="
                      absolute
                      left-3
                      top-1/2

                      flex
                      h-11
                      w-11

                      -translate-y-1/2
                      items-center
                      justify-center

                      rounded-lg

                      border-2
                      border-brand-text/80

                      bg-brand-card/95

                      text-brand-text

                      shadow-[2px_2px_0_0_var(--color-brand-text)]

                      backdrop-blur-sm

                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-brand-primary
                    "
                  >
                    <FiChevronLeft
                      size={20}
                      aria-hidden="true"
                    />
                  </button>

                  <button
                    type="button"
                    onClick={onNext}
                    aria-label="Gambar berikutnya"
                    className="
                      absolute
                      right-3
                      top-1/2

                      flex
                      h-11
                      w-11

                      -translate-y-1/2
                      items-center
                      justify-center

                      rounded-lg

                      border-2
                      border-brand-text/80

                      bg-brand-card/95

                      text-brand-text

                      shadow-[2px_2px_0_0_var(--color-brand-text)]

                      backdrop-blur-sm

                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-brand-primary
                    "
                  >
                    <FiChevronRight
                      size={20}
                      aria-hidden="true"
                    />
                  </button>
                </>
              )}
            </div>

            {(item.description || item.title) && (
              <div
                className="
                  border-t-2
                  border-brand-text/80

                  px-4
                  py-3
                "
              >
                {item.description && (
                  <p
                    className="
                      text-xs
                      font-medium
                      leading-5
                      text-brand-text/75

                      sm:text-sm
                    "
                  >
                    {item.description}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};