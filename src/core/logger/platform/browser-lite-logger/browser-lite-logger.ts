import type { HandlerLoggerConstructorOptions } from "@/core/logger/handler-logger";
import type { ChildOptions } from "@/core/logger/types";
import { HandlerLogger } from "@/core/logger/handler-logger/handler-logger";
import { BrowserConsoleTransporter } from "@/modules/transporters";
import { assertValidLevel } from "@/shared/utils/assert-valid-level";

export class BrowserLiteLogger extends HandlerLogger {
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
      new BrowserConsoleTransporter({
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
  }: ChildOptions = {}): BrowserLiteLogger {
    assertValidLevel(level);
    const merged = this.mergeInheritedOptions({
      scope,
      context,
      formatterConfig,
      normalizerConfig,
    });
    return new BrowserLiteLogger({ level, ...merged });
  }
}
