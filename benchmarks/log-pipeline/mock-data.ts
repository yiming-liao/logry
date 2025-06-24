import type {
  FormattedPayload,
  NormalizedPayload,
  RawPayload,
} from "../../dist";

export const rawPayload: RawPayload = {
  timestamp: Date.now(),
  id: "",
  level: "info",
  message: "hello world",
  scope: [],
  raw: {
    timestamp: 1,
    id: "",
    level: "info",
    scope: [],
    message: "",
    hasMeta: false,
    hasContext: false,
  },
  normalizerConfig: {},
  formatterConfig: {},
};

export const normalizedPayload: NormalizedPayload = {
  timestamp: "[2025-01-01 12:12:12] ",
  id: "",
  level: "info",
  message: "hello world",
  scope: "",
  raw: {
    timestamp: 1,
    id: "",
    level: "info",
    scope: [],
    message: "",
    hasMeta: false,
    hasContext: false,
  },
  normalizerConfig: {},
  formatterConfig: {},
};

export const formattedPayload: FormattedPayload = {
  timestamp: "[2025-01-01 12:12:12] ",
  id: "default ",
  level: "INFO",
  message: "hello world",
  scope: "",
  meta: { a: 123 },
  context: { a: 123 },
  withAnsiStyle: {},
  cssStyles: {},
  raw: {
    timestamp: 1,
    id: "",
    level: "info",
    scope: [],
    message: "",
    hasMeta: false,
    hasContext: false,
  },
  normalizerConfig: {},
  formatterConfig: {},
};
