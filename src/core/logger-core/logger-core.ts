import type { HandlerManagerConfig } from "@/core/handler-manager";
import type {
  LevelChangeCallback,
  LoggerCoreOptions,
} from "@/core/logger-core/logger-core-types";
import type { FormatterConfig } from "@/modules/formatters/types";
import type { NormalizerConfig } from "@/modules/normalizers/types";
import type { Level } from "@/shared/types";
import { HandlerManager } from "@/core/handler-manager";
import { internalLog } from "@/internal";
import { DEFAULT_LOGGER_LEVEL, DEFAULT_LOGGER_ID } from "@/shared/constants";
import { assertValidLevel } from "@/shared/utils/assert-valid-level";

/**
 * Core logger class responsible for managing log levels and validating their correctness.
 *
 * This class stores the initial log level and provides methods to update or reset it.
 * It also holds optional configurations for formatting, normalization, and handlers.
 */
export class LoggerCore {
  /** Unique identifier for this logger instance */
  public readonly id: string;
  /** Current active log level */
  public level: Level;
  /** The initial log level set during construction */
  private readonly initialLevel: Level;
  /** Optional configuration for formatting log output */
  private readonly formatterConfig?: FormatterConfig;
  /** Optional configuration for normalizing log output */
  private readonly normalizerConfig?: NormalizerConfig;
  /** Optional configuration for log handlers */
  private readonly handlerManagerConfig?: HandlerManagerConfig;
  /** Manages all log handlers */
  public readonly handlerManager: HandlerManager;
  // A set to keep all registered callbacks which listen to level changes.
  private levelChangeCallbacks: Set<LevelChangeCallback> = new Set();

  constructor({
    id = DEFAULT_LOGGER_ID,
    level = DEFAULT_LOGGER_LEVEL,
    formatterConfig,
    normalizerConfig,
    handlerManagerConfig,
  }: LoggerCoreOptions = {}) {
    this.id = id;
    assertValidLevel(level);
    this.level = level;
    this.initialLevel = level;
    this.normalizerConfig = normalizerConfig;
    this.formatterConfig = formatterConfig;
    this.handlerManagerConfig = handlerManagerConfig;
    this.handlerManager = new HandlerManager(handlerManagerConfig);
  }

  /** Dynamically update the current log level. */
  setLevel(level: Level) {
    assertValidLevel(level);
    this.level = level;
    this.notifyLevelChange(level);
  }

  /** Resets the log level to its original value defined during construction. */
  resetLevel() {
    this.level = this.initialLevel;
    this.notifyLevelChange(this.level);
  }

  /** Notify all registered callbacks of the current log level change. */
  private notifyLevelChange(level: Level) {
    for (const callback of this.levelChangeCallbacks) {
      try {
        callback(level);
      } catch (error) {
        internalLog({
          type: "error",
          tag: "Logger Core",
          message: "levelChange callback error.",
          error,
        });
      }
    }
  }

  /** Register a callback function that will be invoked whenever the log level changes. */
  onLevelChange(callback: LevelChangeCallback) {
    this.levelChangeCallbacks.add(callback);
  }

  /** Unregister a previously registered level change callback. */
  offLevelChange(callback: LevelChangeCallback) {
    this.levelChangeCallbacks.delete(callback);
  }
}
