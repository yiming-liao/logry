import type { HandlerConfig } from "../handler/handler-types";
import type { OutputConfig } from "../output-config-types";
import type { LogLevel } from "../types";
import { DEFAULT_LOG_LEVEL } from "../constants";
import { HandlerManager } from "../handler";
import { assertValidLevel } from "../utils/assert-valid-level";

/**
 * Core logger class responsible for managing the log level and validating it.
 * Stores the initial level and allows dynamic level changes.
 *
 * This class does not handle log output directly — it only manages state and configuration.
 * It centralizes configuration for log level, output, and handler management.
 *
 * Used internally by the logging system as the core configuration holder.
 */
export class LoggerCore {
  /** Current active log level */
  public level: LogLevel;
  /** Initial log level set at construction time */
  private readonly initialLevel: LogLevel;
  /** Optional output configuration */
  public readonly outputConfig?: OutputConfig;
  /** Optional handler configuration */
  public readonly handlerConfig?: HandlerConfig;
  /** Handler manager instance responsible for managing log handlers */
  public readonly handlerManager: HandlerManager;

  /**
   * Create a new logger core instance.
   * @param id - Unique identifier for the logger core.
   * @param level - Initial log level (default to DEFAULT_LOG_LEVEL).
   * @param outputConfig - Optional configuration for output.
   * @param handlerConfig - Optional configuration for handlers.
   * @throws Will throw an error if the level is invalid.
   */
  constructor(
    public readonly id: string,
    level: LogLevel = DEFAULT_LOG_LEVEL,
    outputConfig?: OutputConfig,
    handlerConfig?: HandlerConfig,
  ) {
    assertValidLevel(level);
    this.level = level;
    this.initialLevel = level;
    this.outputConfig = outputConfig;
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
  setLevel(level: LogLevel) {
    assertValidLevel(level);
    this.level = level;
  }

  /**
   * Reset the log level back to the initial level set at construction.
   */
  resetLevel() {
    this.level = this.initialLevel;
  }
}
