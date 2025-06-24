import type { HandlerLoggerConstructorOptions } from "@/core/logger/handler-logger";
import type { LoggerCore } from "@/core/logger-core";

/** Options for constructor in Logger  */
export interface CoreLoggerConstructorOptions
  extends HandlerLoggerConstructorOptions {
  core: LoggerCore;
}
