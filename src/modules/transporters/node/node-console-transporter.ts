import type { RawPayload } from "@/core/logger/types";
import type { NodeFormatter } from "@/modules/formatters";
import type { Normalizer } from "@/modules/normalizers";
import type { Transporter } from "@/modules/transporters/types";
import type { Platform } from "@/shared/types";
import { internalLog } from "@/internal";
import { printLog } from "@/modules/transporters/node/utils/print-log";
import { preparePayload } from "@/shared/utils/prepare-payload";

/**
 * A Node.js transporter that outputs logs to the console (stdout).
 *
 * Supports both formatted and raw (unformatted) JSON output based on formatter settings.
 * Uses a write queue to guarantee that log entries are written sequentially,
 * preventing interleaved or out-of-order writes during high-frequency logging.
 */
export class NodeConsoleTransporter implements Transporter {
  constructor(
    private readonly deps: {
      normalizer: Normalizer;
      formatter: NodeFormatter;
    },
  ) {}

  /** Indicates the current platform. */
  public platform: Platform = "node";
  /** Chains log writes to ensure sequential transport calls. */
  private lastLogPromise: Promise<void> = Promise.resolve();

  /**
   * Queues and executes async log operations sequentially,
   * ensuring log outputs maintain their correct order in stdout.
   */
  private async queueWrite(fn: () => Promise<void>): Promise<void> {
    this.lastLogPromise = this.lastLogPromise.then(fn).catch((error) => {
      internalLog({
        type: "error",
        tag: "NodeConsoleTransporter",
        message: `Write error.`,
        error,
      });
      throw error;
    });
    return this.lastLogPromise;
  }

  /**
   * Processes and forwards log payloads to stdout in order.
   *
   * Uses raw or formatted output based on configuration.
   * Ensures all writes are chained to preserve sequential consistency.
   */
  async transport(rawPayload: RawPayload): Promise<void> {
    const { payload } = await preparePayload({
      rawPayload,
      normalizer: this.deps.normalizer,
      platform: this.platform,
    });

    const formatted = this.deps.formatter.format(payload);

    // Otherwise, write fully formatted log
    return printLog(formatted, this.queueWrite.bind(this));
  }
}
