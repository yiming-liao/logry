import type {
  NormalizeConfig,
  FormatConfig,
  RenderConfig,
  PrintConfig,
} from "@/pipeline";
import type { LogContext } from "@/shared/types/log-context";

type RawMeta = LogContext["raw"]["meta"];

/** Function signature for a logger at a specific level. */
export interface LogFn {
  (message: string, options?: LogOptions): void; // message + options
  (meta: RawMeta, options?: LogOptions): void; // meta + options
  (message: string, meta: RawMeta, options?: LogOptions): void; // message + meta + options
}

/** Optional parameters applied to a single log call. */
export type LogOptions = {
  scope?: string[] | string;
  context?: Record<string, unknown>;
  normalizeConfig?: NormalizeConfig;
  formatConfig?: FormatConfig;
  renderConfig?: RenderConfig;
  printConfig?: PrintConfig;
};
