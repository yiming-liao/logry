import { normalizeMessage } from "@/modules/normalizers/parts/message";

describe("normalizeMessage", () => {
  it("should return customized message if customNormalizer is provided", () => {
    const rawMessage = "raw log";
    const normalizedMessage = "normalized log";

    const customNormalizer = () => normalizedMessage;

    const result = normalizeMessage(rawMessage, { customNormalizer });

    expect(result).toBe(normalizedMessage);
  });

  it("should return original message if no customNormalizer is provided", () => {
    const rawMessage = "unchanged";

    const result = normalizeMessage(rawMessage);

    expect(result).toBe(rawMessage);
  });

  it("should return original message if customNormalizer returns undefined", () => {
    const rawMessage = "silent log";

    const customNormalizer = () => "";

    const result = normalizeMessage(rawMessage, { customNormalizer });

    expect(result).toBe(rawMessage);
  });
});
