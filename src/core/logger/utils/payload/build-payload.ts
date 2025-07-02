import type { FormatterConfig } from "@/modules/formatters/types";
import type { NormalizerConfig } from "@/modules/normalizers/types";
import type { Level } from "@/shared/types";
import type { RawContext } from "@/shared/types/log-fields";
import type { RawPayload } from "@/shared/types/log-payload";

export type BuildPayloadOptions = {
  timestamp?: number;
  level: Level;
  id?: string;
  message?: string;
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
  id = "",
  message = "",
  meta,
  scope,
  context,
  normalizerConfig,
  formatterConfig,
}: BuildPayloadOptions): RawPayload => {
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
    raw: {
      timestamp,
      level,
      id,
      message,
      scope,
      hasMeta: meta !== undefined,
      hasContext: context !== undefined,
    },
  };
};
