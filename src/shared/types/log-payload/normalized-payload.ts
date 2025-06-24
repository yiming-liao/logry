import type { FormatterConfig } from "@/modules/formatters/types";
import type { NormalizerConfig } from "@/modules/normalizers/types";
import type {
  NormalizedTimestamp,
  NormalizedId,
  NormalizedLevel,
  NormalizedScope,
  NormalizedMessage,
  NormalizedMeta,
  NormalizedContext,
  NormalizedPid,
  NormalizedHostname,
  SnapshotLogFields,
} from "@/shared/types/log-fields";

/** Normalized log payload with resolved fields, configs, and raw snapshot */
export type NormalizedPayload = {
  timestamp: NormalizedTimestamp;
  id: NormalizedId;
  level: NormalizedLevel;
  scope: NormalizedScope;
  message: NormalizedMessage;
  meta?: NormalizedMeta;
  context?: NormalizedContext;
  pid?: NormalizedPid;
  hostname?: NormalizedHostname;
} & {
  normalizerConfig: NormalizerConfig;
  formatterConfig: FormatterConfig;
} & {
  raw: SnapshotLogFields;
};
