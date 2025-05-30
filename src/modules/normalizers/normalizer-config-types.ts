import type { NormalizedContextOptions } from "@/modules/normalizers/parts/context";
import type { NormalizedIdOptions } from "@/modules/normalizers/parts/id";
import type { NormalizedLevelOptions } from "@/modules/normalizers/parts/level";
import type { NormalizedMessageOptions } from "@/modules/normalizers/parts/message";
import type { NormalizedMetaOptions } from "@/modules/normalizers/parts/meta";
import type { NormalizedScopeOptions } from "@/modules/normalizers/parts/scope";
import type { NormalizedTimestampOptions } from "@/modules/normalizers/parts/timestamp";

export type TimestampStyle = "raw" | "pretty" | "iso" | "epoch";
export type LevelStyle = "upper" | "lower" | "title";

export type ScopeSeparator = "." | " > " | ">" | ":" | "/" | "_" | "-";

export type BaseNormalizerConfig = {
  timestamp?: NormalizedTimestampOptions;
  id?: NormalizedIdOptions;
  level?: NormalizedLevelOptions;
  scope?: NormalizedScopeOptions;
  message?: NormalizedMessageOptions;
  meta?: NormalizedMetaOptions;
  context?: NormalizedContextOptions;
};

export type NormalizerConfig = {
  node?: BaseNormalizerConfig;
  browser?: BaseNormalizerConfig;
};
