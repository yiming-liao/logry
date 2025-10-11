import type { HandlerLoggerConstructorOptions } from "@/core/logger/handler-logger";
import { HandlerLogger } from "@/core/logger/handler-logger";
import { Formatter } from "@/modules/formatters";
import { Normalizer } from "@/modules/normalizers";
import { NodeConsoleTransporter } from "@/modules/transporters";

export class NodeLogger extends HandlerLogger {
  constructor({
    handlerManagerConfig,
    ...rest
  }: HandlerLoggerConstructorOptions) {
    super({ handlerManagerConfig, ...rest });

    const normalizer = new Normalizer();
    const formatter = new Formatter();
    const nodeConsoleTransporter = new NodeConsoleTransporter({
      normalizer,
      formatter,
    });

    this.transporters.push(nodeConsoleTransporter);
  }
}
