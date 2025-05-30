import type { BrowserFormatterConfig } from "@/modules/formatters/browser/browser-formatter-config-types";
import type { NodeFormatterConfig } from "@/modules/formatters/node";

export type StringifyFormat = "raw" | "json" | "compact" | "pretty";

export type BaseFormatPartOptions = {
  /** Hide the output. Defaults to false. */
  hide?: boolean;
  /** A string to prepend before the formatted part. */
  prefix?: string;
  /** A string to append after the formatted part. */
  suffix?: string;
  /** The number of line breaks to add before. Defaults to 0. */
  lineBreaks?: number;
  /** Number of spaces to insert after the formatted output. */
  spaceAfter?: number;
};

/** Formatting config for both Node and Browser environments */
export type FormatterConfig = {
  /** Config for Node display */
  node?: NodeFormatterConfig;
  /** Config for Browser display */
  browser?: BrowserFormatterConfig;
};
