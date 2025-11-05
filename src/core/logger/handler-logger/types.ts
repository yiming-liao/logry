import type { HandlerManagerConfig } from "@/core/handler-manager";
import type { BaseLoggerConstructorOptions } from "@/core/logger/base-logger";

/** Options for constructor in Logger  */
export interface HandlerLoggerConstructorOptions
  extends BaseLoggerConstructorOptions {
  handlerManagerConfig?: HandlerManagerConfig;
}
