import type {
  FormatFieldOptions,
  FieldOutputTypeMap,
} from "@/modules/formatters/types";
import type { Platform } from "@/shared/types";
import type { FieldKey } from "@/shared/types/log-fields";
import { DEFAULT_BROWSER_FORMAT_OPTIONS_MAP } from "@/modules/formatters/constants/default-browser-format-options-map";
import { DEFAULT_EDGE_FORMAT_OPTIONS_MAP } from "@/modules/formatters/constants/default-edge-format-options-map";
import { DEFAULT_NODE_FORMAT_OPTIONS_MAP } from "@/modules/formatters/constants/default-node-format-options-map";

export const DEFAULT_FORMAT_OPTIONS_MAP: {
  [P in Platform]: {
    [K in FieldKey]: FormatFieldOptions<P, K, FieldOutputTypeMap[K]>;
  };
} = {
  node: DEFAULT_NODE_FORMAT_OPTIONS_MAP as {
    [K in FieldKey]: FormatFieldOptions<"node", K, FieldOutputTypeMap[K]>;
  },
  browser: DEFAULT_BROWSER_FORMAT_OPTIONS_MAP as {
    [K in FieldKey]: FormatFieldOptions<"browser", K, FieldOutputTypeMap[K]>;
  },
  edge: DEFAULT_EDGE_FORMAT_OPTIONS_MAP as {
    [K in FieldKey]: FormatFieldOptions<"edge", K, FieldOutputTypeMap[K]>;
  },
};
