import type { Logger } from "../src";

/**
 * Inspect the resolved output configuration of a Logger instance.
 * Helpful for debugging merged config across core/instance/method levels.
 */
export function inspectOutputConfig(logger: Logger): void {
  const config = logger["resolveOutputConfig"]?.();
  if (!config) {
    console.warn(
      "This logger does not have a 'resolveOutputConfig' method. It may not be a native Logger instance.",
    );
    return;
  }

  console.log("\n [logry:devtool] Resolved Logger Output Config:");
  console.dir(config);
  console.log("\n");
}
