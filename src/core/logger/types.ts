import type { FormattedPayload } from "@/modules/formatters";
import type { FormatterConfig } from "@/modules/formatters/formatter-config-types";
import type {
  NormalizedPayload,
  NormalizerConfig,
} from "@/modules/normalizers";
import type { Level } from "@/shared/types";

// Raw log data types
export type RawTimestamp = number;
export type RawId = string;
export type RawLevel = Level;
export type RawScope = string[];
export type RawMessage = string;
export type RawMeta = unknown;
export type RawContext = Record<string, unknown> | undefined;
/** Only used in Node.js environment */
export type RawPid = number;
export type RawHostname = string;
/** Only used in Browser environment */
// export type RawUserAgent = string;

// Core log data combining user input and internal context, passed to the Normalizer before processing.
export type RawLogData = {
  timestamp: RawTimestamp;
  id: RawId;
  level: RawLevel;
  scope: RawScope;
  message: RawMessage;
  meta?: RawMeta;
  context?: RawContext;
};

export type RawCoreLogData = Omit<RawLogData, "meta" | "context"> & {
  pid?: RawPid;
  hostname?: RawHostname;
};

// Input passed to the Normalizer — includes both log data and config
export type RawPayload = RawLogData & {
  pid?: RawPid;
  hostname?: RawHostname;
} & {
  normalizerConfig: NormalizerConfig;
  formatterConfig: FormatterConfig;
} & { raw: RawCoreLogData };

export type ReadyPayload = NormalizedPayload | FormattedPayload;
