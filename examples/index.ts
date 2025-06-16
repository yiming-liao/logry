export const withTimeout = <T>(
  handlerId: string,
  promise: Promise<T>,
  ms: number,
  onTimeout?: () => void,
): Promise<T> => {
  let timer: ReturnType<typeof setTimeout>;

  const timeoutPromise = new Promise<T>((_, reject) => {
    timer = setTimeout(() => {
      onTimeout?.();
      const error = new Error("Timeout exceeded");
      (error as Error & { handlerId: string }).handlerId = handlerId;
      reject(error);
    }, ms);
  });

  return Promise.race([promise, timeoutPromise]).finally(() =>
    clearTimeout(timer),
  );
};

const neverResolve = new Promise(() => {});

await withTimeout("test-handler", neverResolve, 1000, () => {
  console.log("Timeout callback triggered");
});
