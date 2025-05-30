import { printObject } from "@/modules/transporters/node/utils/print-object";

describe("printObject", () => {
  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "dir").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should print object with default options", () => {
    const obj = { a: 1, b: { c: 2 } };

    printObject(obj);

    expect(console.dir).toHaveBeenCalledWith(obj, { depth: null });
  });

  it("should print object with given lineBreaks and depth", () => {
    const obj = { a: 1 };
    printObject(obj, { lineBreaks: 3, depth: 1 });

    expect(console.log).toHaveBeenCalledWith("\n\n\n");
    expect(console.dir).toHaveBeenCalledWith(obj, { depth: 1 });
  });

  it("should not print if obj is null or not an object", () => {
    printObject(null);
    printObject(42);
    printObject("string");
    printObject(undefined);

    expect(console.log).not.toHaveBeenCalled();
    expect(console.dir).not.toHaveBeenCalled();
  });
});
