import type { PrintBrowserLogPayload } from "./print-browser-log-types";

/**
 * Print log arguments in the browser using console.log.
 *
 * @param params - Log arguments to print.
 */
export const printBrowserLog = ({ logArgs }: PrintBrowserLogPayload): void => {
  // Spread log arguments into console.log
  console.log(...logArgs);
};
