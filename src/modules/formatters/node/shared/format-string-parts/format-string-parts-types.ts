import type {
  RawId,
  RawLevel,
  RawMessage,
  RawScope,
  RawTimestamp,
} from "@/core/logger/types";
import type { FormattedStringPart } from "@/modules/formatters/types";
import type { BaseFormatPartOptions } from "@/modules/formatters/formatter-config-types";

export type CustomStringPartFormatter = ({
  part,
  rawPart,
}: {
  part: string;
  rawPart: RawTimestamp | RawId | RawLevel | RawScope | RawMessage;
}) => FormattedStringPart;

/**
 * String part formatting options.
 */
export type FormatStringPartOptions<L extends string = string> =
  L extends "scope"
    ? BaseFormatStringPartOptions & FormatScopePartOptions
    : BaseFormatStringPartOptions;

/** Base options without scope options  */
type BaseFormatStringPartOptions = BaseFormatPartOptions & {
  /** ANSI escape code string to wrap the output with color. */
  ansiColor?: string;
  /** Provide a custom function to override default formatting. */
  customFormatter?: CustomStringPartFormatter;
};

/** Specific adiitional options for "scope" */
type FormatScopePartOptions = {
  /** Show only the last scope segment if true. Default to false */
  showOnlyLatest?: boolean;
  /** Custom separator string to replace original separator */
  separator?: string;
};
