import {
  ParentLogger,
  type ParentLoggerConstructorOptions,
} from "@/core/logger/parent-logger";
import { Formatter } from "@/modules/formatters";
import { Normalizer } from "@/modules/normalizers";
import { BrowserConsoleTransporter } from "@/modules/transporters";

export class BrowserLogger extends ParentLogger {
  constructor({
    handlerManagerConfig,
    ...rest
  }: ParentLoggerConstructorOptions) {
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
