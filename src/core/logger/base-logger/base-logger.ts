import type { BaseLoggerConstructorOptions } from "@/core/logger/base-logger/base-logger-types";
import type { AdditionOptions } from "@/core/logger/base-logger/utils/merge/merge-inherited-options";
import type { BoundLogMethod, LogOptions } from "@/core/logger/types";
import type { FormatterConfig } from "@/modules/formatters/types";
import type { NormalizerConfig } from "@/modules/normalizers/types";
import type { Transporter } from "@/modules/transporters/types";
import type { Level } from "@/shared/types";
import type { RawContext, RawScope } from "@/shared/types/log-fields";
import type { RawPayload } from "@/shared/types/log-payload";
import { createBoundLogMethod } from "@/core/logger/base-logger/utils/create-bound-log-method";
import { mergeInheritedOptions } from "@/core/logger/base-logger/utils/merge/merge-inherited-options";
import { createForceMethods } from "@/core/logger/utils/create-force-methods";
import { buildPayload } from "@/core/logger/utils/payload/build-payload";
import { transportPayload } from "@/core/logger/utils/payload/transport-payload";
import { Formatter } from "@/modules/formatters";
import { Normalizer } from "@/modules/normalizers";
import { DEFAULT_LOGGER_LEVEL } from "@/shared/constants";
import { assertValidLevel } from "@/shared/utils/assert-valid-level";

export class BaseLogger {
  protected level: Level;
  protected readonly scope: RawScope = [];
  protected readonly context?: RawContext;
  // Normalizer
  private readonly normalizerConfig: NormalizerConfig;
  protected readonly normalizer: Normalizer;
  // Formatter
  private readonly formatterConfig: FormatterConfig;
  protected readonly formatter: Formatter;
  // Transporters
  protected transporters: Transporter[] = [];
  // Standard log methods
  public trace!: BoundLogMethod;
  public debug!: BoundLogMethod;
  public info!: BoundLogMethod;
  public warn!: BoundLogMethod;
  public error!: BoundLogMethod;
  public fatal!: BoundLogMethod;
  // Force log methods (bypass level filtering)
  public force: Record<Exclude<Level, "silent">, BoundLogMethod>;

  constructor({
    level,
    scope = [],
    context,
    normalizerConfig,
    formatterConfig,
  }: BaseLoggerConstructorOptions) {
    this.level = level || DEFAULT_LOGGER_LEVEL;
    this.scope = Array.isArray(scope) ? scope : [scope]; // Ensure scope is always an array
    this.context = context;
    // Normalizer
    this.normalizerConfig = normalizerConfig || {};
    this.normalizer = new Normalizer();
    // Formatter
    this.formatterConfig = formatterConfig || {};
    this.formatter = new Formatter();
    // Bind log method
    const boundLog = this.log.bind(this);
    // Update log methods according to level
    this.updateLogMethods(boundLog, this.level);
    // Initialize force log methods
    this.force = createForceMethods(boundLog);
  }

  /** Bind standard log methods for each log level */
  protected updateLogMethods(
    boundLog: (logOptions: LogOptions) => void,
    level: Level,
    id?: string,
  ) {
    this.trace = createBoundLogMethod(boundLog, level, "trace", id);
    this.debug = createBoundLogMethod(boundLog, level, "debug", id);
    this.info = createBoundLogMethod(boundLog, level, "info", id);
    this.warn = createBoundLogMethod(boundLog, level, "warn", id);
    this.error = createBoundLogMethod(boundLog, level, "error", id);
    this.fatal = createBoundLogMethod(boundLog, level, "fatal", id);
  }

  /** Merge inherited options with runtime options */
  protected mergeInheritedOptions = (additions?: AdditionOptions) => {
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

  /** Core log method, used by all level-specific methods */
  protected log({ id, level, message, meta, options }: LogOptions): void {
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
      id,
      message,
      meta,
      ...merged,
    });

    // Transport the payload
    transportPayload({ transporters: this.transporters, rawPayload });
    this.afterTransport?.(rawPayload);
  }

  /** Called after payload is transported. */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected afterTransport(_rawPayload: RawPayload): void {}
}
