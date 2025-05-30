import type { ReadyPayload } from "@/core/logger/types";
import type { NodeFormattedPayload } from "@/modules/formatters";
import type { NormalizedPayload } from "@/modules/normalizers";
import type { Transporter } from "@/modules/transporters/types";
import type { Platform } from "@/shared/types";
import {
  DEFAULT_CONTEXT_DEPTH,
  DEFAULT_META_DEPTH,
  DEFAULT_META_LINE_BREAKS,
} from "@/modules/formatters/node/constants";
import { formatObject } from "@/modules/formatters/utils/format-object";
import { composeConsoleMessage } from "@/modules/transporters/node/utils/compose-console-message";
import { getProcessTags } from "@/modules/transporters/node/utils/get-process-tags";
import { initNodeOs } from "@/modules/transporters/node/utils/init-node-os";
import { printObject } from "@/modules/transporters/node/utils/print-object";
import { writeToStreamAsync } from "@/modules/transporters/node/utils/write-to-stream-async";

/**
 * A Node.js transporter that writes logs to stdout.
 * Supports formatted and unformatted output,
 * and ensures sequential writes to prevent interleaved logs.
 */
export class NodeConsoleTransporter implements Transporter {
  /** Indicates the current platform. */
  public platform: Platform = "node";
  /** Cached 'os' module reference. */
  private os?: typeof import("os");
  /** Cached promise for loading 'os' module. */
  private osPromise?: Promise<typeof import("os") | undefined>;
  /** Chains log writes to ensure sequential transport calls. */
  private lastLogPromise = Promise.resolve();

  /**
   * Process and forward log payloads to stdout, preserving write order.
   *
   * Determines whether to use raw or formatted output based on config.
   * All writes are chained to maintain sequential consistency.
   */
  async transport(payload: ReadyPayload): Promise<void> {
    const { pid, hostname } = await getProcessTags(
      this.getOs.bind(this),
      payload,
    );
    // If formatter is disabled, write raw JSON
    if (payload.formatterConfig.node?.disabled) {
      return this.printUnformattedLog(
        payload as NormalizedPayload,
        pid,
        hostname,
      );
    }
    // Otherwise, write fully formatted log
    return this.printLog(payload as NodeFormattedPayload, pid, hostname);
  }

  /**
   * Print a formatted log entry to stdout sequentially.
   */
  private async printLog(
    payload: NodeFormattedPayload,
    pid: string,
    hostname: string,
  ): Promise<void> {
    const { meta, context, formatterConfig } = payload;
    const nodeConfig = formatterConfig.node;

    const consoleMessage = composeConsoleMessage(payload, pid, hostname);

    // Ensure output order with chained write
    return this.chainWrite(async () => {
      if (nodeConfig?.lineBreaksBefore && nodeConfig?.lineBreaksBefore > 0) {
        await writeToStreamAsync("\n".repeat(nodeConfig?.lineBreaksBefore));
      }

      // Write main log message to stream
      await writeToStreamAsync(consoleMessage);

      // Print meta object with configured line breaks and depth
      printObject(meta, {
        lineBreaks: nodeConfig?.meta?.lineBreaks ?? DEFAULT_META_LINE_BREAKS,
        depth:
          nodeConfig?.meta?.depth !== undefined
            ? nodeConfig?.meta?.depth
            : DEFAULT_META_DEPTH,
      });

      // Print context object with configured line breaks and depth
      printObject(context, {
        lineBreaks: nodeConfig?.context?.lineBreaks ?? DEFAULT_META_LINE_BREAKS,
        depth:
          nodeConfig?.context?.depth !== undefined
            ? nodeConfig?.context?.depth
            : DEFAULT_CONTEXT_DEPTH,
      });

      if (nodeConfig?.lineBreaksAfter && nodeConfig?.lineBreaksAfter > 0) {
        await writeToStreamAsync("\n".repeat(nodeConfig?.lineBreaksAfter));
      }
    });
  }

  /**
   * Print a raw JSON log entry to stdout sequentially.
   */
  private async printUnformattedLog(
    payload: NormalizedPayload,
    pid: string,
    hostname: string,
  ): Promise<void> {
    const { timestamp, id, level, scope, message, meta, context } = payload;
    const finalPayload = {
      timestamp,
      id,
      level,
      scope,
      message,
      meta: meta || {},
      context: context || {},
      pid,
      hostname,
    };

    const nodeConfig = payload.formatterConfig?.node;

    const stringified = formatObject(finalPayload, "json") as string;

    // Write JSON log string to stdout in sequence
    return this.chainWrite(async () => {
      if (nodeConfig?.lineBreaksBefore && nodeConfig?.lineBreaksBefore > 0) {
        await writeToStreamAsync("\n".repeat(nodeConfig?.lineBreaksBefore));
      }
      await writeToStreamAsync(stringified + "\n");
      if (nodeConfig?.lineBreaksAfter && nodeConfig?.lineBreaksAfter > 0) {
        await writeToStreamAsync("\n".repeat(nodeConfig?.lineBreaksAfter));
      }
    });
  }

  /**
   * Lazily loads and caches the 'os' module.
   */
  private async getOs() {
    if (this.os) {
      return this.os;
    }
    if (!this.osPromise) {
      this.osPromise = initNodeOs().then((mod) => {
        this.os = mod;
        return mod;
      });
    }
    return this.osPromise;
  }

  /**
   * Queue and execute async log operations sequentially.
   */
  private async chainWrite(fn: () => Promise<void>): Promise<void> {
    // Append the new write to the end of the chain
    this.lastLogPromise = this.lastLogPromise.then(fn).catch((error) => {
      console.error("Transport logging error:", error);
    });
    // Return the updated chain for external awaiting if needed
    return this.lastLogPromise;
  }
}
