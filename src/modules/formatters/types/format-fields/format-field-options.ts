import type {
  FieldOutputType,
  NodeFormatFieldOptions,
  BrowserFormatFieldOptions,
  EdgeFormatFieldOptions,
  WithExtraOption,
  CustomFormatter,
} from "@/modules/formatters/types";
import type { StringifyFormat } from "@/modules/formatters/utils/format-object";
import type { Platform } from "@/shared/types";
import type { FieldKey } from "@/shared/types/log-fields";

/** Format options for a log field on a specific platform. */
export type FormatFieldOptions<
  P extends Platform,
  K extends FieldKey,
  O extends FieldOutputType,
> = PlatformFormatFieldOptionsMap<K, O>[P];

/** Maps each platform to its field-specific format options. */
type PlatformFormatFieldOptionsMap<
  K extends FieldKey,
  O extends FieldOutputType,
> = {
  node: WithExtraOption<NodeFormatFieldOptions<O>, K>;
  browser: WithExtraOption<BrowserFormatFieldOptions<O>, K>;
  edge: WithExtraOption<EdgeFormatFieldOptions<O>, K>;
};

/** Common format options shared by all field types. */
export type BaseFormatFieldOptions = {
  /** Hide the output. Defaults to false. */
  hide?: boolean;
  /** A string to prepend before the formatted value. */
  prefix?: string;
  /** A string to append after the formatted value. */
  suffix?: string;
  /** The number of line breaks to add before. Defaults to 0. */
  lineBreaks?: number;
  /** Number of spaces to insert after the formatted output. */
  spaceAfter?: number;
};

/** Resolved field format options based on output type. */
export type ResolvedFormatFieldOptions<O extends FieldOutputType> =
  O extends "string"
    ? BaseFormatFieldOptions & {
        /**
         * Custom formatter function.
         * If set, other formatting options will be ignored.
         */
        customFormatter?: CustomFormatter<"string">;
      }
    : BaseFormatFieldOptions & {
        /** Stringify format for structured data. */
        format?: StringifyFormat;
        /** Number of spaces used for indentation. */
        indent?: number;
        /**
         * Custom formatter function.
         * If set, other formatting options will be ignored.
         */
        customFormatter?: CustomFormatter<"structured">;
      };
