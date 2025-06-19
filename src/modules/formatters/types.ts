import type { RawCoreLogData } from "@/core/logger/types";
import type { FormatterConfig } from "@/modules/formatters/formatter-config-types";
import type {
  NormalizedPayload,
  NormalizerConfig,
} from "@/modules/normalizers";
import type { Platform } from "@/shared/types";

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
export type FormattedHostname = FormattedStringPart;

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
} & { raw: RawCoreLogData };

// Node formatted payload
export type NodeFormattedPayload = BaseFormattedPayload & {
  pid: FormattedPid;
  hostname: FormattedHostname;
} & {
  withAnsiStyle: {
    timestamp: FormattedTimestamp;
    id: FormattedId;
    level: FormattedLevel;
    pid: FormattedPid;
    hostname: FormattedHostname;
    scope: FormattedScope;
    message: FormattedMessage;
    meta: FormattedMeta;
    context: FormattedContext;
  };
};

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
 * Represents the final formatted log output,
 * tailored for either Node.js or browser environments.
 */
export type FormattedPayload = NodeFormattedPayload | BrowserFormattedPayload;

/**
 * Formatter interface responsible for converting
 * a normalized log payload into a platform-specific formatted output.
 */
export interface Formatter {
  platform: Platform;
  format(payload: NormalizedPayload): FormattedPayload;
}
