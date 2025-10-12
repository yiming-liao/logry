import type { HandlerClass } from "@/core/handler-manager";
import type { FormatterConfig } from "@/modules/formatters/types";
import type { NormalizerConfig } from "@/modules/normalizers/types";
import type { Platform } from "@/shared/types";
import type {
  RawPayload,
  NormalizedPayload,
  FormattedPayload,
} from "@/shared/types/log-payload";
import { Formatter } from "@/modules/formatters";
import { Normalizer } from "@/modules/normalizers";

/**
 * Abstract base class for log handlers.
 * Handles normalization and JSON conversion.
 */
export abstract class BaseHandler implements HandlerClass {
  abstract platform: Platform;

  /** Must be implemented by subclasses to handle final log delivery. */
  abstract handle(rawPayload: RawPayload): Promise<void> | void;

  protected readonly normalizerConfig: NormalizerConfig;
  protected readonly normalizer: Normalizer;
  protected readonly formatterConfig: FormatterConfig;
  protected readonly formatter: Formatter;

  /** Init with optional normalizer and formatter configs */
  constructor(options?: {
    normalizerConfig?: NormalizerConfig;
    formatterConfig?: FormatterConfig;
  }) {
    this.normalizerConfig = options?.normalizerConfig || {};
    this.normalizer = new Normalizer();
    this.formatterConfig = options?.formatterConfig || {};
    this.formatter = new Formatter();
  }

  /** Normalizes the raw payload. */
  protected normalize(rawPayload: RawPayload): NormalizedPayload {
    return this.normalizer.normalize(this.platform, {
      ...rawPayload,
      normalizerConfig: this.normalizerConfig,
    });
  }

  /** Format a normalized payload. */
  protected format(normalized: NormalizedPayload): FormattedPayload {
    return this.formatter.format(this.platform, {
      ...normalized,
      formatterConfig: this.formatterConfig,
    });
  }

  /** Convert raw payload to JSON string, optionally normalized, with indentation */
  protected toJson(
    rawPayload: RawPayload,
    options?: { useNormalizer?: boolean; space?: number },
  ): string {
    const { useNormalizer = false, space = 0 } = options || {};

    let maybeNormalized: RawPayload | NormalizedPayload = rawPayload;

    if (useNormalizer) {
      maybeNormalized = this.normalizer.normalize(this.platform, rawPayload);
    }

    const filteredPayload = {
      timestamp: maybeNormalized.timestamp,
      id: maybeNormalized.id,
      level: maybeNormalized.level,
      pid: Number(maybeNormalized.pid ?? 0),
      hostname: maybeNormalized.hostname ?? "",
      scope: maybeNormalized.scope,
      message: maybeNormalized.message,
      meta: maybeNormalized.meta,
      context: maybeNormalized.context,
    };

    return `${JSON.stringify(filteredPayload, null, space)}\n`;
  }
}
