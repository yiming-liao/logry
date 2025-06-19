import { internalLog } from "@/internal";

/**
 * LogQueue ensures async log writes run sequentially.
 */
export class LogQueue {
  private lastLogPromise: Promise<void> = Promise.resolve();

  /**
   * Queue a write operation to run after previous completes.
   * Catches errors and logs internally without throwing.
   *
   * @param fn - Async function that performs the write.
   * @returns Promise resolving when fn completes.
   */
  queueWrite(fn: () => Promise<void>): Promise<void> {
    this.lastLogPromise = this.lastLogPromise.then(fn).catch((error) => {
      internalLog({
        type: "error",
        tag: "LogQueue",
        message: `Queue write error.`,
        error,
      });
      // swallow error to avoid disrupting main flow
    });
    return this.lastLogPromise;
  }
}

export const globalLogQueue = new LogQueue();
