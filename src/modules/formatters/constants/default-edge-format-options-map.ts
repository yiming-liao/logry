import type {
  FormatFieldOptions,
  FieldOutputTypeMap,
} from "@/modules/formatters/types";
import type { FieldKey } from "@/shared/types/log-fields";

type P = "edge";

export const DEFAULT_EDGE_FORMAT_OPTIONS_MAP: {
  [Key in Exclude<FieldKey, "pid" | "hostname">]: FormatFieldOptions<
    P,
    Key,
    FieldOutputTypeMap[Key]
  >;
} = {
  timestamp: {
    hide: false,
    prefix: "[",
    suffix: "]",
    lineBreaks: 0,
    spaceAfter: 1,
  } as FormatFieldOptions<P, "timestamp", "string">,
  id: {
    hide: false,
    prefix: undefined,
    suffix: undefined,
    lineBreaks: 0,
    spaceAfter: 1,
  } as FormatFieldOptions<P, "id", "string">,
  level: {
    hide: false,
    prefix: undefined,
    suffix: undefined,
    lineBreaks: 0,
    spaceAfter: 1,
    enableAlignment: false,
  } as FormatFieldOptions<P, "level", "string">,
  scope: {
    hide: false,
    prefix: "[",
    suffix: "]",
    lineBreaks: 0,
    spaceAfter: 1,
    showOnlyLatest: false,
    separator: " > ",
  } as FormatFieldOptions<P, "scope", "string">,
  message: {
    hide: false,
    prefix: "• ",
    suffix: undefined,
    lineBreaks: 0,
    spaceAfter: 1,
  } as FormatFieldOptions<P, "message", "string">,
  meta: {
    hide: false,
    prefix: "| ",
    suffix: undefined,
    lineBreaks: 0,
    spaceAfter: 1,
    format: "json",
    indent: 0,
  } as FormatFieldOptions<P, "meta", "structured">,
  context: {
    hide: true,
    prefix: "| ",
    suffix: undefined,
    lineBreaks: 0,
    spaceAfter: 1,
    format: "json",
    indent: 0,
  } as FormatFieldOptions<P, "context", "structured">,
};
