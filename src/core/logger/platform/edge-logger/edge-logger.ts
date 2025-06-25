import type { HandlerLoggerConstructorOptions } from "@/core/logger/handler-logger";
import type { ChildOptions } from "@/core/logger/types";
import { HandlerLogger } from "@/core/logger/handler-logger/handler-logger";
import { EdgeConsoleTransporter } from "@/modules/transporters/edge";
import { assertValidLevel } from "@/shared/utils/assert-valid-level";

export class EdgeLogger extends HandlerLogger {
  constructor({
    level,
    scope = [],
    context,
    normalizerConfig,
    formatterConfig,
    handlerManagerConfig,
  }: HandlerLoggerConstructorOptions) {
    super({ level, scope, context, normalizerConfig, formatterConfig });
    if (handlerManagerConfig) {
      this.handlerManager.setConfig(handlerManagerConfig);
    }
    // Transporters
    this.transporters.push(
      new EdgeConsoleTransporter({
        normalizer: this.normalizer,
        formatter: this.formatter,
      }),
    );
  }

  /** Create a child logger */
  child({
    level,
    scope,
    context,
    formatterConfig,
    normalizerConfig,
  }: ChildOptions = {}): EdgeLogger {
    assertValidLevel(level);
    const merged = this.mergeInheritedOptions({
      scope,
      context,
      formatterConfig,
      normalizerConfig,
    });
    return new EdgeLogger({ level, ...merged });
  }
}
