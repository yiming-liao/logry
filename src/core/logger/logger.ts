import type { CoreLoggerConstructorOptions } from "@/core/logger/core-logger";
import { CoreLogger } from "@/core/logger/core-logger/core-logger";
import {
  NodeConsoleTransporter,
  BrowserConsoleTransporter,
} from "@/modules/transporters";

export class Logger extends CoreLogger {
  constructor({
    core,
    level,
    scope = [],
    context,
    normalizerConfig,
    formatterConfig,
  }: CoreLoggerConstructorOptions) {
    super({ core, level, scope, context, normalizerConfig, formatterConfig });

    /**
     * Initialize console transporters for Node and Browser.
     */

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
