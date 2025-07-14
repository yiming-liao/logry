import type { CoreLoggerConstructorOptions } from "@/core/logger/core-logger";
import { CoreLogger } from "@/core/logger/core-logger";
import { EdgeConsoleTransporter } from "@/modules/transporters/edge";

export class EdgeLogger extends CoreLogger {
  constructor({
    core,
    level,
    scope = [],
    context,
    normalizerConfig,
    formatterConfig,
  }: CoreLoggerConstructorOptions) {
    super({ core, level, scope, context, normalizerConfig, formatterConfig });

    // Transporters
    this.transporters.push(
      new EdgeConsoleTransporter({
        normalizer: this.normalizer,
        formatter: this.formatter,
      }),
    );
  }
}
