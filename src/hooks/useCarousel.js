// src/hooks/useCarousel.js

import { useCallback, useState } from "react";

export const useCarousel = (totalItems = 0) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goTo = useCallback(
    (index) => {
      if (totalItems <= 0) return;

      const safeIndex =
        (index + totalItems) % totalItems;

      setCurrentIndex(safeIndex);
    },
    [totalItems],
  );

  const previous = useCallback(() => {
    goTo(currentIndex - 1);
  }, [currentIndex, goTo]);

  const next = useCallback(() => {
    goTo(currentIndex + 1);
  }, [currentIndex, goTo]);

  return {
    currentIndex,
    setCurrentIndex: goTo,
    previous,
    next,
  };
};