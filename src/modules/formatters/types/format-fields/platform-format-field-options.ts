import type {
  FieldOutputType,
  ResolvedFormatFieldOptions,
} from "@/modules/formatters/types";
import type { InspectOptions } from "@/shared/utils/node/lazy-modules";

/** Node-specific format options for a log field. */
export type NodeFormatFieldOptions<O extends FieldOutputType> =
  O extends "string"
    ? ResolvedFormatFieldOptions<O> & {
        /** ANSI escape code used to colorize output. */
        ansiStyle?: string;
        /** Whether to apply ANSI styling in the output. */
        useAnsiStyle?: boolean;
      }
    : ResolvedFormatFieldOptions<O> & {
        /** ANSI escape code used to colorize output. */
        ansiStyle?: string;
        /** Whether to apply ANSI styling in the output. */
        useAnsiStyle?: boolean;
      } & InspectOptions;

/** Browser-specific format options for a log field. */
export type BrowserFormatFieldOptions<O extends FieldOutputType> =
  ResolvedFormatFieldOptions<O> & {
    /** CSS style string used with `console.log('%c...')`. */
    cssStyle?: string;
  };

/** Edge-specific format options for a log field. */
export type EdgeFormatFieldOptions<O extends FieldOutputType> =
  ResolvedFormatFieldOptions<O>;
