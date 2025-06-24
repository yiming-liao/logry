import type { FieldOutputType } from "@/modules/formatters/types";
import type { FormattedStructuredField } from "@/shared/types/log-fields";

/** Result returned from formatting a single log field. */
export type FormatFieldReturn<O extends FieldOutputType> = {
  /** Final output value of the field. */
  fieldValue: O extends "string" ? string : FormattedStructuredField;
  /** Optional ANSI styling for Node.js output. */
  withAnsiStyle?: string;
  /** Optional CSS styling for browser console. */
  cssStyle?: string;
};
