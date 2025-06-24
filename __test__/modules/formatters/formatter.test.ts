import type { NormalizedPayload } from "@/shared/types/log-payload";
import { Formatter } from "@/modules/formatters/formatter";

const mockFormatField = (fieldName: string) => ({
  fieldValue: `formatted-${fieldName}`,
  withAnsiStyle: `ansi-${fieldName}`,
  cssStyle: `css-${fieldName}`,
});

jest.mock("@/modules/formatters/fields", () => ({
  formatTimestamp: () => mockFormatField("timestamp"),
  formatId: () => mockFormatField("id"),
  formatLevel: () => mockFormatField("level"),
  formatScope: () => mockFormatField("scope"),
  formatMessage: () => mockFormatField("message"),
  formatMeta: () => mockFormatField("meta"),
  formatContext: () => mockFormatField("context"),
}));

jest.mock("@/modules/formatters/fields/format-pid", () => ({
  formatPid: () => mockFormatField("pid"),
}));

jest.mock("@/modules/formatters/fields/format-hostname", () => ({
  formatHostname: () => mockFormatField("hostname"),
}));

describe("Formatter class", () => {
  const formatter = new Formatter();

  const basePayload = {
    timestamp: "time",
    id: "id",
    level: "level",
    scope: "scope",
    message: "message",
    meta: {},
    context: {},
    pid: 1234,
    hostname: "host",
    normalizerConfig: {},
    formatterConfig: {
      node: {},
      browser: {},
    },
    raw: {},
  } as unknown as NormalizedPayload;

  it("should format all fields on node platform including pid and hostname", () => {
    const result = formatter.format("node", basePayload);

    expect(result.timestamp).toBe("formatted-timestamp");
    expect(result.pid).toBe("formatted-pid");
    expect(result.hostname).toBe("formatted-hostname");
    expect(result.withAnsiStyle.pid).toBe("ansi-pid");
    expect(result.withAnsiStyle.hostname).toBe("ansi-hostname");
  });

  it("should format all fields on browser platform without pid and hostname", () => {
    const result = formatter.format("browser", basePayload);

    expect(result.timestamp).toBe("formatted-timestamp");
    expect(result.pid).toBeUndefined();
    expect(result.hostname).toBeUndefined();
    expect(result.withAnsiStyle.pid).toBeUndefined();
    expect(result.withAnsiStyle.hostname).toBeUndefined();
  });

  it("should include ansi and css styles for formatted fields", () => {
    const result = formatter.format("node", basePayload);

    expect(result.withAnsiStyle.timestamp).toBe("ansi-timestamp");
    expect(result.cssStyles.timestamp).toBe("css-timestamp");
  });
});
