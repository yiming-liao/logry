import { getOrCreateUniversalLogger } from "@/core/factory";
import { universalStandaloneLog } from "@/core/logger/standalone-log";
import { createForceMethods } from "@/core/logger/utils/create-force-methods";

// ─────────────────────────────────────────────────────────────
// 🚀 Entry Point
// ─────────────────────────────────────────────────────────────

export { UniversalLogger as Logger } from "@/core/logger";
export {
  getOrCreateUniversalLogger,
  coreMap,
  resetCoreMap,
  loggerMap,
  resetLoggerMap,
} from "@/core/factory";
export const logry = getOrCreateUniversalLogger;

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
  NodeNormalizerConfig,
  BrowserNormalizerConfig,
  EdgeNormalizerConfig,
} from "@/modules/normalizers/types";

// --- 🎨 Formatters ---
export { Formatter } from "@/modules/formatters";
export type {
  FormatterConfig,
  NodeFormatterConfig,
  BrowserFormatterConfig,
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

export const force = createForceMethods(universalStandaloneLog);
export const trace = force.trace;
export const debug = force.debug;
export const info = force.info;
export const warn = force.warn;
export const error = force.error;
export const fatal = force.fatal;
