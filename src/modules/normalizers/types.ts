import type { RawLogData } from "@/core/logger/types";
import type { FormatterConfig } from "@/modules/formatters/formatter-config-types";
import type { NormalizerConfig } from "@/modules/normalizers/normalizer-config-types";

export type NormalizedStructuredPart = Record<string, unknown> | undefined;

// Normalized log data types
export type NormalizedTimestamp = string | number;
export type NormalizedId = string;
export type NormalizedLevel = string;
export type NormalizedScope = string;
export type NormalizedMessage = string;
export type NormalizedMeta = NormalizedStructuredPart;
export type NormalizedContext = NormalizedStructuredPart;

// Output from the Normalizer
export type NormalizedPayload = {
  timestamp: NormalizedTimestamp;
  id: NormalizedId;
  level: NormalizedLevel;
  scope: NormalizedScope;
  message: NormalizedMessage;
  meta?: NormalizedMeta;
  context?: NormalizedContext;
  normalizerConfig: NormalizerConfig;
  formatterConfig: FormatterConfig;
} & { raw: Omit<RawLogData, "meta" | "context"> };
