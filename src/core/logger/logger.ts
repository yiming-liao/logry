import type {
  ChildOptions,
  BoundLogMethod,
  LogOptions,
  LoggerConstructorOptions,
} from "@/core/logger/logger-types";
import type { RawContext, RawScope } from "@/core/logger/types";
import type { AdditionOptions } from "@/core/logger/utils/merge/merge-inherited-options";
import type { LoggerCore } from "@/core/logger-core/logger-core";
import type { FormatterConfig } from "@/modules/formatters/formatter-config-types";
import type { Handler, HandlerManager } from "@/modules/handlers";
import type { AddHandlerPosition } from "@/modules/handlers/handler-manager/types";
import type { Transporter } from "@/modules/transporters/types";
import type { Level } from "@/shared/types";
import { createBoundLogMethod } from "@/core/logger/utils/create-bound-log-method";
import { createForceMethods } from "@/core/logger/utils/create-force-methods";
import { mergeInheritedOptions } from "@/core/logger/utils/merge/merge-inherited-options";
import { buildPayload } from "@/core/logger/utils/payload/build-payload";
import { transportPayload } from "@/core/logger/utils/payload/transport-payload";
import { NodeFormatter, BrowserFormatter } from "@/modules/formatters";
import { Normalizer, type NormalizerConfig } from "@/modules/normalizers";
import {
  NodeConsoleTransporter,
  BrowserConsoleTransporter,
} from "@/modules/transporters";
import { assertValidLevel } from "@/shared/utils/assert-valid-level";

/**
 * Logger provides scoped, leveled, and formatted logging with optional transport and handlers.
 */
export class Logger {
  private readonly core: LoggerCore;
  private level: Level;
  private readonly scope: RawScope = [];
  private readonly context?: RawContext;
  // Normalizer
  private readonly normalizerConfig: NormalizerConfig;
  private readonly normalizer: Normalizer;
  // Formatter
  private readonly formatterConfig: FormatterConfig;
  private readonly nodeFormatter: NodeFormatter;
  private readonly browserFormatter: BrowserFormatter;
  // HandlerManager
  private readonly handlerManager: HandlerManager;
  // Standard log methods
  public trace!: BoundLogMethod;
  public debug!: BoundLogMethod;
  public info!: BoundLogMethod;
  public warn!: BoundLogMethod;
  public error!: BoundLogMethod;
  public fatal!: BoundLogMethod;
  // Force log methods (bypass level filtering)
  public force: Record<Exclude<Level, "silent">, BoundLogMethod>;
  // Transporters
  private transporters: Transporter[] = [];

  constructor({
    core,
    level,
    scope = [],
    context,
    normalizerConfig,
    formatterConfig,
  }: LoggerConstructorOptions) {
    this.core = core;
    this.level = level ?? core.level;
    this.scope = Array.isArray(scope) ? scope : [scope]; // Ensure scope is always an array
    this.context = context;
    // Bind log method
    const boundLog = this.log.bind(this);
    // Update log methods according to level
    const updateLogMethods = (level: Level) => {
      this.trace = createBoundLogMethod(boundLog, level, "trace");
      this.debug = createBoundLogMethod(boundLog, level, "debug");
      this.info = createBoundLogMethod(boundLog, level, "info");
      this.warn = createBoundLogMethod(boundLog, level, "warn");
      this.error = createBoundLogMethod(boundLog, level, "error");
      this.fatal = createBoundLogMethod(boundLog, level, "fatal");
    };
    updateLogMethods(this.level);
    // Listen to core level changes and update log methods accordingly
    this.core.onLevelChange((newLevel) => {
      this.level = newLevel;
      updateLogMethods(newLevel);
    });
    // Initialize force log methods
    this.force = createForceMethods(boundLog);
    // Normalizer
    this.normalizerConfig = normalizerConfig || {};
    this.normalizer = new Normalizer();
    // Formatter
    this.formatterConfig = formatterConfig || {};
    this.nodeFormatter = new NodeFormatter();
    this.browserFormatter = new BrowserFormatter();
    // HandlerManager
    this.handlerManager = core.handlerManager;
    // Transporters
    this.transporters.push(
      new NodeConsoleTransporter({
        normalizer: this.normalizer,
        formatter: this.nodeFormatter,
      }),
    );
    this.transporters.push(
      new BrowserConsoleTransporter({
        normalizer: this.normalizer,
        formatter: this.browserFormatter,
      }),
    );
  }

  /** Get the LoggerCore instance */
  public getCore(): LoggerCore {
    return this.core;
  }

  /** Merge inherited options with runtime options */
  private mergeInheritedOptions = (additions?: AdditionOptions) => {
    return mergeInheritedOptions(
      {
        scope: this.scope,
        context: this.context,
        normalizerConfig: this.normalizerConfig,
        formatterConfig: this.formatterConfig,
      },
      additions,
    );
  };

  /** Create a child logger */
  child({
    level,
    scope,
    context,
    formatterConfig,
    normalizerConfig,
  }: ChildOptions = {}): Logger {
    assertValidLevel(level);
    const merged = this.mergeInheritedOptions({
      scope,
      context,
      formatterConfig,
      normalizerConfig,
    });
    return new Logger({ core: this.core, level, ...merged });
  }

  /** Core log method, used by all level-specific methods */
  private async log({
    level,
    message,
    meta,
    options,
  }: LogOptions): Promise<void> {
    if (level === "silent") {
      return;
    }
    assertValidLevel(level);

    // Merge inherited options with runtime options.
    const merged = this.mergeInheritedOptions({
      scope: options?.scope,
      context: options?.context,
      formatterConfig: options?.formatterConfig,
      normalizerConfig: options?.normalizerConfig,
    });

    // Build the log payload with all necessary data.
    const rawPayload = buildPayload({
      timestamp: Date.now(),
      level,
      id: this.core.id,
      message,
      meta,
      ...merged,
    });

    // Transport the payload
    transportPayload({ transporters: this.transporters, rawPayload });
    this.handlerManager.runHandlers(rawPayload); // -> Run handlers with rawPayload
  }

  /** Add a log handler to be triggered after dispatch */
  public addHandler(
    handler: Handler,
    id?: string,
    position?: AddHandlerPosition,
  ): string {
    return this.handlerManager.addHandler(handler, id, position);
  }

  /** Remove a log handler with the specified id */
  public removeHandler(id: string): void {
    this.handlerManager.removeHandler(id);
  }

  /** Wait for all async handlers to finish */
  public async flush(timeout?: number): Promise<void> {
    await this.handlerManager.flush(timeout);
  }

  /** Dispose all handlers and flush strategy via the handler manager */
  public async dispose(): Promise<void> {
    await this.handlerManager.dispose();
  }
}
