import type { FormatConfig, RenderConfig } from "@/pipeline";
import { formatObject } from "@/pipeline/hooks/format/utils/format-object";
import { ABBR_LEVELS_MAP, UPPERCASE_LEVELS_MAP } from "@/shared/level";
import { ansiColor } from "@/shared/utils/ansi-color";

export type Preset = "pretty" | "minimal" | "verbose";

export const PRESETS: Record<
  Preset,
  { formatConfig: FormatConfig; renderConfig: RenderConfig }
> = {
  // --- pretty
  pretty: {
    formatConfig: {
      id: { hide: true },
      scope: { separator: " > " },
      meta: {
        format: "pretty",
        indent: 4,
        customFormatter: (value, ctx) => {
          // [plain] add ` | ` prefix
          if (value && ctx.env.isPlain) return toStringWithPrefix(value);
        },
      },
      context: { hide: true },
    },
    renderConfig: {
      timestamp: {
        marginAfter: 1,
        ansiStyle: ansiColor(245),
        cssStyle: "color:#8a8a8a;",
      },
      id: { marginAfter: 1 },
      level: {
        customRenderer: (_, ctx) => {
          // [plain] add `[]`
          if (ctx.env.isPlain) {
            return {
              plain: `[${UPPERCASE_LEVELS_MAP[ctx.raw.level]}]`,
              ansi: `[${UPPERCASE_LEVELS_MAP[ctx.raw.level]}]`,
            };
          }
        },
      },
      scope: {
        prefix: "(",
        suffix: ")",
        marginBefore: 1,
        ansiStyle: ansiColor(245),
        cssStyle: "color:#8a8a8a;",
      },
      message: { marginBefore: 1 },
      meta: { lineBreaksBefore: 1 },
    },
  },

  // --- minimal
  minimal: {
    formatConfig: {
      timestamp: { withDate: false },
      id: { hide: true },
      level: { format: "abbr" },
      scope: { separator: " > ", lastOnly: true },
      meta: {
        customFormatter: (value) => {
          // add ` | ` prefix
          if (value) return toStringWithPrefix(value);
        },
      },
      context: { hide: true },
    },
    renderConfig: {
      timestamp: {
        marginAfter: 1,
        ansiStyle: ansiColor(245),
        cssStyle: "color:#8a8a8a;",
      },
      id: { marginAfter: 1 },
      level: {
        customRenderer: (_, ctx) => {
          // [plain] add `[]`
          if (ctx.env.isPlain) {
            return {
              plain: `[${ABBR_LEVELS_MAP[ctx.raw.level]}]`,
              ansi: `[${ABBR_LEVELS_MAP[ctx.raw.level]}]`,
            };
          }
        },
      },
      scope: {
        marginBefore: 1,
        prefix: "(",
        suffix: ")",
        ansiStyle: ansiColor(245),
        cssStyle: "color:#8a8a8a;",
      },
      message: { marginBefore: 1 },
    },
  },

  // --- verbose
  verbose: {
    formatConfig: {
      scope: { separator: " > " },
      meta: {
        customFormatter: (value, ctx) => {
          if (!value) return;
          if (ctx.env.isPlain) return toStringWithPrefix(value);
          return toStringWithTitle(value, "meta:");
        },
      },
      context: {
        customFormatter: (value, ctx) => {
          if (!value) return;
          if (ctx.env.isPlain) return toStringWithPrefix(value);
          return toStringWithTitle(value, "context:");
        },
      },
    },
    renderConfig: {
      timestamp: {
        marginAfter: 1,
        ansiStyle: ansiColor(245),
        cssStyle: "color:#8a8a8a;",
      },
      id: { prefix: "<", suffix: ">", marginAfter: 1 },
      level: {
        customRenderer: (_, ctx) => {
          // [plain] add `[]`
          if (ctx.env.isPlain) {
            return {
              plain: `[${UPPERCASE_LEVELS_MAP[ctx.raw.level]}]`,
              ansi: `[${UPPERCASE_LEVELS_MAP[ctx.raw.level]}]`,
            };
          }
        },
      },
      scope: {
        prefix: "(",
        suffix: ")",
        marginBefore: 1,
        ansiStyle: ansiColor(245),
        cssStyle: "color:#8a8a8a;",
      },
      message: { marginBefore: 1 },
    },
  },
};

// Utils
const toStringWithPrefix = (value: Record<string, unknown>, prefix = " | ") => {
  const formatted = formatObject(value, "compact");
  return `${prefix}${formatted}`;
};
const toStringWithTitle = (value: Record<string, unknown>, title = "meta:") => {
  const formatted = formatObject(value, "pretty", 4);
  return `\n${" ".repeat(4)}${title}\n` + formatted + "\n";
};
