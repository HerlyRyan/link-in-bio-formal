/* eslint-disable react-hooks/set-state-in-effect */
// src/hooks/useGallery.js

import { useCallback, useEffect, useState } from "react";

export const useGallery = (items = []) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const totalItems = items.length;

  const activeItem = totalItems > 0 ? items[activeIndex] : null;

  const openGallery = useCallback(
    (index = 0) => {
      if (totalItems === 0) return;

      const safeIndex = (index + totalItems) % totalItems;

      setActiveIndex(safeIndex);
      setIsOpen(true);
    },
    [totalItems],
  );

  const closeGallery = useCallback(() => {
    setIsOpen(false);
  }, []);

  const showPrevious = useCallback(() => {
    if (totalItems <= 1) return;

    setActiveIndex((currentIndex) => {
      return (currentIndex - 1 + totalItems) % totalItems;
    });
  }, [totalItems]);

  const showNext = useCallback(() => {
    if (totalItems <= 1) return;

    setActiveIndex((currentIndex) => {
      return (currentIndex + 1) % totalItems;
    });
  }, [totalItems]);

  /*
   * Protect activeIndex if the gallery data
   * changes dynamically.
   */
  useEffect(() => {
    if (totalItems === 0) {
      setActiveIndex(0);
      setIsOpen(false);
      return;
    }

    if (activeIndex >= totalItems) {
      setActiveIndex(totalItems - 1);
    }
  }, [activeIndex, totalItems]);

  return {
    isOpen,
    activeIndex,
    activeItem,

    openGallery,
    closeGallery,

    showPrevious,
    showNext,
  };
};
