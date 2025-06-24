/* 

💡 Showcases advanced custom formatting in `logry` for Node.js environments.

This example demonstrates how to create highly customized visual outputs  
by combining `logry`'s flexible formatter system with third-party libraries  
like `chalk`, `string-width`, and `strip-ansi`.

📟  Run this example with:
npx tsx examples/custom-formats/node.ts  

*/

import type { FormatterConfig } from "../../dist";
import chalk from "chalk";
import stringWidth from "string-width";
import stripAnsi from "strip-ansi";
import { logry } from "../../dist";

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

export const cardsFormatterConfig: FormatterConfig = {
  node: {
    timestamp: {
      customFormatter: ({ fieldValue }) => ({
        fieldValue: String(fieldValue),
        withAnsiStyle: getCardStyle(
          "TIMESTAMP",
          chalk.hex("#81A1C1")(fieldValue),
        ),
      }),
    },
    id: {
      customFormatter: ({ fieldValue }) => ({
        fieldValue,
        withAnsiStyle: getCardStyle("ID", chalk.hex("#88C0D0")(fieldValue)),
      }),
    },
    level: {
      customFormatter: ({ fieldValue }) => ({
        fieldValue,
        withAnsiStyle: getCardStyle(
          "LEVEL",
          chalk.hex("#EBCB8B")(fieldValue.toUpperCase()),
        ),
      }),
    },
    scope: {
      customFormatter: ({ fieldValue }) => ({
        fieldValue,
        withAnsiStyle: getCardStyle("SCOPE", chalk.hex("#81A1C1")(fieldValue)),
      }),
    },
    message: {
      customFormatter: ({ fieldValue }) => ({
        fieldValue,
        withAnsiStyle: getCardStyle(
          "MESSAGE",
          chalk.hex("#D08770")(fieldValue),
        ),
      }),
    },
    meta: {
      customFormatter: ({ fieldValue }) => {
        const json = JSON.stringify(fieldValue, null, 2)
          .split("\n")
          .map((line) => `  ${line}`);
        return {
          fieldValue: "",
          withAnsiStyle: getCardStyle("META", json.join("\n")),
        };
      },
    },
    lineBreaksBefore: 2,
  },
};

const logger = logry({
  formatterConfig: cardsFormatterConfig,
});

logger.warn("Warning!", { method: "POST", path: "/login" });
logger.error(
  "Error message",
  { a: { a: { b: { c: "d" } } } },
  { scope: ["1", "2", "3"] },
);
