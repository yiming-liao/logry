import type { NodeFormattedPayload } from "@/modules/formatters";
import {
  DEFAULT_CONTEXT_DEPTH,
  DEFAULT_CONTEXT_LINE_BREAKS,
  DEFAULT_META_DEPTH,
  DEFAULT_META_LINE_BREAKS,
} from "@/modules/formatters/node/constants";
import { composeMessage } from "@/modules/transporters/node/utils/compose-message";
import { printObject } from "@/modules/transporters/node/utils/print-object";
import { writeToStreamAsync } from "@/modules/transporters/node/utils/write-to-stream-async";

export const printLog = async (
  payload: NodeFormattedPayload,
  queueWrite: (fn: () => Promise<void>) => Promise<void>,
): Promise<void> => {
  const { meta, context, formatterConfig } = payload;
  const config = formatterConfig.node;
  const consoleMessage = composeMessage(payload, true);

  // Ensure output order with chained write
  return queueWrite(async () => {
    // Line break before
    if (config?.lineBreaksBefore && config?.lineBreaksBefore > 0) {
      await writeToStreamAsync("\n".repeat(config?.lineBreaksBefore));
    }

    // Write main log message to stream
    await writeToStreamAsync(consoleMessage);

    // Print meta object with configured line breaks and depth
    printObject(meta, {
      lineBreaks: config?.meta?.lineBreaks ?? DEFAULT_META_LINE_BREAKS,
      depth:
        config?.meta?.depth !== undefined
          ? config?.meta?.depth
          : DEFAULT_META_DEPTH,
    });

    // Print context object with configured line breaks and depth
    printObject(context, {
      lineBreaks: config?.context?.lineBreaks ?? DEFAULT_CONTEXT_LINE_BREAKS,
      depth:
        config?.context?.depth !== undefined
          ? config?.context?.depth
          : DEFAULT_CONTEXT_DEPTH,
    });

    // Line break after
    if (config?.lineBreaksAfter && config?.lineBreaksAfter > 0) {
      await writeToStreamAsync("\n".repeat(config?.lineBreaksAfter));
    }
  });
};
