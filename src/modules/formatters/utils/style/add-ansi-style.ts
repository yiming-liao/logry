import { ANSI_RESET } from "@/modules/formatters/constants/default-node-format-options-map";

/**
 * Adds ANSI style code to input and resets style after.
 *
 * @param input - Text to style.
 * @param ansiStyle - ANSI escape sequence.
 * @returns Styled text if ansiStyle is provided, otherwise original input.
 */
export const addAnsiStyle = (input: string, ansiStyle?: string): string => {
  if (!input) {
    return "";
  }

  if (!ansiStyle) {
    return input;
  }

  return `${ansiStyle}${input}${ANSI_RESET}`;
};
