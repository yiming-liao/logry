import type { BrowserFormatter } from "../../../formatter-types";
import type { LogLevel } from "../../../types";

export type FormatBrowserLogPayload = {
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
  formatter?: BrowserFormatter;
};
