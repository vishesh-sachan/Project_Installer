import { Step } from "../../models/workflow";
import CheckProperties from "./CheckProperties";
import ChoiceProperties from "./ChoiceProperties";
import CommandProperties from "./CommandProperties";
import ConditionProperties from "./ConditionProperties";
import FileProperties from "./FileProperties";
import FlowProperties from "./FlowProperties";
import InputProperties from "./InputProperties";
import {
  StepReference,
} from "../../models/workflowUtils";
import InformationProperties from "./InformationProperties";

type Props = {
  selectedStep: Step | null;
  updateStep: (
    step: Step
  ) => void;
  variables: string[];
  stepReferences: StepReference[];
  deleteStep: (
    stepId: string
  ) => void;
};

export default function PropertiesPanel({
  selectedStep,
  updateStep,
  variables,
  stepReferences,
  deleteStep,
}: Props) {
  if (!selectedStep) {
    return (
      <div className="p-4">
        No step selected
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-4">

      {selectedStep.type === "input" && (
        <InputProperties step={selectedStep} updateStep={updateStep} />
      )}

      {selectedStep.type === "information" && (
        <InformationProperties step={selectedStep} updateStep={updateStep} />
      )}

      {selectedStep.type === "choice" && (
        <ChoiceProperties step={selectedStep} updateStep={updateStep} />
      )}

      {selectedStep.type === "command" && (
        <CommandProperties step={selectedStep} updateStep={updateStep} />
      )}

      {selectedStep.type === "condition" && (
        <ConditionProperties step={selectedStep} updateStep={updateStep} variables={variables} />
      )}

      {selectedStep.type === "check" && (
        <CheckProperties step={selectedStep} updateStep={updateStep} />
      )}

      {selectedStep.type === "file" && (
        <FileProperties step={selectedStep} updateStep={updateStep} />
      )}

      {selectedStep.type === "flow" && (
        <FlowProperties step={selectedStep} updateStep={updateStep} stepReferences={stepReferences} />
      )}

      <div className="p-4 border-t border-[var(--border)]">
        {selectedStep.type !== "flow" && (
          <button
            className="workflow-button"
            onClick={() =>
              deleteStep(selectedStep.id)
            }
          >
            Delete Step
          </button>
        )}
      </div>
    </div>
  );
}