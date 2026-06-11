import { invoke } from "@tauri-apps/api/core";

import { Workflow } from "../models/workflow";

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
  projectPath: string
): Promise<Workflow> {
  return invoke(
    "load_workflow_command",
    {
      projectPath,
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