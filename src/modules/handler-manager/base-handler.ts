import type { RawPayload } from "@/core/logger";
import type { AdditionOptions } from "@/core/logger/utils/merge/merge-inherited-options";
import type {
  FormatterConfig,
  NodeFormattedPayload,
} from "@/modules/formatters";
import type {
  NormalizedPayload,
  NormalizerConfig,
} from "@/modules/normalizers";
import { mergeInheritedOptions } from "@/core/logger/utils/merge/merge-inherited-options";
import { BrowserFormatter, NodeFormatter } from "@/modules/formatters";
import { Normalizer } from "@/modules/normalizers";
import { composeMessage } from "@/modules/transporters/node/utils/compose-message";
import { preparePayload } from "@/shared/utils/prepare-payload";

/**
 * Base class for all log handlers.
 * Includes built-in methods for normalization, formatting, and message composition.
 * Subclasses only need to implement the `handle()` method to define the final log delivery logic.
 */
export abstract class BaseHandler {
  /** Entry point for log processing. */
  abstract handle(rawPayload: RawPayload): Promise<void>;

  private readonly normalizerConfig: NormalizerConfig;
  protected readonly normalizer: Normalizer;
  private readonly formatterConfig: FormatterConfig;
  protected readonly nodeFormatter: NodeFormatter;
  protected readonly browserFormatter: BrowserFormatter;

  /** Init with optional normalizer and formatter configs */
  constructor(options?: {
    normalizerConfig?: NormalizerConfig;
    formatterConfig?: FormatterConfig;
  }) {
    this.normalizerConfig = options?.normalizerConfig || {};
    this.normalizer = new Normalizer();
    this.formatterConfig = options?.formatterConfig || {};
    this.nodeFormatter = new NodeFormatter();
    this.browserFormatter = new BrowserFormatter();
  }

  /** Merge inherited options with runtime options */
  private mergeInheritedOptions = (additions?: AdditionOptions) => {
    return mergeInheritedOptions(
      {
        normalizerConfig: this.normalizerConfig,
        formatterConfig: this.formatterConfig,
      },
      additions,
    );
  };

  /** Normalize raw payload into a standard normalized payload */
  protected async normalize(
    rawPayload: RawPayload,
  ): Promise<NormalizedPayload> {
    const { normalizerConfig, formatterConfig } = this.mergeInheritedOptions({
      normalizerConfig: rawPayload.normalizerConfig,
      formatterConfig: rawPayload.formatterConfig,
    });

    const { payload } = await preparePayload({
      rawPayload: { ...rawPayload, normalizerConfig, formatterConfig },
      normalizer: this.normalizer,
    });

    return payload;
  }

  /** Format normalized payload into formatted payload */
  protected format(normalized: NormalizedPayload): NodeFormattedPayload {
    const { formatterConfig } = this.mergeInheritedOptions({
      formatterConfig: normalized.formatterConfig,
    });
    return this.nodeFormatter.format({ ...normalized, formatterConfig });
  }

  /** Normalize, format, and compose raw payload into a final string message */
  protected async compose(rawPayload: RawPayload): Promise<string> {
    const normalized = await this.normalize(rawPayload);
    const formatted = this.nodeFormatter.format(normalized);
    return composeMessage(formatted);
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
