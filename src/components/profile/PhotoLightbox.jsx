// src/components/profile/PhotoLightbox.jsx

import { useRef } from "react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import { createPortal } from "react-dom";

import {
  FiMinus,
  FiPlus,
  FiRefreshCw,
  FiX,
} from "react-icons/fi";

import { useModalAccessibility } from "../../hooks/useModalAccessibility";
import { useImageZoom } from "../../hooks/useImageZoom";

export const PhotoLightbox = ({
  isOpen,
  src,
  alt,
  onClose,
}) => {
  const modalRef =
    useRef(null);

  const viewportRef =
    useRef(null);

  const imageRef =
    useRef(null);

  const shouldReduceMotion =
    useReducedMotion();

  useModalAccessibility({
    isOpen,
    onClose,
    modalRef,
  });

  const {
    scaleDisplay,
    transform,

    isDragging,

    zoomIn,
    zoomOut,
    resetZoom,

    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleDoubleClick,

    minScale,
    maxScale,
  } = useImageZoom({
    isOpen,
    viewportRef,
    imageRef,
  });

  if (
    typeof document ===
    "undefined"
  ) {
    return null;
  }

  const isZoomed =
    scaleDisplay >
    minScale;

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
            duration:
              shouldReduceMotion
                ? 0
                : 0.2,
          }}
          onMouseDown={(
            event,
          ) => {
            if (
              event.target ===
              event.currentTarget
            ) {
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

            bg-brand-text/90

            p-3

            backdrop-blur-sm

            sm:p-6
            lg:p-8
          "
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
              duration:
                shouldReduceMotion
                  ? 0
                  : 0.22,

              ease: "easeOut",
            }}
            className="
              relative

              flex
              h-[calc(100dvh-1.5rem)]
              w-full
              max-w-6xl
              flex-col

              overflow-hidden

              rounded-2xl

              border
              border-white/10

              bg-brand-text

              shadow-2xl

              focus:outline-none

              sm:h-[calc(100dvh-3rem)]
            "
          >
            {/* Image viewport */}
            <div
              ref={viewportRef}
              className="
                relative

                min-h-0
                flex-1

                overflow-hidden

                bg-brand-text
              "
            >
              <div
                className="
                  absolute
                  inset-0

                  flex
                  items-center
                  justify-center

                  overflow-hidden
                "
              >
                <motion.img
                  ref={imageRef}
                  src={src}
                  alt={alt}
                  draggable={false}
                  onPointerDown={
                    handlePointerDown
                  }
                  onPointerMove={
                    handlePointerMove
                  }
                  onPointerUp={
                    handlePointerUp
                  }
                  onPointerCancel={
                    handlePointerUp
                  }
                  onDoubleClick={
                    handleDoubleClick
                  }
                  style={{
                    transform,

                    touchAction:
                      isZoomed
                        ? "none"
                        : "auto",
                  }}
                  className={`
                    max-h-full
                    max-w-full

                    select-none

                    object-contain

                    will-change-transform

                    ${
                      isZoomed
                        ? isDragging
                          ? "cursor-grabbing"
                          : "cursor-grab"
                        : "cursor-zoom-in"
                    }
                  `}
                />
              </div>

              {/* Scale indicator */}
              <div
                aria-live="polite"
                className="
                  pointer-events-none

                  absolute
                  left-3
                  top-3

                  z-20

                  rounded-full

                  border
                  border-white/10

                  bg-brand-text/65

                  px-3
                  py-1.5

                  text-xs
                  font-semibold
                  tabular-nums

                  text-white/85

                  backdrop-blur-md

                  sm:left-4
                  sm:top-4
                "
              >
                {Math.round(
                  scaleDisplay *
                    100,
                )}
                %
              </div>

              {/* Close */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup foto"
                className="
                  absolute
                  right-3
                  top-3

                  z-20

                  flex
                  h-11
                  w-11
                  items-center
                  justify-center

                  rounded-full

                  border
                  border-white/15

                  bg-brand-text/65

                  text-white

                  backdrop-blur-md

                  transition-colors
                  duration-200

                  hover:bg-brand-text

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-white

                  sm:right-4
                  sm:top-4
                "
              >
                <FiX
                  size={20}
                  aria-hidden="true"
                />
              </button>
            </div>

            {/* Controls */}
            <div
              className="
                flex
                shrink-0
                items-center
                gap-3

                border-t
                border-white/10

                bg-brand-text

                px-3
                py-3

                sm:px-4
              "
            >
              <p
                className="
                  hidden
                  flex-1

                  text-xs
                  font-medium

                  text-white/55

                  sm:block
                "
              >
                Scroll untuk zoom ·
                drag saat diperbesar ·
                double click untuk
                memperbesar atau reset
              </p>

              <div
                className="
                  ml-auto

                  flex
                  items-center
                  gap-2
                "
              >
                <ZoomButton
                  onClick={
                    zoomOut
                  }
                  disabled={
                    scaleDisplay <=
                    minScale
                  }
                  label="Perkecil foto"
                  icon={FiMinus}
                />

                <ZoomButton
                  onClick={
                    resetZoom
                  }
                  disabled={
                    !isZoomed
                  }
                  label="Reset zoom"
                  icon={
                    FiRefreshCw
                  }
                />

                <ZoomButton
                  onClick={
                    zoomIn
                  }
                  disabled={
                    scaleDisplay >=
                    maxScale
                  }
                  label="Perbesar foto"
                  icon={FiPlus}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

const ZoomButton = ({
  onClick,
  disabled,
  label,
  icon: Icon,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="
        flex
        h-11
        w-11
        items-center
        justify-center

        rounded-full

        border
        border-white/15

        bg-white/10

        text-white

        transition-colors
        duration-200

        hover:bg-white/15

        disabled:cursor-not-allowed
        disabled:opacity-35

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-white
      "
    >
      <Icon
        size={18}
        aria-hidden="true"
      />
    </button>
  );
};