import type { FormatterConfig } from "@/modules/formatters/types";
import type { NormalizerConfig } from "@/modules/normalizers/types";
import type { Platform } from "@/shared/types";
import type { RawPayload } from "@/shared/types/log-payload";
import { BaseHandler } from "@/handlers/base-handler";
import { composeMessage } from "@/modules/transporters/node/utils/compose-message";
import { appendProcessFields as append } from "@/shared/utils/node/append-process-fields";
import { getOs } from "@/shared/utils/node/lazy-modules";

/**
 * Abstract base class for Node.js log handlers.
 */
export abstract class NodeHandler extends BaseHandler {
  public platform: Platform = "node";

  /** Initialize with optional normalizer and formatter configs. */
  constructor(
    options: {
      normalizerConfig?: NormalizerConfig;
      formatterConfig?: FormatterConfig;
    } = {},
  ) {
    super(options);
  }

  /** Append process-related fields (e.g., pid, hostname) into the raw payload. */
  protected async appendProcessFields(
    rawPayload: RawPayload,
  ): Promise<RawPayload> {
    return append(getOs, rawPayload);
  }

  /** Normalize, format, and compose raw payload into a string. */
  protected async compose(
    rawPayload: RawPayload,
    useAnsiColor = false,
  ): Promise<string> {
    const appendedPayload = await this.appendProcessFields(rawPayload);
    const normalized = this.normalize(appendedPayload);
    const formatted = this.format(normalized);
    return composeMessage(formatted, useAnsiColor);
  }
}
