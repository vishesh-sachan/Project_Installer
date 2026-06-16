import WorkflowBranch from "./WorkflowBranch";
import { useWorkflowStore } from "../store/useWorkflowStore";

export default function WorkflowTree() {
  const workflow = useWorkflowStore((s) => s.workflow);

  return (
    <div className="p-8">
      <WorkflowBranch workflow={workflow} path={[]} />
    </div>
  );
}
