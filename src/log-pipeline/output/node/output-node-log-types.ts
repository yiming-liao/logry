import type { NodeOutputConfig } from "../../../output-config-types";
import type { Context, LogLevel, Scope } from "../../../types";

export type OutputNodeLogPayload<TContext extends Context = Context> = {
  id?: string;
  level: Exclude<LogLevel, "silent">;
  scope: Scope;
  message: string;
  meta?: unknown;
  context?: TContext;
  nodeOutputConfig?: NodeOutputConfig;
};
