import type { RawContext, RawPayload } from "@/core/logger/types";
import type { FormatterConfig } from "@/modules/formatters/formatter-config-types";
import type { NormalizerConfig } from "@/modules/normalizers";
import type { Level } from "@/shared/types";
import { internalError } from "@/internal";

export type BuildPayloadOptions = {
  timestamp?: number;
  level: Level;
  id: string;
  message: string;
  meta?: unknown;
  scope: string[];
  context?: RawContext;
  normalizerConfig: NormalizerConfig;
  formatterConfig: FormatterConfig;
};

/**
 * Build a complete log payload from given options.
 * Ensures required fields are present and attaches raw snapshot.
 */
export const buildPayload = ({
  timestamp = Date.now(),
  level,
  id,
  message,
  meta,
  scope,
  context,
  normalizerConfig,
  formatterConfig,
}: BuildPayloadOptions): RawPayload => {
  // Reject empty or whitespace-only messages
  if (!message?.trim()) {
    return internalError({
      message: "Message is required and cannot be empty.",
    });
  }

  return {
    timestamp,
    level,
    id,
    message,
    meta,
    scope,
    context,
    normalizerConfig,
    formatterConfig,
    raw: { timestamp, level, id, message, scope }, // Snapshot for unformatted/raw output
  };
};
