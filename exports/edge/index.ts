import { getOrCreateEdgeLogger } from "@/core/factory/platform";
import { edgeStandaloneLog } from "@/core/logger/standalone-log";
import { createForceMethods } from "@/core/logger/utils/create-force-methods";

// ─────────────────────────────────────────────────────────────
// 🚀 Entry Point
// ─────────────────────────────────────────────────────────────

export { EdgeLogger as Logger } from "@/core/logger/platform";
export {
  getOrCreateEdgeLogger,
  coreMap,
  resetCoreMap,
  loggerMap,
  resetLoggerMap,
} from "@/core/factory";
export const logry = getOrCreateEdgeLogger;

// ─────────────────────────────────────────────────────────────
// 🕹 Handlers
// ─────────────────────────────────────────────────────────────

export { EdgeHandler } from "@/handlers";

// ─────────────────────────────────────────────────────────────
// 🧬 Core Types
// ─────────────────────────────────────────────────────────────

export type { Level, Platform } from "@/shared/types";
export type {
  RawPayload,
  NormalizedPayload,
  FormattedPayload,
} from "@/shared/types/log-payload";

// ─────────────────────────────────────────────────────────────
// 🧱 Modules
// ─────────────────────────────────────────────────────────────

// --- 🧹 Normalizers ---
export { Normalizer } from "@/modules/normalizers";
export type {
  NormalizerConfig,
  EdgeNormalizerConfig,
} from "@/modules/normalizers/types";

// --- 🎨 Formatters ---
export { Formatter } from "@/modules/formatters";
export type {
  FormatterConfig,
  EdgeFormatterConfig,
} from "@/modules/formatters/types";

// ─────────────────────────────────────────────────────────────
// 🧰 Handler Manager
// ─────────────────────────────────────────────────────────────

export { HandlerManager } from "@/core/handler-manager";
export type {
  HandlerManagerConfig,
  FlushStrategy,
  OnErrorCallback,
  Handler,
  HandlerFunction,
  HandlerClass,
} from "@/core/handler-manager";

// ─────────────────────────────────────────────────────────────
// 🛠️ Dev Tools
// ─────────────────────────────────────────────────────────────

export {
  inspectLoggers,
  inspectLoggerCores,
  inspectHandlerManagerConfig,
} from "@/devtools";

// ─────────────────────────────────────────────────────────────
// 🎨 Presets
// ─────────────────────────────────────────────────────────────

export { logryPresets as presets } from "@/presets";
export type { LoggerPreset, LoggerPresetConfig } from "@/presets";

// ─────────────────────────────────────────────────────────────
// 🎯 Force Logging Methods
// ─────────────────────────────────────────────────────────────

export const force = createForceMethods(edgeStandaloneLog);
export const trace = force.trace;
export const debug = force.debug;
export const info = force.info;
export const warn = force.warn;
export const error = force.error;
export const fatal = force.fatal;
