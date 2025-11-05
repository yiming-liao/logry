import type { ParentLoggerConstructorOptions } from "@/core/logger/parent-logger";
import { ParentLogger } from "@/core/logger/parent-logger";
import { Formatter } from "@/modules/formatters";
import { Normalizer } from "@/modules/normalizers";
import {
  BrowserConsoleTransporter,
  NodeConsoleTransporter,
} from "@/modules/transporters";

export class UniversalLogger extends ParentLogger {
  constructor({
    handlerManagerConfig,
    ...rest
  }: ParentLoggerConstructorOptions) {
    super({ handlerManagerConfig, ...rest });

    const normalizer = new Normalizer();
    const formatter = new Formatter();
    const nodeConsoleTransporter = new NodeConsoleTransporter({
      normalizer,
      formatter,
    });
    const browserConsoleTransporter = new BrowserConsoleTransporter({
      normalizer,
      formatter,
    });

    this.transporters.push(nodeConsoleTransporter, browserConsoleTransporter);
  }
}
