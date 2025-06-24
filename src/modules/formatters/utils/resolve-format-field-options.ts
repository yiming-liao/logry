import type {
  FormatFieldOptions,
  FieldOutputType,
  FieldOutputTypeMap,
} from "@/modules/formatters/types";
import type { Platform } from "@/shared/types";
import type { FieldKey } from "@/shared/types/log-fields";
import type { SnapshotLogFields } from "@/shared/types/log-fields";
import { DEFAULT_FORMAT_OPTIONS_MAP } from "@/modules/formatters/constants/default-format-options-map";
import { LEVEL_CONFIG } from "@/shared/constants";

type NodeFormatFieldOptions<
  K extends FieldKey,
  O extends FieldOutputType,
> = FormatFieldOptions<"node", K, O>;

type BrowserFormatFieldOptions<
  K extends FieldKey,
  O extends FieldOutputType,
> = FormatFieldOptions<"browser", K, O>;

/**
 * Merge default and custom format options for a log field, adjusting per platform.
 */
export const resolveFormatFieldOptions = <
  P extends Platform,
  K extends FieldKey,
  O extends FieldOutputType = FieldOutputTypeMap[K],
  NO extends NodeFormatFieldOptions<K, O> = NodeFormatFieldOptions<K, O>,
  BO extends BrowserFormatFieldOptions<K, O> = BrowserFormatFieldOptions<K, O>,
>({
  platform,
  fieldKey,
  raw,
  options = {} as FormatFieldOptions<P, K, O>,
}: {
  platform: P;
  fieldKey: K;
  raw?: SnapshotLogFields;
  options?: FormatFieldOptions<P, K, O>;
}) => {
  const defaultOptions = DEFAULT_FORMAT_OPTIONS_MAP[platform][
    fieldKey
  ] as FormatFieldOptions<P, K, O>;

  const resolvedOptions: FormatFieldOptions<P, K, O> = {
    ...defaultOptions,
    ...options,
  };

  // Node.js specific adjustments
  if (platform === "node" && raw) {
    const nodeOptions = resolvedOptions as NO;
    const nodeDefaults = defaultOptions as NO;
    nodeOptions.ansiStyle ??= nodeDefaults.ansiStyle;
    if (fieldKey === "level") {
      nodeOptions.ansiStyle ??= LEVEL_CONFIG[raw.level].ansiStyle;
    }
  }

  // Browser specific adjustments
  if (platform === "browser" && raw) {
    const browserOptions = resolvedOptions as BO;
    const browserDefaults = defaultOptions as BO;
    browserOptions.cssStyle ??= browserDefaults.cssStyle;
    if (fieldKey === "timestamp" || fieldKey === "level") {
      browserOptions.cssStyle += LEVEL_CONFIG[raw.level].cssStyle;
    }
  }

  return resolvedOptions;
};
