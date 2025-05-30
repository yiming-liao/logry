export { Normalizer } from "./normalizer";

export { normalizeTimestamp } from "./parts/timestamp";
export { normalizeId } from "./parts/id";
export { normalizeLevel } from "./parts/level";
export { normalizeScope } from "./parts/scope";
export { normalizeMessage } from "./parts/message";
export { normalizeMeta } from "./parts/meta";
export { normalizeContext } from "./parts/context";

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
