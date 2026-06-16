import { invoke } from "@tauri-apps/api/core";
import { Workflow, WorkflowSummary } from "../features/workflow/types/workflow";

function projectInstallerPath(
  projectPath: string,
): string {
  return `${projectPath}/.project-installer`;
}

function workflowsIndexPath(
  projectPath: string,
): string {
  return `${projectInstallerPath(projectPath)}/workflows.json`;
}

function workflowPath(
  projectPath: string,
  workflowId: string,
): string {
  return `${projectInstallerPath(projectPath)}/workflows/${workflowId}.json`;
}

async function readFile(
  path: string,
): Promise<string> {
  return invoke(
    "read_file",
    { path },
  );
}

async function writeFile(
  path: string,
  contents: string,
): Promise<void> {
  await invoke(
    "write_file",
    {
      path,
      contents,
    },
  );
}

async function deleteFile(
  path: string,
): Promise<void> {
  await invoke(
    "delete_file",
    { path },
  );
}

function workflowToSummary(
  workflow: Workflow,
): WorkflowSummary {
  return {
    id: workflow.id,
    name: workflow.name,
    description:
      workflow.description,
    createdAt:
      workflow.createdAt,
    updatedAt:
      workflow.updatedAt,
  };
}

function updateSummaryInList(
  summaries: WorkflowSummary[],
  summary: WorkflowSummary,
): WorkflowSummary[] {
  const index =
    summaries.findIndex(
      (w) =>
        w.id === summary.id,
    );

  if (index >= 0) {
    summaries[index] =
      summary;
  } else {
    summaries.push(
      summary,
    );
  }

  return summaries;
}

function removeSummaryFromList(
  summaries: WorkflowSummary[],
  workflowId: string,
): WorkflowSummary[] {
  return summaries.filter(
    (w) =>
      w.id !== workflowId,
  );
}

async function loadWorkflowSummaries(
  projectPath: string,
): Promise<WorkflowSummary[]> {
  try {
    const contents =
      await readFile(
        workflowsIndexPath(
          projectPath,
        ),
      );

    return JSON.parse(
      contents,
    );
  } catch {
    return [];
  }
}

async function saveWorkflowSummaries(
  projectPath: string,
  summaries: WorkflowSummary[],
): Promise<void> {
  await writeFile(
    workflowsIndexPath(
      projectPath,
    ),
    JSON.stringify(
      summaries,
      null,
      2,
    ),
  );
}

export async function saveWorkflow(
  projectPath: string,
  workflow: Workflow,
): Promise<void> {
  try {
    await writeFile(
      workflowPath(
        projectPath,
        workflow.id,
      ),
      JSON.stringify(
        workflow,
        null,
        2,
      ),
    );

    let workflows =
      await loadWorkflowSummaries(
        projectPath,
      );

    workflows =
      updateSummaryInList(
        workflows,
        workflowToSummary(
          workflow,
        ),
      );

    await saveWorkflowSummaries(
      projectPath,
      workflows,
    );
  } catch (error) {
    throw new Error(
      `Failed to save workflow: ${error}`,
    );
  }
}

export async function loadWorkflow(
  projectPath: string,
  workflowId: string,
): Promise<Workflow> {
  try {
    const contents =
      await readFile(
        workflowPath(
          projectPath,
          workflowId,
        ),
      );

    return JSON.parse(
      contents,
    );
  } catch (error) {
    throw new Error(
      `Failed to load workflow: ${error}`,
    );
  }
}

export async function listWorkflows(
  projectPath: string,
): Promise<
  WorkflowSummary[]
> {
  return loadWorkflowSummaries(
    projectPath,
  );
}

export async function workflowExists(
  projectPath: string,
): Promise<boolean> {
  const workflows =
    await loadWorkflowSummaries(
      projectPath,
    );

  return workflows.length > 0;
}

export async function deleteWorkflow(
  projectPath: string,
  workflowId: string,
): Promise<void> {
  try {
    const workflows =
      await loadWorkflowSummaries(
        projectPath,
      );

    const updated =
      removeSummaryFromList(
        workflows,
        workflowId,
      );

    await saveWorkflowSummaries(
      projectPath,
      updated,
    );

    await deleteFile(
      workflowPath(
        projectPath,
        workflowId,
      ),
    );
  } catch (error) {
    throw new Error(
      `Failed to delete workflow: ${error}`,
    );
  }
}

export async function updateWorkflowMetadata(
  projectPath: string,
  workflowId: string,
  updates: {
    name?: string;
    description?: string;
  },
): Promise<void> {
  try {
    const workflows =
      await loadWorkflowSummaries(
        projectPath,
      );

    const index =
      workflows.findIndex(
        (w) =>
          w.id === workflowId,
      );

    if (index < 0) {
      throw new Error(
        "Workflow not found",
      );
    }

    workflows[index] = {
      ...workflows[index],
      ...updates,
      updatedAt:
        new Date().toISOString(),
    };

    await saveWorkflowSummaries(
      projectPath,
      workflows,
    );

    const workflow =
      await loadWorkflow(
        projectPath,
        workflowId,
      );

    workflow.name =
      workflows[index].name;

    workflow.description =
      workflows[index]
        .description;

    workflow.updatedAt =
      workflows[index]
        .updatedAt;

    await writeFile(
      workflowPath(
        projectPath,
        workflowId,
      ),
      JSON.stringify(
        workflow,
        null,
        2,
      ),
    );
  } catch (error) {
    throw new Error(
      `Failed to update workflow metadata: ${error}`,
    );
  }
}
