import type { FormattedPayload } from "@/shared/types/log-payload";
import { extractStyledFields } from "@/modules/transporters/node/utils/extract-styled-fields";

/**
 * Compose a log line by concatenating core payload fields and process info.
 *
 * @param payload - Structured log data.
 * @param pid - Formatted process ID.
 * @param hostname - Formatted hostname.
 * @returns Final console log message with newline.
 */
export const composeMessage = (
  payload: FormattedPayload,
  useAnsiStyle?: boolean,
): string => {
  const { timestamp, id, level, scope, message, meta, context, pid, hostname } =
    extractStyledFields(
      payload,
      payload.formatterConfig.node || {},
      useAnsiStyle,
    );

  const fieldValues = [timestamp, id, level];

  if (payload.raw.pid) {
    fieldValues.push(pid);
  }
  if (payload.raw.hostname) {
    fieldValues.push(hostname);
  }

  fieldValues.push(scope, message);

  if (typeof meta === "string") {
    fieldValues.push(meta);
  }
  if (typeof context === "string") {
    fieldValues.push(context);
  }

  // Join and end with newline
  return `${fieldValues.join("")}\n`;
};
