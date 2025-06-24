/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FormatFieldOptions } from "@/modules/formatters/types";
import type { FormattedStructuredField } from "@/shared/types/log-fields";
import type { UtilModule } from "@/shared/utils/node/lazy-modules";
import { resolveFormatFieldOptions } from "@/modules/formatters/utils/resolve-format-field-options";
import { printObject } from "@/modules/transporters/node/utils/print-object";
import { writeToStreamAsync } from "@/modules/transporters/node/utils/write-to-stream-async";

jest.mock("@/modules/transporters/node/utils/write-to-stream-async", () => ({
  writeToStreamAsync: jest.fn(),
}));

jest.mock("@/modules/formatters/utils/resolve-format-field-options", () => ({
  resolveFormatFieldOptions: jest.fn(),
}));

describe("printObject", () => {
  const stream = {
    write: jest.fn().mockReturnValue(true),
    once: jest.fn(),
  } as any;

  const fakeInspect = jest.fn((obj: any) => JSON.stringify(obj, null, 2));
  const getUtil = async (): Promise<UtilModule> => ({ inspect: fakeInspect });

  const baseOptions: FormatFieldOptions<"node", "meta", "structured"> = {
    prefix: "--- START ---",
    suffix: "--- END ---",
    lineBreaks: 1,
    indent: 2,
    depth: 2,
    colors: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (resolveFormatFieldOptions as jest.Mock).mockReturnValue(baseOptions);
  });

  it("should print formatted object with prefix and suffix", async () => {
    const fieldValue: FormattedStructuredField = { foo: "bar" };

    await printObject({
      getUtil,
      stream,
      fieldKey: "meta",
      fieldValue,
      options: baseOptions,
    });

    expect(resolveFormatFieldOptions).toHaveBeenCalled();
    expect(fakeInspect).toHaveBeenCalledWith(
      fieldValue,
      expect.objectContaining({ depth: 2, colors: false }),
    );

    expect(writeToStreamAsync).toHaveBeenCalledWith("\n", stream);
    expect(writeToStreamAsync).toHaveBeenCalledWith("--- START ---\n", stream);
    expect(writeToStreamAsync).toHaveBeenCalledWith(
      expect.stringContaining('"foo": "bar"'),
      stream,
    );
    expect(writeToStreamAsync).toHaveBeenCalledWith("--- END ---\n", stream);
  });

  it("should not print if fieldValue is null", async () => {
    await printObject({
      getUtil,
      stream,
      fieldKey: "meta",
      fieldValue: null as any,
      options: baseOptions,
    });

    expect(writeToStreamAsync).not.toHaveBeenCalled();
  });

  it("should not print if fieldValue is a string", async () => {
    await printObject({
      getUtil,
      stream,
      fieldKey: "meta",
      fieldValue: "hello" as any,
      options: baseOptions,
    });

    expect(writeToStreamAsync).not.toHaveBeenCalled();
  });

  it("should fallback to console.dir if util is undefined", async () => {
    const spy = jest.spyOn(console, "dir").mockImplementation(() => {});

    await printObject({
      getUtil: async () => undefined,
      stream,
      fieldKey: "meta",
      fieldValue: { foo: "bar" },
      options: baseOptions,
    });

    expect(spy).toHaveBeenCalledWith({ foo: "bar" }, expect.anything());
    spy.mockRestore();
  });
});
