/* eslint-disable react-hooks/set-state-in-effect */
// src/hooks/useImageZoom.js

import { useCallback, useEffect, useRef, useState } from "react";

import { useMotionValue, useTransform } from "framer-motion";

const MIN_SCALE = 1;
const MAX_SCALE = 4;

const BUTTON_SCALE_STEP = 0.25;
const WHEEL_SENSITIVITY = 0.002;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export const useImageZoom = ({ isOpen, viewportRef, imageRef }) => {
  const scale = useMotionValue(MIN_SCALE);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const [scaleDisplay, setScaleDisplay] = useState(MIN_SCALE);

  const [isDragging, setIsDragging] = useState(false);

  const dragStartRef = useRef({
    pointerX: 0,
    pointerY: 0,

    imageX: 0,
    imageY: 0,
  });

  /*
   * Transform dijalankan melalui MotionValue.
   * Tidak menyebabkan React render saat drag.
   */
  const transform = useTransform(
    [x, y, scale],
    ([latestX, latestY, latestScale]) =>
      `translate3d(${latestX}px, ${latestY}px, 0) scale(${latestScale})`,
  );

  /*
   * Menghitung batas maksimal gambar
   * boleh digeser berdasarkan ukuran viewport.
   */
  const getPanBounds = useCallback(
    (currentScale) => {
      const viewport = viewportRef.current;

      const image = imageRef.current;

      if (!viewport || !image || currentScale <= MIN_SCALE) {
        return {
          maxX: 0,
          maxY: 0,
        };
      }

      const viewportWidth = viewport.clientWidth;

      const viewportHeight = viewport.clientHeight;

      const imageWidth = image.clientWidth;

      const imageHeight = image.clientHeight;

      const scaledWidth = imageWidth * currentScale;

      const scaledHeight = imageHeight * currentScale;

      const maxX = Math.max(0, (scaledWidth - viewportWidth) / 2);

      const maxY = Math.max(0, (scaledHeight - viewportHeight) / 2);

      return {
        maxX,
        maxY,
      };
    },
    [viewportRef, imageRef],
  );

  const clampPosition = useCallback(
    (currentScale) => {
      const { maxX, maxY } = getPanBounds(currentScale);

      x.set(clamp(x.get(), -maxX, maxX));

      y.set(clamp(y.get(), -maxY, maxY));
    },
    [getPanBounds, x, y],
  );

  const resetZoom = useCallback(() => {
    scale.set(MIN_SCALE);

    x.set(0);
    y.set(0);

    setScaleDisplay(MIN_SCALE);

    setIsDragging(false);
  }, [scale, x, y]);

  const setZoom = useCallback(
    (nextScale) => {
      const clampedScale = clamp(nextScale, MIN_SCALE, MAX_SCALE);

      scale.set(clampedScale);

      setScaleDisplay(clampedScale);

      /*
       * Saat kembali ke 100%,
       * posisi selalu dikunci ke tengah.
       */
      if (clampedScale === MIN_SCALE) {
        x.set(0);
        y.set(0);
      } else {
        clampPosition(clampedScale);
      }

      return clampedScale;
    },
    [scale, x, y, clampPosition],
  );

  const zoomIn = useCallback(() => {
    setZoom(scale.get() + BUTTON_SCALE_STEP);
  }, [scale, setZoom]);

  const zoomOut = useCallback(() => {
    setZoom(scale.get() - BUTTON_SCALE_STEP);
  }, [scale, setZoom]);

  /*
   * Native wheel event dengan passive:false
   * agar preventDefault valid.
   */
  useEffect(() => {
    const viewport = viewportRef.current;

    if (!isOpen || !viewport) {
      return;
    }

    const handleWheel = (event) => {
      event.preventDefault();

      const currentScale = scale.get();

      const delta = -event.deltaY * WHEEL_SENSITIVITY;

      setZoom(currentScale + delta);
    };

    viewport.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      viewport.removeEventListener("wheel", handleWheel);
    };
  }, [isOpen, viewportRef, scale, setZoom]);

  /*
   * Drag hanya dimulai
   * ketika zoom > 100%.
   */
  const handlePointerDown = useCallback(
    (event) => {
      if (scale.get() <= MIN_SCALE) {
        return;
      }

      event.preventDefault();

      event.currentTarget.setPointerCapture(event.pointerId);

      dragStartRef.current = {
        pointerX: event.clientX,

        pointerY: event.clientY,

        imageX: x.get(),

        imageY: y.get(),
      };

      setIsDragging(true);
    },
    [scale, x, y],
  );

  const handlePointerMove = useCallback(
    (event) => {
      if (!isDragging || scale.get() <= MIN_SCALE) {
        return;
      }

      const currentScale = scale.get();

      const deltaX = event.clientX - dragStartRef.current.pointerX;

      const deltaY = event.clientY - dragStartRef.current.pointerY;

      const { maxX, maxY } = getPanBounds(currentScale);

      const nextX = dragStartRef.current.imageX + deltaX;

      const nextY = dragStartRef.current.imageY + deltaY;

      /*
       * Constraint.
       *
       * Gambar tidak boleh digeser
       * keluar terlalu jauh.
       */
      x.set(clamp(nextX, -maxX, maxX));

      y.set(clamp(nextY, -maxY, maxY));
    },
    [isDragging, scale, x, y, getPanBounds],
  );

  const handlePointerUp = useCallback((event) => {
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    setIsDragging(false);
  }, []);

  const handleDoubleClick = useCallback(() => {
    if (scale.get() > MIN_SCALE) {
      resetZoom();
      return;
    }

    setZoom(2);
  }, [scale, resetZoom, setZoom]);

  /*
   * Re-clamp ketika viewport berubah.
   */
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleResize = () => {
      clampPosition(scale.get());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, scale, clampPosition]);

  /*
   * Reset state ketika lightbox ditutup.
   */
  useEffect(() => {
    if (!isOpen) {
      resetZoom();
    }
  }, [isOpen, resetZoom]);

  return {
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

    minScale: MIN_SCALE,

    maxScale: MAX_SCALE,
  };
};
