export const ansiColor = (code: number) => (text: string | null) =>
  `\u001B[38;5;${code}m${text}\u001B[0m`;
