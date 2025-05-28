import type { BrowserFormatter, NodeFormatter } from "./formatter-types";

/** Defines how metadata should be stringified in log output. */
export type StringifyMeta = "compact" | "pretty" | false;

/** Base config shared by Node and Browser */
export type BaseOutputConfig = {
  /** Whether to hide the date part and show only the time */
  hideDate?: boolean;
  /** Whether to hide the ID label */
  hideId?: boolean;
  /** Whether to hide the scope label */
  hideScope?: boolean;
  /** String used to separate multiple scope parts */
  scopeSeparator?: string;
  /** Only display the latest scope item */
  showOnlyLatestScope?: boolean;
  /** String to prefix each log message with */
  messagePrefix?: string;
  /** Number of blank lines before the message content */
  messageLineBreaks?: number;
  /** Number of blank lines before the metadata section */
  metaLineBreaks?: number;
  /** Blank lines before the entire log block */
  topLineBreaks?: number;
  /** Blank lines after the entire log block */
  bottomLineBreaks?: number;
  /** How to format the meta object: pretty, compact, or false to disable */
  stringifyMeta?: StringifyMeta;
};

/** Node-specific output config options */
export type NodeOutputConfig = BaseOutputConfig & {
  /** Maximum depth for printing metadata objects */
  metaDepth?: number;
  /** Number of horizontal lines before the log message */
  topBorder?: number;
  /** Number of horizontal lines after the log message */
  bottomBorder?: number;
  /** Whether to enable ANSI color in output */
  useColor?: boolean;
  /** Custom formatter for Node environment */
  formatter?: NodeFormatter;
};

/** Browser-specific output config options */
export type BrowserOutputConfig = BaseOutputConfig & {
  /** Custom formatter for Borwser environment */
  formatter?: BrowserFormatter;
};

/** Contains output config for both Node and Browser environments */
export type OutputConfig = {
  /** Config for Node output */
  node?: NodeOutputConfig;
  /** Config for Browser output */
  browser?: BrowserOutputConfig;
};
