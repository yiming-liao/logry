import type { NodeOutputConfig } from "../../../output-config-types";
import type { LogLevel } from "../../../types";

export type OutputNodeLogPayload = {
  id?: string;
  level: Exclude<LogLevel, "silent">;
  context?: string;
  message: string;
  meta?: unknown;
  nodeOutputConfig?: NodeOutputConfig;
};
