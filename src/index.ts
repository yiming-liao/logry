import { getOrCreateLogger } from "./core/factory";
import { createForceMethods } from "@/core/logger/utils/create-force-methods";
import { standaloneForceLog } from "@/core/logger/utils/standalone-force-log";

// ─────────────────────────────────────────────────────────────
// 🧩 Shared
// ─────────────────────────────────────────────────────────────
export type { Level, Platform } from "./shared/types";

// ─────────────────────────────────────────────────────────────
// 🔧 Core Logger & Factory
// ─────────────────────────────────────────────────────────────
export { Logger } from "./core/logger";
export type { RawPayload, RawLogData } from "./core/logger";

export { getOrCreateLogger, resetCoreMap } from "./core/factory";
export const logry = getOrCreateLogger;

// ─────────────────────────────────────────────────────────────
// 🧱 Modules
// ─────────────────────────────────────────────────────────────

// --- 🧹 Normalizers ---
export { Normalizer } from "./modules/normalizers";
export type {
  NormalizedPayload,
  NormalizerConfig,
  TimestampStyle,
  LevelStyle,
  ScopeSeparator,
} from "./modules/normalizers";

// --- 🎨 Formatters ---
export { NodeFormatter } from "./modules/formatters";
export type {
  FormattedPayload,
  NodeFormattedPayload,
  BrowserFormattedPayload,
  FormatterConfig,
  BaseFormatPartOptions,
  StringifyFormat,
} from "./modules/formatters";

// --- 🚚 Transporters ---
export { Transporter } from "./modules/transporters";
export { composeMessage } from "./modules/transporters/node/utils/compose-message";

// --- 🎛️ Handler Manager ---
export { HandlerManager, BaseHandler } from "./modules/handlers";
export type {
  HandlerConfig,
  Handler,
  HandlerFunction,
  HandlerClass,
  FlushStrategy,
  HandlerErrorHandler,
} from "./modules/handlers";

// ─────────────────────────────────────────────────────────────
// 🔥 Force Logging Methods (always output regardless of log level)
// ─────────────────────────────────────────────────────────────
export const force = createForceMethods(standaloneForceLog);

export const trace = force.trace;
export const debug = force.debug;
export const info = force.info;
export const warn = force.warn;
export const error = force.error;
export const fatal = force.fatal;

// ─────────────────────────────────────────────────────────────
// 🛠️ Dev Tools
// ─────────────────────────────────────────────────────────────
export { inspectLoggerCores, inspectHandlerConfig } from "./devtools";

// ─────────────────────────────────────────────────────────────
// 🧰 Presets
// ─────────────────────────────────────────────────────────────
export { loggerPresets as presets } from "./presets";
export type { LoggerPreset, LoggerPresetConfig } from "./presets";
