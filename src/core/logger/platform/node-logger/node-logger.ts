import type { CoreLoggerConstructorOptions } from "@/core/logger/core-logger";
import { CoreLogger } from "@/core/logger/core-logger/core-logger";
import { NodeConsoleTransporter } from "@/modules/transporters";

export class NodeLogger extends CoreLogger {
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
  }
}
