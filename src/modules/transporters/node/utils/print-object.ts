/**
 * Prints an object to the console with configurable depth and preceding line breaks.
 *
 * @param obj - The object to print.
 * @param options - Optional settings for line breaks and inspection depth.
 * @param options.lineBreaks - Number of blank lines before output (default 0).
 * @param options.depth - Depth level for object inspection (default 2).
 */
export const printObject = (
  obj?: unknown,
  options?: { lineBreaks?: number; depth?: number | null },
) => {
  if (typeof obj !== "object" || obj === null) {
    return;
  }

  const { lineBreaks = 0, depth = null } = options ?? {};

  if (lineBreaks > 0) {
    console.log("\n".repeat(lineBreaks));
  }

  console.dir(obj, { depth });
};
