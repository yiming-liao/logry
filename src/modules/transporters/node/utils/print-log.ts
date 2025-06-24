import type { FormattedPayload } from "@/shared/types/log-payload";
import { composeMessage } from "@/modules/transporters/node/utils/compose-message";
import { printObject } from "@/modules/transporters/node/utils/print-object";
import { writeToStreamAsync } from "@/modules/transporters/node/utils/write-to-stream-async";
import { getUtil } from "@/shared/utils/node/lazy-modules";

/**
 * Print a formatted log message to the stream with optional meta and context output.
 * Uses queueWrite to ensure ordered async writes.
 *
 * @param payload - The formatted log payload containing message and meta/context data.
 * @param queueWrite - Async queue function to serialize write operations.
 */
export const printLog = async (
  payload: FormattedPayload,
  queueWrite: (fn: () => Promise<void>) => Promise<void>,
): Promise<void> => {
  const config = payload.formatterConfig.node;
  const consoleMessage = composeMessage(payload, true);

  // Decide output stream based on log level
  let stream: NodeJS.WriteStream = process.stdout;
  if (["fatal", "error", "warn"].includes(payload.raw.level)) {
    stream = process.stderr;
  }

  // Queue log output to preserve order
  return queueWrite(async () => {
    // Line break before
    if (config?.lineBreaksBefore && config?.lineBreaksBefore > 0) {
      await writeToStreamAsync("\n".repeat(config?.lineBreaksBefore), stream);
    }

    // Write main log message to stream
    await writeToStreamAsync(consoleMessage, stream);

    // Print meta object with configured line breaks and depth
    await printObject({
      getUtil,
      stream,
      fieldKey: "meta",
      fieldValue: payload.meta,
      options: config?.meta,
    });

    // Print context object with configured line breaks and depth
    await printObject({
      getUtil,
      stream,
      fieldKey: "context",
      fieldValue: payload.context,
      options: config?.context,
    });

    // Line break after
    if (config?.lineBreaksAfter && config?.lineBreaksAfter > 0) {
      await writeToStreamAsync("\n".repeat(config?.lineBreaksAfter), stream);
    }
  });
};
