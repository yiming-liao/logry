import type { FormattedPayload } from "@/shared/types/log-payload";

/**
 * Compose the final log message string from all formatted parts.
 *
 * @param payload - The fully formatted payload object
 * @returns Final composed string
 */
export const composeMessage = (payload: FormattedPayload): string => {
  const { timestamp, id, level, scope, message, meta, context } = payload;

  // Line breaks before and after the main content (Edge-specific config)
  const lineBreaksBefore = "\n".repeat(
    payload.formatterConfig.edge?.lineBreaksBefore ?? 0,
  );

  const lineBreaksAfter = "\n".repeat(
    payload.formatterConfig.edge?.lineBreaksAfter ?? 0,
  );

  // Combine all fields into a single output
  const composed = `${lineBreaksBefore}${timestamp}${id}${level}${scope}${message}${meta}${context}${lineBreaksAfter}`;

  return composed;
};
