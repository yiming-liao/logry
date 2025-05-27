import type { NodeFormatter } from "../../../formatter-types";
import type { LogLevel } from "../../../types";

export type FormatNodeLogPayload = {
  id?: string;
  level: Exclude<LogLevel, "silent">;
  context?: string;
  message: string;
  meta?: unknown;
  hideDate: boolean;
  hideId: boolean;
  hideContext: boolean;
  contextSeparator: string;
  showOnlyLatestContext: boolean;
  messagePrefix: string;
  messageLineBreaks: number;
  useColor: boolean;
  formatter?: NodeFormatter;
};
