import type { RawLogData } from "@/core/logger/types";
import type { FormatterConfig } from "@/modules/formatters/formatter-config-types";
import type { NormalizerConfig } from "@/modules/normalizers";

export type FormattedStringPart = string;
export type FormattedStructuredPart = Record<string, unknown> | string;

// Formatted log data types
export type FormattedTimestamp = FormattedStringPart;
export type FormattedId = FormattedStringPart;
export type FormattedLevel = FormattedStringPart;
export type FormattedScope = FormattedStringPart;
export type FormattedMessage = FormattedStringPart;
export type FormattedMeta = FormattedStructuredPart;
export type FormattedContext = FormattedStructuredPart;
export type FormattedProcessInfo = FormattedStringPart;
export type FormattedPid = FormattedStringPart;

// Base formatted payload
export type BaseFormattedPayload = {
  timestamp: FormattedTimestamp;
  id: FormattedId;
  level: FormattedLevel;
  scope: FormattedScope;
  message: FormattedMessage;
  meta: FormattedMeta;
  context: FormattedContext;
  normalizerConfig: NormalizerConfig;
  formatterConfig: FormatterConfig;
} & { raw: Omit<RawLogData, "meta" | "context"> };

// Node formatted payload
export type NodeFormattedPayload = BaseFormattedPayload;

// Browser formatted payload
export type BrowserFormattedPayload = BaseFormattedPayload & {
  cssStyles: {
    timestamp: string;
    id: string;
    level: string;
    scope: string;
    message: string;
    meta: string;
    context: string;
  };
};

/**
 * Main output
 */
export type FormattedPayload = NodeFormattedPayload | BrowserFormattedPayload;
