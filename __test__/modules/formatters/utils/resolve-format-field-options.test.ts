/* eslint-disable @typescript-eslint/no-explicit-any */
import { resolveFormatFieldOptions } from "@/modules/formatters/utils/resolve-format-field-options";
import { LEVEL_CONFIG } from "@/shared/constants";

describe("resolveFormatFieldOptions", () => {
  const raw = { level: "warn" } as any;

  it("should merge default and user options", () => {
    const userOptions = { prefix: ">>" };
    const result = resolveFormatFieldOptions({
      platform: "node",
      fieldKey: "message",
      raw,
      options: userOptions,
    });
    expect(result.prefix).toBe(">>");
    expect(result).toHaveProperty("ansiStyle"); // from default
  });

  it("should apply level ansiStyle for node level field if not overridden", () => {
    const result = resolveFormatFieldOptions({
      platform: "node",
      fieldKey: "level",
      raw,
      options: {},
    });
    expect(result.ansiStyle).toBe(LEVEL_CONFIG["warn"].ansiStyle);
  });

  it("should not override ansiStyle if user provides one on node", () => {
    const userAnsi = "customAnsi";
    const result = resolveFormatFieldOptions({
      platform: "node",
      fieldKey: "level",
      raw,
      options: {
        ansiStyle: userAnsi,
      },
    });
    expect(result.ansiStyle).toBe(userAnsi);
  });

  it("should apply cssStyle defaults and append level cssStyle for browser timestamp", () => {
    const result = resolveFormatFieldOptions({
      platform: "browser",
      fieldKey: "timestamp",
      raw,
      options: {},
    });
    expect(result.cssStyle).toContain(LEVEL_CONFIG["warn"].cssStyle);
  });

  it("should append level cssStyle for browser level field", () => {
    const result = resolveFormatFieldOptions({
      platform: "browser",
      fieldKey: "level",
      raw,
      options: {
        cssStyle: "base;",
      },
    });
    expect(result.cssStyle).toContain("base;");
    expect(result.cssStyle).toContain(LEVEL_CONFIG["warn"].cssStyle);
  });

  it("should merge cssStyle with user provided style for browser", () => {
    const userCss = "color:red;";
    const result = resolveFormatFieldOptions({
      platform: "browser",
      fieldKey: "message",
      raw,
      options: {
        cssStyle: userCss,
      },
    });
    expect(result.cssStyle).toBe(userCss);
  });
});
