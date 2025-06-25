import type { CoreLoggerConstructorOptions } from "@/core/logger/core-logger";
import { CoreLogger } from "@/core/logger/core-logger/core-logger";
import {
  NodeConsoleTransporter,
  BrowserConsoleTransporter,
} from "@/modules/transporters";

export class UniversalLogger extends CoreLogger {
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
      new NodeConsoleTransporter({
        normalizer: this.normalizer,
        formatter: this.formatter,
      }),
    );
    this.transporters.push(
      new BrowserConsoleTransporter({
        normalizer: this.normalizer,
        formatter: this.formatter,
      }),
    );
  }
}
