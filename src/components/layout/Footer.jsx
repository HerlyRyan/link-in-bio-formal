export const FooterComponent = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="
        w-full
        px-4
        py-4
        text-center
      "
    >
      <div
        className="
          mx-auto
          h-px
          w-16
          bg-brand-text/15
        "
        aria-hidden="true"
      />

      <p
        className="
          mt-3
          text-[11px]
          font-semibold
          leading-5
          text-brand-text/80

          sm:text-xs
        "
      >
        &copy; {currentYear}{" "}
        <span
          className="
            font-bold
            text-brand-text
          "
        >
          DPM FK UNTAR
        </span>
        . All rights reserved.
      </p>

      <p
        className="
          mt-0.5
          text-[10px]
          font-semibold
          tracking-[0.04em]
          text-brand-text/65

          sm:text-[11px]
        "
      >
        Universitas Tarumanagara
      </p>
    </footer>
  );
};
