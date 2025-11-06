import type { ParentLoggerConstructorOptions } from "./types";
import type { ChildOptions } from "@/core/logger/types";
import { HandlerLogger } from "@/core/logger/handler-logger";

export class ParentLogger extends HandlerLogger {
  constructor({ ...rest }: ParentLoggerConstructorOptions) {
    super({ ...rest });
  }

  /** Protected factory so subclasses return correct instance type */
  protected createInstance(options: ParentLoggerConstructorOptions): this {
    const Constructor = this.constructor as new (
      o: ParentLoggerConstructorOptions,
    ) => this;
    const instance = new Constructor(options);
    // Transporter list copied, but each transporter instance shared
    instance.transporters = [...this.transporters];
    // Child inherits same handler manager (shared)
    instance.handlerManager = this.handlerManager;
    return instance;
  }

  // NOTE: child loggers share the same handlerManager (includes handlers) and transporters.
  /** Create a child logger */
  child({ id, level, handlerManagerConfig, ...rest }: ChildOptions = {}): this {
    const mergedOptions = this.mergeOptions({ ...rest });
    const child = this.createInstance({
      ...mergedOptions,
      id: id ?? this.core.id,
      level: level ?? this.core.level,
      handlerManagerConfig:
        handlerManagerConfig ?? this.core.handlerManagerConfig,
    });
    return child;
  }
}
