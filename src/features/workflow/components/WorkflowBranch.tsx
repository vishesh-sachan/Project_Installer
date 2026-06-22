import { useEffect, useRef, useState } from "react";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import WorkflowNode from "./WorkflowNode";
import {
    Workflow,
    WorkflowPath,
    Step,
} from "../types/workflow";
import { createStep } from "../factory/workflowFactory";
import StepPicker from "./StepPicker";
import { useWorkflowStore } from "../store/useWorkflowStore";

type Props = {
    workflow: Workflow;
    path: WorkflowPath;
};

function SortableStep({
    step,
    path,
}: {
    step: Step;
    path: WorkflowPath;
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: step.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style}>
            <WorkflowNode
                step={step}
                path={path}
                dragHandleProps={{
                    ...attributes,
                    ...listeners,
                }}
                isDragging={isDragging}
            />
        </div>
    );
}

export default function WorkflowBranch({
    workflow,
    path,
}: Props) {
    const [showPicker, setShowPicker] = useState(false);
    const branchRef = useRef<HTMLDivElement>(null);
    const addStep = useWorkflowStore((s) => s.addStep);
    const moveStep = useWorkflowStore((s) => s.moveStep);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 5 },
        })
    );

    useEffect(() => {
        if (!showPicker) {
            return;
        }

        function handleClickOutside(
            event: MouseEvent
        ) {
            if (
                branchRef.current &&
                !branchRef.current.contains(
                    event.target as Node
                )
            ) {
                setShowPicker(false);
            }
        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, [showPicker]);

    function handleAddStep(
        type: Step["type"]
    ) {
        addStep(path, createStep(type));
        setShowPicker(false);
    }

    const nonFlowSteps = workflow.steps.filter(
        (s) => s.type !== "flow"
    );
    const flowSteps = workflow.steps.filter(
        (s) => s.type === "flow"
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = nonFlowSteps.findIndex(
            (s) => s.id === active.id
        );
        const newIndex = nonFlowSteps.findIndex(
            (s) => s.id === over.id
        );
        if (oldIndex === -1 || newIndex === -1) return;

        moveStep(path, oldIndex, newIndex);
    }

    return (
        <div
            ref={branchRef}
            className="flex flex-col gap-4"
        >
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={nonFlowSteps.map(
                        (s) => s.id
                    )}
                    strategy={
                        verticalListSortingStrategy
                    }
                >
                    {nonFlowSteps.map((step) => (
                        <SortableStep
                            key={step.id}
                            step={step}
                            path={path}
                        />
                    ))}

                    {flowSteps.map((step) => (
                        <WorkflowNode
                            key={step.id}
                            step={step}
                            path={path}
                        />
                    ))}
                </SortableContext>
            </DndContext>

            {!showPicker && (
                <button
                    className="workflow-button w-fit"
                    onClick={() =>
                        setShowPicker(true)
                    }
                >
                    + Add Step
                </button>
            )}

            {showPicker && (
                <div className="inline-block">
                    <StepPicker
                        onSelect={handleAddStep}
                    />
                </div>
            )}
        </div>
    );
}
