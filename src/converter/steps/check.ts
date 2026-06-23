import { CheckStep } from "../../features/workflow/types/workflow";
import { interpolateVars, interpolateVarsPwsh } from "../utils";

export function toBash(step: CheckStep): string {
  const { checkType } = step;

  switch (checkType.type) {
    case "command":
      return `${interpolateVars(checkType.command)}\n[ $? -eq ${checkType.expectedExitCode} ]`;

    case "fileExists":
      return `[ -f "${interpolateVars(checkType.path)}" ]`;

    case "directoryExists":
      return `[ -d "${interpolateVars(checkType.path)}" ]`;

    case "environmentVariable":
      return `[ -n "\${${checkType.variableName}+x}" ]`;
  }
}

export function toPowerShell(step: CheckStep): string {
  const { checkType } = step;

  switch (checkType.type) {
    case "command":
      return `${interpolateVarsPwsh(checkType.command)}\n($LASTEXITCODE -eq ${checkType.expectedExitCode})`;

    case "fileExists":
      return `Test-Path "${interpolateVarsPwsh(checkType.path)}"`;

    case "directoryExists":
      return `Test-Path "${interpolateVarsPwsh(checkType.path)}" -PathType Container`;

    case "environmentVariable":
      return `$null -ne (Get-Item "Env:${checkType.variableName}" -ErrorAction SilentlyContinue)`;
  }
}
