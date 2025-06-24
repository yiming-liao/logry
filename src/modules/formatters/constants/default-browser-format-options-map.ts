import type {
  FormatFieldOptions,
  FieldOutputTypeMap,
} from "@/modules/formatters/types";
import type { FieldKey } from "@/shared/types/log-fields";

export const CSS_FONT =
  "font-family: 'Menlo', 'Consolas', 'Courier New', monospace;";
export const CSS_PADDING = "padding: 4px 8px;";
export const CSS_BORDER = "border: 1px solid gray;";

type P = "browser";

export const DEFAULT_BROWSER_FORMAT_OPTIONS_MAP: {
  [Key in Exclude<FieldKey, "pid" | "hostname">]: FormatFieldOptions<
    P,
    Key,
    FieldOutputTypeMap[Key]
  >;
} = {
  timestamp: {
    hide: false,
    prefix: undefined,
    suffix: undefined,
    lineBreaks: 0,
    spaceAfter: 0,
    cssStyle: `${CSS_FONT}${CSS_PADDING}${CSS_BORDER} border-left: 8px solid `, // Dynamic border color
  } as FormatFieldOptions<P, "timestamp", "string">,
  id: {
    hide: false,
    prefix: undefined,
    suffix: undefined,
    lineBreaks: 0,
    spaceAfter: 0,
    cssStyle: `${CSS_FONT}${CSS_PADDING}${CSS_BORDER} font-style: italic; font-weight:600;`,
  } as FormatFieldOptions<P, "id", "string">,
  level: {
    hide: false,
    prefix: undefined,
    suffix: undefined,
    lineBreaks: 0,
    spaceAfter: 0,
    cssStyle: `${CSS_FONT}${CSS_PADDING}${CSS_BORDER} background: `, // Dynamic background color
    enableAlignment: true,
  } as FormatFieldOptions<P, "level", "string">,
  scope: {
    hide: false,
    prefix: undefined,
    suffix: undefined,
    lineBreaks: 0,
    spaceAfter: 0,
    cssStyle: `${CSS_FONT}${CSS_PADDING}${CSS_BORDER}`,
    showOnlyLatest: false,
    separator: " > ",
  } as FormatFieldOptions<P, "scope", "string">,
  message: {
    hide: false,
    prefix: " ",
    suffix: undefined,
    lineBreaks: 0,
    spaceAfter: 0,
    cssStyle: undefined,
  } as FormatFieldOptions<P, "message", "string">,
  meta: {
    hide: false,
    prefix: undefined,
    suffix: undefined,
    lineBreaks: 0,
    spaceAfter: 0,
    cssStyle: undefined,
    format: "raw",
    indent: 4,
  } as FormatFieldOptions<P, "meta", "structured">,
  context: {
    hide: true,
    prefix: undefined,
    suffix: undefined,
    lineBreaks: 0,
    spaceAfter: 0,
    cssStyle: undefined,
    format: "raw",
    indent: 4,
  } as FormatFieldOptions<P, "context", "structured">,
};
