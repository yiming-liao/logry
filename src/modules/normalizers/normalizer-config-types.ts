import type {
  RawTimestamp,
  RawId,
  RawLevel,
  RawScope,
  RawMessage,
  RawMeta,
  RawContext,
} from "@/core/logger";
import type {
  NormalizeLevelExtraOptions,
  NormalizeMetaExtraOptions,
  NormalizePartOptions,
  NormalizeScopeExtraOptions,
  NormalizeTimestampExtraOptions,
} from "@/modules/normalizers/normalize-part-types";
import type {
  NormalizedTimestamp,
  NormalizedId,
  NormalizedLevel,
  NormalizedScope,
  NormalizedMessage,
  NormalizedMeta,
  NormalizedContext,
} from "@/modules/normalizers/types";

export type TimestampStyle = "raw" | "pretty" | "iso" | "epoch";
export type LevelStyle = "upper" | "lower" | "title";

export type ScopeSeparator = "." | " > " | ">" | ":" | "/" | "_" | "-";

export type BaseNormalizerConfig = {
  timestamp?: NormalizePartOptions<
    RawTimestamp,
    NormalizedTimestamp,
    NormalizeTimestampExtraOptions
  >;
  id?: NormalizePartOptions<RawId, NormalizedId>;
  level?: NormalizePartOptions<
    RawLevel,
    NormalizedLevel,
    NormalizeLevelExtraOptions
  >;
  scope?: NormalizePartOptions<
    RawScope,
    NormalizedScope,
    NormalizeScopeExtraOptions
  >;
  message?: NormalizePartOptions<RawMessage, NormalizedMessage>;
  meta?: NormalizePartOptions<
    RawMeta,
    NormalizedMeta,
    NormalizeMetaExtraOptions
  >;
  context?: NormalizePartOptions<RawContext, NormalizedContext>;
};

export type NormalizerConfig = {
  node?: BaseNormalizerConfig;
  browser?: BaseNormalizerConfig;
};
