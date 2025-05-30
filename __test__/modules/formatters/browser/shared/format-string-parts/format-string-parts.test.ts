import { formatStringParts } from "@/modules/formatters/browser/shared/format-string-parts";
import { addLineBreakPrefix } from "@/modules/formatters/utils/add-line-break-prefix";
import { addPrefixAndSuffix } from "@/modules/formatters/utils/add-prefix-and-suffix";
import { addSpaceAfter } from "@/modules/formatters/utils/add-space-after";
import { resolveScopeString } from "@/modules/formatters/utils/resolve-scope-string";
import { tryCustomFormatter } from "@/modules/formatters/utils/try-custom-formatter";

jest.mock("@/modules/formatters/utils/try-custom-formatter");
jest.mock("@/modules/formatters/utils/resolve-scope-string");
jest.mock("@/modules/formatters/utils/add-line-break-prefix");
jest.mock("@/modules/formatters/utils/add-prefix-and-suffix");
jest.mock("@/modules/formatters/utils/add-space-after");

describe("formatStringParts", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (tryCustomFormatter as jest.Mock).mockImplementation(() => null);
    (resolveScopeString as jest.Mock).mockImplementation(({ rawScope }) =>
      rawScope.join("."),
    );
    (addLineBreakPrefix as jest.Mock).mockImplementation((str) => str);
    (addPrefixAndSuffix as jest.Mock).mockImplementation((str) => str);
    (addSpaceAfter as jest.Mock).mockImplementation((str) => str);
  });

  it("should return empty string and cssStyle when hide is true", () => {
    const result = formatStringParts({
      label: "scope",
      part: "user.auth",
      rawPart: ["user", "auth"],
      options: { hide: true },
    });
    expect(result).toEqual({ scope: "", cssStyle: "" });
  });

  it("should return empty string and cssStyle when part is empty", () => {
    const result = formatStringParts({
      label: "scope",
      part: "",
      rawPart: ["user", "auth"],
      options: {},
    });
    expect(result).toEqual({ scope: "", cssStyle: "" });
  });

  it("should use custom formatter if provided and return its value", () => {
    (tryCustomFormatter as jest.Mock).mockReturnValue({
      level: "CUSTOM",
      cssStyle: "color:red",
    });

    const result = formatStringParts({
      label: "level",
      part: "INFO",
      rawPart: "INFO",
      options: { customFormatter: jest.fn() },
    });

    expect(tryCustomFormatter).toHaveBeenCalled();
    expect(result).toEqual({ level: "CUSTOM", cssStyle: "color:red" });
  });

  it("should format scope using resolveScopeString when label is scope", () => {
    (resolveScopeString as jest.Mock).mockReturnValue("user.auth");

    const result = formatStringParts({
      label: "scope",
      part: "user.auth.login",
      rawPart: ["user", "auth", "login"],
      options: {},
    });

    expect(resolveScopeString).toHaveBeenCalledWith({
      scope: "user.auth.login",
      rawScope: ["user", "auth", "login"],
      showOnlyLatest: undefined,
      customSeparator: undefined,
    });
    expect(result.scope).toBe("user.auth");
  });

  it("should pad level with a space if length is 4 and in LEVEL_PRIORITY", () => {
    const level = "warn";

    const result = formatStringParts({
      label: "level",
      part: level,
      rawPart: level,
      options: {},
    });

    expect(result.level.endsWith(" ")).toBe(true);
  });

  it("should apply prefix, suffix, line breaks and space after correctly", () => {
    (addPrefixAndSuffix as jest.Mock).mockImplementation(
      (str, prefix, suffix) => `${prefix ?? ""}${str}${suffix ?? ""}`,
    );
    (addLineBreakPrefix as jest.Mock).mockImplementation(
      (str, lineBreaks) => "\n".repeat(lineBreaks ?? 0) + str,
    );
    (addSpaceAfter as jest.Mock).mockImplementation(
      (str, spaceAfter) => str + " ".repeat(spaceAfter ?? 0),
    );

    const result = formatStringParts({
      label: "message",
      part: "Hello",
      rawPart: "Hello",
      options: {
        prefix: "[",
        suffix: "]",
        lineBreaks: 2,
        spaceAfter: 3,
      },
    });

    expect(result.message).toBe("\n\n[Hello]   ");
  });

  it("should return cssStyle from options", () => {
    const cssStyle = "font-weight:bold;";

    const result = formatStringParts({
      label: "scope",
      part: "test",
      rawPart: ["test"],
      options: { cssStyle },
    });

    expect(result.cssStyle).toBe(cssStyle);
  });
});
