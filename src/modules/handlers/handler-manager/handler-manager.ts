import type { RawPayload } from "@/core/logger/types";
import type {
  CancelFlushStrategy,
  HandlerErrorHandler,
  HandlerConfig,
} from "@/modules/handlers/handler-manager/handler-config-types";
import type { AddHandlerPosition } from "@/modules/handlers/handler-manager/types";
import type { Handler } from "@/modules/handlers/types";
import { internalLog } from "@/internal";
import { DEFAULT_FLUSH_TIMEOUT } from "@/modules/handlers/handler-manager/constants";
import { executeHandler } from "@/modules/handlers/handler-manager/utils/execute-handler";
import { flushTasksWithTimeout } from "@/modules/handlers/handler-manager/utils/flush-tasks-with-timeout";
import { initHandler } from "@/modules/handlers/handler-manager/utils/init-handler";
import { isHandlerClass } from "@/modules/handlers/handler-manager/utils/is-handler-class";
import { setupFlushStrategy } from "@/modules/handlers/handler-manager/utils/setup-flush-strategy";

export class HandlerManager {
  /** List of registered handlers with unique IDs */
  private handlers: { id: string; handler: Handler }[] = [];
  /** Auto-increment counter for unnamed handlers */
  private idCounter = 0;
  /** Pending async handler tasks mapped to their IDs */
  private pendingTasks = new Map<Promise<void>, string>();

  /** Optional callback when a handler throws an error */
  private onError?: HandlerErrorHandler;
  /** Timeout duration (ms) for flushing pending tasks */
  private flushTimeout: number | undefined;
  /** Cancel function returned by the active flush strategy */
  private cancelFlushStrategy?: CancelFlushStrategy;

  constructor(private config: HandlerConfig = {}) {
    this.setConfig(config);
  }

  /** Get current configuration */
  public getConfig(): HandlerConfig {
    return this.config;
  }

  /** Updates configuration and resets flush strategy */
  public setConfig(config: HandlerConfig): void {
    this.config = { ...this.config, ...config };
    this.onError = this.config.onError;
    this.flushTimeout = this.config.flushTimeout;
    // Cancel previous flush strategy if any
    if (this.cancelFlushStrategy) {
      this.cancelFlushStrategy();
      this.cancelFlushStrategy = undefined;
    }
    // Setup new flush strategy
    if (this.config.flushStrategy) {
      const cancel = setupFlushStrategy({
        flushStrategy: this.config.flushStrategy,
        flush: this.flush.bind(this),
        onError: this.onError,
      });
      if (cancel) {
        this.cancelFlushStrategy = cancel;
      }
    }
  }

  /** Returns all registered handlers as a shallow copy */
  public getHandlers(): readonly { id: string; handler: Handler }[] {
    return [...this.handlers];
  }

  /** Get a handler by id */
  public getHandler(id: string): Handler | undefined {
    return this.handlers.find((h) => h.id === id)?.handler;
  }

  /** Generate unique id */
  private generateUniqueId(): string {
    let id = `handler-${this.idCounter++}`;
    while (this.handlers.some((h) => h.id === id)) {
      id = `handler-${this.idCounter++}`;
    }
    return id;
  }

  /** Registers a new handler (inserted at start or end) */
  public addHandler(
    handler: Handler,
    id?: string,
    position: AddHandlerPosition = "end",
  ): string {
    const fallbackId = id ?? this.generateUniqueId();
    // Insert handler at the start or end of the list
    if (position === "start") {
      this.handlers.unshift({ id: fallbackId, handler });
    } else {
      this.handlers.push({ id: fallbackId, handler });
    }
    // Optional lifecycle init
    initHandler({ handler, id: fallbackId, onError: this.onError });
    // Return id
    return fallbackId;
  }

  /** Executes all handlers with the given log payload */
  public runHandlers(rawPayload: RawPayload): void {
    for (const { id, handler } of this.handlers) {
      const task = executeHandler({
        handler,
        id,
        rawPayload,
        onError: this.onError,
      });
      this.pendingTasks.set(task, id);
      task.finally(() => this.pendingTasks.delete(task));
    }
  }

  /** Remove a handler by its ID */
  public removeHandler(id: string): boolean {
    const index = this.handlers.findIndex((item) => item.id === id);
    if (index === -1) {
      return false;
    }
    this.handlers.splice(index, 1);
    return true;
  }

  /** Waits for all pending handler tasks to complete, with optional timeout */
  public async flush(timeout?: number): Promise<void> {
    timeout = timeout ?? this.flushTimeout ?? DEFAULT_FLUSH_TIMEOUT;
    if (this.pendingTasks.size === 0) {
      return;
    }
    try {
      await flushTasksWithTimeout(this.pendingTasks, timeout);
    } catch (error) {
      const handlerId = (error as Error & { handlerId: string }).handlerId;
      internalLog({
        type: "error",
        tag: "HandlerManager.flush",
        message: `Error occurred while flushing pending handler tasks (handlerId: ${handlerId}, timeout: ${timeout}ms)`,
      });
      this.onError?.({ error, id: handlerId, isFlushError: true });
    } finally {
      this.pendingTasks.clear();
    }
  }

  /** Dispose handlers, flush strategy, and clear resources */
  public async dispose(): Promise<void> {
    this.cancelFlushStrategy?.();
    this.cancelFlushStrategy = undefined;
    await Promise.all(
      this.handlers.map(async ({ id, handler }) => {
        if (isHandlerClass(handler)) {
          try {
            await handler.dispose?.();
          } catch (error) {
            this.onError?.({ error, id });
          }
        }
      }),
    );
    this.handlers = [];
    this.pendingTasks.clear();
    this.onError = undefined;
  }
}
