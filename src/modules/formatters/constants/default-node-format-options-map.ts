import type {
  FormatFieldOptions,
  FieldOutputTypeMap,
} from "@/modules/formatters/types";
import type { FieldKey } from "@/shared/types/log-fields";

export const ANSI_RESET = "\x1b[0m";
export const ANSI_GRAY = "\x1b[38;5;245m";
export const ANSI_CYAN = "\x1b[36m";

type P = "node";

export const DEFAULT_NODE_FORMAT_OPTIONS_MAP: {
  [Key in FieldKey]: FormatFieldOptions<P, Key, FieldOutputTypeMap[Key]>;
} = {
  timestamp: {
    hide: false,
    prefix: "[",
    suffix: "]",
    lineBreaks: 0,
    spaceAfter: 1,
    ansiStyle: undefined,
  } as FormatFieldOptions<P, "timestamp", "string">,
  id: {
    hide: false,
    prefix: undefined,
    suffix: undefined,
    lineBreaks: 0,
    spaceAfter: 1,
    ansiStyle: ANSI_GRAY,
  } as FormatFieldOptions<P, "id", "string">,
  level: {
    hide: false,
    prefix: undefined,
    suffix: undefined,
    lineBreaks: 0,
    spaceAfter: 1,
    ansiStyle: undefined, // Ignored, level uses dynamic style
    enableAlignment: true,
  } as FormatFieldOptions<P, "level", "string">,
  scope: {
    hide: false,
    prefix: "[",
    suffix: "]",
    lineBreaks: 0,
    spaceAfter: 1,
    ansiStyle: undefined,
    showOnlyLatest: false,
    separator: " > ",
  } as FormatFieldOptions<P, "scope", "string">,
  message: {
    hide: false,
    prefix: undefined,
    suffix: undefined,
    lineBreaks: 0,
    spaceAfter: 1,
    ansiStyle: ANSI_CYAN,
  } as FormatFieldOptions<P, "message", "string">,
  meta: {
    hide: false,
    prefix: undefined,
    suffix: undefined,
    lineBreaks: 0,
    spaceAfter: 1,
    ansiStyle: undefined,
    format: "raw",
    indent: 4,
    depth: 3,
    colors: true,
  } as FormatFieldOptions<P, "meta", "structured">,
  context: {
    hide: true,
    prefix: undefined,
    suffix: undefined,
    lineBreaks: 0,
    spaceAfter: 1,
    ansiStyle: undefined,
    format: "raw",
    indent: 4,
    depth: 3,
    colors: true,
  } as FormatFieldOptions<P, "context", "structured">,
  pid: {
    hide: true,
    prefix: "(",
    suffix: "@",
    lineBreaks: 0,
    spaceAfter: 0,
    ansiStyle: ANSI_GRAY,
  },
  hostname: {
    hide: true,
    prefix: undefined,
    suffix: ")",
    lineBreaks: 0,
    spaceAfter: 1,
    ansiStyle: ANSI_GRAY,
  },
};
