import type { LogLevel } from "../../../types";

export type FormatOutputOptions = {
  id?: string;
  level: Exclude<LogLevel, "silent">;
  context?: string;
  message: string;
  hideDate?: boolean;
  hideId?: boolean;
  hideContext?: boolean;
  showOnlyLatestContext?: boolean;
};
