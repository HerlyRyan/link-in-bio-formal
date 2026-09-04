import { FiCheck } from "react-icons/fi";

import { visionMissionConfig } from "../../../config/visionMission";

export const MissionSection = () => {
  return (
    <section aria-labelledby="mission-heading">
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
          id="mission-heading"
          className="
            text-sm
            font-bold
            text-brand-text
          "
        >
          Misi
        </h3>
      </div>

      <ul
        className="
          mt-3
          space-y-3
        "
      >
        {visionMissionConfig.missions.map((mission, index) => (
          <li
            key={mission}
            className="
              flex
              items-start
              gap-3

              rounded-xl

              border-2
              border-brand-text/80

              bg-white

              p-3.5

              shadow-[2px_2px_0_0_var(--color-brand-text)]

              sm:p-4
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

                bg-brand-secondary/25

                text-brand-primary
              "
            >
              <FiCheck size={15} />
            </span>

            <div className="min-w-0">
              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-brand-primary
                "
              >
                Misi {index + 1}
              </span>

              <p
                className="
                  mt-1

                  text-[13px]
                  font-medium
                  leading-5
                  text-brand-text/80

                  sm:text-sm
                "
              >
                {mission}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
