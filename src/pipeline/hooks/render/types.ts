import type {
  Formatted,
  LogContext,
  Raw,
  Rendered,
} from "@/shared/types/log-context";

export type RenderOptions<K extends keyof Raw = keyof Raw> = {
  visible?: boolean;
  customRenderer?: (
    value: Formatted[K],
    ctx: LogContext,
  ) => Rendered[K] | undefined;
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
  timestamp?: RenderOptions<"timestamp">;
  id?: RenderOptions<"id">;
  level?: RenderOptions<"level">;
  scope?: RenderOptions<"scope">;
  message?: RenderOptions<"message">;
  meta?: RenderOptions<"meta">;
  context?: RenderOptions<"context">;
};
