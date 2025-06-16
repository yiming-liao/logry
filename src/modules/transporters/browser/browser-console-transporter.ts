import type { RawPayload } from "@/core/logger/types";
import type { BrowserFormatter } from "@/modules/formatters";
import type { Normalizer } from "@/modules/normalizers";
import type { Transporter } from "@/modules/transporters/types";
import type { Platform } from "@/shared/types";
import { printLog } from "@/modules/transporters/browser/utils/print-log";
import { preparePayload } from "@/shared/utils/prepare-payload";

/**
 * A Browser-specific transporter that outputs log payloads to browser console.
 * Supports formatted and unformatted output.
 */
export class BrowserConsoleTransporter implements Transporter {
  constructor(
    private readonly deps: {
      normalizer: Normalizer;
      formatter: BrowserFormatter;
    },
  ) {}

  /** Indicates the current platform. */
  public platform: Platform = "browser";

  /**
   * Transports the given formatted payload to browser console.
   * @param payload - Formatted log data.
   */
  async transport(rawPayload: RawPayload) {
    const { payload } = await preparePayload({
      rawPayload,
      normalizer: this.deps.normalizer,
      platform: this.platform,
      injectProcessParts: false,
    });

    const formatted = this.deps.formatter.format(payload);

    return printLog(formatted);
  }
}
