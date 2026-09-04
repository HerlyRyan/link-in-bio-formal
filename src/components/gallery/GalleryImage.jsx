// src/components/gallery/GalleryImage.jsx

import { useState } from "react";
import { FiImage } from "react-icons/fi";

export const GalleryImage = ({
  src,
  alt,
  position = "center",
  fit = "cover",
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className="
          flex
          h-full
          w-full
          items-center
          justify-center
          bg-brand-card
          p-4
        "
      >
        <div className="text-center">
          <FiImage
            aria-hidden="true"
            className="mx-auto text-brand-muted"
            size={24}
          />

          <p
            className="
              mt-2
              text-xs
              font-semibold
              text-brand-muted
            "
          >
            Gambar gagal dimuat
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        relative
        h-full
        w-full
        overflow-hidden
        bg-brand-card
      "
    >
      {isLoading && (
        <div
          role="status"
          aria-label="Memuat gambar"
          className="
            absolute
            inset-0
            z-10
            flex
            items-center
            justify-center
            bg-brand-card
          "
        >
          <div
            aria-hidden="true"
            className="
              flex
              items-center
              gap-1.5
            "
          >
            {[0, 1, 2].map((item) => (
              <span
                key={item}
                className="
                  h-2
                  w-2
                  animate-pulse
                  rounded-sm
                  bg-brand-primary
                "
                style={{
                  animationDelay: `${item * 150}ms`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      <img
        src={src}
        alt={alt}
        decoding="async"
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        className={`
          h-full
          w-full
          object-cover
          transition-opacity
          duration-300

          ${fit === "contain" ? "object-contain" : "object-cover"}

          ${isLoading ? "opacity-0" : "opacity-100"}
        `}
        style={{
          objectPosition: position,
        }}
      />
    </div>
  );
};
