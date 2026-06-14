import { useMemo, useState } from "react";
import { Step, Workflow, WorkflowPath } from "../models/workflow";
import { findStepRecursive, updateStepRecursive, deleteStepRecursive, addStepToWorkflow, touchWorkflow } from "./workflowUtils"

export function useWorkflow() {
  const [workflow, setWorkflow] = useState<Workflow>({
    id: crypto.randomUUID(),
    name: "New Workflow",
    createdAt:
      new Date().toISOString(),
    updatedAt:
      new Date().toISOString(),

    steps: [],
  });

  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);

  const selectedStep = useMemo(
    () =>
      selectedStepId === null
        ? null
        : findStepRecursive(
          workflow,
          selectedStepId
        ),
    [workflow, selectedStepId]
  );

  function selectStep(
    stepId: string | null
  ) {
    setSelectedStepId(stepId);
  }

  function setWorkflowState(
    workflow: Workflow
  ) {
    setWorkflow(workflow);
    setSelectedStepId(null);
  }

  function addStep(
    path: WorkflowPath,
    step: Step
  ) {
    setWorkflow((currentWorkflow) =>
      touchWorkflow(
        addStepToWorkflow(
          currentWorkflow,
          path,
          step
        )
      )
    );

    setSelectedStepId(step.id);
  }

  function updateStep(
    updatedStep: Step
  ) {
    setWorkflow((currentWorkflow) =>
      touchWorkflow(
        updateStepRecursive(
          currentWorkflow,
          updatedStep
        )
      )
    );
  }

  function deleteStep(
    stepId: string
  ) {
    const updatedWorkflow =
      deleteStepRecursive(
        workflow,
        stepId
      );

    setWorkflow(
      touchWorkflow(
        updatedWorkflow
      )
    );

    if (
      selectedStepId &&
      !findStepRecursive(
        updatedWorkflow,
        selectedStepId
      )
    ) {
      setSelectedStepId(null);
    }
  }

  return {
    workflow,
    setWorkflowState,

    selectedStepId,
    selectedStep,
    selectStep,

    addStep,
    updateStep,
    deleteStep,
  };
}