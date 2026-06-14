type Props = {
    workflowName: string;
    onSave: () => void;
};

export default function TopBar({
    workflowName,
    onSave,
}: Props) {
    return (
        <header className="panel h-14 flex items-center justify-between px-4 border-b">
            <div className="flex items-center gap-4">
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

                <button className="workflow-button">
                    Export
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