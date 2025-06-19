import type { StringifyFormat } from "@/modules/formatters";

/** ANSI escape code that resets formatting */
export const ANSI_RESET = "\x1b[0m";
/** ANSI escape code for gray color.*/
export const ANSI_GRAY = "\x1b[38;5;245m";
/** ANSI escape code for cyan color.*/
export const ANSI_CYAN = "\x1b[36m";

// Timestamp
export const DEFAULT_TIMESTAMP_HIDE = false;
export const DEFAULT_TIMESTAMP_PREFIX = "[";
export const DEFAULT_TIMESTAMP_SUFFIX = "]";
export const DEFAULT_TIMESTAMP_ANSI_COLOR = undefined;
export const DEFAULT_TIMESTAMP_LINE_BREAKS = 0;
export const DEFAULT_TIMESTAMP_SPACE_AFTER = 1;

// ID
export const DEFAULT_ID_HIDE = false;
export const DEFAULT_ID_PREFIX = undefined;
export const DEFAULT_ID_SUFFIX = undefined;
export const DEFAULT_ID_ANSI_COLOR = ANSI_GRAY;
export const DEFAULT_ID_LINE_BREAKS = 0;
export const DEFAULT_ID_SPACE_AFTER = 1;

// Level
export const DEFAULT_LEVEL_HIDE = false;
export const DEFAULT_LEVEL_PREFIX = undefined;
export const DEFAULT_LEVEL_SUFFIX = undefined;
export const DEFAULT_LEVEL_LINE_BREAKS = 0;
export const DEFAULT_LEVEL_SPACE_AFTER = 1;

// Scope
export const DEFAULT_SCOPE_HIDE = false;
export const DEFAULT_SCOPE_PREFIX = "[";
export const DEFAULT_SCOPE_SUFFIX = "]";
export const DEFAULT_SCOPE_ANSI_COLOR = undefined;
export const DEFAULT_SCOPE_LINE_BREAKS = 0;
export const DEFAULT_SCOPE_SPACE_AFTER = 1;
export const DEFAULT_SCOPE_SEPARATOR = " > ";
export const DEFAULT_SCOPE_SHOW_ONLY_LATEST = false;

// Message
export const DEFAULT_MESSAGE_HIDE = false;
export const DEFAULT_MESSAGE_PREFIX = "";
export const DEFAULT_MESSAGE_SUFFIX = undefined;
export const DEFAULT_MESSAGE_ANSI_COLOR = ANSI_CYAN;
export const DEFAULT_MESSAGE_LINE_BREAKS = 0;
export const DEFAULT_MESSAGE_SPACE_AFTER = 1;

// Meta
export const DEFAULT_META_HIDE = false;
export const DEFAULT_META_PREFIX = undefined;
export const DEFAULT_META_SUFFIX = undefined;
export const DEFAULT_META_ANSI_COLOR = undefined;
export const DEFAULT_META_INDENTS = 4;
export const DEFAULT_META_LINE_BREAKS = 0;
export const DEFAULT_META_FORMAT: StringifyFormat = "raw";
export const DEFAULT_META_DEPTH: number | null = 3;
export const DEFAULT_META_COLORS = true;
export const DEFAULT_META_SPACE_AFTER = 1;

// Context
export const DEFAULT_CONTEXT_HIDE = true;
export const DEFAULT_CONTEXT_PREFIX = undefined;
export const DEFAULT_CONTEXT_SUFFIX = undefined;
export const DEFAULT_CONTEXT_ANSI_COLOR = undefined;
export const DEFAULT_CONTEXT_INDENTS = 4;
export const DEFAULT_CONTEXT_LINE_BREAKS = 0;
export const DEFAULT_CONTEXT_FORMAT: StringifyFormat = "raw";
export const DEFAULT_CONTEXT_DEPTH: number | null = 3;
export const DEFAULT_CONTEXT_COLORS = true;
export const DEFAULT_CONTEXT_SPACE_AFTER = 1;

// Pid
export const DEFAULT_PID_HIDE = true;
export const DEFAULT_PID_PREFIX = "(";
export const DEFAULT_PID_SUFFIX = "@";
export const DEFAULT_PID_ANSI_COLOR = ANSI_GRAY;
export const DEFAULT_PID_LINE_BREAKS = 0;
export const DEFAULT_PID_SPACE_AFTER = 0;

// Hostname
export const DEFAULT_HOSTNAME_HIDE = true;
export const DEFAULT_HOSTNAME_PREFIX = undefined;
export const DEFAULT_HOSTNAME_SUFFIX = ")";
export const DEFAULT_HOSTNAME_ANSI_COLOR = ANSI_GRAY;
export const DEFAULT_HOSTNAME_LINE_BREAKS = 0;
export const DEFAULT_HOSTNAME_SPACE_AFTER = 1;
