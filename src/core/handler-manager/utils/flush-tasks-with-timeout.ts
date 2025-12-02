/* eslint-disable unicorn/prefer-ternary */
import { withTimeout } from "@/core/handler-manager/utils/with-timeout";

/**
 * Flush all pending tasks with optional timeout handling.
 *
 * @param pendingTasks - Map of task Promises and their associated handler ID
 * @param timeout - Timeout in milliseconds; if 0 or less, tasks are settled without timeout
 */
export const flushTasksWithTimeout = async (
  pendingTasks: Map<Promise<unknown>, string>,
  timeout: number,
): Promise<void> => {
  const tasksWithId = [...pendingTasks.entries()].map(([task, handlerId]) => ({
    handlerId,
    task,
  }));

  if (timeout > 0) {
    // Wait for all tasks with timeout applied
    await Promise.all(
      tasksWithId.map((t) => withTimeout(t.handlerId, t.task, timeout)),
    );
  } else {
    // Wait for all tasks without timeout handling
    await Promise.allSettled(tasksWithId.map((t) => t.task));
  }
};
