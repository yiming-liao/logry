import type { FormatFieldOptions } from "@/modules/formatters/types";

export type BrowserFormatterConfig = {
  /** Timestamp formatting options. */
  timestamp?: FormatFieldOptions<"browser", "timestamp", "string">;
  /** ID formatting options. */
  id?: FormatFieldOptions<"browser", "id", "string">;
  /** Level formatting options. */
  level?: FormatFieldOptions<"browser", "level", "string">;
  /** Scope formatting options. */
  scope?: FormatFieldOptions<"browser", "scope", "string">;
  /** Message formatting options. */
  message?: FormatFieldOptions<"browser", "message", "string">;
  /** Meta formatting options. */
  meta?: FormatFieldOptions<"browser", "meta", "structured">;
  /** Context formatting options. */
  context?: FormatFieldOptions<"browser", "context", "structured">;

  /** Number of line breaks to add before the entire log message */
  lineBreaksBefore?: number;
  /** Number of line breaks to add after the entire log message */
  lineBreaksAfter?: number;
};
