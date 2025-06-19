import type { LoggerPreset, LoggerPresetConfig } from "@/presets/types";
import {
  ANSI_GRAY,
  ANSI_RESET,
  DEFAULT_MESSAGE_PREFIX,
} from "@/modules/formatters/node/constants";

export const loggerPresets: Record<LoggerPreset, LoggerPresetConfig> = {
  // pretty
  pretty: {
    normalizerConfig: {
      node: { timestamp: { showTimeOnly: false } },
      browser: { timestamp: { showTimeOnly: false } },
    },
    formatterConfig: {},
  },
  // pretty-expanded
  "pretty-expanded": {
    normalizerConfig: {
      node: { timestamp: { showTimeOnly: false } },
      browser: { timestamp: { showTimeOnly: false } },
    },
    formatterConfig: {
      node: {
        message: {
          lineBreaks: 1,
          prefix: " ".repeat(4) + DEFAULT_MESSAGE_PREFIX,
        },
        meta: {
          depth: null,
          compact: false,
        },
        context: {
          depth: null,
          compact: false,
        },
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
        meta: {
          format: "compact",
          prefix: `${ANSI_GRAY}| ${ANSI_RESET}`,
        },
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
        message: {
          lineBreaks: 1,
          prefix: " ".repeat(4) + DEFAULT_MESSAGE_PREFIX,
        },
        pid: { hide: false },
        hostname: { hide: false },
        meta: {
          prefix: " ".repeat(4) + `${ANSI_GRAY}meta:${ANSI_RESET}`,
          depth: null,
          compact: false,
        },
        context: {
          prefix: " ".repeat(4) + `${ANSI_GRAY}context:${ANSI_RESET}`,
          hide: false,
          depth: null,
          compact: false,
        },
        lineBreaksAfter: 1,
      },
      browser: {
        message: { lineBreaks: 2 },
        meta: { lineBreaks: 2 },
        context: { lineBreaks: 2, hide: false },
        lineBreaksAfter: 2,
      },
    },
  },
};
