// src/components/aspiration/AspirationSearch.jsx

import { FiSearch } from "react-icons/fi";

export const AspirationSearch = ({ value, onChange }) => {
  return (
    <div
      className="
        shrink-0

        border-b
        border-brand-dark/10

        px-4
        py-4

        sm:px-5
      "
    >
      <label htmlFor="aspiration-search" className="sr-only">
        Cari formulir aspirasi
      </label>

      <div className="relative">
        <FiSearch
          size={18}
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            left-4
            top-1/2

            -translate-y-1/2

            text-brand-muted
          "
        />

        <input
          id="aspiration-search"
          type="search"
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
          placeholder="Cari form aspirasi..."
          autoComplete="off"
          className="
            min-h-11
            w-full

            rounded-xl

            border
            border-brand-dark/10

            bg-brand-bg/55

            py-3
            pl-11
            pr-4

            text-sm
            font-medium

            text-brand-text

            outline-none

            placeholder:text-brand-muted/70

            transition-colors
            duration-200

            hover:border-brand-primary/25

            focus:border-brand-primary/40
            focus:ring-2
            focus:ring-brand-primary/15
          "
        />
      </div>
    </div>
  );
};
