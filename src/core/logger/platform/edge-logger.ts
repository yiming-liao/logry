import type { ParentLoggerConstructorOptions } from "@/core/logger/parent-logger";
import { ParentLogger } from "@/core/logger/parent-logger";
import { Formatter } from "@/modules/formatters";
import { Normalizer } from "@/modules/normalizers";
import { EdgeConsoleTransporter } from "@/modules/transporters/edge";

export class EdgeLogger extends ParentLogger {
  constructor({
    handlerManagerConfig,
    ...rest
  }: ParentLoggerConstructorOptions) {
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
