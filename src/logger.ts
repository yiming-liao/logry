import type { LogLevel, LogMeta, LogOptions, WriteConfig } from "./types";
import { CONTEXT_SEPARATOR, LOG_LEVEL_PRIORITY } from "./constants";
import { LoggerCore } from "./core/logger-core";
import { write } from "./write";

/**
 * Logger handles logging messages with different severity levels.
 * Supports hierarchical child loggers with customized settings.
 */
export class Logger {
  private readonly level: LogLevel;
  private readonly context?: string;
  private readonly writeConfig?: WriteConfig;

  constructor(
    private readonly core: LoggerCore,
    level?: LogLevel,
    context?: string,
    writeConfig?: WriteConfig,
  ) {
    this.level = level ?? core.level;
    this.context = context;
    this.writeConfig = writeConfig;
  }

  /**
   * Determine if a message at the given level should be logged,
   * based on the logger's current level priority.
   * @param level Log level to check.
   * @returns True if the message should be logged.
   */
  private shouldLog(level: LogLevel): boolean {
    LoggerCore.assertValidLevel(level);
    return LOG_LEVEL_PRIORITY[level] <= LOG_LEVEL_PRIORITY[this.level];
  }

  /**
   * Create a new child logger with given parameters.
   * @param level Log level for the child logger.
   * @param context Context string for child logger.
   * @param writeConfig Format options for child logger.
   * @returns New Logger instance.
   */
  private createLogger(
    level: LogLevel,
    context?: string,
    writeConfig?: WriteConfig,
  ): Logger {
    return new Logger(this.core, level, context, writeConfig);
  }

  /**
   * Get a child logger with optional overrides for level, context, and format options.
   * @param options Optional options to override in child logger.
   * @returns Child Logger instance.
   */
  child(options?: {
    level?: LogLevel;
    context?: string;
    writeConfig?: WriteConfig;
  }): Logger {
    const {
      level = this.level,
      context,
      writeConfig: writeLogOptions = this.writeConfig,
    } = options || {};
    const combinedContext =
      context !== undefined
        ? [this.context, context].filter(Boolean).join(CONTEXT_SEPARATOR)
        : this.context;
    return this.createLogger(level, combinedContext, writeLogOptions);
  }

  /**
   * Internal method to log a message if level passes threshold.
   * Merges format options from core, instance, and call site.
   * @param level Log level of the message.
   * @param message Log message string.
   * @param meta Optional metadata object.
   * @param options Optional logging options overriding defaults.
   */
  private log(
    level: LogLevel,
    message: string,
    meta?: LogMeta,
    options?: LogOptions,
  ) {
    LoggerCore.assertValidLevel(level);
    write({
      level,
      id: this.core.id,
      context: options?.context || this.context,
      message,
      meta,
      writeConfig: {
        ...this.core.writeConfig, // Base config from core (lowest precedence)
        ...this.writeConfig, // Overrides from this logger instance
        ...options?.writeConfig, // Overrides from caller (highest precedence)
      },
    });
  }

  /**
   * Create a logging function for a specific level.
   * @param level Log level to bind to the function.
   * @returns A function to log messages at this level.
   */
  private logWithLevel(level: LogLevel) {
    LoggerCore.assertValidLevel(level);
    return (msg: string, meta?: LogMeta, options?: LogOptions) => {
      if (this.shouldLog(level)) {
        this.log(level, msg, meta, options);
      }
    };
  }

  // Log methods
  debug = this.logWithLevel("debug");
  info = this.logWithLevel("info");
  warn = this.logWithLevel("warn");
  error = this.logWithLevel("error");

  // Force log methods
  force = {
    debug: (msg: string, meta?: LogMeta, options?: LogOptions) =>
      this.log("debug", msg, meta, options),
    info: (msg: string, meta?: LogMeta, options?: LogOptions) =>
      this.log("info", msg, meta, options),
    warn: (msg: string, meta?: LogMeta, options?: LogOptions) =>
      this.log("warn", msg, meta, options),
    error: (msg: string, meta?: LogMeta, options?: LogOptions) =>
      this.log("error", msg, meta, options),
  };
}
