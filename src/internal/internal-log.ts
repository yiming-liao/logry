import {
  formatInternalMessage,
  type InternalLogType,
} from "@/internal/utils/format-internal-message";
import { isDevMode } from "@/shared/utils/is-dev-mode";

/**
 * Logs internal warnings and errors in development only.
 * - Skips logging in production.
 * - Uses console.error for errors, console.warn otherwise.
 */
export type InternalLogOptions = {
  type: InternalLogType;
  message: string;
  tag?: string;
  error?: unknown;
};

export const internalLog = ({
  type,
  message,
  tag,
}: InternalLogOptions): void => {
  if (!isDevMode()) {
    return;
  }

  const formatted = formatInternalMessage({ type, message, tag });

  if (type === "error") {
    console.error(formatted);
  } else {
    console.warn(formatted);
  }
};
