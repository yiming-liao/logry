import type { RawContext } from "@/shared/types/log-fields";

/**
 * Merges two raw context objects shallowly.
 * If both are undefined, returns undefined.
 *
 * @param baseContext - The base context object.
 * @param additionalContext - The additional context to merge in.
 * @returns A merged context object or undefined.
 */
export const mergeContexts = (
  baseContext?: RawContext,
  additionalContext?: RawContext,
): RawContext | undefined => {
  // Return undefined if both contexts are missing
  if (!baseContext && !additionalContext) {
    return undefined;
  }

  // Merge with additionalContext taking precedence
  return {
    ...(baseContext ?? {}),
    ...(additionalContext ?? {}),
  };
};
