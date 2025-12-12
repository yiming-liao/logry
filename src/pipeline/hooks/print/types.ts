import type { LogContext } from "@/shared/types/log-context";

export type PrintConfig = {
  /** Number of line breaks inserted before the final output.  */
  lineBreaksBefore?: number;
  /** Number of line breaks inserted after the final output.  */
  lineBreaksAfter?: number;
  /**
   * Console output strategy.
   *
   * - "level"  → Use console methods based on log level
   *              (console.error / warn / info / ...)
   * - "log"    → Always use console.log
   * - "silent" → Disable console output entirely
   */
  consoleMode?: "level" | "log" | "silent";
  /**
   * Custom printer.
   *
   * - When provided, this function fully overrides the default print behavior.
   */
  customPrinter?: (ctx: LogContext) => void;
};
