import type { FormatterConfig } from "@/modules/formatters/types";
import type { NormalizerConfig } from "@/modules/normalizers/types";
import type { Platform } from "@/shared/types";
import type { RawPayload } from "@/shared/types/log-payload";
import { BaseHandler } from "@/handlers/base-handler";
import { composeMessage } from "@/modules/transporters/edge/utils/compose-message";

/**
 * Abstract base class for Edge log handlers.
 */
export abstract class EdgeHandler extends BaseHandler {
  public platform: Platform = "edge";

  /** Initialize with optional normalizer and formatter configs. */
  constructor(
    options: {
      normalizerConfig?: NormalizerConfig;
      formatterConfig?: FormatterConfig;
    } = {},
  ) {
    super(options);
  }

  /** Normalize, format, and compose raw payload into a string. */
  protected compose(rawPayload: RawPayload): string {
    const normalized = this.normalize(rawPayload);
    const formatted = this.format(normalized);
    return composeMessage(formatted);
  }
}
