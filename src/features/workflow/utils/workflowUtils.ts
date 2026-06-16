import {
  Step,
  CheckStep,
  ConditionStep,
  CommandStep,
  FileStep,
  Workflow,
  WorkflowPath,
} from "../types/workflow";

type NestedWorkflowStep =
  | CheckStep
  | ConditionStep
  | CommandStep
  | FileStep;

function hasNestedWorkflows(step: Step): step is NestedWorkflowStep {
  return (
    step.type === "check" ||
    step.type === "condition" ||
    step.type === "command" ||
    step.type === "file"
  );
}

export function findStepRecursive(
  workflow: Workflow,
  stepId: string
): Step | null {
  for (const step of workflow.steps) {
    if (step.id === stepId) {
      return step;
    }

    switch (step.type) {
      case "check": {
        const result = findStepRecursive(step.onSuccess, stepId);
        if (result) return result;
        const failureResult = findStepRecursive(step.onFailure, stepId);
        if (failureResult) return failureResult;
        break;
      }
      case "condition": {
        const result = findStepRecursive(step.onTrue, stepId);
        if (result) return result;
        const falseResult = findStepRecursive(step.onFalse, stepId);
        if (falseResult) return falseResult;
        break;
      }
      case "command": {
        const result = findStepRecursive(step.onSuccess, stepId);
        if (result) return result;
        const failureResult = findStepRecursive(step.onFailure, stepId);
        if (failureResult) return failureResult;
        break;
      }
      case "file": {
        const result = findStepRecursive(step.onSuccess, stepId);
        if (result) return result;
        const failureResult = findStepRecursive(step.onFailure, stepId);
        if (failureResult) return failureResult;
        break;
      }
    }
  }

  return null;
}

export function updateStepRecursive(
  workflow: Workflow,
  updatedStep: Step
): Workflow {
  return {
    ...workflow,
    steps: workflow.steps.map((step) => {
      if (step.id === updatedStep.id) {
        return updatedStep;
      }

      if (!hasNestedWorkflows(step)) {
        return step;
      }

      switch (step.type) {
        case "check":
          return {
            ...step,
            onSuccess: updateStepRecursive(step.onSuccess, updatedStep),
            onFailure: updateStepRecursive(step.onFailure, updatedStep),
          };
        case "condition":
          return {
            ...step,
            onTrue: updateStepRecursive(step.onTrue, updatedStep),
            onFalse: updateStepRecursive(step.onFalse, updatedStep),
          };
        case "command":
          return {
            ...step,
            onSuccess: updateStepRecursive(step.onSuccess, updatedStep),
            onFailure: updateStepRecursive(step.onFailure, updatedStep),
          };
        case "file":
          return {
            ...step,
            onSuccess: updateStepRecursive(step.onSuccess, updatedStep),
            onFailure: updateStepRecursive(step.onFailure, updatedStep),
          };
      }
    }),
  };
}

export function deleteStepRecursive(
  workflow: Workflow,
  stepId: string
): Workflow {
  return {
    ...workflow,
    steps: workflow.steps
      .filter((step) => step.id !== stepId)
      .map((step) => {
        if (!hasNestedWorkflows(step)) {
          return step;
        }

        switch (step.type) {
          case "check":
            return {
              ...step,
              onSuccess: deleteStepRecursive(step.onSuccess, stepId),
              onFailure: deleteStepRecursive(step.onFailure, stepId),
            };
          case "condition":
            return {
              ...step,
              onTrue: deleteStepRecursive(step.onTrue, stepId),
              onFalse: deleteStepRecursive(step.onFalse, stepId),
            };
          case "command":
            return {
              ...step,
              onSuccess: deleteStepRecursive(step.onSuccess, stepId),
              onFailure: deleteStepRecursive(step.onFailure, stepId),
            };
          case "file":
            return {
              ...step,
              onSuccess: deleteStepRecursive(step.onSuccess, stepId),
              onFailure: deleteStepRecursive(step.onFailure, stepId),
            };
        }
      }),
  };
}

export function addStepToWorkflow(
  workflow: Workflow,
  path: WorkflowPath,
  newStep: Step
): Workflow {
  if (path.length === 0) {
    const flowIndex = workflow.steps.findIndex(
      (step) => step.type === "flow"
    );

    if (flowIndex === -1) {
      return {
        ...workflow,
        steps: [...workflow.steps, newStep],
      };
    }

    return {
      ...workflow,
      steps: [
        ...workflow.steps.slice(0, flowIndex),
        newStep,
        ...workflow.steps.slice(flowIndex),
      ],
    };
  }

  return {
    ...workflow,
    steps: workflow.steps.map((step) => {
      if (step.id !== path[0]) {
        return step;
      }

      if (!hasNestedWorkflows(step)) {
        return step;
      }

      const branch = path[1];
      const remainingPath = path.slice(2);

      switch (step.type) {
        case "check":
          if (branch === "onSuccess") {
            return { ...step, onSuccess: addStepToWorkflow(step.onSuccess, remainingPath, newStep) };
          }
          if (branch === "onFailure") {
            return { ...step, onFailure: addStepToWorkflow(step.onFailure, remainingPath, newStep) };
          }
          return step;

        case "condition":
          if (branch === "onTrue") {
            return { ...step, onTrue: addStepToWorkflow(step.onTrue, remainingPath, newStep) };
          }
          if (branch === "onFalse") {
            return { ...step, onFalse: addStepToWorkflow(step.onFalse, remainingPath, newStep) };
          }
          return step;

        case "command":
          if (branch === "onSuccess") {
            return { ...step, onSuccess: addStepToWorkflow(step.onSuccess, remainingPath, newStep) };
          }
          if (branch === "onFailure") {
            return { ...step, onFailure: addStepToWorkflow(step.onFailure, remainingPath, newStep) };
          }
          return step;

        case "file":
          if (branch === "onSuccess") {
            return { ...step, onSuccess: addStepToWorkflow(step.onSuccess, remainingPath, newStep) };
          }
          if (branch === "onFailure") {
            return { ...step, onFailure: addStepToWorkflow(step.onFailure, remainingPath, newStep) };
          }
          return step;
      }
    }),
  };
}

export function touchWorkflow(workflow: Workflow): Workflow {
  return {
    ...workflow,
    updatedAt: new Date().toISOString(),
  };
}
