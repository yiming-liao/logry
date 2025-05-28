import { formatNodeLog } from "../../../../src/log-pipeline/format/node/format-node-log";

describe("formatNodeLog", () => {
  const basePayload = {
    id: "abc123",
    level: "info" as const,
    scope: ["system", "auth"],
    message: "User logged in",
    meta: { userId: 1 },
    context: { ip: "127.0.0.1" },
    hideDate: false,
    hideId: false,
    hideScope: false,
    scopeSeparator: ":",
    showOnlyLatestScope: false,
    messagePrefix: "",
    messageLineBreaks: 0,
    useColor: false,
    formatter: undefined,
  };

  it("returns formatted string using composeLogLine without color", () => {
    const result = formatNodeLog(basePayload);
    expect(result).toContain("[INFO]"); // level
    expect(result).toContain("[abc123]"); // id
    expect(result).toContain("(system:auth)"); // scope
    expect(result).toContain("User logged in"); // message
    expect(result).toMatch(/\[\d{4}-\d{2}-\d{2}/); // timestamp
  });

  it("respects hideId and hideScope", () => {
    const result = formatNodeLog({
      ...basePayload,
      hideId: true,
      hideScope: true,
    });
    expect(result).not.toContain("[abc123]");
    expect(result).not.toContain("(system:auth)");
  });

  it("shows only latest scope when showOnlyLatestScope is true", () => {
    const result = formatNodeLog({
      ...basePayload,
      showOnlyLatestScope: true,
    });
    expect(result).toContain("(auth)");
  });

  it("adds line breaks before message", () => {
    const result = formatNodeLog({
      ...basePayload,
      messageLineBreaks: 2,
    });
    expect(result).toMatch(/\n\n.*User logged in/);
  });

  it("applies custom formatter when provided", () => {
    const mockFormatter = jest.fn().mockReturnValue("custom log");
    const result = formatNodeLog({
      ...basePayload,
      formatter: mockFormatter,
    });
    expect(result).toBe("custom log");
    expect(mockFormatter).toHaveBeenCalledWith(
      expect.objectContaining({
        timestamp: expect.any(String),
        timestampRaw: expect.any(Date),
        level: "info",
        id: "abc123",
        scope: "system:auth",
        message: "User logged in",
        meta: { userId: 1 },
        context: { ip: "127.0.0.1" },
      }),
    );
  });
});
