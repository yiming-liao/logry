import type { LogLevel, LogMeta, WriteConfig } from "../types";

export type WriteOptions = {
  id?: string;
  level: LogLevel;
  context?: string;
  message: string;
  meta?: LogMeta;
  writeConfig?: WriteConfig;
};
