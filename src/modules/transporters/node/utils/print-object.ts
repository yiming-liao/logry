import type { InspectOptions, UtilModule } from "@/shared/utils/lazy-modules";
import { writeToStreamAsync } from "@/modules/transporters/node/utils/write-to-stream-async";

/**
 * Prints an object to the console with configurable depth and preceding line breaks.
 *
 * @param obj - The object to print.
 * @param options - Optional settings for line breaks and inspection depth.
 * @param options.lineBreaks - Number of blank lines before output (default 0).
 * @param options.depth - Depth level for object inspection (default 2).
 */
export const printObject = async (
  getUtil: () => Promise<UtilModule | undefined>,
  obj?: unknown,
  options?: {
    prefix?: string;
    suffix?: string;
    lineBreaks?: number;
    indent?: number;
  } & InspectOptions,
): Promise<void> => {
  if (typeof obj !== "object" || obj === null) {
    return;
  }

  const util = await getUtil();

  const {
    prefix,
    suffix,
    lineBreaks = 0,
    indent = 0,
    ...inspectOptions
  } = options || {};

  if (lineBreaks > 0) {
    await writeToStreamAsync("\n".repeat(lineBreaks));
  }

  if (!util) {
    console.dir(obj, inspectOptions);
    return;
  }

  const inspectedStr = util.inspect(obj, inspectOptions);
  const indentSpaces = " ".repeat(indent);
  const indentedStr =
    inspectedStr
      .split("\n")
      .map((line) => indentSpaces + line)
      .join("\n") + "\n";

  if (prefix) {
    await writeToStreamAsync(prefix + "\n");
  }
  await writeToStreamAsync(indentedStr);
  if (suffix) {
    await writeToStreamAsync(suffix + "\n");
  }
};
