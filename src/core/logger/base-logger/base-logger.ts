import type { BaseLoggerConstructorOptions } from "@/core/logger/base-logger/types";
import type { AdditionOptions } from "@/core/logger/base-logger/utils/merge/merge-with-core-options";
import type { LogOverloads, LogOptions } from "@/core/logger/types";
import type { Transporter } from "@/modules/transporters";
import type { Level } from "@/shared/types";
import type { RawPayload } from "@/shared/types/log-payload";
import { logAtLevel } from "@/core/logger/base-logger/utils/log-at-level";
import { mergeWithCoreOptions } from "@/core/logger/base-logger/utils/merge/merge-with-core-options";
import { createForceMethods } from "@/core/logger/utils/create-force-methods";
import { buildPayload } from "@/core/logger/utils/payload/build-payload";
import { transportPayload } from "@/core/logger/utils/payload/transport-payload";
import { LoggerCore } from "@/core/logger-core";
import { assertValidLevel } from "@/shared/utils/assert-valid-level";

export class BaseLogger {
  protected _core: LoggerCore;
  protected transporters: Transporter[] = [];
  public force: Record<Exclude<Level, "silent">, LogOverloads>; // Force log methods (bypass level filtering)

  constructor({ ...options }: BaseLoggerConstructorOptions) {
    this._core = new LoggerCore(options); // Create LoggerCore
    this.log = this.log.bind(this); // Bind log with `this`
    this.force = createForceMethods(this.log, this._core.id); // Create force log methods
  }

  /** Get current logger config (read-only snapshot) */
  public get core() {
    return {
      ...this._core,
      scope: [...this._core.scope],
      context: { ...this._core.context },
      normalizerConfig: { ...this._core.normalizerConfig },
      formatterConfig: { ...this._core.formatterConfig },
      handlerManagerConfig: { ...this._core.handlerManagerConfig },
    };
  }

  // Log methods for every levels (Exclude "silent")
  public trace: LogOverloads = (...args: unknown[]) => {
    logAtLevel({ level: "trace", log: this.log, core: this._core, args });
  };
  public debug: LogOverloads = (...args: unknown[]) => {
    logAtLevel({ level: "debug", log: this.log, core: this._core, args });
  };
  public info: LogOverloads = (...args: unknown[]) => {
    logAtLevel({ level: "info", log: this.log, core: this._core, args });
  };
  public warn: LogOverloads = (...args: unknown[]) => {
    logAtLevel({ level: "warn", log: this.log, core: this._core, args });
  };
  public error: LogOverloads = (...args: unknown[]) => {
    logAtLevel({ level: "error", log: this.log, core: this._core, args });
  };
  public fatal: LogOverloads = (...args: unknown[]) => {
    logAtLevel({ level: "fatal", log: this.log, core: this._core, args });
  };

  /** Merge the current core options with given overrides */
  protected mergeOptions = (additions?: AdditionOptions) => {
    return mergeWithCoreOptions(this._core, additions);
  };

  /** Core log method, used by all level-specific methods */
  protected log({ id, level, message, meta, options }: LogOptions): void {
    if (level === "silent") return;
    assertValidLevel(level);

    // Merge core options with runtime options
    const mergedOptions = this.mergeOptions({ ...options });
    // Build the log payload with all necessary data
    const rawPayload = buildPayload({
      timestamp: Date.now(),
      level,
      id,
      message,
      meta,
      ...mergedOptions,
    });

    // Transport the payload
    transportPayload({ transporters: this.transporters, rawPayload });
    this.afterTransport?.(rawPayload);
  }

  /** Called after payload is transported */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected afterTransport(_rawPayload: RawPayload): void {}
}
