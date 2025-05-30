import type { ReadyPayload } from "@/core/logger/types";
import type { BrowserFormattedPayload } from "@/modules/formatters";
import type { NormalizedPayload } from "@/modules/normalizers";
import type { Transporter } from "@/modules/transporters/types";
import type { Platform } from "@/shared/types";
import { composeConsoleArgs } from "@/modules/transporters/browser/utils/compose-console-args";
import { composeConsoleMessage } from "@/modules/transporters/browser/utils/compose-console-message";

/**
 * A Browser-specific transporter that outputs log payloads to browser console.
 * Supports formatted and unformatted output.
 */
export class BrowserConsoleTransporter implements Transporter {
  /** Indicates the current platform. */
  public platform: Platform = "browser";

  /**
   * Transports the given formatted payload to browser console.
   * @param payload - Formatted log data.
   */
  async transport(payload: ReadyPayload) {
    // If formatter is disabled, print raw JSON
    if (payload.formatterConfig?.browser?.disabled) {
      return this.printUnformattedLog(payload as NormalizedPayload);
    }
    return this.printLog(payload as BrowserFormattedPayload);
  }

  /**
   * Print a formatted log message with styles to the browser console.
   */
  private printLog(payload: BrowserFormattedPayload): void {
    // Compose formatted console message string
    const consoleMessage = composeConsoleMessage(payload);
    // Compose arguments array with styles and optional meta/context
    const consoleArgs = composeConsoleArgs(payload, consoleMessage);

    const lineBreaksAfter = "\n".repeat(
      payload.formatterConfig?.browser?.lineBreaksAfter ?? 0,
    );

    // Output to browser console
    console.log(...consoleArgs, lineBreaksAfter);
  }

  /**
   * Print a raw, unformatted log object to the browser console.
   */
  private printUnformattedLog(payload: NormalizedPayload): void {
    const { timestamp, id, level, scope, message, meta, context } = payload;

    const lineBreaksBefore = "\n".repeat(
      payload.formatterConfig?.browser?.lineBreaksBefore ?? 0,
    );

    const lineBreaksAfter = "\n".repeat(
      payload.formatterConfig?.browser?.lineBreaksAfter ?? 0,
    );

    const finalPayload = {
      timestamp,
      id,
      level,
      scope,
      message,
      meta: meta || {},
      context: context || {},
    };

    // Output to browser console
    console.log(lineBreaksBefore, finalPayload, lineBreaksAfter);
  }
}
