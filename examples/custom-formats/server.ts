/* 
Showcases advanced custom formatting in `logry` for Node.js environments.

Run this example with:
tsx examples/custom-formats/server.ts  
---------------------------------------
*/

import type { FormatConfig } from "logry";
import chalk from "chalk";
import { logry } from "logry";
import stringWidth from "string-width";
import stripAnsi from "strip-ansi";
import { setTimeout } from "node:timers/promises";

const getCardStyle = (
  label: string,
  content: string,
  options?: { width?: number },
) => {
  const width = options?.width ?? 40;
  const borderColor = "#D8DEE9";
  const lines = Array.isArray(content) ? content : content.split("\n");
  const paddedLines = lines.map((line) => {
    const visibleLength = stringWidth(stripAnsi(line));
    const space = width - visibleLength - 2;
    return `│  ${line}${" ".repeat(Math.max(0, space))}│`;
  });
  const coloredLines = paddedLines.map((line) => chalk.hex(borderColor)(line));
  const top = chalk.hex(borderColor)(
    `╭── ${label} ${"─".repeat(width - label.length - 4)}╮`,
  );
  const bottom = chalk.hex(borderColor)(`╰${"─".repeat(width)}╯`);
  return [top, ...coloredLines, bottom].join("\n") + "\n";
};

export const cardsFormatConfig: FormatConfig = {
  timestamp: {
    customFormatter: (fieldValue) => ({
      plain: String(fieldValue),
      ansi: getCardStyle("TIMESTAMP", chalk.hex("#81A1C1")(fieldValue)),
    }),
  },
  id: {
    customFormatter: (fieldValue) => ({
      plain: fieldValue,
      ansi: getCardStyle("ID", chalk.hex("#88C0D0")(fieldValue)),
    }),
  },
  level: {
    customFormatter: (fieldValue) => ({
      plain: fieldValue,
      ansi: getCardStyle(
        "LEVEL",
        chalk.hex("#EBCB8B")(fieldValue.toUpperCase()),
      ),
    }),
  },
  scope: {
    customFormatter: (fieldValue) => ({
      plain: fieldValue.join(" > "),
      ansi: getCardStyle("SCOPE", chalk.hex("#81A1C1")(fieldValue)),
    }),
  },
  message: {
    customFormatter: (fieldValue) => ({
      plain: fieldValue,
      ansi: getCardStyle("MESSAGE", chalk.hex("#D08770")(fieldValue)),
    }),
  },
  meta: {
    customFormatter: (fieldValue) => {
      const json = JSON.stringify(fieldValue, null, 2)
        .split("\n")
        .map((line) => `  ${line}`);
      return {
        plain: "",
        ansi: getCardStyle("META", json.join("\n")),
      };
    },
  },
  lineBreaksBefore: 2,
};

const logger = logry({ formatConfig: cardsFormatConfig });

logger.warn("Warning!", { method: "POST", path: "/login" });
await setTimeout(200);
logger.error(
  "Error message",
  { a: { a: { b: { c: "d" } } } },
  { scope: ["1", "2", "3"] },
);
