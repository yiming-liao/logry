import type { HandlerLoggerConstructorOptions } from "@/core/logger/handler-logger";
import type { LoggerPreset } from "@/presets";

export interface CreateLoggerOptions extends HandlerLoggerConstructorOptions {
  preset?: LoggerPreset;
}
