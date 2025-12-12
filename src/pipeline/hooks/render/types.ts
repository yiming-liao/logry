import type {
  Formatted,
  LogContext,
  Rendered,
} from "@/shared/types/log-context";

export type RenderOptions = {
  customRenderer?: (
    value: Formatted[keyof Formatted],
    ctx: LogContext,
  ) => Rendered[keyof Rendered] | undefined;
  prefix?: string;
  suffix?: string;
  paddingBefore?: number;
  paddingAfter?: number;
  width?: number;
  align?: "left" | "right" | "center";
  marginBefore?: number;
  marginAfter?: number;
  lineBreaksBefore?: number;
  lineBreaksAfter?: number;
  ansiStyle?: (text: string, ctx: LogContext) => string;
  cssStyle?: string;
};

export type RenderConfig = {
  timestamp?: RenderOptions;
  id?: RenderOptions;
  level?: RenderOptions;
  scope?: RenderOptions;
  message?: RenderOptions;
  meta?: RenderOptions;
  context?: RenderOptions;
};
