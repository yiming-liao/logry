export { Normalizer } from "./normalizer";

export {
  normalizeTimestamp,
  normalizeId,
  normalizeLevel,
  normalizeScope,
  normalizeMessage,
  normalizeMeta,
  normalizeContext,
} from "./parts";

export type {
  NormalizerConfig,
  BaseNormalizerConfig,
  TimestampStyle,
  LevelStyle,
  ScopeSeparator,
} from "./normalizer-config-types";

export type {
  NormalizedPayload,
  NormalizedTimestamp,
  NormalizedId,
  NormalizedLevel,
  NormalizedScope,
  NormalizedMessage,
  NormalizedMeta,
  NormalizedContext,
} from "./types";
