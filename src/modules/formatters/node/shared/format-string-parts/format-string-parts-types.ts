import type {
  RawId,
  RawLevel,
  RawMessage,
  RawScope,
  RawTimestamp,
} from "@/core/logger/types";
import type { BaseFormatPartOptions } from "@/modules/formatters/formatter-config-types";
import type { FormattedStringPart } from "@/modules/formatters/types";

export type CustomStringPartFormatter<L extends string> = ({
  part,
  rawPart,
}: {
  part: string;
  rawPart: RawTimestamp | RawId | RawLevel | RawScope | RawMessage;
}) => { [Key in L]: FormattedStringPart } & { withAnsiColor: string };

/**
 * String part formatting options.
 */
export type FormatStringPartOptions<L extends string = string> =
  L extends "scope"
    ? BaseFormatStringPartOptions<L> & FormatScopePartOptions
    : BaseFormatStringPartOptions<L>;

/** Base options without scope options  */
type BaseFormatStringPartOptions<L extends string> = BaseFormatPartOptions & {
  /** ANSI escape code string to wrap the output with color. */
  ansiColor?: string;
  /** Provide a custom function to override default formatting. */
  customFormatter?: CustomStringPartFormatter<L>;
};

/** Specific adiitional options for "scope" */
type FormatScopePartOptions = {
  /** Show only the last scope segment if true. Default to false */
  showOnlyLatest?: boolean;
  /** Custom separator string to replace original separator */
  separator?: string;
};
