import type { LogLevel, LogMeta, WriteConfig } from "../../types";

export type WriteNodeOptions = {
  id?: string;
  level: Exclude<LogLevel, "silent">;
  context?: string;
  message: string;
  meta?: LogMeta;
  writeConfig?: WriteConfig;
};
