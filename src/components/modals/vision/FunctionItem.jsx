export const FunctionItem = ({ number, title, description }) => {
  return (
    <article
      className="
        rounded-xl

        border-2
        border-brand-text/80

        bg-white

        p-3.5

        shadow-[2px_2px_0_0_var(--color-brand-text)]

        sm:p-4
      "
    >
      <div
        className="
          flex
          items-start
          gap-3
        "
      >
        <span
          aria-hidden="true"
          className="
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center

            rounded-lg

            border-2
            border-brand-text/80

            bg-brand-primary

            text-xs
            font-bold
            text-white
          "
        >
          {number}
        </span>

        <div className="min-w-0">
          <h4
            className="
              text-[13px]
              font-bold
              text-brand-text

              sm:text-sm
            "
          >
            {title}
          </h4>

          <p
            className="
              mt-1

              text-xs
              font-medium
              leading-5
              text-brand-text/75

              sm:text-[13px]
            "
          >
            {description}
          </p>
        </div>
      </div>
    </article>
  );
};
