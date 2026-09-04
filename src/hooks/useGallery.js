// src/hooks/useGallery.js

import { useCallback, useState } from "react";

export const useGallery = (items = []) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const isOpen = activeIndex !== null;

  const activeItem =
    activeIndex !== null ? items[activeIndex] : null;

  const openGallery = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  const closeGallery = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const showPrevious = useCallback(() => {
    if (items.length === 0) return;

    setActiveIndex((current) => {
      if (current === null) return 0;

      return current === 0
        ? items.length - 1
        : current - 1;
    });
  }, [items.length]);

  const showNext = useCallback(() => {
    if (items.length === 0) return;

    setActiveIndex((current) => {
      if (current === null) return 0;

      return current === items.length - 1
        ? 0
        : current + 1;
    });
  }, [items.length]);

  return {
    activeIndex,
    activeItem,
    isOpen,
    openGallery,
    closeGallery,
    showPrevious,
    showNext,
  };
};