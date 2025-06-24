import type { FormattedPayload } from "@/shared/types/log-payload";
import { composeConsoleArgs } from "@/modules/transporters/browser/utils/compose-console-args";
import { composeMessage } from "@/modules/transporters/browser/utils/compose-message";

/**
 * Prints a formatted log to the browser console.
 *
 * @param payload - The formatted payload with message and styling info.
 */
export const printLog = (payload: FormattedPayload): void => {
  // Create the console message string
  const consoleMessage = composeMessage(payload);

  // Build console arguments including styles and metadata
  const consoleArgs = composeConsoleArgs(payload, consoleMessage);

  // Optional line breaks after the log output
  const lineBreaksAfter = "\n".repeat(
    payload.formatterConfig?.browser?.lineBreaksAfter ?? 0,
  );

  if (lineBreaksAfter.length > 0) {
    console.log(...consoleArgs, lineBreaksAfter);
  } else {
    console.log(...consoleArgs);
  }
};
