import type { RawCoreLogData } from "@/core/logger/types";
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
/** Only used in Node.js environment */
export type NormalizedPid = number;
export type NormalizedHostname = NormalizedStringPart;

// Output from the Normalizer
export type NormalizedPayload = {
  timestamp: NormalizedTimestamp;
  id: NormalizedId;
  level: NormalizedLevel;
  pid?: NormalizedPid;
  hostname?: NormalizedHostname;
  scope: NormalizedScope;
  message: NormalizedMessage;
  meta?: NormalizedMeta;
  context?: NormalizedContext;
  normalizerConfig: NormalizerConfig;
  formatterConfig: FormatterConfig;
} & { raw: RawCoreLogData };
