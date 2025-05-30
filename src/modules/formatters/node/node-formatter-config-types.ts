import type { FormatStringPartOptions } from "@/modules/formatters/node/shared/format-string-parts";
import type { FormatStructuredPartOptions } from "@/modules/formatters/node/shared/format-structured-parts";

/** Node format config */
export type NodeFormatterConfig = {
  /** Whether to disabled the formatter */
  disabled?: boolean;
  /** Timestamp formatting options. */
  timestamp?: FormatStringPartOptions;
  /** ID formatting options. */
  id?: FormatStringPartOptions;
  /** Level formatting options. */
  level?: FormatStringPartOptions;
  /** Scope formatting options. */
  scope?: FormatStringPartOptions<"scope">;
  /** Message formatting options. */
  message?: FormatStringPartOptions;
  /** Meta formatting options. */
  meta?: FormatStructuredPartOptions;
  /** Context formatting options. */
  context?: FormatStructuredPartOptions;
  /** Pid formatting options. */
  pid?: FormatStringPartOptions;
  /** Hostname formatting options. */
  hostname?: FormatStringPartOptions;

  /** Number of line breaks to add before the entire log message */
  lineBreaksBefore?: number;
  /** Number of line breaks to add after the entire log message */
  lineBreaksAfter?: number;
};
