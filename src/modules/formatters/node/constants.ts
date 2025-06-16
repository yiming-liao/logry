import type { StringifyFormat } from "@/modules/formatters";

/** ANSI escape code that resets color formatting */
export const ANSI_COLOR_RESET = "\x1b[0m";
/** ANSI escape code for gray color.*/
export const ANSI_COLOR_GRAY = "\x1b[38;5;245m";

export const DEFAULT_PREFIX_STRING = "[";
export const DEFAULT_SUFFIX_STRING = "]";

// Timestamp
export const DEFAULT_TIMESTAMP_HIDE = false;
export const DEFAULT_TIMESTAMP_PREFIX = DEFAULT_PREFIX_STRING;
export const DEFAULT_TIMESTAMP_SUFFIX = DEFAULT_SUFFIX_STRING;
export const DEFAULT_TIMESTAMP_ANSI_COLOR = ANSI_COLOR_GRAY;
export const DEFAULT_TIMESTAMP_LINE_BREAKS = 0;
export const DEFAULT_TIMESTAMP_SPACE_AFTER = 1;

// ID
export const DEFAULT_ID_HIDE = false;
export const DEFAULT_ID_PREFIX = DEFAULT_PREFIX_STRING;
export const DEFAULT_ID_SUFFIX = DEFAULT_SUFFIX_STRING;
export const DEFAULT_ID_ANSI_COLOR = undefined;
export const DEFAULT_ID_LINE_BREAKS = 0;
export const DEFAULT_ID_SPACE_AFTER = 1;

// Level
export const DEFAULT_LEVEL_HIDE = false;
export const DEFAULT_LEVEL_PREFIX = DEFAULT_PREFIX_STRING;
export const DEFAULT_LEVEL_SUFFIX = DEFAULT_SUFFIX_STRING;
export const DEFAULT_LEVEL_LINE_BREAKS = 0;
export const DEFAULT_LEVEL_SPACE_AFTER = 1;

// Scope
export const DEFAULT_SCOPE_HIDE = false;
export const DEFAULT_SCOPE_PREFIX = DEFAULT_PREFIX_STRING;
export const DEFAULT_SCOPE_SUFFIX = DEFAULT_SUFFIX_STRING;
export const DEFAULT_SCOPE_ANSI_COLOR = ANSI_COLOR_GRAY;
export const DEFAULT_SCOPE_LINE_BREAKS = 0;
export const DEFAULT_SCOPE_SPACE_AFTER = 1;
export const DEFAULT_SCOPE_SEPARATOR = " > ";
export const DEFAULT_SCOPE_SHOW_ONLY_LATEST = false;

// Message
export const DEFAULT_MESSAGE_HIDE = false;
export const DEFAULT_MESSAGE_PREFIX = "• ";
export const DEFAULT_MESSAGE_SUFFIX = undefined;
export const DEFAULT_MESSAGE_ANSI_COLOR = undefined;
export const DEFAULT_MESSAGE_LINE_BREAKS = 0;
export const DEFAULT_MESSAGE_SPACE_AFTER = 1;

// Meta
export const DEFAULT_META_HIDE = false;
export const DEFAULT_META_PREFIX = undefined;
export const DEFAULT_META_SUFFIX = undefined;
export const DEFAULT_META_ANSI_COLOR = undefined;
export const DEFAULT_META_LINE_BREAKS = 0;
export const DEFAULT_META_FORMAT: StringifyFormat = "raw";
export const DEFAULT_META_DEPTH: number | null = 3;
export const DEFAULT_META_SPACE_AFTER = 1;

// Context
export const DEFAULT_CONTEXT_HIDE = true;
export const DEFAULT_CONTEXT_PREFIX = undefined;
export const DEFAULT_CONTEXT_SUFFIX = undefined;
export const DEFAULT_CONTEXT_ANSI_COLOR = undefined;
export const DEFAULT_CONTEXT_LINE_BREAKS = 0;
export const DEFAULT_CONTEXT_FORMAT: StringifyFormat = "raw";
export const DEFAULT_CONTEXT_DEPTH: number | null = 3;
export const DEFAULT_CONTEXT_SPACE_AFTER = 1;

// Pid
export const DEFAULT_PID_HIDE = false;
export const DEFAULT_PID_PREFIX = DEFAULT_PREFIX_STRING;
export const DEFAULT_PID_SUFFIX = "@";
export const DEFAULT_PID_ANSI_COLOR = undefined;
export const DEFAULT_PID_LINE_BREAKS = 0;
export const DEFAULT_PID_SPACE_AFTER = 0;

// Hostname
export const DEFAULT_HOSTNAME_HIDE = false;
export const DEFAULT_HOSTNAME_PREFIX = undefined;
export const DEFAULT_HOSTNAME_SUFFIX = DEFAULT_SUFFIX_STRING;
export const DEFAULT_HOSTNAME_ANSI_COLOR = undefined;
export const DEFAULT_HOSTNAME_LINE_BREAKS = 0;
export const DEFAULT_HOSTNAME_SPACE_AFTER = 1;
