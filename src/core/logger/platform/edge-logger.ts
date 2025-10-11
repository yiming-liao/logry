import type { HandlerLoggerConstructorOptions } from "@/core/logger/handler-logger";
import { HandlerLogger } from "@/core/logger/handler-logger";
import { Formatter } from "@/modules/formatters";
import { Normalizer } from "@/modules/normalizers";
import { EdgeConsoleTransporter } from "@/modules/transporters/edge";

export class EdgeLogger extends HandlerLogger {
  constructor({
    handlerManagerConfig,
    ...rest
  }: HandlerLoggerConstructorOptions) {
    super({ handlerManagerConfig, ...rest });

    const normalizer = new Normalizer();
    const formatter = new Formatter();
    const edgeConsoleTransporter = new EdgeConsoleTransporter({
      normalizer,
      formatter,
    });

    this.transporters.push(edgeConsoleTransporter);
  }
}
