import type { LoggerCore } from "../core/logger-core";
import type { HandlerManager } from "../handler/handler-manager";
import type { HandlerConfig } from "../handler/handler-types";
import type { OutputConfig } from "../output-config-types";
import type { LogLevel, LogMethod, LogOptions } from "../types";
import type { LogPayload } from "../types";
import { dispatchLog } from "../log-pipeline/dispatch";
import { createForceMethods } from "./utils/create-force-methods";
import { createLogWithLevel } from "./utils/create-log-with-level";
import { mergeContexts } from "./utils/merge-contexts";
import { mergeOutputConfig } from "./utils/merge-output-config";

/**
 * Logger provides log methods with context, level, and output customization.
 */
export class Logger {
  private readonly level: LogLevel;
  private readonly context: string | undefined;
  private readonly outputConfig?: OutputConfig;
  /** HandlerManager is managed solely by LoggerCore. */
  private readonly handlerManager: HandlerManager;
  /** Helper to generate log methods based on level. */
  private logWithLevel: (level: Exclude<LogLevel, "silent">) => LogMethod;
  // Standard log methods
  public error: LogMethod;
  public warn: LogMethod;
  public info: LogMethod;
  public debug: LogMethod;
  /** Force log methods (bypass level filtering). */
  public force: Record<Exclude<LogLevel, "silent">, LogMethod>;

  constructor(
    private readonly core: LoggerCore,
    level?: LogLevel,
    context?: string,
    outputConfig?: OutputConfig,
  ) {
    this.level = level ?? core.level;
    this.context = context;
    this.outputConfig = outputConfig;
    this.handlerManager = core.handlerManager;
    // Create log methods
    this.logWithLevel = createLogWithLevel(this.log.bind(this), this.level);
    this.error = this.logWithLevel("error");
    this.warn = this.logWithLevel("warn");
    this.info = this.logWithLevel("info");
    this.debug = this.logWithLevel("debug");
    // Create force log methods
    this.force = createForceMethods(this.log.bind(this));
  }

  /**
   * Resolve and merge output configuration from multiple levels.
   */
  private resolveOutputConfig(outputConfig?: OutputConfig): OutputConfig {
    return mergeOutputConfig(
      this.core.outputConfig, // Core config
      this.outputConfig, // Instance-level override
      outputConfig, // Method-level override
    );
  }

  /**
   * Create a child logger with optional overrides.
   */
  child({
    level = this.level,
    context,
    outputConfig = this.outputConfig,
  }: {
    level?: LogLevel;
    context?: string;
    outputConfig?: OutputConfig;
    handlerConfig?: HandlerConfig;
    handlerManager?: HandlerManager;
  } = {}): Logger {
    const combinedContext = mergeContexts(this.context, context);
    const mergedOutputConfig = this.resolveOutputConfig(outputConfig);
    return new Logger(this.core, level, combinedContext, mergedOutputConfig);
  }

  /**
   * Core log method. Used by all level-specific methods.
   */
  private log(
    level: LogLevel,
    message: string,
    meta?: unknown,
    options?: LogOptions,
  ): void {
    const mergedOutputConfig = this.resolveOutputConfig(options?.outputConfig);
    const logPayload: LogPayload = {
      level,
      id: this.core.id,
      context: options?.context || this.context,
      message,
      meta,
      outputConfig: mergedOutputConfig,
    };

    dispatchLog(logPayload); // -> Send to pipeline
    this.handlerManager.runHandlers(logPayload); // -> Run handlers
  }

  /**
   * Add a log handler to be triggered after dispatch.
   */
  public addHandler(
    handler: (payload: LogPayload) => void | Promise<void>,
    id?: string,
  ): void {
    this.handlerManager.addHandler(handler, id);
  }

  /**
   * Remove a log handler with the specified id.
   */
  public removeHandler(id: string): void {
    this.handlerManager.removeHandler(id);
  }

  /**
   * Wait for all async handlers to finish (useful before exit).
   */
  public async flush(timeout?: number): Promise<void> {
    await this.handlerManager.flush(timeout);
  }

  /**
   * Dispose of the handlerManager's flush strategy (Customized).
   * This is important for cleanup, especially in long-running applications.
   */
  public dispose(): void {
    this.handlerManager.dispose();
  }
}
