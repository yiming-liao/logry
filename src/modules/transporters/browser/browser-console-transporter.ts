import type { Formatter } from "@/modules/formatters";
import type { Normalizer } from "@/modules/normalizers";
import type { Transporter } from "@/modules/transporters/types";
import type { Platform } from "@/shared/types";
import type { RawPayload } from "@/shared/types/log-payload";
import { printLog } from "@/modules/transporters/browser/utils/print-log";

/**
 * A Browser-specific transporter that outputs log payloads to browser console.
 */
export class BrowserConsoleTransporter implements Transporter {
  /** Indicates the current platform. */
  public platform: Platform = "browser";

  constructor(
    private readonly deps: {
      normalizer: Normalizer;
      formatter: Formatter;
    },
  ) {}

  /**
   * Transports the given formatted payload to browser console.
   */
  transport(rawPayload: RawPayload): void {
    const normalized = this.deps.normalizer.normalize(
      this.platform,
      rawPayload,
    );

    const formatted = this.deps.formatter.format(this.platform, normalized);

    return printLog(formatted);
  }
}
