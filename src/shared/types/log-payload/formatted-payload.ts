import type { FormatterConfig } from "@/modules/formatters/types";
import type { NormalizerConfig } from "@/modules/normalizers/types";
import type {
  FormattedTimestamp,
  FormattedId,
  FormattedLevel,
  FormattedScope,
  FormattedMessage,
  FormattedMeta,
  FormattedContext,
  FormattedPid,
  FormattedHostname,
  SnapshotLogFields,
} from "@/shared/types/log-fields";

/** Formatted log payload with resolved fields, configs, and raw snapshot */
export type FormattedPayload = {
  timestamp: FormattedTimestamp;
  id: FormattedId;
  level: FormattedLevel;
  scope: FormattedScope;
  message: FormattedMessage;
  meta: FormattedMeta;
  context: FormattedContext;
  pid?: FormattedPid;
  hostname?: FormattedHostname;
} & {
  normalizerConfig: NormalizerConfig;
  formatterConfig: FormatterConfig;
} & {
  raw: SnapshotLogFields;
} & {
  // Node-specific
  withAnsiStyle: {
    timestamp?: string;
    id?: string;
    level?: string;
    pid?: string;
    hostname?: string;
    scope?: string;
    message?: string;
    meta?: string;
    context?: string;
  };
} & {
  // Browser-specific
  cssStyles: {
    timestamp?: string;
    id?: string;
    level?: string;
    scope?: string;
    message?: string;
    meta?: string;
    context?: string;
  };
};
