import type { OutputConfig } from "../../../src/output-config-types";
import { mergeOutputConfig } from "../../../src/logger/utils/merge-output-config";

describe("mergeOutputConfig", () => {
  it("merges node configs with correct precedence", () => {
    const core = { node: { a: 1, b: 2 } } as OutputConfig;
    const instance = { node: { b: 3, c: 4 } } as OutputConfig;
    const options = { node: { c: 5, d: 6 } } as OutputConfig;

    const result = mergeOutputConfig(core, instance, options);
    expect(result.node).toEqual({ a: 1, b: 3, c: 5, d: 6 });
  });

  it("merges browser configs with correct precedence", () => {
    const core = { browser: { x: "a" } } as OutputConfig;
    const instance = { browser: { y: "b" } } as OutputConfig;
    const options = { browser: { x: "c", z: "d" } } as OutputConfig;

    const result = mergeOutputConfig(core, instance, options);
    expect(result.browser).toEqual({ x: "c", y: "b", z: "d" });
  });

  it("returns undefined for node or browser if merged object is empty", () => {
    const result = mergeOutputConfig({}, {}, {});
    expect(result.node).toBeUndefined();
    expect(result.browser).toBeUndefined();
  });

  it("handles missing configs gracefully (optional chaining fallback)", () => {
    const core = { node: { a: 1 } } as OutputConfig;
    const result = mergeOutputConfig(core, undefined, undefined);
    expect(result.node).toEqual({ a: 1 });
    expect(result.browser).toBeUndefined();
  });

  it("merges partial configs and fallback to undefined when missing", () => {
    const instance = { node: { b: 2 } } as OutputConfig;
    const options = { browser: { z: "z" } } as OutputConfig;
    const result = mergeOutputConfig(undefined, instance, options);
    expect(result.node).toEqual({ b: 2 });
    expect(result.browser).toEqual({ z: "z" });
  });

  it("returns undefined when all configs are missing or empty (fallback on empty merged objects)", () => {
    const result = mergeOutputConfig(undefined, undefined, undefined);
    expect(result.node).toBeUndefined();
    expect(result.browser).toBeUndefined();
  });
});
