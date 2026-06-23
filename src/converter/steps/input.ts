import { InputStep } from "../../features/workflow/types/workflow";
import { sanitizeVarName, interpolateVars, interpolateVarsPwsh, escapeBashDoubleQuoted, escapePwshSingleQuoted } from "../utils";

export function toBash(step: InputStep): string {
  const varName = sanitizeVarName(step.variableName);
  const promptVal = escapeBashDoubleQuoted(interpolateVars(step.prompt || `Enter ${step.variableName}`));
  const lines: string[] = [];

  lines.push(`load_state "${varName}"`);

  lines.push(`if [ -z "\$${varName}" ]; then`);

  const hasValidation = step.required || step.validationRegex;
  if (hasValidation) {
    lines.push("  while true; do");

    if (step.secret) {
      lines.push(`    read -s -p "${promptVal}: " ${varName}`);
      lines.push('    echo ""');
    } else {
      const defaultHint = step.defaultValue ? ` [${escapeBashDoubleQuoted(interpolateVars(step.defaultValue))}]` : "";
      lines.push(`    read -p "${promptVal}${defaultHint}: " ${varName}`);
    }

    if (step.defaultValue) {
      lines.push(`    ${varName}="\${${varName}:-${escapeBashDoubleQuoted(interpolateVars(step.defaultValue))}}"`);
    }

    if (step.required) {
      lines.push(`    if [ -z "\$${varName}" ]; then`);
      lines.push('      echo "This field is required."');
      lines.push("      continue");
      lines.push("    fi");
    }

    if (step.validationRegex) {
      lines.push(`    if ! echo "\$${varName}" | grep -qE '${step.validationRegex}'; then`);
      lines.push(`      echo "Invalid format. Expected: ${step.validationRegex}"`);
      lines.push("      continue");
      lines.push("    fi");
    }

    lines.push("    break");
    lines.push("  done");
  } else {
    if (step.secret) {
      lines.push(`  read -s -p "${promptVal}: " ${varName}`);
      lines.push('  echo ""');
    } else {
      const defaultHint = step.defaultValue ? ` [${escapeBashDoubleQuoted(interpolateVars(step.defaultValue))}]` : "";
      lines.push(`  read -p "${promptVal}${defaultHint}: " ${varName}`);
    }
    if (step.defaultValue) {
      lines.push(`  ${varName}="\${${varName}:-${escapeBashDoubleQuoted(interpolateVars(step.defaultValue))}}"`);
    }
  }

  lines.push(`  save_state "${varName}" "\$${varName}"`);
  lines.push("fi");

  return lines.join("\n");
}

export function toPowerShell(step: InputStep): string {
  const varName = sanitizeVarName(step.variableName);
  const promptVal = interpolateVarsPwsh(step.prompt || `Enter ${step.variableName}`);
  const lines: string[] = [];

  lines.push(`Load-State "${varName}"`);

  lines.push(`if ([string]::IsNullOrEmpty(${varName})) {`);

  const hasValidation = step.required || step.validationRegex;
  if (hasValidation) {
    lines.push("  while ($true) {");

    const defaultHint = step.defaultValue ? ` [${interpolateVarsPwsh(step.defaultValue)}]` : "";
    lines.push(`    ${varName} = Read-Host "${promptVal}${defaultHint}"`);

    if (step.defaultValue) {
      lines.push(`    if ([string]::IsNullOrEmpty(${varName})) { ${varName} = '${escapePwshSingleQuoted(interpolateVarsPwsh(step.defaultValue))}' }`);
    }

    if (step.required) {
      lines.push(`    if ([string]::IsNullOrEmpty(${varName})) {`);
      lines.push('      Write-Host "This field is required."');
      lines.push("      continue");
      lines.push("    }");
    }

    if (step.validationRegex) {
      lines.push(`    if (${varName} -notmatch '${step.validationRegex}') {`);
      lines.push(`      Write-Host "Invalid format. Expected: ${step.validationRegex}"`);
      lines.push("      continue");
      lines.push("    }");
    }

    lines.push("    break");
    lines.push("  }");
  } else {
    const defaultHint = step.defaultValue ? ` [${interpolateVarsPwsh(step.defaultValue)}]` : "";
    lines.push(`  ${varName} = Read-Host "${promptVal}${defaultHint}"`);
    if (step.defaultValue) {
      lines.push(`  if ([string]::IsNullOrEmpty(${varName})) { ${varName} = '${escapePwshSingleQuoted(interpolateVarsPwsh(step.defaultValue))}' }`);
    }
  }

  lines.push(`  Save-State "${varName}" $$varName`);
  lines.push("}");

  return lines.join("\n");
}
