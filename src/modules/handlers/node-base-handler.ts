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
import type { Platform } from "@/shared/types";
import { mergeInheritedOptions } from "@/core/logger/utils/merge/merge-inherited-options";
import { NodeFormatter } from "@/modules/formatters";
import { BaseHandler } from "@/modules/handlers/base-handler";
import { composeMessage } from "@/modules/transporters/node/utils/compose-message";

/**
 * Abstract base class for Node.js log handlers.
 * Handles normalization, formatting, and message composition.
 */
export abstract class NodeBaseHandler extends BaseHandler {
  public platform: Platform = "node";
  protected readonly formatterConfig: FormatterConfig;
  protected readonly nodeFormatter: NodeFormatter;

  /** Initialize with optional normalizer and formatter configs. */
  constructor(options?: {
    normalizerConfig?: NormalizerConfig;
    formatterConfig?: FormatterConfig;
  }) {
    super({ normalizerConfig: options?.normalizerConfig });
    this.formatterConfig = options?.formatterConfig || {};
    this.nodeFormatter = new NodeFormatter();
  }

  /** Merge inherited and runtime options. */
  protected override mergeInheritedOptions(additions?: AdditionOptions) {
    return mergeInheritedOptions(
      {
        normalizerConfig: this.getNormalizerConfig(),
        formatterConfig: this.formatterConfig,
      },
      additions,
    );
  }

  /** Format a normalized payload. */
  protected format(normalized: NormalizedPayload): NodeFormattedPayload {
    const { formatterConfig } = this.mergeInheritedOptions({
      formatterConfig: normalized.formatterConfig,
    });
    return this.nodeFormatter.format({ ...normalized, formatterConfig });
  }

  /** Normalize, format, and compose raw payload into a string. */
  protected async compose(rawPayload: RawPayload): Promise<string> {
    const normalized = await this.normalize(rawPayload);
    const formatted = this.nodeFormatter.format(normalized);
    return composeMessage(formatted);
  }
}
