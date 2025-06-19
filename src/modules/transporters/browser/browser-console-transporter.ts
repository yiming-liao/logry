import type { RawPayload } from "@/core/logger/types";
import type { BrowserFormatter } from "@/modules/formatters";
import type { Normalizer } from "@/modules/normalizers";
import type { Transporter } from "@/modules/transporters/types";
import type { Platform } from "@/shared/types";
import { printLog } from "@/modules/transporters/browser/utils/print-log";

/**
 * A Browser-specific transporter that outputs log payloads to browser console.
 * Supports formatted and unformatted output.
 */
export class BrowserConsoleTransporter implements Transporter {
  /** Indicates the current platform. */
  public platform: Platform = "browser";

  constructor(
    private readonly deps: {
      normalizer: Normalizer;
      formatter: BrowserFormatter;
    },
  ) {}

  /**
   * Transports the given formatted payload to browser console.
   */
  transport(rawPayload: RawPayload): void {
    const payload = this.deps.normalizer.normalize({
      platform: this.platform,
      rawPayload,
    });

    const formatted = this.deps.formatter.format(payload);

    return printLog(formatted);
  }
}
