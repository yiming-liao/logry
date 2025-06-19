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
      customFormatter: ({ part }) => ({
        timestamp: part,
        withAnsiStyle: getCardStyle("TIMESTAMP", chalk.hex("#81A1C1")(part)),
      }),
    },
    id: {
      customFormatter: ({ part }) => ({
        id: part,
        withAnsiStyle: getCardStyle("ID", chalk.hex("#88C0D0")(part)),
      }),
    },
    level: {
      customFormatter: ({ part }) => ({
        level: part,
        withAnsiStyle: getCardStyle(
          "LEVEL",
          chalk.hex("#EBCB8B")(part.toUpperCase()),
        ),
      }),
    },
    scope: {
      customFormatter: ({ part }) => ({
        scope: part,
        withAnsiStyle: getCardStyle("SCOPE", chalk.hex("#81A1C1")(part)),
      }),
    },
    message: {
      customFormatter: ({ part }) => ({
        message: part,
        withAnsiStyle: getCardStyle("MESSAGE", chalk.hex("#D08770")(part)),
      }),
    },
    meta: {
      customFormatter: ({ part }) => {
        const json = JSON.stringify(part, null, 2)
          .split("\n")
          .map((line) => `  ${line}`);
        return {
          meta: "",
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
