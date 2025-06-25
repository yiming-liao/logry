import type { CoreLoggerConstructorOptions } from "@/core/logger/core-logger";
import { CoreLogger } from "@/core/logger/core-logger/core-logger";
import { BrowserConsoleTransporter } from "@/modules/transporters";

export class BrowserLogger extends CoreLogger {
  constructor({
    core,
    level,
    scope = [],
    context,
    normalizerConfig,
    formatterConfig,
  }: CoreLoggerConstructorOptions) {
    super({ core, level, scope, context, normalizerConfig, formatterConfig });

    this.transporters.push(
      new BrowserConsoleTransporter({
        normalizer: this.normalizer,
        formatter: this.formatter,
      }),
    );
  }
}
