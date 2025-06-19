import type {
  StringifyFormat,
  FormattedStructuredPart,
  BaseFormatPartOptions,
} from "@/modules/formatters";
import type { NormalizedStructuredPart } from "@/modules/normalizers/types";
import type { InspectOptions } from "@/shared/utils/lazy-modules";

export type CustomStructuredPartFormatter<L extends string> = ({
  part,
}: {
  part: NormalizedStructuredPart;
}) => { [Key in L]: FormattedStructuredPart } & { withAnsiStyle: string };

/**
 * Structured part formatting options.
 */
export type FormatStructuredPartOptions<L extends string = string> =
  BaseFormatPartOptions & {
    /** ANSI escape code string to wrap the output with color. */
    ansiStyle?: string;
    /**
     * The output format. Defaults to "json".
     * - "raw": output unprocessed data,
     * - "json": output JSON string,
     * - "compact": minimal inline formatting,
     * - "pretty": human-readable formatting,
     */
    format?: StringifyFormat;
    /** Indentation width (in spaces) for each line, used with the "pretty" format. */
    indent?: number;
    /** Provide a custom function to override default formatting. */
    customFormatter?: CustomStructuredPartFormatter<L>;
  } & InspectOptions;
