import {
    Step,
    FlowStep,
    Workflow,
} from "../types/workflow";

export function createContinueFlowStep(): FlowStep {
    return {
        id: crypto.randomUUID(),
        type: "flow",
        name: "Continue",
        flowType: { type: "continue" },
    };
}

export function createWorkflow(): Workflow {
  return {
    id: crypto.randomUUID(),
    name: "New Workflow",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    steps: [],
  };
}

function createEmptySubWorkflow(): Workflow {
    return {
        id: crypto.randomUUID(),
        name: "sub-workflow",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        steps: [createContinueFlowStep()],
    };
}

export function createStep(type: Step["type"]): Step {
    const id = crypto.randomUUID();

    switch (type) {
        case "input":
            return {
                id,
                type: "input",
                name: "Input",
                variableName: "",
                prompt: "",
                required: true,
                secret: false,
            };

        case "information":
            return {
                id,
                type: "information",
                name: "Information",
                title: "",
                content: "",
            };

        case "check":
            return {
                id,
                type: "check",
                name: "Check",
                checkType: {
                    type: "command",
                    command: "",
                    expectedExitCode: 0,
                },
                onSuccess: createEmptySubWorkflow(),
                onFailure: createEmptySubWorkflow(),
            };

        case "condition":
            return {
                id,
                type: "condition",
                name: "Condition",
                variableName: "",
                operator: "equals",
                value: "",
                onTrue: createEmptySubWorkflow(),
                onFalse: createEmptySubWorkflow(),
            };

        case "command":
            return {
                id,
                type: "command",
                name: "Command",
                command: "",
                onSuccess: createEmptySubWorkflow(),
                onFailure: createEmptySubWorkflow(),
            };

        case "choice":
            return {
                id,
                type: "choice",
                name: "Choice",
                variableName: "",
                prompt: "",
                options: [],
                allowCustomValue: false,
            };

        case "file":
            return {
                id,
                type: "file",
                name: "File",
                filePath: "",
                operation: {
                    type: "createOrOverwrite",
                    content: "",
                },
                onSuccess: createEmptySubWorkflow(),
                onFailure: createEmptySubWorkflow(),
            };

        case "flow":
            return {
                id,
                type: "flow",
                name: "Continue",
                flowType: { type: "continue" },
            };

        case "osBranch":
            return {
                id,
                type: "osBranch",
                name: "OS Branch",
                macos: createEmptySubWorkflow(),
                linux: createEmptySubWorkflow(),
                windows: createEmptySubWorkflow(),
            };

        default:
            throw new Error(`Unsupported step type: ${type}`);
    }
}
