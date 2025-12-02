import type { InternalLogOptions } from "@/internal";

export type InternalLogType = "warn" | "error";

/**
 * Maps log types to corresponding icons.
 */
const iconMap: Record<InternalLogType, string> = {
  error: "❌",
  warn: "⚠️",
};

/**
 * Formats internal log messages with type icon, tag, message, and optional error.
 *
 * @param options - Internal log details
 * @returns A formatted string for internal logging
 */
export const formatInternalMessage = ({
  type,
  message,
  tag,
  error,
}: InternalLogOptions): string => {
  const prefix = tag ? `[logry/${tag}]` : `[logry]`;

  let errorDetails = "";
  if (error) {
    errorDetails =
      error instanceof Error
        ? `\n${error.stack || error.message}`
        : `\n${String(error)}`;
  }

  return `${iconMap[type]} ${prefix} ${message}${errorDetails}`;
};
