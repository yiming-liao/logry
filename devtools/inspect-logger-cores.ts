import { coreMap } from "../src/factory/core-map";

/**
 * Inspect all registered LoggerCore instances stored in the coreMap.
 * Useful for debugging and verifying the current logger configurations.
 */
export function inspectLoggerCores(): void {
  console.log("\n[logry:devtool] Registered LoggerCore instances:");
  console.dir(Array.from(coreMap.values()), { depth: null, colors: true });
  console.log("\n");
}
