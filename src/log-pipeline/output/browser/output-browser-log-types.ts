import type { BrowserOutputConfig } from "../../../output-config-types";
import type { LogLevel } from "../../../types";

export type OutputBrowserLogPayload = {
  id?: string;
  level: Exclude<LogLevel, "silent">;
  context?: string;
  message: string;
  meta?: unknown;
  browserOutputConfig?: BrowserOutputConfig;
};
