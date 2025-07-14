import { loggerMap } from "@/core/factory/logger-map";

/**
 * Inspect all registered LoggerCore instances stored in the coreMap.
 * Useful for debugging and verifying the current logger configurations.
 */
export function inspectLoggers(): void {
  console.log("\n[logry:devtool] Registered LoggerCore instances:");
  console.dir(Array.from(loggerMap.values()), { depth: null, colors: true });
  console.log("\n");
}
