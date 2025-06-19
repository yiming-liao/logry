import type { StringifyFormat } from "@/modules/formatters";

export const BROWSER_FONT_STYLE =
  "font-family: 'Menlo', 'Consolas', 'Courier New', monospace;";
export const BROWSER_PADDING_STYLE = "padding: 4px 8px;";
export const BROWSER_BORDER_STYLE = "border: 1px solid gray;";

// Timestamp
export const DEFAULT_TIMESTAMP_HIDE = false;
export const DEFAULT_TIMESTAMP_PREFIX = undefined;
export const DEFAULT_TIMESTAMP_SUFFIX = undefined;
export const DEFAULT_TIMESTAMP_CSS_STYLE = `${BROWSER_FONT_STYLE}${BROWSER_PADDING_STYLE}${BROWSER_BORDER_STYLE} border-left: 8px solid `; // Dynamic border color
export const DEFAULT_TIMESTAMP_LINE_BREAKS = 0;
export const DEFAULT_TIMESTAMP_SPACE_AFTER = 0;

// Id
export const DEFAULT_ID_HIDE = false;
export const DEFAULT_ID_PREFIX = undefined;
export const DEFAULT_ID_SUFFIX = undefined;
export const DEFAULT_ID_CSS_STYLE = `${BROWSER_FONT_STYLE}${BROWSER_PADDING_STYLE}${BROWSER_BORDER_STYLE} font-style: italic; font-weight:600;`;
export const DEFAULT_ID_LINE_BREAKS = 0;
export const DEFAULT_ID_SPACE_AFTER = 0;

// Level
export const DEFAULT_LEVEL_HIDE = false;
export const DEFAULT_LEVEL_PREFIX = undefined;
export const DEFAULT_LEVEL_SUFFIX = undefined;
export const DEFAULT_LEVEL_CSS_STYLE = `${BROWSER_FONT_STYLE}${BROWSER_PADDING_STYLE}${BROWSER_BORDER_STYLE} background: `; // Dynamic background color
export const DEFAULT_LEVEL_LINE_BREAKS = 0;
export const DEFAULT_LEVEL_SPACE_AFTER = 0;

// Scope
export const DEFAULT_SCOPE_HIDE = false;
export const DEFAULT_SCOPE_PREFIX = undefined;
export const DEFAULT_SCOPE_SUFFIX = undefined;
export const DEFAULT_SCOPE_CSS_STYLE = `${BROWSER_FONT_STYLE}${BROWSER_PADDING_STYLE}${BROWSER_BORDER_STYLE}`;
export const DEFAULT_SCOPE_LINE_BREAKS = 0;
export const DEFAULT_SCOPE_SPACE_AFTER = 0;
export const DEFAULT_SCOPE_SEPARATOR = " > ";
export const DEFAULT_SCOPE_SHOW_ONLY_LATEST = false;

// Message
export const DEFAULT_MESSAGE_HIDE = false;
export const DEFAULT_MESSAGE_PREFIX = " ";
export const DEFAULT_MESSAGE_SUFFIX = undefined;
export const DEFAULT_MESSAGE_CSS_STYLE = undefined;
export const DEFAULT_MESSAGE_LINE_BREAKS = 0;
export const DEFAULT_MESSAGE_SPACE_AFTER = 0;

// Meta
export const DEFAULT_META_HIDE = false;
export const DEFAULT_META_PREFIX = undefined;
export const DEFAULT_META_SUFFIX = undefined;
export const DEFAULT_META_CSS_STYLE = undefined;
export const DEFAULT_META_LINE_BREAKS = 0;
export const DEFAULT_META_SPACE_AFTER = 0;
export const DEFAULT_META_FORMAT: StringifyFormat = "raw";
export const DEFAULT_META_INDENTS = 4;

// Context
export const DEFAULT_CONTEXT_HIDE = true;
export const DEFAULT_CONTEXT_PREFIX = undefined;
export const DEFAULT_CONTEXT_SUFFIX = undefined;
export const DEFAULT_CONTEXT_CSS_STYLE = undefined;
export const DEFAULT_CONTEXT_LINE_BREAKS = 0;
export const DEFAULT_CONTEXT_SPACE_AFTER = 0;
export const DEFAULT_CONTEXT_FORMAT: StringifyFormat = "raw";
export const DEFAULT_CONTEXT_INDENTS = 4;
