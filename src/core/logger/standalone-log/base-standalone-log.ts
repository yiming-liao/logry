import type { LogRuntimeOptions } from "@/core/logger/types";
import type { Level } from "@/shared/types";
import type { RawPayload } from "@/shared/types/log-payload";
import { buildPayload } from "@/core/logger/utils/payload/build-payload";

export type StandaloneLogOptions = {
  level: Level;
  message: string;
  meta?: unknown;
  options?: LogRuntimeOptions;
};

export const baseStandaloneLog = ({
  level,
  message,
  meta,
  options = {},
}: StandaloneLogOptions): RawPayload => {
  const scope = options.scope || [];

  // Build the initial payload with all necessary fields
  const rawPayload = buildPayload({
    timestamp: Date.now(),
    id: "",
    level,
    message,
    meta,
    scope: Array.isArray(scope) ? scope : [scope],
    context: options.context,
    normalizerConfig: options.normalizerConfig || {},
    formatterConfig: options.formatterConfig || {},
  });

  return rawPayload;
};
