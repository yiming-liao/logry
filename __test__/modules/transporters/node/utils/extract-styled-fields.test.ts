import type { NodeFormatterConfig } from "@/modules/formatters/types";
import type { SnapshotLogFields } from "@/shared/types/log-fields";
import type { FormattedPayload } from "@/shared/types/log-payload";
import { extractStyledFields } from "@/modules/transporters/node/utils/extract-styled-fields";

const samplePayload: FormattedPayload = {
  timestamp: "2025-06-22 12:00:00",
  id: "abc123",
  level: "INFO",
  scope: "system",
  message: "Test message",
  meta: { user: "yiming" },
  context: { traceId: "xyz789" },
  pid: `1234`,
  hostname: "localhost",
  normalizerConfig: {},
  formatterConfig: {},
  raw: {} as SnapshotLogFields,
  withAnsiStyle: {
    timestamp: "\x1b[90m2025-06-22 12:00:00\x1b[0m",
    level: "\x1b[32mINFO\x1b[0m",
  },
  cssStyles: {},
};

const config: NodeFormatterConfig = {
  timestamp: { useAnsiStyle: true },
  level: { useAnsiStyle: true },
  message: { useAnsiStyle: false },
};

describe("extractStyledFields", () => {
  it("should return styled fields when enabled", () => {
    const result = extractStyledFields(samplePayload, config, true);
    expect(result.timestamp).toBe(samplePayload.withAnsiStyle?.timestamp);
    expect(result.level).toBe(samplePayload.withAnsiStyle?.level);
    expect(result.message).toBe(samplePayload.message); // useAnsiStyle: false
  });

  it("should return plain fields when global style is disabled", () => {
    const result = extractStyledFields(samplePayload, config, false);
    expect(result.timestamp).toBe(samplePayload.timestamp);
    expect(result.level).toBe(samplePayload.level);
    expect(result.message).toBe(samplePayload.message);
  });

  it("should fallback to plain if styled version is missing", () => {
    const minimalPayload = { ...samplePayload, withAnsiStyle: {} };
    const result = extractStyledFields(minimalPayload, config, true);
    expect(result.timestamp).toBe(samplePayload.timestamp);
  });
});
