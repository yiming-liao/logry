import type { LoggerPreset, LoggerPresetConfig } from "@/presets/types";

export const loggerPresets: Record<LoggerPreset, LoggerPresetConfig> = {
  // pretty
  pretty: {
    normalizerConfig: {
      node: { timestamp: { showTimeOnly: false } },
      browser: { timestamp: { showTimeOnly: false } },
    },
    formatterConfig: {},
  },
  // pretty-multi-line
  "pretty-multi-line": {
    normalizerConfig: {
      node: { timestamp: { showTimeOnly: false } },
      browser: { timestamp: { showTimeOnly: false } },
    },
    formatterConfig: {
      node: {
        message: { lineBreaks: 1 },
        meta: { depth: null },
        context: { depth: null },
        lineBreaksAfter: 1,
      },
      browser: {
        message: { lineBreaks: 2 },
        meta: { lineBreaks: 2 },
        context: { lineBreaks: 2 },
        lineBreaksAfter: 2,
      },
    },
  },
  // minimal
  minimal: {
    normalizerConfig: {
      node: { timestamp: { showTimeOnly: true } },
      browser: { timestamp: { showTimeOnly: true } },
    },
    formatterConfig: {
      node: {
        id: { hide: true },
        scope: { showOnlyLatest: true },
        pid: { hide: true },
        hostname: { hide: true },
        meta: { format: "compact" },
        context: { format: "compact" },
      },
      browser: {
        id: { hide: true },
        scope: { showOnlyLatest: true },
      },
    },
  },
  // verbose
  verbose: {
    normalizerConfig: {
      node: { timestamp: { showTimeOnly: false } },
      browser: { timestamp: { showTimeOnly: false } },
    },
    formatterConfig: {
      node: {
        message: { lineBreaks: 1 },
        meta: { depth: null },
        context: { depth: null, hide: false },
      },
      browser: {
        message: { lineBreaks: 2 },
        meta: { lineBreaks: 2 },
        context: { lineBreaks: 2, hide: false },
      },
    },
  },
};
