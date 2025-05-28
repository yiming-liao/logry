import type { OutputConfig } from "../../../src/output-config-types";
import { mergeOutputConfig } from "../../../src/logger/utils/merge-output-config";

describe("mergeOutputConfig", () => {
  it("merges node configs with correct precedence", () => {
    const baseConfig = { node: { a: 1, b: 2 } } as OutputConfig;
    const additionalConfig = { node: { b: 3, c: 4 } } as OutputConfig;

    const result = mergeOutputConfig(baseConfig, additionalConfig);
    expect(result.node).toEqual({ a: 1, b: 3, c: 4 });
  });

  it("merges browser configs with correct precedence", () => {
    const baseConfig = { browser: { x: "a" } } as OutputConfig;
    const additionalConfig = { browser: { y: "b" } } as OutputConfig;

    const result = mergeOutputConfig(baseConfig, additionalConfig);
    expect(result.browser).toEqual({ x: "a", y: "b" });
  });

  it("returns undefined for node or browser if merged object is empty", () => {
    const result = mergeOutputConfig({}, {});
    expect(result.node).toBeUndefined();
    expect(result.browser).toBeUndefined();
  });

  it("handles missing configs gracefully (optional chaining fallback)", () => {
    const baseConfig = { node: { a: 1 } } as OutputConfig;
    const result = mergeOutputConfig(baseConfig, undefined);
    expect(result.node).toEqual({ a: 1 });
    expect(result.browser).toBeUndefined();
  });

  it("merges partial configs and fallback to undefined when missing", () => {
    const additionalConfig = { node: { b: 2 } } as OutputConfig;
    const result = mergeOutputConfig(undefined, additionalConfig);
    expect(result.node).toEqual({ b: 2 });
    expect(result.browser).toBeUndefined();
  });

  it("returns undefined when all configs are missing or empty (fallback on empty merged objects)", () => {
    const result = mergeOutputConfig(undefined, undefined);
    expect(result.node).toBeUndefined();
    expect(result.browser).toBeUndefined();
  });
});
