import type {
  FieldOutputType,
  FormatFieldReturn,
} from "@/modules/formatters/types";
import type { SnapshotLogFields } from "@/shared/types/log-fields";
import type { NormalizedStructuredField } from "@/shared/types/log-fields/normalized-log-fields";

/** A custom formatter function for a specific log field and output type. */
export type CustomFormatter<O extends FieldOutputType> = ({
  fieldValue,
  raw,
}: {
  fieldValue: O extends "string" ? string : NormalizedStructuredField;
  raw: SnapshotLogFields;
}) => FormatFieldReturn<O>;
