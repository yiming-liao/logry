import type { RawLogData } from "@/core/logger/types";
import type { FormatterConfig } from "@/modules/formatters/formatter-config-types";
import type { NormalizerConfig } from "@/modules/normalizers/normalizer-config-types";

export type NormalizedStructuredPart = Record<string, unknown> | undefined;
export type NormalizedStringPart = string;

// Normalized log data types
export type NormalizedTimestamp = string | number;
export type NormalizedId = NormalizedStringPart;
export type NormalizedLevel = NormalizedStringPart;
export type NormalizedScope = NormalizedStringPart;
export type NormalizedMessage = NormalizedStringPart;
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
