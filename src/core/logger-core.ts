import type { LogLevel, WriteConfig } from "../types";
import { DEFAULT_LOG_LEVEL, LOG_LEVEL_PRIORITY } from "../constants";

/**
 * Core logger class responsible for managing the log level and validating it.
 * Stores the initial level and allows dynamic level changes.
 */
export class LoggerCore {
  public level: LogLevel;
  private readonly initialLevel: LogLevel;
  public readonly writeConfig?: WriteConfig;

  /**
   * Create a new logger core instance.
   * @param id - Unique identifier for the logger core.
   * @param level - Initial log level (default to DEFAULT_LOG_LEVEL).
   * @param writeConfig - Optional formatting options.
   * @throws Will throw an error if the level is invalid.
   */
  constructor(
    public readonly id: string,
    level: LogLevel = DEFAULT_LOG_LEVEL,
    writeConfig?: WriteConfig,
  ) {
    LoggerCore.assertValidLevel(level);
    this.level = level;
    this.initialLevel = level;
    this.writeConfig = writeConfig;
  }

  /**
   * Dynamically update the current log level.
   * @param level - The new log level to set.
   * @throws Will throw an error if the level is invalid.
   */
  setLevel(level: LogLevel) {
    LoggerCore.assertValidLevel(level);
    this.level = level;
  }

  /**
   * Reset the log level back to the initial level set at construction.
   */
  resetLevel() {
    this.level = this.initialLevel;
  }

  /**
   * Validate that the provided log level exists in the priority map.
   * @param level - The log level to validate.
   * @throws Will throw an error if the level is not valid.
   */
  static assertValidLevel(level: LogLevel): void {
    if (!Object.prototype.hasOwnProperty.call(LOG_LEVEL_PRIORITY, level)) {
      throw new Error(`[logry] Invalid log level: ${level}`);
    }
  }
}
