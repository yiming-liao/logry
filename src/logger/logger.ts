import type { LoggerCore } from "../core/logger-core";
import type { HandlerManager } from "../handler/handler-manager";
import type { OutputConfig } from "../output-config-types";
import type { Context, LogLevel, LogMethod, LogOptions, Scope } from "../types";
import type { LogPayload } from "../types";
import { dispatchLog } from "../log-pipeline/dispatch";
import { createForceMethods } from "./utils/create-force-methods";
import { createLogWithLevel } from "./utils/create-log-with-level";
import { mergeContexts } from "./utils/merge-contexts";
import { mergeOutputConfig } from "./utils/merge-output-config";
import { mergeScopes } from "./utils/merge-scopes";

/**
 * Logger provides log methods with scope, level, and output customization.
 */
export class Logger<TContext extends Context = Context> {
  private readonly core: LoggerCore;
  private readonly level: LogLevel;
  private readonly scope: Scope = [];
  private readonly context?: TContext;
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

  constructor({
    core,
    level,
    scope = [],
    context,
    outputConfig,
  }: {
    core: LoggerCore;
    level?: LogLevel;
    scope?: Scope;
    context?: TContext;
    outputConfig?: OutputConfig;
  }) {
    this.core = core;
    this.level = level ?? core.level;
    this.scope = Array.isArray(scope) ? scope : [scope];
    this.context = context;
    this.outputConfig = mergeOutputConfig(this.core.outputConfig, outputConfig);
    this.handlerManager = core.handlerManager;
    // Create log methods
    this.logWithLevel = createLogWithLevel(
      this.log.bind(this),
      () => level ?? this.core.level,
    );
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
    return mergeOutputConfig(this.outputConfig, outputConfig);
  }

  /**
   * Create a child logger with optional overrides.
   */
  child<TChildContext extends Context = TContext>({
    level = this.level,
    scope,
    context,
    outputConfig = this.outputConfig,
  }: {
    level?: LogLevel;
    scope?: string | string[];
    context?: TChildContext;
    outputConfig?: OutputConfig;
  } = {}): Logger {
    const combinedScope = mergeScopes(this.scope, scope);
    const combinedContext = mergeContexts(this.context, context);
    const mergedOutputConfig = this.resolveOutputConfig(outputConfig);
    return new Logger<TChildContext>({
      core: this.core,
      level,
      scope: combinedScope,
      context: combinedContext,
      outputConfig: mergedOutputConfig,
    });
  }

  /**
   * Core log method. Used by all level-specific methods.
   */
  private log({
    level,
    message,
    meta,
    options,
  }: {
    level: LogLevel;
    message: string;
    meta?: unknown;
    options?: LogOptions;
  }): void {
    const combinedScope = mergeScopes(this.scope, options?.scope);
    const combinedContext = mergeContexts(this.context, options?.context);
    const mergedOutputConfig = this.resolveOutputConfig(options?.outputConfig);
    const logPayload: LogPayload = {
      level,
      id: this.core.id,
      scope: combinedScope,
      message,
      meta,
      context: combinedContext,
      outputConfig: mergedOutputConfig,
    };

    dispatchLog(logPayload); // -> Send to log-pipeline
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
