import type { HandlerManagerConfig } from "@/core/handler-manager";
import type { LoggerCoreOptions } from "@/core/logger-core/logger-core-types";
import type { FormatterConfig } from "@/modules/formatters/types";
import type { NormalizerConfig } from "@/modules/normalizers/types";
import type { Level } from "@/shared/types";
import type { RawContext, RawScope } from "@/shared/types/log-fields";
import { DEFAULT_LOGGER_LEVEL, DEFAULT_LOGGER_NAME } from "@/shared/constants";
import { assertValidLevel } from "@/shared/utils/assert-valid-level";

/**
 * Core logger class responsible for managing log levels and validating their correctness.
 *
 * This class stores the initial log level and provides methods to update or reset it.
 * It also holds optional configurations for formatting, normalization, and handlers.
 */
export class LoggerCore {
  /** Identify name for this logger instance */
  public readonly id: string;
  /** Current active log level */
  public level: Level;
  /** The initial log level set during construction */
  private readonly initialLevel: Level;
  /** Scope labels for tagging logs */
  public readonly scope: RawScope;
  /** Global context metadata included in all logs */
  public readonly context?: RawContext;
  /** Optional configuration for formatting log output */
  public readonly formatterConfig?: FormatterConfig;
  /** Optional configuration for normalizing log output */
  public readonly normalizerConfig?: NormalizerConfig;
  /** Optional configuration for log handlers */
  public readonly handlerManagerConfig?: HandlerManagerConfig;

  constructor({
    id = DEFAULT_LOGGER_NAME,
    level = DEFAULT_LOGGER_LEVEL,
    scope,
    context,
    formatterConfig,
    normalizerConfig,
    handlerManagerConfig,
  }: LoggerCoreOptions = {}) {
    // Name
    this.id = id;
    // Level
    assertValidLevel(level);
    this.level = level;
    this.initialLevel = level;
    // Scope
    this.scope = scope ? (Array.isArray(scope) ? scope : [scope]) : []; // Ensure scope is always an array
    // Context
    this.context = context;
    // Normalizer
    this.normalizerConfig = normalizerConfig;
    // Formatter
    this.formatterConfig = formatterConfig;
    // Handler
    this.handlerManagerConfig = handlerManagerConfig;
  }

  /** Dynamically update the current log level. */
  setLevel(level: Level) {
    assertValidLevel(level);
    this.level = level;
  }

  /** Resets the log level to its original value defined during construction. */
  resetLevel() {
    this.level = this.initialLevel;
  }
}
