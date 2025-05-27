/**
 * Wraps a promise with a timeout. If the promise does not settle within the
 * specified duration, the returned promise is rejected with a timeout error.
 *
 * @param promise - The async operation to monitor.
 * @param ms - Timeout duration in milliseconds.
 * @param onTimeout - Optional callback to run when timeout is triggered.
 * @returns A Promise that either resolves like the original or rejects on timeout.
 */
export const withTimeout = <T>(
  promise: Promise<T>,
  ms: number,
  onTimeout?: () => void,
): Promise<T> => {
  let timer: NodeJS.Timeout;

  const timeoutPromise = new Promise<T>((_, reject) => {
    timer = setTimeout(() => {
      onTimeout?.();
      reject(new Error("Timeout exceeded"));
    }, ms);
  });

  return Promise.race([promise, timeoutPromise]).finally(() =>
    clearTimeout(timer),
  );
};
