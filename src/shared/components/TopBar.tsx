import { useWorkflowStore } from "../../features/workflow/store/useWorkflowStore";

type Props = {
  onSave: () => void;
  onBack: () => void;
};

export default function TopBar({
  onSave,
  onBack,
}: Props) {
  const workflowName = useWorkflowStore((s) => s.workflow.name);

  return (
    <header className="panel h-14 flex items-center justify-between px-4 border-b">
      <div className="flex items-center gap-4">
        <button
          className="workflow-button flex items-center gap-1"
          onClick={onBack}
        >
          ← Back
        </button>

        <div className="h-4 w-px bg-[var(--border)]" />

        <div className="text-lg sm:text-2xl font-bold uppercase tracking-tight">
          PROJECT
          <span className="text-[#7CFF6B]">_</span>
          INSTALLER
        </div>

        <div className="h-4 w-px bg-[var(--border)]" />

        <span className="text-[var(--muted)] text-sm">
          {workflowName}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button className="workflow-button">
          Validate
        </button>

        <button
          className="workflow-button primary"
          onClick={onSave}
        >
          Save
        </button>
      </div>
    </header>
  );
}
