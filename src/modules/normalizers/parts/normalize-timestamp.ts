import type { RawTimestamp } from "@/core/logger/types";
import type {
  NormalizePartOptions,
  NormalizeTimestampExtraOptions,
} from "@/modules/normalizers/normalize-part-types";
import type { NormalizedTimestamp } from "@/modules/normalizers/types";
import { internalLog } from "@/internal";
import {
  DEFAULT_SHOW_TIME_ONLY,
  DEFAULT_TIMESTAMP_STYLE,
  DEFAULT_USE_UTC,
} from "@/modules/normalizers/constants";
import { buildTimestampString } from "@/modules/normalizers/utils/build-timestamp-string";
import { tryCustomNormalizer } from "@/modules/normalizers/utils/try-custom-normalizer";

export const normalizeTimestamp = (
  timestamp: RawTimestamp,
  options: NormalizePartOptions<
    RawTimestamp,
    NormalizedTimestamp,
    NormalizeTimestampExtraOptions
  > = {},
): NormalizedTimestamp => {
  const {
    style = DEFAULT_TIMESTAMP_STYLE,
    useUTC = DEFAULT_USE_UTC,
    showTimeOnly = DEFAULT_SHOW_TIME_ONLY,
    customNormalizer,
  } = options;

  // Use custom normalizer if provided
  const customized = tryCustomNormalizer({
    label: "timestamp",
    input: { part: timestamp },
    customNormalizer,
  });
  if (customized) {
    return customized;
  }

  switch (style) {
    case "raw":
      return timestamp;
    case "iso":
      return new Date(timestamp).toISOString();
    case "epoch":
      return Math.floor(timestamp / 1000);
    case "pretty":
      return buildTimestampString({ timestamp, useUTC, showTimeOnly });
    default:
      internalLog({
        type: "warn",
        message: `Unknown timestamp style "${style}", using "pretty" as fallback.`,
      });
      return buildTimestampString({ timestamp, useUTC, showTimeOnly });
  }
};
