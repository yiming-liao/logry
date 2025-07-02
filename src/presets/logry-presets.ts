import type { LoggerPreset, LoggerPresetConfig } from "@/presets/types";
import {
  ANSI_GRAY,
  ANSI_RESET,
} from "@/modules/formatters/constants/default-node-format-options-map";

export const logryPresets: Record<LoggerPreset, LoggerPresetConfig> = {
  // ═══════════════════════════[ pretty ]════════════════════════════
  pretty: {
    normalizerConfig: {},
    formatterConfig: {},
  },
  // ═══════════════════════[ pretty-expanded ]═══════════════════════
  "pretty-expanded": {
    normalizerConfig: {},
    formatterConfig: {
      node: {
        level: { enableAlignment: false },
        message: { lineBreaks: 1, prefix: " ".repeat(4) },
        meta: { depth: null, compact: false },
        context: { depth: null, compact: false },
        lineBreaksAfter: 1,
      },
      browser: {
        message: { lineBreaks: 2 },
        meta: { lineBreaks: 2 },
        context: { lineBreaks: 2 },
        lineBreaksAfter: 2,
      },
      edge: {
        message: { prefix: "• " },
        meta: { prefix: "| meta: " },
      },
    },
  },
  // ═══════════════════════════[ minimal ]═══════════════════════════
  minimal: {
    normalizerConfig: {},
    formatterConfig: {
      node: {
        id: { hide: true },
        scope: { showOnlyLatest: true },
        meta: { format: "compact", prefix: `${ANSI_GRAY}| ${ANSI_RESET}` },
        context: { format: "compact" },
      },
      browser: {
        id: { hide: true },
        scope: { showOnlyLatest: true },
      },
      edge: {
        scope: { showOnlyLatest: true },
        meta: { format: "compact", prefix: `| ` },
        context: { format: "compact" },
      },
    },
  },
  // ═══════════════════════════[ verbose ]═══════════════════════════
  verbose: {
    normalizerConfig: {},
    formatterConfig: {
      node: {
        level: { enableAlignment: false },
        pid: { hide: false },
        hostname: { hide: false },
        message: { lineBreaks: 1, prefix: " ".repeat(4) },
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
      edge: {
        message: { prefix: "• " },
        meta: { prefix: "| meta: " },
        context: { prefix: "| context: ", hide: false },
      },
    },
  },
};
