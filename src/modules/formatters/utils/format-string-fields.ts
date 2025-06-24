import type {
  CustomFormatter,
  FormatFieldOptions,
  FormatFieldReturn,
} from "@/modules/formatters/types";
import type { Platform } from "@/shared/types";
import type { SnapshotLogFields, FieldKey } from "@/shared/types/log-fields";
import { resolveScopeString } from "@/modules/formatters/utils/resolve-scope-string";
import { addAnsiStyle } from "@/modules/formatters/utils/style/add-ansi-style";
import { addLevelPadding } from "@/modules/formatters/utils/style/add-level-padding";
import { addLineBreakPrefix } from "@/modules/formatters/utils/style/add-line-break-prefix";
import { addPrefixAndSuffix } from "@/modules/formatters/utils/style/add-prefix-and-suffix";
import { addSpaceAfter } from "@/modules/formatters/utils/style/add-space-after";
import { tryCustomFormatter } from "@/modules/formatters/utils/try-custom-formatter";

/**
 * Format a string-type log field with optional styles, spacing, and custom logic.
 */
export const formatStringFields = <P extends Platform, K extends FieldKey>({
  platform,
  fieldKey,
  fieldValue,
  raw,
  options,
}: {
  platform: P;
  fieldKey: K;
  fieldValue?: string;
  raw: SnapshotLogFields;
  options: FormatFieldOptions<P, K, "string">;
}): FormatFieldReturn<"string"> => {
  const isNode = platform === "node";
  const isBrowser = platform === "browser";

  const { hide, prefix, suffix, lineBreaks, spaceAfter, customFormatter } =
    options;
  const nodeOptions = options as FormatFieldOptions<"node", K, "string">;
  const browserOptions = options as FormatFieldOptions<"browser", K, "string">;

  // Return early if hidden or empty
  if (hide || fieldValue === undefined || fieldValue === null) {
    return {
      fieldValue: "",
      withAnsiStyle: "",
      cssStyle: "",
    };
  }

  // Use custom formatter if provided
  if (customFormatter) {
    const customized = tryCustomFormatter({
      fieldKey,
      input: { fieldValue, raw },
      customFormatter: customFormatter as CustomFormatter<"string">,
    });
    if (customized) {
      return customized;
    }
  }

  // Format scope (array → string)
  if (fieldKey === "scope" && Array.isArray(raw.scope)) {
    fieldValue = resolveScopeString({
      scope: fieldValue,
      rawScope: raw.scope,
      showOnlyLatest: (options as FormatFieldOptions<P, "scope", "string">)
        .showOnlyLatest,
      customSeparator: (options as FormatFieldOptions<P, "scope", "string">)
        .separator,
    });
  }

  // Apply prefix and suffix
  let decorated = addPrefixAndSuffix(fieldValue, prefix, suffix);

  // Optionally align level text width
  if (
    fieldKey === "level" &&
    typeof raw.level === "string" &&
    (options as FormatFieldOptions<P, "level", "string">).enableAlignment
  ) {
    decorated = addLevelPadding(decorated, raw.level);
  }

  // Final plain string
  let plain = addLineBreakPrefix(decorated, lineBreaks);
  plain = addSpaceAfter(plain, spaceAfter);

  // Optionally apply ANSI color (Node only)
  let withAnsiStyle: string | undefined;
  if (isNode) {
    withAnsiStyle = addAnsiStyle(decorated, nodeOptions.ansiStyle);
    withAnsiStyle = addLineBreakPrefix(withAnsiStyle, lineBreaks);
    withAnsiStyle = addSpaceAfter(withAnsiStyle, spaceAfter);
  }

  // Return platform-specific result
  return {
    fieldValue: plain,
    withAnsiStyle: isNode ? withAnsiStyle : undefined,
    cssStyle: isBrowser ? browserOptions.cssStyle : undefined,
  };
};
