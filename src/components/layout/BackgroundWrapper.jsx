export const BackgroundWrapper = ({ children }) => {
  return (
    <div
      className="
        relative
        flex
        min-h-dvh
        w-full
        items-center
        justify-center
        overflow-x-hidden

        bg-brand-bg

        px-4
        py-6

        sm:px-6
        sm:py-8

        lg:px-8
        lg:py-10
      "
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >
        {/* Base */}
        <div className="absolute inset-0 bg-brand-bg" />

        {/* Botanical glow - top left */}
        <div
          className="
            absolute
            -left-40
            -top-40

            h-128
            w-lg

            rounded-full

            bg-brand-primary/18

            blur-[120px]
          "
        />

        {/* Warm glow - bottom right */}
        <div
          className="
            absolute
            -bottom-48
            -right-40

            h-136
            w-136

            rounded-full

            bg-brand-accent/22

            blur-[130px]
          "
        />

        {/* Dark botanical depth */}
        <div
          className="
            absolute
            left-[58%]
            top-[12%]

            h-72
            w-72

            -translate-x-1/2

            rounded-full

            bg-brand-dark/8

            blur-[110px]
          "
        />

        {/* Soft center light */}
        <div
          className="
            absolute
            left-1/2
            top-1/2

            h-144
            w-xl

            -translate-x-1/2
            -translate-y-1/2

            rounded-full

            bg-brand-card/35

            blur-[140px]
          "
        />

        {/* Dot pattern */}
        <div
          className="
            absolute
            inset-0

            opacity-[0.08]
          "
          style={{
            backgroundImage:
              "radial-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            color: "var(--color-brand-text)",
          }}
        />

        {/* Subtle frame accents */}
        <div
          className="
            absolute
            left-8
            top-8

            h-24
            w-24

            rounded-4xl

            border
            border-brand-text/5

            rotate-12
          "
        />

        <div
          className="
            absolute
            bottom-10
            right-10

            h-32
            w-32

            rounded-full

            border
            border-brand-text/5
          "
        />
      </div>

      {/* Main Content */}
      <div
        className="
          relative
          z-10

          w-full
          max-w-4xl
        "
      >
        {children}
      </div>
    </div>
  );
};
