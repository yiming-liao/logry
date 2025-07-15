import type { Handler } from "@/core/handler-manager";
import type { AddHandlerPosition } from "@/core/handler-manager/types";
import type { HandlerLoggerConstructorOptions } from "@/core/logger/handler-logger";
import type { RawPayload } from "@/shared/types/log-payload";
import { HandlerManager } from "@/core/handler-manager";
import { BaseLogger } from "@/core/logger/base-logger/base-logger";
import { createForceMethods } from "@/core/logger/utils/create-force-methods";

export class HandlerLogger extends BaseLogger {
  // HandlerManager
  protected handlerManager: HandlerManager;

  constructor({
    level,
    scope = [],
    context,
    normalizerConfig,
    formatterConfig,
    handlerManagerConfig,
  }: HandlerLoggerConstructorOptions) {
    super({ level, scope, context, normalizerConfig, formatterConfig });
    const boundLog = this.log.bind(this);
    // Update log methods according to level
    this.updateLogMethods(boundLog, this.level);
    // Initialize force log methods
    this.force = createForceMethods(boundLog);
    // HandlerManager
    this.handlerManager = new HandlerManager(handlerManagerConfig);
  }

  /** Get all handlers (shallow copy) */
  public getHandlers(): readonly { id: string; handler: Handler }[] {
    return this.handlerManager.getHandlers();
  }

  /** Get handler by ID */
  public getHandler(id: string): { id: string; handler: Handler } | undefined {
    return this.handlerManager.getHandler(id);
  }

  /** Add a log handler */
  public addHandler(
    handler: Handler,
    id: string,
    position?: AddHandlerPosition,
  ): boolean {
    return this.handlerManager.addHandler(handler, id, position);
  }

  /** Remove a log handler by ID */
  public removeHandler(id: string): void {
    this.handlerManager.removeHandler(id);
  }

  /** Called after log payload is transported */
  protected afterTransport(rawPayload: RawPayload): void {
    this.handlerManager.runHandlers(rawPayload);
  }

  /** Wait for all async handlers to complete */
  public async flush(timeout?: number): Promise<void> {
    await this.handlerManager.flush(timeout);
  }

  /** Dispose all handlers and resources */
  public async dispose(): Promise<void> {
    await this.handlerManager.dispose();
  }
}
