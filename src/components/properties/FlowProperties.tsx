import {
    FlowStep,
} from "../../models/workflow";
import { StepReference } from "../../models/workflowUtils";

type Props = {
    step: FlowStep;
    updateStep: (
        step: FlowStep
    ) => void;
    stepReferences: StepReference[];
};

export default function FlowProperties({
    step,
    updateStep,
    stepReferences,
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
                    FLOW TYPE
                </label>

                <select
                    className="workflow-select"
                    value={step.flowType.type}
                    onChange={(e) => {
                        if (
                            e.target.value ===
                            "continue"
                        ) {
                            updateStep({
                                ...step,
                                flowType: {
                                    type: "continue",
                                },
                            });
                        }

                        if (
                            e.target.value ===
                            "jump"
                        ) {
                            updateStep({
                                ...step,
                                flowType: {
                                    type: "jump",
                                    targetStepId: "",
                                },
                            });
                        }
                    }}
                >
                    <option value="continue">
                        Continue
                    </option>

                    <option value="jump">
                        Jump
                    </option>
                </select>
            </div>

            {step.flowType.type ===
                "jump" && (
                    <div>
                        <label className="property-label">
                            TARGET STEP
                        </label>

                        <select
                            className="workflow-select"
                            value={
                                step.flowType
                                    .targetStepId
                            }
                            onChange={(e) =>
                                updateStep({
                                    ...step,
                                    flowType: {
                                        type: "jump",
                                        targetStepId:
                                            e.target.value,
                                    },
                                })
                            }
                        >
                            <option value="">
                                Select Step
                            </option>

                            {stepReferences.map(
                                (reference) => (
                                    <option
                                        key={reference.id}
                                        value={reference.id}
                                    >
                                        {reference.name}
                                        {" "}
                                        ({reference.type})
                                    </option>
                                )
                            )}
                        </select>
                    </div>
                )}
        </div>
    );
}