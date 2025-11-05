import type { Handler } from "@/core/handler-manager";
import type { AddHandlerPosition } from "@/core/handler-manager/types";
import type { HandlerLoggerConstructorOptions } from "@/core/logger/handler-logger";
import type { RawPayload } from "@/shared/types/log-payload";
import { HandlerManager } from "@/core/handler-manager";
import { BaseLogger } from "@/core/logger/base-logger/base-logger";

export class HandlerLogger extends BaseLogger {
  protected handlerManager: HandlerManager;
  protected disposed = false;

  constructor({
    handlerManagerConfig,
    ...rest
  }: HandlerLoggerConstructorOptions) {
    super({ ...rest });
    this.handlerManager = new HandlerManager(handlerManagerConfig);
  }

  /** Get all handlers (shallow copy) */
  public getHandlers(): ReadonlyArray<{ id: string; handler: Handler }> {
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
    if (this.disposed) return;
    this.handlerManager.runHandlers(rawPayload);
  }

  /** Wait for all async handlers to complete */
  public async flush(timeout?: number): Promise<void> {
    await this.handlerManager.flush(timeout);
  }

  /** Dispose all handlers and resources */
  public async dispose(): Promise<void> {
    this.disposed = true;
    await this.handlerManager.dispose();
  }
}
