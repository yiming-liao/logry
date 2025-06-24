/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatStringFields } from "@/modules/formatters/utils/format-string-fields";
import { resolveScopeString } from "@/modules/formatters/utils/resolve-scope-string";

describe("formatStringFields", () => {
  it("should return empty result when field is hidden", () => {
    const result = formatStringFields({
      platform: "node",
      fieldKey: "message",
      fieldValue: "Hello",
      raw: { hasMeta: false, hasContext: false } as any,
      options: { hide: true } as any,
    });

    expect(result).toEqual({
      fieldValue: "",
      withAnsiStyle: "",
      cssStyle: "",
    });
  });

  it("should apply prefix and suffix correctly", () => {
    const result = formatStringFields({
      platform: "node",
      fieldKey: "message",
      fieldValue: "Hello",
      raw: { hasMeta: false, hasContext: false } as any,
      options: {
        prefix: "[",
        suffix: "]",
        lineBreaks: false,
        spaceAfter: false,
      } as any,
    });

    expect(result.fieldValue).toBe("[Hello]");
  });

  it("should apply line breaks and spaceAfter", () => {
    const result = formatStringFields({
      platform: "node",
      fieldKey: "message",
      fieldValue: "Hi",
      raw: { hasMeta: false, hasContext: false } as any,
      options: {
        lineBreaks: true,
        spaceAfter: true,
      } as any,
    });

    expect(result.fieldValue.startsWith("\n")).toBe(true);
    expect(result.fieldValue.endsWith(" ")).toBe(true);
  });

  it("should call resolveScopeString when fieldKey is scope", () => {
    const scopeArray = ["core", "init"];
    const raw = { scope: scopeArray, hasMeta: false, hasContext: false } as any;
    const result = formatStringFields({
      platform: "node",
      fieldKey: "scope",
      fieldValue: "core",
      raw,
      options: {
        showOnlyLatest: false,
        separator: ">",
      } as any,
    });

    const expected = resolveScopeString({
      scope: "core",
      rawScope: scopeArray,
      showOnlyLatest: false,
      customSeparator: ">",
    });

    expect(result.fieldValue.includes(expected)).toBe(true);
  });

  it("should apply level alignment when enabled", () => {
    const result = formatStringFields({
      platform: "node",
      fieldKey: "level",
      fieldValue: "warn",
      raw: { level: "warn", hasMeta: false, hasContext: false } as any,
      options: {
        enableAlignment: true,
        lineBreaks: false,
        spaceAfter: false,
      } as any,
    });

    expect(result.fieldValue).toMatch(/warn\s+/);
  });
});
