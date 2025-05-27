import { contextEncoder } from "../../utils/context-encoder";

/**
 * Merge base context with an additional context string.
 *
 * If no additional context is provided, returns the base context as is.
 * Otherwise, splits the base context and appends the additional context,
 * then joins them back into a single context string.
 *
 * @param baseContext - The original context string.
 * @param additionalContext - The context string to append.
 * @returns The merged context string, or undefined if baseContext is undefined and no additionalContext.
 */
export const mergeContexts = (
  baseContext?: string,
  additionalContext?: string,
): string | undefined => {
  if (additionalContext === undefined) {
    // No additional context, return base as-is
    return baseContext;
  }

  // Split base context into parts, append additional context, then join
  const baseParts = contextEncoder.splitContext(baseContext);
  return contextEncoder.joinContext([...baseParts, additionalContext]);
};
