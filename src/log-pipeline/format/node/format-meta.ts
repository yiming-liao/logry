import { formatError } from "./utils/format-error";

/**
 * Format meta object by converting Error instances into formatted error objects.
 * @param {unknown} meta - The metadata to format.
 * @returns {unknown} - Formatted metadata or undefined if input is falsy.
 */
export const formatMeta = (meta: unknown): unknown => {
  if (!meta) {
    // Return undefined for null, undefined, or falsy values
    return;
  }

  // If meta itself is an Error instance, wrap it in an object with formatted error
  if (meta instanceof Error) {
    meta = { error: formatError(meta) };
  }
  // If meta is an object containing an 'error' property which is an Error instance,
  // replace that error with its formatted version
  else if (
    meta &&
    typeof meta === "object" &&
    "error" in meta &&
    meta.error instanceof Error
  ) {
    const { error, ...rest } = meta;
    meta = {
      ...rest,
      error: formatError(error),
    };
  }

  return meta;
};
