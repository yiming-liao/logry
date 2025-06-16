import type { NodeFormattedPayload } from "@/modules/formatters";

/**
 * Compose a log line by concatenating core payload fields and process info.
 *
 * @param payload - Structured log data.
 * @param pid - Formatted process ID.
 * @param hostname - Formatted hostname.
 * @returns Final console log message with newline.
 */
export const composeMessage = (
  payload: NodeFormattedPayload,
  withAnsiColor?: boolean,
): string => {
  const { timestamp, id, level, scope, message, meta, context, pid, hostname } =
    withAnsiColor ? payload.withAnsiColor : payload;

  const parts = [timestamp, id, level];

  if (payload.raw.pid) {
    parts.push(pid);
  }
  if (payload.raw.hostname) {
    parts.push(hostname);
  }

  // Compose ordered parts
  parts.push(scope, message);

  if (typeof meta === "string") {
    parts.push(meta);
  }
  if (typeof context === "string") {
    parts.push(context);
  }

  // Join and end with newline
  return `${parts.join("")}\n`;
};
