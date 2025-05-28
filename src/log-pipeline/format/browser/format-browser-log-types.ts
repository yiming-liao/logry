import type { BrowserFormatter } from "../../../formatter-types";
import type { Context, LogLevel, Scope } from "../../../types";

export type FormatBrowserLogPayload<TContext extends Context = Context> = {
  id?: string;
  level: Exclude<LogLevel, "silent">;
  scope: Scope;
  message: string;
  meta?: unknown;
  context?: TContext;
  hideDate: boolean;
  hideId: boolean;
  hideScope: boolean;
  scopeSeparator: string;
  showOnlyLatestScope: boolean;
  messagePrefix: string;
  messageLineBreaks: number;
  formatter?: BrowserFormatter;
};
