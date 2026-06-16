import { InformationStep } from "../../workflow/types/workflow";

type Props = {
    step: InformationStep;
    updateStep: (step: InformationStep) => void;
};

export default function InformationProperties({
    step,
    updateStep,
}: Props) {
    return (
        <div className="flex flex-col gap-4">
            <h3 className="property-section-title">
                Required
            </h3>
            <div>
                <label className="property-label">NAME</label>

                <input
                    className="workflow-input mt-1"
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
                <label className="property-label">TITLE</label>

                <input
                    className="workflow-input mt-1"
                    value={step.title}
                    onChange={(e) =>
                        updateStep({
                            ...step,
                            title: e.target.value,
                        })
                    }
                />
            </div>

            <div>
                <label className="property-label">CONTENT</label>

                <textarea
                    className="workflow-textarea mt-1"
                    value={step.content}
                    onChange={(e) =>
                        updateStep({
                            ...step,
                            content: e.target.value,
                        })
                    }
                />
            </div>
        </div>
    );
}
