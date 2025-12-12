import type { Level } from "@/shared/level";

export type LoggerCoreOptions = {
  id?: string;
  level?: Level;
  scope?: string[] | string; // String or array of strings
  context?: Record<string, unknown>;
};
