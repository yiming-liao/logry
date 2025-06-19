import type { RawPayload } from "@/core/logger";
import type { AdditionOptions } from "@/core/logger/utils/merge/merge-inherited-options";
import type {
  NormalizedPayload,
  NormalizerConfig,
} from "@/modules/normalizers";
import type { Platform } from "@/shared/types";
import { mergeInheritedOptions } from "@/core/logger/utils/merge/merge-inherited-options";
import { Normalizer } from "@/modules/normalizers";
import { preparePayload } from "@/shared/utils/prepare-payload";

/**
 * Abstract base class for log handlers.
 * Handles normalization and JSON conversion.
 */
export abstract class BaseHandler {
  abstract platform: Platform;

  /** Must be implemented by subclasses to handle final log delivery. */
  abstract handle(rawPayload: RawPayload): Promise<void>;

  private readonly normalizerConfig: NormalizerConfig;
  protected readonly normalizer: Normalizer;

  /** Init with optional normalizer and formatter configs */
  constructor(options?: { normalizerConfig?: NormalizerConfig }) {
    this.normalizerConfig = options?.normalizerConfig || {};
    this.normalizer = new Normalizer();
  }

  /** Returns the base normalizer config. */
  protected getNormalizerConfig() {
    return this.normalizerConfig;
  }

  /** Merge inherited and runtime options. */
  protected mergeInheritedOptions(additions?: AdditionOptions) {
    return mergeInheritedOptions(
      { normalizerConfig: this.normalizerConfig },
      additions,
    );
  }

  /** Normalizes the raw payload. */
  protected async normalize(
    rawPayload: RawPayload,
  ): Promise<NormalizedPayload> {
    const { normalizerConfig, formatterConfig } = this.mergeInheritedOptions({
      normalizerConfig: rawPayload.normalizerConfig,
      formatterConfig: rawPayload.formatterConfig,
    });

    const { payload } = await preparePayload({
      platform: this.platform,
      rawPayload: { ...rawPayload, normalizerConfig, formatterConfig },
      normalizer: this.normalizer,
    });

    return payload;
  }

  /** Convert raw payload to JSON string, optionally normalized, with indentation */
  protected async toJson(
    rawPayload: RawPayload,
    options?: { useNormalizer?: boolean; space?: number },
  ): Promise<string> {
    const { useNormalizer = false, space = 0 } = options || {};

    const { filteredPayload } = await preparePayload({
      rawPayload,
      useNormalizer,
      normalizer: this.normalizer,
    });

    return `${JSON.stringify(filteredPayload, null, space)}\n`;
  }
}
