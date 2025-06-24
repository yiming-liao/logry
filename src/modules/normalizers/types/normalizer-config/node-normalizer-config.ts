import type {
  NormalizeFieldOptions,
  NormalizeTimestampExtraOptions,
  NormalizeLevelExtraOptions,
  NormalizeScopeExtraOptions,
  NormalizeMetaExtraOptions,
} from "@/modules/normalizers/types/normalize-fields";
import type {
  RawTimestamp,
  RawId,
  RawLevel,
  RawScope,
  RawMessage,
  RawMeta,
  RawContext,
  RawPid,
  RawHostname,
  NormalizedTimestamp,
  NormalizedId,
  NormalizedLevel,
  NormalizedScope,
  NormalizedMessage,
  NormalizedMeta,
  NormalizedContext,
  NormalizedPid,
  NormalizedHostname,
} from "@/shared/types/log-fields";

export type NodeNormalizerConfig = {
  timestamp?: NormalizeFieldOptions<
    RawTimestamp,
    NormalizedTimestamp,
    NormalizeTimestampExtraOptions
  >;
  id?: NormalizeFieldOptions<RawId, NormalizedId>;
  level?: NormalizeFieldOptions<
    RawLevel,
    NormalizedLevel,
    NormalizeLevelExtraOptions
  >;
  scope?: NormalizeFieldOptions<
    RawScope,
    NormalizedScope,
    NormalizeScopeExtraOptions
  >;
  message?: NormalizeFieldOptions<RawMessage, NormalizedMessage>;
  meta?: NormalizeFieldOptions<
    RawMeta,
    NormalizedMeta,
    NormalizeMetaExtraOptions
  >;
  context?: NormalizeFieldOptions<RawContext, NormalizedContext>;
  pid?: NormalizeFieldOptions<RawPid, NormalizedPid>;
  hostname?: NormalizeFieldOptions<RawHostname, NormalizedHostname>;
};
