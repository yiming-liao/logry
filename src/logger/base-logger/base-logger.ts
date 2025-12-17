import type { BaseLoggerConstructorOptions } from "@/logger/base-logger/types";
import type { PipelineManager } from "@/logger/pipeline-manager/pipeline-manager";
import type {
  NormalizeConfig,
  FormatConfig,
  RenderConfig,
  PrintConfig,
} from "@/pipeline";
import type { Level } from "@/shared/level";
import type { LogFn } from "@/shared/types/log-fn";
import { shouldLog } from "@/logger/base-logger/utils/should-log";
import { LoggerCore } from "@/logger/logger-core";
import { logPipeline } from "@/pipeline";
import { deepMerge } from "@/shared/utils/deep-merge";
import { resolveScopes } from "@/shared/utils/resolve-scopes";

export class BaseLogger {
  /** Internal core state (id, level, scope, context). */
  protected _core: LoggerCore;
  /** Optional normalization and formatting configs. */
  protected configs: {
    normalizeConfig?: NormalizeConfig;
    formatConfig?: FormatConfig;
    renderConfig?: RenderConfig;
    printConfig?: PrintConfig;
  };
  /** Optional plugin-driven hook manager. */
  protected pluginManager?: PipelineManager;

  constructor({
    normalizeConfig,
    formatConfig,
    renderConfig,
    printConfig,
    ...options
  }: BaseLoggerConstructorOptions = {}) {
    this._core = new LoggerCore(options); // Create LoggerCore
    this.configs = {
      normalizeConfig,
      formatConfig,
      renderConfig,
      printConfig,
    } as const;
  }

  /** Read-only access to the internal logger core. */
  public get core(): Readonly<LoggerCore> {
    return this._core;
  }

  /** Returns all active pipeline hooks (from plugin manager if present). */
  protected get hooks() {
    return this.pluginManager?.getHooks() ?? [];
  }

  /**
   * Internal log dispatcher.
   *
   * - Applies level filtering unless `force` is true
   * - Delegates execution into the log pipeline
   */
  protected log(level: Level, args: unknown[], force?: boolean) {
    if (!force && !shouldLog({ effectiveLevel: this._core.level, level })) {
      return;
    }
    logPipeline({
      hooks: this.hooks,
      level,
      core: this._core,
      configs: this.configs,
      args,
    });
  }

  // Log methods for every levels (Exclude "silent")
  public trace: LogFn = (...args: unknown[]) => this.log("trace", args);
  public debug: LogFn = (...args: unknown[]) => this.log("debug", args);
  public info: LogFn = (...args: unknown[]) => this.log("info", args);
  public warn: LogFn = (...args: unknown[]) => this.log("warn", args);
  public error: LogFn = (...args: unknown[]) => this.log("error", args);
  public fatal: LogFn = (...args: unknown[]) => this.log("fatal", args);

  /** Level-forced variants that bypass filtering. */
  public force: Record<Exclude<Level, "silent">, LogFn> = {
    trace: (...args: unknown[]) => this.log("trace", args, true),
    debug: (...args: unknown[]) => this.log("debug", args, true),
    info: (...args: unknown[]) => this.log("info", args, true),
    warn: (...args: unknown[]) => this.log("warn", args, true),
    error: (...args: unknown[]) => this.log("error", args, true),
    fatal: (...args: unknown[]) => this.log("fatal", args, true),
  };

  /** Creates a new logger inheriting this instance's configuration. */
  child(options: BaseLoggerConstructorOptions = {}): BaseLogger {
    const Constructor = this.constructor as new (
      o: BaseLoggerConstructorOptions,
    ) => BaseLogger;
    const normalizeConfigMerged = deepMerge(
      this.configs.normalizeConfig,
      options.normalizeConfig,
    );
    const formatConfigMerged = deepMerge(
      this.configs.formatConfig,
      options.formatConfig,
    );
    return new Constructor({
      id: options.id ?? this._core.id,
      level: options.level ?? this._core.level,
      scope: resolveScopes(this._core.scope, options.scope),
      context: deepMerge(this._core.context, options.context),
      normalizeConfig: normalizeConfigMerged,
      formatConfig: formatConfigMerged,
    });
  }
}
