/* eslint-disable unicorn/prefer-string-replace-all */
import type { Rendered } from "@/shared/types/log-context";

/**
 * Compose ANSI output by concatenating colored segments.
 */
export const composeAnsi = (
  fields: Array<{ ansi: Rendered[keyof Rendered]["ansi"] }>,
) => {
  let text = "";
  for (const field of fields) {
    if (!field.ansi) continue;
    text += field.ansi;
  }
  return text;
};

/**
 * Compose browser console output using `%c` and CSS rules.
 */
export const composeBrowser = (
  fields: Array<{
    plain: Rendered[keyof Rendered]["plain"];
    cssStyle?: string;
  }>,
) => {
  let text = "";
  const cssStyle: string[] = [];
  for (const field of fields) {
    if (!field.plain) continue;
    if (field.cssStyle) {
      text += `%c${field.plain}%c`;
      cssStyle.push(field.cssStyle, "");
    } else {
      text += field.plain;
    }
  }
  return { text, cssStyle };
};

/**
 * Compose plain text output for runtimes without styling.
 * Line breaks are collapsed for compact display.
 */
export const composePlain = (
  fields: Array<{ plain: Rendered[keyof Rendered]["plain"] }>,
) => {
  let text = "";
  for (const field of fields) {
    if (!field.plain) continue;
    text += field.plain;
  }
  return text.replace(/[\r\n]+/g, "");
};
