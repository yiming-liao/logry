import type { ObjectFormat } from "@/pipeline/hooks/format/utils/format-object";
import type { Level } from "@/shared/level";
import type {
  Formatted,
  LogContext,
  Normalized,
} from "@/shared/types/log-context";

/** Base options applied to formatting a specific field. */
type BaseFormatOptions<Input = unknown> = {
  /** Hide this field from the formatted output. */
  hide?: boolean;
  /** Custom formatter. Return `undefined` to skip and use default behavior. */
  customFormatter?: (
    value: Input,
    ctx: LogContext,
  ) => Formatted[keyof Formatted] | undefined;
};

/** Configuration for the `format` hook. */
export type FormatConfig = {
  timestamp?: BaseFormatOptions<Normalized["timestamp"]> & {
    /** Timestamp format style. */
    format?: "raw" | "pretty" | "iso" | "epoch";
    /** Whether to use UTC time. */
    useUTC?: boolean;
    /** Include the date part in the formatted output. */
    withDate?: boolean;
  };
  id?: Omit<BaseFormatOptions<Normalized["id"]>, "customFormatter">;
  level?: BaseFormatOptions<Level> & {
    /** Text casing style for the level. */
    format?: "upper" | "lower" | "title" | "abbr";
  };
  scope?: BaseFormatOptions<Normalized["scope"]> & {
    /** Separator between scope segments. */
    separator?: string;
    /** Only show the last scope segment. */
    lastOnly?: boolean;
  };
  message?: Omit<BaseFormatOptions<Normalized["message"]>, "customFormatter">;
  meta?: BaseFormatOptions<Normalized["meta"]> & {
    /** Stringify style for objects. */
    format?: ObjectFormat;
    /** Indentation level for object output. */
    indent?: number;
  };
  context?: BaseFormatOptions<Normalized["context"]> & {
    /** Stringify style for objects. */
    format?: ObjectFormat;
    /** Indentation level for object output. */
    indent?: number;
  };
};
