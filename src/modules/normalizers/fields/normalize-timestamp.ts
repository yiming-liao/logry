import type {
  NormalizeFieldOptions,
  NormalizeTimestampExtraOptions,
} from "@/modules/normalizers/types";
import type {
  NormalizedTimestamp,
  RawTimestamp,
  SnapshotLogFields,
} from "@/shared/types/log-fields";
import { internalLog } from "@/internal";
import {
  DEFAULT_SHOW_TIME_ONLY,
  DEFAULT_TIMESTAMP_STYLE,
  DEFAULT_USE_UTC,
} from "@/modules/normalizers/constants";
import { buildTimestampString } from "@/modules/normalizers/utils/build-timestamp-string";
import { tryCustomNormalizer } from "@/modules/normalizers/utils/try-custom-normalizer";

export type TimestampStyle = "raw" | "pretty" | "iso" | "epoch";

export const normalizeTimestamp = (
  fieldValue: RawTimestamp,
  raw: SnapshotLogFields,
  options: NormalizeFieldOptions<
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
    input: { fieldValue, raw },
    customNormalizer,
  });
  if (customized) {
    return customized;
  }

  switch (style) {
    case "raw": {
      return fieldValue;
    }
    case "iso": {
      return new Date(fieldValue).toISOString();
    }
    case "epoch": {
      return Math.floor(fieldValue / 1000);
    }
    case "pretty": {
      return buildTimestampString({
        timestamp: fieldValue,
        useUTC,
        showTimeOnly,
      });
    }
    default: {
      internalLog({
        type: "warn",
        message: `Unknown timestamp style "${style}", using "pretty" as fallback.`,
      });
      return buildTimestampString({
        timestamp: fieldValue,
        useUTC,
        showTimeOnly,
      });
    }
  }
};
