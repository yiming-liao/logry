import type { LoggerCoreOptions } from "@/core/logger-core/logger-core-types";
import type { FormatterConfig } from "@/modules/formatters/formatter-config-types";
import type { HandlerConfig } from "@/modules/handler-manager";
import type { NormalizerConfig } from "@/modules/normalizers/normalizer-config-types";
import type { Level } from "@/shared/types";
import { HandlerManager } from "@/modules/handler-manager";
import { DEFAULT_LOG_LEVEL, DEFAULT_LOGGER_ID } from "@/shared/constants";
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
  /** Optional configuration for normalizing log payloads */
  private readonly normalizerConfig?: NormalizerConfig;
  /** Optional configuration for log handlers */
  private readonly handlerConfig?: HandlerConfig;
  /** Manages all log handlers */
  public readonly handlerManager: HandlerManager;

  /**
   * Constructs a new LoggerCore instance.
   *
   * @param id - Unique identifier for the logger (defaults to DEFAULT_LOGGER_ID)
   * @param level - Initial log level (defaults to DEFAULT_LOG_LEVEL)
   * @param formatterConfig - Optional configuration for formatting logs
   * @param normalizerConfig - Optional configuration for normalizing logs
   * @param handlerConfig - Optional configuration for setting up log handlers
   *
   * @throws Will throw an error if the provided level is invalid
   */
  constructor({
    id = DEFAULT_LOGGER_ID,
    level = DEFAULT_LOG_LEVEL,
    formatterConfig,
    normalizerConfig,
    handlerConfig,
  }: LoggerCoreOptions) {
    this.id = id;
    assertValidLevel(level);
    this.level = level;
    this.initialLevel = level;
    this.normalizerConfig = normalizerConfig;
    this.formatterConfig = formatterConfig;
    this.handlerConfig = handlerConfig;
    this.handlerManager = new HandlerManager();
    if (handlerConfig) {
      this.handlerManager.setConfig(handlerConfig);
    }
  }

  /**
   * Dynamically update the current log level.
   * @param level - The new log level to set.
   * @throws Will throw an error if the level is invalid.
   */
  setLevel(level: Level) {
    assertValidLevel(level);
    this.level = level;
  }

  /**
   * Resets the log level to its original value defined during construction.
   */
  resetLevel() {
    this.level = this.initialLevel;
  }
}
