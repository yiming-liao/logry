/* eslint-disable @typescript-eslint/no-explicit-any */
import { isNode } from "@/shared/utils/is-node";

describe("isNode", () => {
  afterEach(() => {
    delete (globalThis as any).process;
  });

  it("should return true when process.versions.node exists", () => {
    (globalThis as any).process = {
      versions: { node: "20.0.0" },
    };
    expect(isNode()).toBe(true);
  });

  it("should return false when process.versions.node is missing", () => {
    (globalThis as any).process = {
      versions: {},
    };
    expect(isNode()).toBe(false);
  });

  it("should return false when process is not defined", () => {
    delete (globalThis as any).process;
    expect(isNode()).toBe(false);
  });
});
