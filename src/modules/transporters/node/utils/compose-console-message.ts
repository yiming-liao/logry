import type { ReadyPayload } from "@/core/logger/types";

/**
 * Compose a log line by concatenating core payload fields and process info.
 *
 * @param payload - Structured log data.
 * @param pid - Formatted process ID.
 * @param hostname - Formatted hostname.
 * @returns Final console log message with newline.
 */
export const composeConsoleMessage = (
  payload: ReadyPayload,
  pid: string,
  hostname: string,
): string => {
  const { timestamp, id, level, scope, message, meta, context } = payload;

  // Compose ordered parts
  const parts = [timestamp, id, level, pid, hostname, scope, message];

  if (typeof meta === "string") {
    parts.push(meta);
  }
  if (typeof context === "string") {
    parts.push(context);
  }

  // Join and end with newline
  return `${parts.join("")}\n`;
};
