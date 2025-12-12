import type { LogContext } from "@/shared/types/log-context";
import { rura } from "rura";
import {
  composeBrowser,
  composePlain,
  composeAnsi,
} from "@/pipeline/hooks/print/utils/compose";
import { LEVEL_CONSOLE_MAP } from "@/pipeline/hooks/print/utils/level-console-map";
import { PREFIX } from "@/shared/internal";

export const print = rura.createHook<LogContext, void>(
  "__print__",
  (ctx) => {
    if (!ctx.rendered)
      throw new Error(`${PREFIX} print hook received an unrendered context.`);

    // Apply custom printer (full override)
    const {
      customPrinter,
      lineBreaksBefore = 0,
      lineBreaksAfter = 0,
      consoleMode = "level",
    } = ctx.configs.printConfig || {};
    if (typeof customPrinter === "function") {
      try {
        customPrinter(ctx);
        return;
      } catch (error) {
        throw new Error(
          `${PREFIX} custom printer failed: ${error instanceof Error ? error.message : String(error)}`,
        );
      }
    }

    // Skip printing when in silent mode
    if (consoleMode === "silent") return;

    const { timestamp, id, level, scope, message, meta, context } =
      ctx.rendered;
    // Ordered list of rendered fields
    const fields = [timestamp, id, level, scope, message, meta, context];

    // Compose output based on runtime environment
    let composed = "";
    let composedCssStyles: string[] = [];
    if (ctx.env.isServer) {
      composed = composeAnsi(fields); // with ansi style
    } else if (ctx.env.isBrowser) {
      const { text, cssStyle } = composeBrowser(fields); // with css styles
      composed = text;
      composedCssStyles = cssStyle;
    } else if (ctx.env.isPlain) {
      composed = composePlain(fields); // plain text
    }

    // Apply global print decorations
    const before = "\n".repeat(lineBreaksBefore);
    const after = "\n".repeat(lineBreaksAfter);
    const finalText = `${before}${composed}${after}`;

    // Dispatch to console
    const withCss = ctx.env.isBrowser && composedCssStyles.length > 0;
    const levelPrinter = LEVEL_CONSOLE_MAP[ctx.raw.level] || console.log;
    const printFn = consoleMode === "level" ? levelPrinter : console.log;
    if (withCss) {
      printFn(finalText, ...composedCssStyles);
    } else {
      printFn(finalText);
    }
  },
  400,
);
