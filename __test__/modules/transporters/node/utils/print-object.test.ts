import { printObject } from "@/modules/transporters/node/utils/print-object";
import { writeToStreamAsync } from "@/modules/transporters/node/utils/write-to-stream-async";

jest.mock("@/modules/transporters/node/utils/write-to-stream-async", () => ({
  writeToStreamAsync: jest.fn(),
}));

describe("printObject", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "dir").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return immediately if obj is not an object or null", async () => {
    const getUtil = jest.fn();

    await printObject(getUtil, null);
    await printObject(getUtil, 123);
    await printObject(getUtil, "string");
    await printObject(getUtil, false);

    expect(getUtil).not.toHaveBeenCalled();
    expect(writeToStreamAsync).not.toHaveBeenCalled();
  });

  it("should write line breaks if lineBreaks > 0", async () => {
    const getUtil = jest.fn().mockResolvedValue(undefined);

    const obj = { a: 1 };

    await printObject(getUtil, obj, { lineBreaks: 3 });

    expect(writeToStreamAsync).toHaveBeenCalledWith("\n\n\n");
  });

  it("should call console.dir if util is undefined", async () => {
    const getUtil = jest.fn().mockResolvedValue(undefined);

    const obj = { a: 1 };

    await printObject(getUtil, obj);

    expect(console.dir).toHaveBeenCalledWith(obj, {});
    expect(writeToStreamAsync).not.toHaveBeenCalledWith(
      expect.stringContaining("a: 1"),
    );
  });

  it("should write inspected string with indent when util is available", async () => {
    const inspectedStr = "line1\nline2";

    const utilMock = {
      inspect: jest.fn().mockReturnValue(inspectedStr),
    };

    const getUtil = jest.fn().mockResolvedValue(utilMock);

    const obj = { a: 1 };

    await printObject(getUtil, obj, { depth: 4, indent: 2 });

    const expectedIndented =
      inspectedStr
        .split("\n")
        .map((line) => "  " + line)
        .join("\n") + "\n";

    expect(utilMock.inspect).toHaveBeenCalledWith(obj, { depth: 4 });
    expect(writeToStreamAsync).toHaveBeenCalledWith(expectedIndented);
  });
});
