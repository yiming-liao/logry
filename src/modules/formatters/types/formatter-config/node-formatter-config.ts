import type { FormatFieldOptions } from "@/modules/formatters/types";

export type NodeFormatterConfig = {
  /** Timestamp formatting options. */
  timestamp?: FormatFieldOptions<"node", "timestamp", "string">;
  /** ID formatting options. */
  id?: FormatFieldOptions<"node", "id", "string">;
  /** Level formatting options. */
  level?: FormatFieldOptions<"node", "level", "string">;
  /** Scope formatting options. */
  scope?: FormatFieldOptions<"node", "scope", "string">;
  /** Message formatting options. */
  message?: FormatFieldOptions<"node", "message", "string">;
  /** Meta formatting options. */
  meta?: FormatFieldOptions<"node", "meta", "structured">;
  /** Context formatting options. */
  context?: FormatFieldOptions<"node", "context", "structured">;
  /** Pid formatting options. */
  pid?: FormatFieldOptions<"node", "pid", "string">;
  /** Hostname formatting options. */
  hostname?: FormatFieldOptions<"node", "hostname", "string">;

  /** Number of line breaks to add before the entire log message */
  lineBreaksBefore?: number;
  /** Number of line breaks to add after the entire log message */
  lineBreaksAfter?: number;
};
