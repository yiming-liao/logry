import type { SnapshotLogFields } from "@/shared/types/log-fields";

/** A custom Normalizer function for a specific log field and output type. */
export type CustomNormalizer<Input, Result> = ({
  fieldValue,
  raw,
}: {
  fieldValue: Input;
  raw: SnapshotLogFields;
}) => Result;
