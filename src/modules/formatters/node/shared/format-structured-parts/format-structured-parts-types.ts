import type {
  StringifyFormat,
  FormattedStructuredPart,
  BaseFormatPartOptions,
} from "@/modules/formatters";
import type { NormalizedStructuredPart } from "@/modules/normalizers/types";

export type CustomStructuredPartFormatter = ({
  part,
}: {
  part: NormalizedStructuredPart;
}) => FormattedStructuredPart;

/**
 * Structured part formatting options.
 */
export type FormatStructuredPartOptions = BaseFormatPartOptions & {
  /** ANSI escape code string to wrap the output with color. */
  ansiColor?: string;
  /**
   * The output format. Defaults to "json".
   * - "raw": output unprocessed data,
   * - "json": output JSON string,
   * - "compact": minimal inline formatting,
   * - "pretty": human-readable formatting,
   */
  format?: StringifyFormat;
  /** The max depth for raw output. Only applies when format is "raw". */
  depth?: number | null;
  /** Provide a custom function to override default formatting. */
  customFormatter?: CustomStructuredPartFormatter;
};
