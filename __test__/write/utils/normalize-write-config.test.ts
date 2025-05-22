import {
  DEFAULT_BORDER_WIDTH,
  DEFAULT_USE_COLOR,
  DEFAULT_META_DEPTH,
  DEFAULT_SHOW_ONLY_LATEST_CONTEXT,
  DEFAULT_HIDE_CONTEXT,
  DEFAULT_HIDE_ID,
  DEFAULT_HIDE_DATE,
} from "../../../src/constants";
import { normalizedWriteConfig } from "../../../src/write/utils/normalize-write-config";

describe("normalizedWriteConfig", () => {
  it("should return all default values when input is empty", () => {
    const result = normalizedWriteConfig();
    expect(result).toEqual({
      hideId: DEFAULT_HIDE_ID,
      hideContext: DEFAULT_HIDE_CONTEXT,
      showOnlyLatestContext: DEFAULT_SHOW_ONLY_LATEST_CONTEXT,
      hideDate: DEFAULT_HIDE_DATE,
      metaDepth: DEFAULT_META_DEPTH,
      borderWidth: DEFAULT_BORDER_WIDTH,
      useColor: DEFAULT_USE_COLOR,
    });
  });

  it("should override top-level boolean options", () => {
    const result = normalizedWriteConfig({
      hideId: true,
      hideContext: true,
      showOnlyLatestContext: false,
      hideDate: true,
    });
    expect(result.hideId).toBe(true);
    expect(result.hideContext).toBe(true);
    expect(result.showOnlyLatestContext).toBe(false);
    expect(result.hideDate).toBe(true);
  });

  it("should override node-level options", () => {
    const result = normalizedWriteConfig({
      node: {
        metaDepth: 5,
        borderWidth: 2,
        useColor: false,
      },
    });
    expect(result.metaDepth).toBe(5);
    expect(result.borderWidth).toBe(2);
    expect(result.useColor).toBe(false);
  });

  it("should mix top-level and node-level overrides correctly", () => {
    const result = normalizedWriteConfig({
      hideContext: true,
      node: {
        borderWidth: 3,
      },
    });
    expect(result.hideContext).toBe(true);
    expect(result.borderWidth).toBe(3);
    expect(result.metaDepth).toBe(DEFAULT_META_DEPTH); // untouched
    expect(result.useColor).toBe(DEFAULT_USE_COLOR);
  });
});
