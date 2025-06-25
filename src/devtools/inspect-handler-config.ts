import type { UniversalLogger } from "@/core/logger";

/**
 * Inspect the resolved handler configuration of a Logger instance.
 */
export function inspectHandlerManagerConfig(logger: UniversalLogger): void {
  const config = logger["handlerManager"].getConfig?.();
  if (!config) {
    console.warn(
      "This logger does not have a 'handlerManager' property. It may not be a native Logger instance.",
    );
    return;
  }

  console.log("\n [logry:devtool] Resolved Logger Handler Config:");
  console.dir(config);
  console.log("\n");
}
