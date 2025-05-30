import type { LoggerPreset, LoggerPresetConfig } from "@/presets/types";

export const loggerPresets: Record<LoggerPreset, LoggerPresetConfig> = {
  // json
  json: {
    normalizerConfig: {
      node: {
        timestamp: { style: "raw" },
        level: { style: "lower" },
        scope: { separator: "." },
      },
      browser: {
        timestamp: { style: "raw" },
        level: { style: "lower" },
        scope: { separator: "." },
      },
    },
    formatterConfig: {
      node: { disabled: true },
      browser: { disabled: true },
    },
  },
  // pretty
  pretty: {
    normalizerConfig: {
      node: { timestamp: { showTimeOnly: false } },
      browser: { timestamp: { showTimeOnly: false } },
    },
    formatterConfig: {
      node: { disabled: false },
      browser: { disabled: false },
    },
  },
  // pretty-multi-line
  "pretty-multi-line": {
    normalizerConfig: {
      node: { timestamp: { showTimeOnly: false } },
      browser: { timestamp: { showTimeOnly: false } },
    },
    formatterConfig: {
      node: {
        disabled: false,
        message: { lineBreaks: 1 },
        meta: { depth: null },
        context: { depth: null },
        lineBreaksAfter: 1,
      },
      browser: {
        disabled: false,
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
        disabled: false,
        id: { hide: true },
        scope: { showOnlyLatest: true },
        pid: { hide: true },
        hostname: { hide: true },
        meta: { format: "compact" },
        context: { format: "compact" },
      },
      browser: {
        disabled: false,
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
        disabled: false,
        message: { lineBreaks: 1 },
        meta: { depth: null },
        context: { depth: null, hide: false },
      },
      browser: {
        disabled: false,
        message: { lineBreaks: 2 },
        meta: { lineBreaks: 2 },
        context: { lineBreaks: 2, hide: false },
      },
    },
  },
};
