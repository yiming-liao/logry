export let osModule: typeof import("os") | undefined;
let osModulePromise: Promise<typeof import("os") | undefined> | undefined;

/**
 * Dynamically imports Node.js "os" module if running in Node environment.
 * Caches the import to avoid multiple loads.
 * @returns Promise resolving to the "os" module or undefined if not Node.js
 */
export function initNodeOs(): Promise<typeof import("os") | undefined> {
  // Return undefined immediately if not in Node.js environment
  if (typeof process === "undefined" || !process.versions?.node) {
    return Promise.resolve(undefined);
  }

  // Return cached promise if already importing or imported
  if (osModulePromise) {
    return osModulePromise;
  }

  // Dynamically import and cache the "os" module
  osModulePromise = import("os").then((mod) => {
    osModule = mod;
    return mod;
  });

  return osModulePromise;
}
