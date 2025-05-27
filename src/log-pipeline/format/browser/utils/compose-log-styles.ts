import type { LogLevel } from "../../../../types";
import { BROWSER_LEVEL_COLOR_STRING } from "../../../../constants";

/**
 * Generates a list of CSS style strings used in browser console logging.
 *
 * @param level - Log level excluding "silent".
 * @param showId - Whether to include the ID style.
 * @param showContext - Whether to include the context style.
 * @returns An array of style strings corresponding to each %c token in the log.
 */
export const composeLogStyles = ({
  level,
  showId,
  showContext,
}: {
  level: Exclude<LogLevel, "silent">;
  showId: boolean;
  showContext: boolean;
}) => {
  const color = BROWSER_LEVEL_COLOR_STRING[level] || "";

  // Base styles
  const FONT_STYLE =
    "font-family: 'Menlo', 'Consolas', 'Courier New', monospace;";
  const PADDING_STYLE = "padding: 4px 8px;";
  const BORDER_STYLE = "border: 1px solid gray;";

  // Specific style additions
  const TIMESTAMP_BORDER_STYLE = `border-left: 8px solid ${color};`;
  const ID_STYLE = `font-style: italic; font-weight:600;`;
  const LEVEL_STYLE = `background:${color};`;

  return [
    `${FONT_STYLE}${PADDING_STYLE}${BORDER_STYLE}${TIMESTAMP_BORDER_STYLE}`, // timesatmp
    showId ? `${FONT_STYLE}${PADDING_STYLE}${BORDER_STYLE}${ID_STYLE}` : "", // id
    `${FONT_STYLE}${PADDING_STYLE}${BORDER_STYLE}${LEVEL_STYLE}`, // level
    showContext ? `${FONT_STYLE}${PADDING_STYLE}${BORDER_STYLE}` : "", // context
    `${FONT_STYLE}${PADDING_STYLE}`, // message
  ];
};
