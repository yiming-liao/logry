import type { CoreLoggerConstructorOptions } from "@/core/logger/core-logger";
import type { ChildOptions } from "@/core/logger/types";
import type { LoggerCore } from "@/core/logger-core/logger-core";
import { HandlerLogger } from "@/core/logger/handler-logger/handler-logger";
import { createForceMethods } from "@/core/logger/utils/create-force-methods";
import { assertValidLevel } from "@/shared/utils/assert-valid-level";

export class CoreLogger extends HandlerLogger {
  private readonly core: LoggerCore;

  constructor({
    core,
    level,
    scope = [],
    context,
    normalizerConfig,
    formatterConfig,
  }: CoreLoggerConstructorOptions) {
    super({
      level: level || core?.level,
      scope,
      context,
      normalizerConfig: normalizerConfig || core.normalizerConfig,
      formatterConfig: formatterConfig || core.formatterConfig,
    });
    this.core = core;
    this.level = level || core?.level;
    // Bind log method
    const boundLog = this.log.bind(this);
    // Update log methods according to level
    this.updateLogMethods(boundLog, this.level, core.id);
    // Listen to core level changes and update log methods accordingly
    this.core.onLevelChange((newLevel) => {
      this.level = newLevel;
      this.updateLogMethods(boundLog, newLevel, core.id);
    });
    // Initialize force log methods
    this.force = createForceMethods(boundLog, core.id);
    // HandlerManager
    this.handlerManager = core.handlerManager;
  }

  /** Get the LoggerCore instance */
  public getCore(): LoggerCore {
    return this.core;
  }

  /** Create a child logger */
  child({
    level,
    scope,
    context,
    formatterConfig,
    normalizerConfig,
  }: ChildOptions = {}): CoreLogger {
    assertValidLevel(level);
    const merged = this.mergeInheritedOptions({
      scope,
      context,
      formatterConfig,
      normalizerConfig,
    });
    return new CoreLogger({ core: this.core, level, ...merged });
  }
}
