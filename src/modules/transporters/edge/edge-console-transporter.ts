import type { Formatter } from "@/modules/formatters";
import type { Normalizer } from "@/modules/normalizers";
import type { Transporter } from "@/modules/transporters/types";
import type { Platform } from "@/shared/types";
import type { RawPayload } from "@/shared/types/log-payload";
import { composeMessage } from "@/modules/transporters/edge/utils/compose-message";

/**
 * A Edge-specific transporter that outputs logs to the console.
 */
export class EdgeConsoleTransporter implements Transporter {
  /** Indicates the current platform. */
  public platform: Platform = "edge";

  constructor(
    private readonly deps: {
      normalizer: Normalizer;
      formatter: Formatter;
    },
  ) {}

  /**
   * Transports the given formatted log payloads to console.
   */
  transport(rawPayload: RawPayload): void {
    const normalized = this.deps.normalizer.normalize(
      this.platform,
      rawPayload,
    );

    const formatted = this.deps.formatter.format(this.platform, normalized);

    const composed = composeMessage(formatted);

    console.log(composed);
  }
}
