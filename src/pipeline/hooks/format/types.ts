import type { ObjectFormat } from "@/pipeline/hooks/format/utils/format-object";
import type {
  Formatted,
  LogContext,
  Normalized,
  Raw,
} from "@/shared/types/log-context";

/** Base options applied to formatting a specific field. */
type BaseFormatOptions<K extends keyof Raw> = {
  /** Custom formatter. Return `undefined` to skip and use default behavior. */
  customFormatter?: (
    value: Normalized[K],
    ctx: LogContext,
  ) => Formatted[K] | undefined;
};

/** Configuration for the `format` hook. */
export type FormatConfig = {
  timestamp?: BaseFormatOptions<"timestamp"> & {
    /** Timestamp format style. */
    format?: "raw" | "pretty" | "iso" | "epoch";
    /** Whether to use UTC time. */
    useUTC?: boolean;
    /** Include the date part in the formatted output. */
    withDate?: boolean;
  };
  level?: BaseFormatOptions<"level"> & {
    /** Text casing style for the level. */
    format?: "upper" | "lower" | "title" | "abbr";
  };
  scope?: BaseFormatOptions<"scope"> & {
    /** Separator between scope segments. */
    separator?: string;
    /** Only show the last scope segment. */
    lastOnly?: boolean;
  };
  meta?: BaseFormatOptions<"meta"> & {
    /** Stringify style for objects. */
    format?: ObjectFormat;
    /** Indentation level for object output. */
    indent?: number;
  };
  context?: BaseFormatOptions<"context"> & {
    /** Stringify style for objects. */
    format?: ObjectFormat;
    /** Indentation level for object output. */
    indent?: number;
  };
};
