import { InformationStep } from "../../features/workflow/types/workflow";
import { interpolateVars, interpolateVarsPwsh, escapeBashDoubleQuoted } from "../utils";

export function toBash(step: InformationStep): string {
  const lines: string[] = [];
  const title = interpolateVars(step.title || "");
  const content = interpolateVars(step.content || "");

  if (title) {
    lines.push(`echo ""`);
    lines.push(`echo "========================================"`);
    lines.push(`echo "  ${escapeBashDoubleQuoted(title)}"`);
    lines.push(`echo "========================================"`);
    lines.push(`echo ""`);
  }

  if (content) {
    lines.push(`echo "${escapeBashDoubleQuoted(content)}"`);
  }

  return lines.join("\n");
}

export function toPowerShell(step: InformationStep): string {
  const lines: string[] = [];
  const title = interpolateVarsPwsh(step.title || "");
  const content = interpolateVarsPwsh(step.content || "");

  if (title) {
    lines.push('Write-Host ""');
    lines.push('Write-Host ("=" * 40)');
    lines.push(`Write-Host "  ${title}"`);
    lines.push('Write-Host ("=" * 40)');
    lines.push('Write-Host ""');
  }

  if (content) {
    lines.push(`Write-Host "${content}"`);
  }

  return lines.join("\n");
}
