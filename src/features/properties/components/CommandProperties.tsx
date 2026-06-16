import { CommandStep } from "../../workflow/types/workflow";

type Props = {
  step: CommandStep;
  updateStep: (step: CommandStep) => void;
};

export default function CommandProperties({
  step,
  updateStep,
}: Props) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="property-section-title">
        Required
      </h3>

      <div>
        <label className="property-label">
          NAME
        </label>

        <input
          className="workflow-input"
          value={step.name}
          onChange={(e) =>
            updateStep({
              ...step,
              name: e.target.value,
            })
          }
        />
      </div>

      <div>
        <label className="property-label">
          COMMAND
        </label>

        <textarea
          className="workflow-textarea"
          value={step.command}
          onChange={(e) =>
            updateStep({
              ...step,
              command:
                e.target.value,
            })
          }
        />
      </div>

      <h3 className="property-section-title mt-6">
        Optional
      </h3>

      <div>
        <label className="property-label">
          WORKING DIRECTORY
        </label>

        <input
          className="workflow-input"
          value={
            step.workingDirectory ??
            ""
          }
          onChange={(e) =>
            updateStep({
              ...step,
              workingDirectory:
                e.target.value,
            })
          }
        />
      </div>

      <h3 className="property-section-title mt-6">
        Context Output
      </h3>

      <div>
        <label className="property-label">
          CAPTURE STDOUT TO
        </label>

        <input
          className="workflow-input"
          value={
            step.captureStdoutTo ??
            ""
          }
          onChange={(e) =>
            updateStep({
              ...step,
              captureStdoutTo:
                e.target.value,
            })
          }
        />
      </div>

      <div>
        <label className="property-label">
          CAPTURE STDERR TO
        </label>

        <input
          className="workflow-input"
          value={
            step.captureStderrTo ??
            ""
          }
          onChange={(e) =>
            updateStep({
              ...step,
              captureStderrTo:
                e.target.value,
            })
          }
        />
      </div>

      <div>
        <label className="property-label">
          CAPTURE EXIT CODE TO
        </label>

        <input
          className="workflow-input"
          value={
            step.captureExitCodeTo ??
            ""
          }
          onChange={(e) =>
            updateStep({
              ...step,
              captureExitCodeTo:
                e.target.value,
            })
          }
        />
      </div>
    </div>
  );
}
