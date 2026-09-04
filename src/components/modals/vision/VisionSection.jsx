import { visionMissionConfig } from "../../../config/visionMission";

export const VisionSection = () => {
  return (
    <section aria-labelledby="vision-heading">
      <div
        className="
          flex
          items-center
          gap-2
        "
      >
        <span
          aria-hidden="true"
          className="
            h-2
            w-2
            rounded-sm

            border
            border-brand-text/80

            bg-brand-primary
          "
        />

        <h3
          id="vision-heading"
          className="
            text-sm
            font-bold
            text-brand-text
          "
        >
          Visi
        </h3>
      </div>

      <div
        className="
          mt-3

          rounded-xl

          border-2
          border-brand-text/80

          bg-brand-secondary/15

          p-4

          shadow-[3px_3px_0_0_var(--color-brand-text)]

          sm:p-5
        "
      >
        <p
          className="
            text-[13px]
            font-medium
            leading-6
            text-brand-text/80

            sm:text-sm
          "
        >
          {visionMissionConfig.vision}
        </p>
      </div>
    </section>
  );
};
