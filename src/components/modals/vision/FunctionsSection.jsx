import { FunctionItem } from "./FunctionItem";
import { visionMissionConfig } from "../../../config/visionMission";

export const FunctionsSection = () => {
  return (
    <section aria-labelledby="functions-heading">
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
          id="functions-heading"
          className="
            text-sm
            font-bold
            text-brand-text
          "
        >
          Fungsi DPM
        </h3>
      </div>

      <div
        className="
          mt-3
          space-y-3
        "
      >
        {visionMissionConfig.functions.map((item, index) => (
          <FunctionItem
            key={item.id}
            number={index + 1}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
};
