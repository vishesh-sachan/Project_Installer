import {
  FileStep,
  FileOperation,
  CreateOrOverwriteOperation,
  AppendOperation,
  ReplaceTextOperation,
} from "../../models/workflow";

type Props = {
  step: FileStep;

  updateStep: (
    step: FileStep
  ) => void;
};

export default function FileProperties({
  step,
  updateStep,
}: Props) {
  function updateOperation(
    operation: FileOperation
  ) {
    updateStep({
      ...step,
      operation,
    });
  }

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
          FILE PATH
        </label>

        <input
          className="workflow-input"
          value={step.filePath}
          onChange={(e) =>
            updateStep({
              ...step,
              filePath:
                e.target.value,
            })
          }
        />
      </div>

      <div>
        <label className="property-label">
          OPERATION
        </label>

        <select
          className="workflow-select"
          value={step.operation.type}
          onChange={(e) => {
            switch (
              e.target.value
            ) {
              case "createOrOverwrite":
                updateOperation({
                  type:
                    "createOrOverwrite",
                  content: "",
                });
                break;

              case "append":
                updateOperation({
                  type: "append",
                  content: "",
                });
                break;

              case "replaceText":
                updateOperation({
                  type:
                    "replaceText",
                  search: "",
                  replace: "",
                });
                break;
            }
          }}
        >
          <option value="createOrOverwrite">
            Create Or Overwrite
          </option>

          <option value="append">
            Append
          </option>

          <option value="replaceText">
            Replace Text
          </option>
        </select>
      </div>

      {step.operation.type ===
        "createOrOverwrite" && (() => {
        const operation =
          step.operation as CreateOrOverwriteOperation;

        return (
          <div>
            <label className="property-label">
              CONTENT
            </label>

            <textarea
              className="workflow-textarea"
              value={
                operation.content
              }
              onChange={(e) =>
                updateOperation({
                  type:
                    "createOrOverwrite",
                  content:
                    e.target.value,
                })
              }
            />
          </div>
        );
      })()}

      {step.operation.type ===
        "append" && (() => {
        const operation =
          step.operation as AppendOperation;

        return (
          <div>
            <label className="property-label">
              CONTENT
            </label>

            <textarea
              className="workflow-textarea"
              value={
                operation.content
              }
              onChange={(e) =>
                updateOperation({
                  type: "append",
                  content:
                    e.target.value,
                })
              }
            />
          </div>
        );
      })()}

      {step.operation.type ===
        "replaceText" && (() => {
        const operation =
          step.operation as ReplaceTextOperation;

        return (
          <>
            <div>
              <label className="property-label">
                SEARCH
              </label>

              <input
                className="workflow-input"
                value={
                  operation.search
                }
                onChange={(e) =>
                  updateOperation({
                    type:
                      "replaceText",
                    search:
                      e.target.value,
                    replace:
                      operation.replace,
                  })
                }
              />
            </div>

            <div>
              <label className="property-label">
                REPLACE
              </label>

              <input
                className="workflow-input"
                value={
                  operation.replace
                }
                onChange={(e) =>
                  updateOperation({
                    type:
                      "replaceText",
                    search:
                      operation.search,
                    replace:
                      e.target.value,
                  })
                }
              />
            </div>
          </>
        );
      })()}
    </div>
  );
}