import {
  ConditionStep,
  ConditionOperator,
} from "../../models/workflow";

type Props = {
  step: ConditionStep;

  variables: string[];

  updateStep: (
    step: ConditionStep
  ) => void;
};

const OPERATORS: ConditionOperator[] = [
  "equals",
  "notEquals",
  "greaterThan",
  "greaterThanOrEqual",
  "lessThan",
  "lessThanOrEqual",
  "contains",
];

export default function ConditionProperties({
  step,
  variables,
  updateStep,
}: Props) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="property-section-title">
        Required
      </h3>

      <div>
        <label className="property-label">
          NAME
        </label>

        <input
          className="workflow-input"
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
        <label className="property-label">
          VARIABLE
        </label>

        <select
          className="workflow-select"
          value={step.variableName}
          onChange={(e) =>
            updateStep({
              ...step,
              variableName:
                e.target.value,
            })
          }
        >
          <option value="">
            Select Variable
          </option>

          {variables.map(
            (variable) => (
              <option
                key={variable}
                value={variable}
              >
                {variable}
              </option>
            )
          )}
        </select>
      </div>

      <div>
        <label className="property-label">
          OPERATOR
        </label>

        <select
          className="workflow-select"
          value={step.operator}
          onChange={(e) =>
            updateStep({
              ...step,
              operator:
                e.target
                  .value as ConditionOperator,
            })
          }
        >
          {OPERATORS.map(
            (operator) => (
              <option
                key={operator}
                value={operator}
              >
                {operator}
              </option>
            )
          )}
        </select>
      </div>

      <div>
        <label className="property-label">
          VALUE
        </label>

        <input
          className="workflow-input"
          value={step.value}
          onChange={(e) =>
            updateStep({
              ...step,
              value:
                e.target.value,
            })
          }
        />
      </div>
    </div>
  );
}