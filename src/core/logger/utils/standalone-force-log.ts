import type { LogRuntimeOptions } from "@/core/logger/logger-types";
import type { Level } from "@/shared/types";
import { buildPayload } from "@/core/logger/utils/payload/build-payload";
import { transportPayload } from "@/core/logger/utils/payload/transport-payload";
import { NodeFormatter, BrowserFormatter } from "@/modules/formatters";
import { Normalizer } from "@/modules/normalizers";
import {
  NodeConsoleTransporter,
  BrowserConsoleTransporter,
} from "@/modules/transporters";

// Default formatter, normalizer, and transporters used only within this standalone logging function
const normalizer = new Normalizer();
const nodeFormatter = new NodeFormatter();
const browserFormatter = new BrowserFormatter();
const transporters = [
  new NodeConsoleTransporter({ normalizer, formatter: nodeFormatter }),
  new BrowserConsoleTransporter({ normalizer, formatter: browserFormatter }),
];

type StandaloneForceLogOptions = {
  level: Level;
  message: string;
  meta?: unknown;
  options?: LogRuntimeOptions;
};

/**
 * Logs a message immediately, bypassing any log level filtering.
 * Outputs to both Node and Browser console transporters by default.
 *
 * @param level - The log severity level.
 * @param message - The main log message string.
 * @param meta - Optional additional data.
 * @param options - Optional runtime settings (scope, context, configs).
 */
export const standaloneForceLog = ({
  level,
  message,
  meta,
  options = {},
}: StandaloneForceLogOptions): void => {
  const scope = options.scope || [];
  const context = options.context || {};

  // Build the initial payload with all necessary fields
  const rawPayload = buildPayload({
    timestamp: Date.now(),
    id: "",
    level,
    message,
    meta,
    scope: Array.isArray(scope) ? scope : [scope],
    context,
    normalizerConfig: options.normalizerConfig || {},
    formatterConfig: options.formatterConfig || {},
  });

  // Transport the final payload to appropriate destinations
  transportPayload({ transporters, rawPayload });
};
