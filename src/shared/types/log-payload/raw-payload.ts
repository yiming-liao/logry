import type { FormatterConfig } from "@/modules/formatters/types";
import type { NormalizerConfig } from "@/modules/normalizers/types";
import type {
  RawLogFields,
  SnapshotLogFields,
} from "@/shared/types/log-fields";

/** Raw log payload including fields, configs, and raw snapshot */
export type RawPayload = RawLogFields & {
  normalizerConfig: NormalizerConfig;
  formatterConfig: FormatterConfig;
} & {
  raw: SnapshotLogFields;
};
