import type { LoggerCoreOptions } from "@/logger/logger-core/types";
import type {
  NormalizeConfig,
  FormatConfig,
  RenderConfig,
  PrintConfig,
} from "@/pipeline";

export interface BaseLoggerConstructorOptions extends LoggerCoreOptions {
  normalizeConfig?: NormalizeConfig;
  formatConfig?: FormatConfig;
  renderConfig?: RenderConfig;
  printConfig?: PrintConfig;
}
