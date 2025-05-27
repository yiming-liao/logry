import type { NodeFormatter } from "../../../formatter-types";
import type { StringifyMeta } from "../../../output-config-types";

export type PrintNodeLogPayload = {
  logLine: string;
  meta: unknown;
  metaDepth: number;
  useColor: boolean;
  stringifyMeta: StringifyMeta;
  metaLineBreaks: number;
  topBorder: number;
  topLineBreaks: number;
  bottomLineBreaks: number;
  bottomBorder: number;
  formatter?: NodeFormatter;
};
