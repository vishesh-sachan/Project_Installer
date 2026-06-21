import { useState } from "react";
import WorkflowBranch from "./WorkflowBranch";
import {
  workflowContainsStep,
} from "../utils/workflowTreeUtils";
import {
  Step,
  WorkflowPath,
} from "../types/workflow";
import { useWorkflowStore } from "../store/useWorkflowStore";

type Props = {
  step: Step;
  path: WorkflowPath;
};

export default function WorkflowNode({
  step,
  path,
}: Props) {
  const [osTab, setOsTab] = useState<"macos" | "linux" | "windows">("macos");
  const selectedStepId = useWorkflowStore((s) => s.selectedStepId);
  const selectStep = useWorkflowStore((s) => s.selectStep);

  const selected = selectedStepId === step.id;

  let isExpanded = selected;

  if (step.type === "check") {
    isExpanded =
      isExpanded ||
      workflowContainsStep(
        step.onSuccess,
        selectedStepId
      ) ||
      workflowContainsStep(
        step.onFailure,
        selectedStepId
      );
  }

  if (step.type === "condition") {
    isExpanded =
      isExpanded ||
      workflowContainsStep(
        step.onTrue,
        selectedStepId
      ) ||
      workflowContainsStep(
        step.onFalse,
        selectedStepId
      );
  }

  if (step.type === "command") {
    isExpanded =
      isExpanded ||
      workflowContainsStep(
        step.onSuccess,
        selectedStepId
      ) ||
      workflowContainsStep(
        step.onFailure,
        selectedStepId
      );
  }

  if (step.type === "file") {
    isExpanded =
      isExpanded ||
      workflowContainsStep(
        step.onSuccess,
        selectedStepId
      ) ||
      workflowContainsStep(
        step.onFailure,
        selectedStepId
      );
  }

  if (step.type === "osBranch") {
    isExpanded =
      isExpanded ||
      workflowContainsStep(
        step.macos,
        selectedStepId
      ) ||
      workflowContainsStep(
        step.linux,
        selectedStepId
      ) ||
      workflowContainsStep(
        step.windows,
        selectedStepId
      );
  }

  return (
    <div className="flex flex-col gap-4">
      <div
        onClick={() =>
          selectStep(step.id)
        }
        className={`workflow-node cursor-pointer ${selected ? "selected" : ""
          }`}
      >
        <div className="font-medium">
          {step.name}
        </div>

        <div className="text-xs text-[var(--muted)]">
          {step.type}
        </div>
      </div>

      {step.type === "check" &&
        isExpanded && (
          <div className="ml-6 border-l border-[var(--border)] pl-4 flex flex-col gap-4">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="h-px w-4 bg-[var(--tree-path)]" />

                <span className="text-xs uppercase text-[var(--muted)] tracking-wide">
                  Success
                </span>
              </div>

              <WorkflowBranch
                workflow={step.onSuccess}
                path={[
                  ...path,
                  step.id,
                  "onSuccess",
                ]}
              />
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="h-px w-4 bg-[var(--tree-path)]" />

                <span className="text-xs uppercase text-[var(--muted)] tracking-wide">
                  Failure
                </span>
              </div>

              <WorkflowBranch
                workflow={step.onFailure}
                path={[
                  ...path,
                  step.id,
                  "onFailure",
                ]}
              />
            </div>
          </div>
        )}

      {step.type === "condition" &&
        isExpanded && (
          <div className="ml-6 border-l border-[var(--border)] pl-4 flex flex-col gap-4">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="h-px w-4 bg-[var(--tree-path)]" />

                <span className="text-xs uppercase text-[var(--muted)] tracking-wide">
                  True
                </span>
              </div>

              <WorkflowBranch
                workflow={step.onTrue}
                path={[
                  ...path,
                  step.id,
                  "onTrue",
                ]}
              />
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="h-px w-4 bg-[var(--tree-path)]" />

                <span className="text-xs uppercase text-[var(--muted)] tracking-wide">
                  False
                </span>
              </div>

              <WorkflowBranch
                workflow={step.onFalse}
                path={[
                  ...path,
                  step.id,
                  "onFalse",
                ]}
              />
            </div>
          </div>
        )}

      {step.type === "command" &&
        isExpanded && (
          <div className="ml-6 border-l border-[var(--border)] pl-4 flex flex-col gap-4">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="h-px w-4 bg-[var(--tree-path)]" />

                <span className="text-xs uppercase text-[var(--muted)] tracking-wide">
                  Success
                </span>
              </div>

              <WorkflowBranch
                workflow={step.onSuccess}
                path={[
                  ...path,
                  step.id,
                  "onSuccess",
                ]}
              />
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="h-px w-4 bg-[var(--tree-path)]" />

                <span className="text-xs uppercase text-[var(--muted)] tracking-wide">
                  Failure
                </span>
              </div>

              <WorkflowBranch
                workflow={step.onFailure}
                path={[
                  ...path,
                  step.id,
                  "onFailure",
                ]}
              />
            </div>
          </div>
        )}

      {step.type === "file" &&
        isExpanded && (
          <div className="ml-6 border-l border-[var(--border)] pl-4 flex flex-col gap-4">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="h-px w-4 bg-[var(--tree-path)]" />

                <span className="text-xs uppercase text-[var(--muted)] tracking-wide">
                  Success
                </span>
              </div>

              <WorkflowBranch
                workflow={step.onSuccess}
                path={[
                  ...path,
                  step.id,
                  "onSuccess",
                ]}
              />
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="h-px w-4 bg-[var(--tree-path)]" />

                <span className="text-xs uppercase text-[var(--muted)] tracking-wide">
                  Failure
                </span>
              </div>

              <WorkflowBranch
                workflow={step.onFailure}
                path={[
                  ...path,
                  step.id,
                  "onFailure",
                ]}
              />
            </div>
          </div>
        )}

      {step.type === "osBranch" &&
        isExpanded && (
          <div className="ml-6 border-l border-[var(--border)] pl-4 flex flex-col gap-4">
            <div className="flex gap-1 mb-2">
              {(["macos", "linux", "windows"] as const).map((os) => (
                <button
                  key={os}
                  onClick={(e) => { e.stopPropagation(); setOsTab(os); }}
                  className={`px-3 py-1 text-xs uppercase tracking-wide rounded ${
                    osTab === os
                      ? "bg-[var(--accent)] text-black font-medium"
                      : "text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {os}
                </button>
              ))}
            </div>

            <WorkflowBranch
              workflow={step[osTab]}
              path={[...path, step.id, osTab]}
            />
          </div>
        )}
    </div>
  );
}
