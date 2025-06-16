import { formatStringParts } from "@/modules/formatters/node/shared/format-string-parts";
import { addAnsiColor } from "@/modules/formatters/utils/add-ansi-color";
import { addLineBreakPrefix } from "@/modules/formatters/utils/add-line-break-prefix";
import { addPrefixAndSuffix } from "@/modules/formatters/utils/add-prefix-and-suffix";
import { addSpaceAfter } from "@/modules/formatters/utils/add-space-after";
import { resolveScopeString } from "@/modules/formatters/utils/resolve-scope-string";
import { tryCustomFormatter } from "@/modules/formatters/utils/try-custom-formatter";

jest.mock("@/modules/formatters/utils/try-custom-formatter");
jest.mock("@/modules/formatters/utils/resolve-scope-string");
jest.mock("@/modules/formatters/utils/add-ansi-color");
jest.mock("@/modules/formatters/utils/add-line-break-prefix");
jest.mock("@/modules/formatters/utils/add-prefix-and-suffix");
jest.mock("@/modules/formatters/utils/add-space-after");

describe("formatStringParts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return empty string when hide is true", () => {
    const result = formatStringParts({
      label: "message",
      part: "Some message",
      rawPart: "Some message",
      options: { hide: true },
    });

    expect(result.message).toBe("");
    expect(result.withAnsiColor).toBe("");
  });

  it("should return custom formatted value when customFormatter is provided", () => {
    (tryCustomFormatter as jest.Mock).mockReturnValue({
      message: "custom",
      withAnsiColor: "\u001b[33mcustom\u001b[0m",
    });

    const result = formatStringParts({
      label: "message",
      part: "Original",
      rawPart: "Original",
      options: {
        customFormatter: jest.fn(),
      },
    });

    expect(result.message).toBe("custom");
    expect(result.withAnsiColor).toBe("\u001b[33mcustom\u001b[0m");
  });

  it("should format scope using resolveScopeString", () => {
    (resolveScopeString as jest.Mock).mockReturnValue("resolved.scope");
    (addPrefixAndSuffix as jest.Mock).mockImplementation((p) => p);
    (addLineBreakPrefix as jest.Mock).mockImplementation((p) => p);
    (addSpaceAfter as jest.Mock).mockImplementation((p) => p);
    (addAnsiColor as jest.Mock).mockImplementation((p) => p);

    const result = formatStringParts<"scope">({
      label: "scope",
      part: "scope",
      rawPart: ["scope", "nested"],
      options: { showOnlyLatest: false },
    });

    expect(resolveScopeString).toHaveBeenCalled();
    expect(result.scope).toBe("resolved.scope");
  });

  it("should add padding for 4-char level", () => {
    (addPrefixAndSuffix as jest.Mock).mockImplementation((p) => p);
    (addLineBreakPrefix as jest.Mock).mockImplementation((p) => p);
    (addSpaceAfter as jest.Mock).mockImplementation((p) => p);
    (addAnsiColor as jest.Mock).mockImplementation((p) => p);

    const result = formatStringParts({
      label: "level",
      part: "INFO",
      rawPart: "info",
      options: {},
    });

    expect(result.level).toBe("INFO ");
  });

  it("should apply formatting steps correctly", () => {
    (addPrefixAndSuffix as jest.Mock).mockReturnValue("[part]");
    (addLineBreakPrefix as jest.Mock).mockImplementation((p) => `\n${p}`);
    (addSpaceAfter as jest.Mock).mockImplementation((p) => `${p} `);
    (addAnsiColor as jest.Mock).mockReturnValue("\u001b[32m[part]\u001b[0m");

    const result = formatStringParts({
      label: "message",
      part: "message",
      rawPart: "message",
      options: {
        prefix: "[",
        suffix: "]",
        ansiColor: "green",
        lineBreaks: 1,
        spaceAfter: 1,
      },
    });

    expect(result.message).toBe("\n[part] ");
    expect(result.withAnsiColor).toBe("\n\u001b[32m[part]\u001b[0m ");
  });
});
