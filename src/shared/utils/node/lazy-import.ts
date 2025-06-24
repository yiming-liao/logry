export function lazyImport<T>(importer: () => Promise<T>) {
  let cached: T | null = null;
  let promise: Promise<T> | null = null;

  return async () => {
    if (cached) {
      return cached;
    }

    if (!promise) {
      promise = importer().then((mod) => {
        cached = mod;
        return mod;
      });
    }

    return promise;
  };
}
