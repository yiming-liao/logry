import type { BrowserOutputConfig } from "../../../output-config-types";
import type { Context, LogLevel, Scope } from "../../../types";

export type OutputBrowserLogPayload<TContext extends Context = Context> = {
  id?: string;
  level: Exclude<LogLevel, "silent">;
  scope: Scope;
  message: string;
  meta?: unknown;
  context?: TContext;
  browserOutputConfig?: BrowserOutputConfig;
};
