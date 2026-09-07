export const VisionMissionSlide = ({ slide }) => {
  if (!slide) return null;

  if (slide.type === "text") {
    return (
      <article>
        <p
          className="
            text-[11px]
            font-bold
            uppercase
            tracking-[0.18em]
            text-brand-accent

            sm:text-xs
          "
        >
          {slide.eyebrow}
        </p>

        <h3
          className="
            mt-2
            text-xl
            font-bold
            tracking-tight
            text-brand-text

            sm:text-2xl
          "
        >
          {slide.title}
        </h3>

        <p
          className="
            mt-5
            text-sm
            font-medium
            leading-7
            text-brand-text/80

            sm:text-base
          "
        >
          {slide.content}
        </p>
      </article>
    );
  }

  if (slide.type === "list") {
    return (
      <article>
        <p
          className="
            text-[11px]
            font-bold
            uppercase
            tracking-[0.18em]
            text-brand-accent

            sm:text-xs
          "
        >
          {slide.eyebrow}
        </p>

        <h3
          className="
            mt-2
            text-xl
            font-bold
            tracking-tight
            text-brand-text

            sm:text-2xl
          "
        >
          {slide.title}
        </h3>

        <ol
          className="
            mt-5
            space-y-4
          "
        >
          {slide.items.map((item, index) => (
            <li
              key={item}
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
                  h-7
                  w-7
                  shrink-0
                  items-center
                  justify-center

                  rounded-full

                  bg-brand-accent/85

                  text-xs
                  font-bold
                  text-white
                "
              >
                {index + 1}
              </span>

              <p
                className="
                  pt-0.5
                  text-sm
                  font-medium
                  leading-6
                  text-brand-text/80

                  sm:text-base
                  sm:leading-7
                "
              >
                {item}
              </p>
            </li>
          ))}
        </ol>
      </article>
    );
  }

  if (slide.type === "functions") {
    return (
      <article>
        <p
          className="
            text-[11px]
            font-bold
            uppercase
            tracking-[0.18em]
            text-brand-accent

            sm:text-xs
          "
        >
          {slide.eyebrow}
        </p>

        <h3
          className="
            mt-2
            text-xl
            font-bold
            tracking-tight
            text-brand-text

            sm:text-2xl
          "
        >
          {slide.title}
        </h3>

        <div
          className="
            mt-5
            space-y-4
          "
        >
          {slide.items.map((item) => (
            <div
              key={item.title}
              className="
                border-b
                border-brand-text/10
                pb-4

                last:border-b-0
                last:pb-0
              "
            >
              <h4
                className="
                  text-sm
                  font-bold
                  text-brand-text

                  sm:text-base
                "
              >
                {item.title}
              </h4>

              <p
                className="
                  mt-1
                  text-sm
                  font-medium
                  leading-6
                  text-brand-text/75
                "
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </article>
    );
  }

  return null;
};
