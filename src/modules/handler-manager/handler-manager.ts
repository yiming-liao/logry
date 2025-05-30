import type { ErrorCallback, Handler, HandlerConfig } from "./handler-types";
import type { RawPayload } from "@/core/logger/types";
import { withTimeout } from "./utils/with-timeout";
import { DEFAULT_FLUSH_TIMEOUT } from "@/modules/handler-manager/constants";

export class HandlerManager {
  /** List of registered handlers with unique IDs */
  private handlers: { id: string; handler: Handler }[] = [];
  /** Pending async handler tasks mapped to their IDs */
  private pendingTasks = new Map<Promise<void>, string>();
  /** Optional callback when a handler throws an error */
  private onError?: ErrorCallback;
  /** Timeout duration (ms) for flushing pending tasks */
  private flushTimeout: number | undefined;
  /** Auto-increment counter for unnamed handlers */
  private idCounter = 0;
  /** Cancel function returned by the active flush strategy */
  private flushStrategyCancel?: () => void;

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
    if (this.flushStrategyCancel) {
      this.flushStrategyCancel();
      this.flushStrategyCancel = undefined;
    }
    // Setup new flush strategy if provided
    const strategy = this.config.flushStrategy;
    if (strategy) {
      const cancel = strategy(() => this.flush());
      if (typeof cancel === "function") {
        this.flushStrategyCancel = cancel;
      }
    }
  }

  /** Registers a new handler (inserted at start or end) */
  public addHandler(
    handler: Handler,
    id?: string,
    position?: "start" | "end",
  ): void {
    let fallbackId = id ?? `handler-${this.idCounter++}`;
    while (this.handlers.some((h) => h.id === fallbackId)) {
      fallbackId = `handler-${this.idCounter++}`;
    }
    if (position === "start") {
      this.handlers.unshift({ id: fallbackId, handler });
    } else {
      this.handlers.push({ id: fallbackId, handler });
    }
  }

  /** Returns all registered handlers as a shallow copy */
  public getHandlers(): readonly { id: string; handler: Handler }[] {
    return [...this.handlers];
  }

  /** Executes all handlers with the given log payload */
  public runHandlers(payload: RawPayload): void {
    for (const { id, handler } of this.handlers) {
      const task = Promise.resolve()
        .then(() => handler(payload))
        .catch((error) => {
          // Call error callback on handler failure
          this.onError?.(error, id);
        });
      this.pendingTasks.set(task, id);
      // Remove task from pending when done
      task.finally(() => this.pendingTasks.delete(task));
    }
  }

  /** Remove a handler by its ID */
  public removeHandler(id: string): boolean {
    const index = this.handlers.findIndex((item) => item.id === id);
    if (index === -1) return false;
    this.handlers.splice(index, 1);
    return true;
  }

  /** Waits for all pending handler tasks to complete, with optional timeout */
  public async flush(timeout?: number): Promise<void> {
    timeout = timeout ?? this.flushTimeout ?? DEFAULT_FLUSH_TIMEOUT;
    const tasks = Array.from(this.pendingTasks.keys());
    if (tasks.length === 0) return Promise.resolve();

    try {
      if (timeout > 0) {
        // Await all tasks with timeout
        await Promise.all(tasks.map((task) => withTimeout(task, timeout)));
      } else {
        // Await all tasks without timeout
        await Promise.allSettled(tasks);
      }
    } catch (error) {
      // Call error callback on flush timeout or failure
      this.onError?.(error, "flushTimeout");
    } finally {
      this.pendingTasks.clear();
    }
  }

  /** Cleans up all resources, handlers, and active flush strategy */
  public dispose(): void {
    this.flushStrategyCancel?.();
    this.flushStrategyCancel = undefined;
    this.handlers = [];
    this.pendingTasks.clear();
    this.onError = undefined;
  }
}
