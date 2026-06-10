type Props = {
  variables: string[];
};

export default function ContextVariablesPanel({
  variables,
}: Props) {
  if (variables.length === 0) {
    return null;
  }

  return (
    <div className="panel h-full">
      <div className="panel-header">
        Context Variables
      </div>

      <div className="p-4 flex flex-col gap-2">
        {variables.map((variable) => (
          <div
            key={variable}
            className="workflow-node"
          >
            {variable}
          </div>
        ))}
      </div>
    </div>
  );
}