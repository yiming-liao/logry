import type { FormatStringPartOptions } from "@/modules/formatters/browser/shared/format-string-parts";
import type { FormatStructuredPartOptions } from "@/modules/formatters/browser/shared/format-structured-parts";

/** Browser format config */
export type BrowserFormatterConfig = {
  /** Timestamp formatting options. */
  timestamp?: FormatStringPartOptions<"timestamp">;
  /** ID formatting options. */
  id?: FormatStringPartOptions<"id">;
  /** Level formatting options. */
  level?: FormatStringPartOptions<"level">;
  /** Scope formatting options. */
  scope?: FormatStringPartOptions<"scope">;
  /** Message formatting options. */
  message?: FormatStringPartOptions<"message">;
  /** Meta formatting options. */
  meta?: FormatStructuredPartOptions<"meta">;
  /** Context formatting options. */
  context?: FormatStructuredPartOptions<"context">;

  /** Number of line breaks to add before the entire log message */
  lineBreaksBefore?: number;
  /** Number of line breaks to add after the entire log message */
  lineBreaksAfter?: number;
};
