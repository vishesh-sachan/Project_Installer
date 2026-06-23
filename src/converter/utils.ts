export function sanitizeVarName(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9_]/g, "_")
    .replace(/^[^a-zA-Z_]/, "_$&")
    .toUpperCase();
}

export function interpolateVars(value: string): string {
  return value.replace(/\{\{(\w+)\}\}/g, (_, name) => `\${${sanitizeVarName(name)}}`);
}

export function interpolateVarsPwsh(value: string): string {
  return value.replace(/\{\{(\w+)\}\}/g, (_, name) => `\$${sanitizeVarName(name)}`);
}

export function escapeBashValue(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\$/g, "\\$").replace(/`/g, "\\`");
}

export function escapeBashDoubleQuoted(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/`/g, "\\`");
}

export function escapePwshSingleQuoted(s: string): string {
  return s.replace(/'/g, "''");
}

export function escapePwshDoubleQuoted(s: string): string {
  return s.replace(/`/g, "``").replace(/"/g, '`"').replace(/\$/g, "`$");
}

export function escapeSedPattern(s: string): string {
  return s.replace(/[\\|]/g, "\\$&");
}

export function escapeSedReplace(s: string): string {
  return s.replace(/[\\&|]/g, "\\$&");
}
