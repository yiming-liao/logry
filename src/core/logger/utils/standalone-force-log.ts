import type { LogRuntimeOptions } from "@/core/logger/logger-types";
import type { Level } from "@/shared/types";
import { buildPayload } from "@/core/logger/utils/payload/build-payload";
import { formatPayload } from "@/core/logger/utils/payload/format-payload";
import { normalizePayload } from "@/core/logger/utils/payload/normalize-payload";
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
  new NodeConsoleTransporter(),
  new BrowserConsoleTransporter(),
];

type StandaloneForceLogOptions = {
  level: Level;
  message: string;
  meta?: unknown;
  options?: LogRuntimeOptions;
};

/**
 * Log a message directly without checking log levels.
 * By default, logs to Node and Browser consoles.
 *
 * @param level - Log level of the message.
 * @param message - Log message string.
 * @param meta - Optional metadata.
 * @param options - Optional runtime options.
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
  const logPayload = buildPayload({
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

  // Normalize the payload based on the environment
  const normalizedPayload = normalizePayload(normalizer.normalize, logPayload);

  // Format the normalized payload (optional)
  const payloadToSend = formatPayload({
    normalizedPayload,
    formatterConfig: normalizedPayload.formatterConfig,
    nodeFormatter,
    browserFormatter,
  });

  // Transport the final payload to appropriate destinations
  transportPayload({ transporters, readyPayload: payloadToSend });
};
