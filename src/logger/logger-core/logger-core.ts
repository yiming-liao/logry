import type { LoggerCoreOptions } from "@/logger/logger-core/types";
import type { Level } from "@/shared/level";
import { assertLevel } from "@/shared/utils/assert-level";
import { resolveScopes } from "@/shared/utils/resolve-scopes";

/**
 * Core logger class responsible for managing log levels and validating their correctness.
 *
 * This class stores the initial log level and provides methods to update or reset it.
 * It also holds optional configurations for formatting, normalization, and handlers.
 */
export class LoggerCore {
  /** Unique identifier for this logger */
  public readonly id: string | undefined;
  /** Current log level */
  private _level: Level;
  /**Level originally defined at construction */
  private readonly initialLevel: Level;
  /** Labels describing this logger instance */
  public readonly scope: string[];
  /** Shared metadata injected into every log payload */
  public readonly context: Record<string, unknown> | undefined;

  constructor({ id, level = "warn", scope, context }: LoggerCoreOptions = {}) {
    this.id = id;
    assertLevel(level);
    this._level = level;
    this.initialLevel = level;
    this.scope = resolveScopes(scope);
    this.context = context;
  }

  /** Get current level */
  get level() {
    return this._level;
  }

  /** Update level at runtime */
  setLevel(level: Level) {
    assertLevel(level);
    this._level = level;
  }

  /** Restore initial level */
  resetLevel() {
    this._level = this.initialLevel;
  }
}
