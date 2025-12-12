import type { Level } from "@/shared/level";

export const LEVEL_CONSOLE_MAP: Record<
  Omit<Level, "silent"> & string,
  (...args: unknown[]) => void
> = {
  trace: (...args: unknown[]) => console.log(...args),
  debug: (...args: unknown[]) => console.log(...args),
  info: (...args: unknown[]) => console.info(...args),
  warn: (...args: unknown[]) => console.warn(...args),
  error: (...args: unknown[]) => console.error(...args),
  fatal: (...args: unknown[]) => console.error(...args),
};
