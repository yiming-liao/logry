import type { Formatter } from "@/modules/formatters";
import type { Normalizer } from "@/modules/normalizers";
import type { Transporter } from "@/modules/transporters/types";
import type { Platform } from "@/shared/types";
import type { RawPayload } from "@/shared/types/log-payload";
import { globalLogQueue } from "@/modules/transporters/node/utils/global-log-queue";
import { printLog } from "@/modules/transporters/node/utils/print-log";
import { appendProcessFields } from "@/shared/utils/node/append-process-fields";
import { getOs } from "@/shared/utils/node/lazy-modules";

/**
 * A Node.js-specific transporter that outputs logs to the console (stdout).
 *
 * Uses a write queue to guarantee that log entries are written sequentially,
 * preventing interleaved or out-of-order writes during high-frequency logging.
 */
export class NodeConsoleTransporter implements Transporter {
  /** Indicates the current platform. */
  public platform: Platform = "node";

  constructor(
    private readonly deps: {
      normalizer: Normalizer;
      formatter: Formatter;
    },
  ) {}

  /** Global log queue to ensure cross-logger output order. */
  private queueWrite = globalLogQueue.queueWrite.bind(globalLogQueue);

  /**
   * Transports the given formatted log payloads to stdout in order.
   */
  async transport(rawPayload: RawPayload): Promise<void> {
    const appendedPayload = await appendProcessFields(getOs, rawPayload);

    const normalized = this.deps.normalizer.normalize(
      this.platform,
      appendedPayload,
    );

    const formatted = this.deps.formatter.format(this.platform, normalized);

    return printLog(formatted, this.queueWrite.bind(this));
  }
}
