import type { NodeFormattedPayload } from "@/modules/formatters";
import {
  DEFAULT_CONTEXT_COLORS,
  DEFAULT_CONTEXT_DEPTH,
  DEFAULT_CONTEXT_INDENTS,
  DEFAULT_CONTEXT_LINE_BREAKS,
  DEFAULT_META_COLORS,
  DEFAULT_META_DEPTH,
  DEFAULT_META_INDENTS,
  DEFAULT_META_LINE_BREAKS,
} from "@/modules/formatters/node/constants";
import { composeMessage } from "@/modules/transporters/node/utils/compose-message";
import { printObject } from "@/modules/transporters/node/utils/print-object";
import { writeToStreamAsync } from "@/modules/transporters/node/utils/write-to-stream-async";
import { getUtil } from "@/shared/utils/lazy-modules";

/**
 * Print a formatted log message to the stream with optional meta and context output.
 * Uses queueWrite to ensure ordered async writes.
 *
 * @param payload - The formatted log payload containing message and meta/context data.
 * @param queueWrite - Async queue function to serialize write operations.
 */
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
    await printObject(getUtil, meta, {
      prefix: config?.meta?.prefix,
      suffix: config?.meta?.suffix,
      lineBreaks: config?.meta?.lineBreaks ?? DEFAULT_META_LINE_BREAKS,
      indent: config?.meta?.indent ?? DEFAULT_META_INDENTS,
      depth:
        config?.meta?.depth !== undefined
          ? config?.meta?.depth
          : DEFAULT_META_DEPTH,
      colors: config?.meta?.colors ?? DEFAULT_META_COLORS,
      ...config?.meta,
    });

    // Print context object with configured line breaks and depth
    await printObject(getUtil, context, {
      prefix: config?.context?.prefix,
      suffix: config?.context?.suffix,
      lineBreaks: config?.context?.lineBreaks ?? DEFAULT_CONTEXT_LINE_BREAKS,
      indent: config?.context?.indent ?? DEFAULT_CONTEXT_INDENTS,
      depth:
        config?.context?.depth !== undefined
          ? config?.context?.depth
          : DEFAULT_CONTEXT_DEPTH,
      colors: config?.context?.colors ?? DEFAULT_CONTEXT_COLORS,
      ...config?.context,
    });

    // Line break after
    if (config?.lineBreaksAfter && config?.lineBreaksAfter > 0) {
      await writeToStreamAsync("\n".repeat(config?.lineBreaksAfter));
    }
  });
};
