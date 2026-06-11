import { invoke } from "@tauri-apps/api/core";
import { Workflow } from "../models/workflow";
import { WorkflowSummary } from "../models/workflowSummary";

export async function saveWorkflow(
  projectPath: string,
  workflow: Workflow
) {
  await invoke(
    "save_workflow_command",
    {
      projectPath,
      workflow,
    }
  );
}

export async function loadWorkflow(
  projectPath: string,
  workflowId: string
): Promise<Workflow> {
  return invoke(
    "load_workflow_command",
    {
      projectPath,
      workflowId,
    }
  );
}

export async function workflowExists(
  projectPath: string
): Promise<boolean> {
  return invoke(
    "workflow_exists_command",
    {
      projectPath,
    }
  );
}

export async function listWorkflows(
  projectPath: string
): Promise<
  WorkflowSummary[]
> {
  return invoke(
    "list_workflows_command",
    {
      projectPath,
    }
  );
}