// src/components/vision/VisionMissionSlide.jsx

export const VisionMissionSlide = ({ slide }) => {
  if (!slide) {
    return null;
  }

  if (slide.type === "text") {
    return <TextSlide slide={slide} />;
  }

  if (slide.type === "list") {
    return <ListSlide slide={slide} />;
  }

  if (slide.type === "functions") {
    return <FunctionsSlide slide={slide} />;
  }

  return null;
};

/**
 * Shared heading used by all slides.
 */
const SlideHeader = ({ eyebrow, title }) => {
  return (
    <header>
      <p
        className="
          text-[10px]
          font-bold
          uppercase
          tracking-[0.18em]

          text-brand-primary

          sm:text-[11px]
        "
      >
        {eyebrow}
      </p>

      <h3
        className="
          mt-2

          text-xl
          font-bold
          tracking-[-0.025em]

          text-brand-text

          sm:text-2xl
        "
      >
        {title}
      </h3>
    </header>
  );
};

/**
 * Vision slide.
 */
const TextSlide = ({ slide }) => {
  return (
    <article>
      <SlideHeader eyebrow={slide.eyebrow} title={slide.title} />

      <div
        aria-hidden="true"
        className="
          mt-5

          h-px
          w-12

          bg-brand-primary/25
        "
      />

      <p
        className="
          mt-5

          max-w-2xl

          text-sm
          font-medium
          leading-7

          text-brand-text/80

          sm:text-base
          sm:leading-8
        "
      >
        {slide.content}
      </p>
    </article>
  );
};

/**
 * Mission slide.
 */
const ListSlide = ({ slide }) => {
  return (
    <article>
      <SlideHeader eyebrow={slide.eyebrow} title={slide.title} />

      <ol
        className="
          mt-6

          flex
          flex-col
          gap-5
        "
      >
        {slide.items.map((item, index) => (
          <li
            key={item}
            className="
                grid
                grid-cols-[2.25rem_1fr]

                items-start
                gap-3
              "
          >
            <span
              aria-hidden="true"
              className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center

                  rounded-full

                  bg-brand-secondary/55

                  text-xs
                  font-bold
                  tabular-nums

                  text-brand-dark
                "
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <p
              className="
                  pt-1

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
};

/**
 * Functions slide.
 */
const FunctionsSlide = ({ slide }) => {
  return (
    <article>
      <SlideHeader eyebrow={slide.eyebrow} title={slide.title} />

      <div
        className="
          mt-6

          divide-y
          divide-brand-dark/10
        "
      >
        {slide.items.map((item, index) => (
          <section
            key={item.id || item.title}
            className="
                grid
                grid-cols-[2.25rem_1fr]

                gap-3

                py-4

                first:pt-0
                last:pb-0
              "
          >
            <span
              aria-hidden="true"
              className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center

                  rounded-xl

                  bg-brand-primary/10

                  text-xs
                  font-bold
                  tabular-nums

                  text-brand-primary
                "
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="min-w-0">
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
                    mt-1.5

                    text-sm
                    font-medium
                    leading-6

                    text-brand-muted

                    sm:leading-7
                  "
              >
                {item.description}
              </p>
            </div>
          </section>
        ))}
      </div>
    </article>
  );
};
