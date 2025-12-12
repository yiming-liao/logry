import type { RenderOptions } from "@/pipeline/hooks/render/types";
import type { LogContext, Rendered } from "@/shared/types/log-context";

// 1. decoration
export const addPrefixAndSuffix = (
  input: string,
  prefix: string = "",
  suffix: string = "",
): string => {
  return `${prefix}${input}${suffix}`;
};

// 2. padding
export const addPadding = (
  input: string,
  paddingBefore: number = 0,
  paddingAfter: number = 0,
): string => {
  return `${" ".repeat(paddingBefore)}${input}${" ".repeat(paddingAfter)}`;
};

// 3. alignment
export const alignText = (
  text: string,
  width: number = 0,
  align: "left" | "right" | "center" = "left",
): string => {
  if (typeof width !== "number" || width <= 0) return text;
  if (text.length >= width) return text;
  const diff = width - text.length;
  switch (align) {
    case "right": {
      return `${" ".repeat(diff)}${text}`;
    }
    case "center": {
      const left = Math.floor(diff / 2);
      const right = diff - left;
      return `${" ".repeat(left)}${text}${" ".repeat(right)}`;
    }
    default: {
      return `${text}${" ".repeat(diff)}`;
    }
  }
};

// 4. ansi
export const applyAnsiStyle = (
  text: string,
  ansiStyle?: (input: string) => string,
): string => {
  if (typeof ansiStyle !== "function") return text;
  try {
    return ansiStyle(text);
  } catch {
    return text;
  }
};

// 5. margin
export const addMargin = (
  input: string,
  marginBefore: number = 0,
  marginAfter: number = 0,
): string => {
  return `${" ".repeat(marginBefore)}${input}${" ".repeat(marginAfter)}`;
};

// 6. line breaks
export const addLineBreaks = (
  input: string,
  lineBreaksBefore: number = 0,
  lineBreaksAfter: number = 0,
): string => {
  return `${"\n".repeat(lineBreaksBefore)}${input}${"\n".repeat(lineBreaksAfter)}`;
};

/** Applies a series of text styling operations. */
export const applyTextStyles = <Field extends keyof Rendered>(
  input: string,
  ctx: LogContext,
  options: Omit<RenderOptions, "customFormatter"> = {},
): Rendered[Field] => {
  const {
    prefix,
    suffix,
    paddingBefore,
    paddingAfter,
    width,
    align,
    ansiStyle,
    marginBefore,
    marginAfter,
    lineBreaksBefore,
    lineBreaksAfter,
    cssStyle,
  } = options;
  // shared
  let shared = input;
  shared = addPrefixAndSuffix(shared, prefix, suffix);
  shared = addPadding(shared, paddingBefore, paddingAfter);
  shared = alignText(shared, width, align);
  // apply ansi styling
  let ansi = applyAnsiStyle(
    shared,
    ansiStyle ? (input: string) => ansiStyle!(input, ctx) : undefined,
  );
  // plain: add margin + line breaks
  let plain = addMargin(shared, marginBefore, marginAfter);
  plain = addLineBreaks(plain, lineBreaksBefore, lineBreaksAfter);
  // ansi: add margin + line breaks
  ansi = addMargin(ansi, marginBefore, marginAfter);
  ansi = addLineBreaks(ansi, lineBreaksBefore, lineBreaksAfter);
  return { plain, ansi, cssStyle };
};
