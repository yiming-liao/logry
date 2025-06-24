import type { FormatFieldOptions } from "@/modules/formatters/types";
import type { FormattedStructuredField } from "@/shared/types/log-fields";
import type { UtilModule } from "@/shared/utils/node/lazy-modules";
import { resolveFormatFieldOptions } from "@/modules/formatters/utils/resolve-format-field-options";
import { writeToStreamAsync } from "@/modules/transporters/node/utils/write-to-stream-async";

/**
 * Prints an object to the console with configurable depth and preceding line breaks.
 *
 * @param obj - The object to print.
 * @param options - Optional settings for line breaks and inspection depth.
 * @param options.lineBreaks - Number of blank lines before output (default 0).
 * @param options.depth - Depth level for object inspection (default 2).
 */
export const printObject = async ({
  getUtil,
  stream,
  fieldKey,
  fieldValue,
  options,
}: {
  getUtil: () => Promise<UtilModule | undefined>;
  stream: NodeJS.WriteStream;
  fieldKey: "meta" | "context";
  fieldValue?: FormattedStructuredField;
  options?: FormatFieldOptions<"node", "meta" | "context", "structured">;
}): Promise<void> => {
  if (typeof fieldValue !== "object" || fieldValue === null) {
    return;
  }

  const resolvedOptions = resolveFormatFieldOptions({
    platform: "node",
    fieldKey,
    options,
  });

  const util = await getUtil();

  const {
    prefix,
    suffix,
    lineBreaks = 0,
    indent = 0,
    ...inspectOptions
  } = resolvedOptions;

  if (lineBreaks > 0) {
    await writeToStreamAsync("\n".repeat(lineBreaks), stream);
  }

  // Use console.dir when util not loaded
  if (!util) {
    console.dir(fieldValue, inspectOptions);
    return;
  }

  const inspectedStr = util.inspect(fieldValue, inspectOptions);
  const indentSpaces = " ".repeat(indent);
  const indentedStr =
    inspectedStr
      .split("\n")
      .map((line) => indentSpaces + line)
      .join("\n") + "\n";

  if (prefix) {
    await writeToStreamAsync(prefix + "\n", stream);
  }
  await writeToStreamAsync(indentedStr, stream);
  if (suffix) {
    await writeToStreamAsync(suffix + "\n", stream);
  }
};
