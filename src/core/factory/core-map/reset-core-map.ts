import { coreMap } from "@/core/factory/core-map/core-map";

/**
 * Clears and resets the core logger Map by removing all stored logger core instances.
 * This effectively resets the logger factory to its initial state,
 * useful for testing or resetting the logging environment.
 */
export const resetCoreMap = () => {
  coreMap.clear();
};
