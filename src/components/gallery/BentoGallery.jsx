// src/components/gallery/BentoGallery.jsx

import { useEffect, useRef, useState } from "react";

import { FiChevronLeft, FiChevronRight, FiImage } from "react-icons/fi";

import { GalleryItem } from "./GalleryItem";
import { GalleryLightbox } from "./GalleryLightbox";
import { useGallery } from "../../hooks/useGallery";

const ITEMS_PER_PAGE = 5;

const chunkItems = (items, size) => {
  const chunks = [];

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks;
};

export const BentoGallery = ({ items = [] }) => {
  const scrollRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(0);

  const pages = chunkItems(items, ITEMS_PER_PAGE);

  const {
    activeIndex,
    activeItem,
    isOpen,
    openGallery,
    closeGallery,
    showPrevious,
    showNext,
  } = useGallery(items);

  const hasImages = items.length > 0;
  const hasMultiplePages = pages.length > 1;

  const scrollToPage = (index) => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;

    container.scrollTo({
      left: container.clientWidth * index,
      behavior: "smooth",
    });

    setCurrentPage(index);
  };

  const handlePreviousPage = () => {
    const previous = currentPage === 0 ? pages.length - 1 : currentPage - 1;

    scrollToPage(previous);
  };

  const handleNextPage = () => {
    const next = currentPage === pages.length - 1 ? 0 : currentPage + 1;

    scrollToPage(next);
  };

  const getBentoClass = (index, totalItems) => {
    if (totalItems === 1) {
      return "col-start-1 col-span-4 row-start-1 row-span-4";
    }

    if (totalItems === 2) {
      const layouts = [
        "col-start-1 col-span-2 row-start-1 row-span-4",
        "col-start-3 col-span-2 row-start-1 row-span-4",
      ];

      return layouts[index];
    }

    if (totalItems === 3) {
      const layouts = [
        "col-start-1 col-span-2 row-start-1 row-span-4",
        "col-start-3 col-span-2 row-start-1 row-span-2",
        "col-start-3 col-span-2 row-start-3 row-span-2",
      ];

      return layouts[index];
    }

    if (totalItems === 4) {
      const layouts = [
        "col-start-1 col-span-2 row-start-1 row-span-2",
        "col-start-3 col-span-2 row-start-1 row-span-2",
        "col-start-1 col-span-2 row-start-3 row-span-2",
        "col-start-3 col-span-2 row-start-3 row-span-2",
      ];

      return layouts[index];
    }

    const layouts = [
      "col-start-1 col-span-2 row-start-1 row-span-4",

      "col-start-3 col-span-2 row-start-1 row-span-2",

      "col-start-3 col-span-1 row-start-3 row-span-2",

      "col-start-4 col-span-1 row-start-3 row-span-1",

      "col-start-4 col-span-1 row-start-4 row-span-1",
    ];

    return layouts[index];
  };

  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    const handleScroll = () => {
      if (container.clientWidth === 0) return;

      const page = Math.round(container.scrollLeft / container.clientWidth);

      setCurrentPage(page);
    };

    container.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!hasImages) {
    return (
      <section
        aria-label="Galeri DPM FK UNTAR"
        className="
          flex
          min-h-56
          w-full
          items-center
          justify-center

          rounded-2xl

          border-2
          border-brand-text/85

          bg-brand-card

          p-6

          shadow-[3px_3px_0_0_var(--color-brand-text)]
        "
      >
        <div className="text-center">
          <span
            aria-hidden="true"
            className="
              mx-auto

              flex
              h-11
              w-11
              items-center
              justify-center

              rounded-xl

              border-2
              border-brand-text/80

              bg-brand-secondary/35

              text-brand-text
            "
          >
            <FiImage size={20} />
          </span>

          <p
            className="
              mt-3
              text-sm
              font-bold
              text-brand-text
            "
          >
            Gambar belum tersedia
          </p>

          <p
            className="
              mt-1
              text-xs
              font-medium
              text-brand-muted
            "
          >
            Dokumentasi kegiatan akan ditampilkan di sini.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section
        aria-label="Galeri DPM FK UNTAR"
        className="
          relative
          w-full

          rounded-2xl

          border-2
          border-brand-text/85

          bg-brand-card

          p-3

          shadow-[3px_3px_0_0_var(--color-brand-text)]

          sm:p-4
        "
      >
        <div
          ref={scrollRef}
          className="
            flex
            w-full

            snap-x
            snap-mandatory

            overflow-x-auto

            scroll-smooth

            scrollbar-none

            [&::-webkit-scrollbar]:hidden
          "
        >
          {pages.map((page, pageIndex) => {
            const startIndex = pageIndex * ITEMS_PER_PAGE;

            return (
              <div
                key={`gallery-page-${pageIndex}`}
                className="
                    grid
                    aspect-[16/9]
                    w-full
                    min-w-full

                    shrink-0
                    snap-start

                    grid-cols-4
                    grid-rows-4

                    gap-2

                    sm:aspect-[16/8]
                    sm:gap-3

                    md:aspect-[16/7]
                "
              >
                {page.map((item, itemIndex) => (
                  <GalleryItem
                    key={item.id}
                    item={item}
                    index={startIndex + itemIndex}
                    onOpen={openGallery}
                    className={getBentoClass(itemIndex, page.length)}
                  />
                ))}
              </div>
            );
          })}
        </div>

        {hasMultiplePages && (
          <>
            <button
              type="button"
              onClick={handlePreviousPage}
              aria-label="Galeri sebelumnya"
              className="
                absolute
                left-5
                top-1/2

                z-10

                flex
                h-10
                w-10

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
              <FiChevronLeft size={18} aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={handleNextPage}
              aria-label="Galeri berikutnya"
              className="
                absolute
                right-5
                top-1/2

                z-10

                flex
                h-10
                w-10

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
              <FiChevronRight size={18} aria-hidden="true" />
            </button>

            <div
              className="
                absolute
                bottom-5
                left-1/2

                z-10

                flex
                -translate-x-1/2
                items-center
                gap-1.5

                rounded-lg

                bg-brand-card/90

                px-2
                py-1.5

                backdrop-blur-sm
              "
            >
              {pages.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => scrollToPage(index)}
                  aria-label={`Tampilkan galeri halaman ${index + 1}`}
                  aria-current={currentPage === index ? "true" : undefined}
                  className="
                    flex
                    h-4
                    items-center
                    justify-center

                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-brand-primary
                  "
                >
                  <span
                    aria-hidden="true"
                    className={`
                      h-1.5
                      rounded-sm
                      transition-all
                      duration-200

                      ${
                        currentPage === index
                          ? `
                            w-5
                            bg-brand-primary
                          `
                          : `
                            w-1.5
                            bg-brand-text/30
                          `
                      }
                    `}
                  />
                </button>
              ))}
            </div>
          </>
        )}
      </section>

      <GalleryLightbox
        isOpen={isOpen}
        item={activeItem}
        activeIndex={activeIndex}
        totalItems={items.length}
        onClose={closeGallery}
        onPrevious={showPrevious}
        onNext={showNext}
      />
    </>
  );
};
