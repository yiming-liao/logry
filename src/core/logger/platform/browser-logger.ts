import type { HandlerLoggerConstructorOptions } from "@/core/logger/handler-logger";
import { HandlerLogger } from "@/core/logger/handler-logger";
import { Formatter } from "@/modules/formatters";
import { Normalizer } from "@/modules/normalizers";
import { BrowserConsoleTransporter } from "@/modules/transporters";

export class BrowserLogger extends HandlerLogger {
  constructor({
    handlerManagerConfig,
    ...rest
  }: HandlerLoggerConstructorOptions) {
    super({ handlerManagerConfig, ...rest });

    const normalizer = new Normalizer();
    const formatter = new Formatter();
    const browserConsoleTransporter = new BrowserConsoleTransporter({
      normalizer,
      formatter,
    });

    this.transporters.push(browserConsoleTransporter);
  }
}
