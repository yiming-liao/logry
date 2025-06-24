import type { FormatFieldOptions } from "@/modules/formatters/types";

export type EdgeFormatterConfig = {
  /** Timestamp formatting options. */
  timestamp?: FormatFieldOptions<"edge", "timestamp", "string">;
  /** ID formatting options. */
  id?: FormatFieldOptions<"edge", "id", "string">;
  /** Level formatting options. */
  level?: FormatFieldOptions<"edge", "level", "string">;
  /** Scope formatting options. */
  scope?: FormatFieldOptions<"edge", "scope", "string">;
  /** Message formatting options. */
  message?: FormatFieldOptions<"edge", "message", "string">;
  /** Meta formatting options. */
  meta?: FormatFieldOptions<"edge", "meta", "structured">;
  /** Context formatting options. */
  context?: FormatFieldOptions<"edge", "context", "structured">;

  /** Number of line breaks to add before the entire log message */
  lineBreaksBefore?: number;
  /** Number of line breaks to add after the entire log message */
  lineBreaksAfter?: number;
};
