import type {
  StringifyFormat,
  BaseFormatPartOptions,
  FormattedStructuredPart,
} from "@/modules/formatters";
import type { NormalizedStructuredPart } from "@/modules/normalizers/types";

export type CustomStructuredPartFormatter<L extends string> = ({
  part,
}: {
  part: NormalizedStructuredPart;
}) => { [Key in L]: FormattedStructuredPart } & { cssStyle: string };

/**
 * Structured part formatting options.
 */
export type FormatStructuredPartOptions<L extends string = string> =
  BaseFormatPartOptions & {
    /**
     * CSS style string used with `console.log('%c...')`.
     * Example: "color: red; font-weight: bold;"
     */
    cssStyle?: string;
    /**
     * The output format. Defaults to "json".
     * - "raw": output unprocessed data,
     * - "json": output JSON string,
     * - "compact": minimal inline formatting,
     * - "pretty": human-readable formatting,
     */
    format?: StringifyFormat;
    /** Provide a custom function to override default formatting. */
    customFormatter?: CustomStructuredPartFormatter<L>;
  };
