import {
  DEFAULT_HIDE_DATE,
  DEFAULT_HIDE_ID,
  DEFAULT_HIDE_SCOPE,
  DEFAULT_SCOPE_SEPARATOR,
  DEFAULT_SHOW_ONLY_LATEST_SCOPE,
  DEFAULT_MESSAGE_PREFIX,
  DEFAULT_MESSAGE_LINE_BREAKS,
  DEFAULT_META_LINE_BREAKS,
  DEFAULT_TOP_LINE_BREAKS,
  DEFAULT_BOTTOM_LINE_BREAKS,
  DEFAULT_STRINGIFY_META,
  DEFAULT_META_DEPTH,
  DEFAULT_TOP_BORDER,
  DEFAULT_BOTTOM_BORDER,
  DEFAULT_USE_COLOR,
} from "../../../../../src/constants";
import { resolveOutputConfig } from "../../../../../src/log-pipeline/output/node/utils/resolve-output-config";

describe("resolveOutputConfig", () => {
  it("should return default values when input is undefined", () => {
    const config = resolveOutputConfig();

    expect(config).toEqual({
      hideDate: DEFAULT_HIDE_DATE,
      hideId: DEFAULT_HIDE_ID,
      hideScope: DEFAULT_HIDE_SCOPE,
      scopeSeparator: DEFAULT_SCOPE_SEPARATOR,
      showOnlyLatestScope: DEFAULT_SHOW_ONLY_LATEST_SCOPE,
      messagePrefix: DEFAULT_MESSAGE_PREFIX,
      messageLineBreaks: DEFAULT_MESSAGE_LINE_BREAKS,
      metaLineBreaks: DEFAULT_META_LINE_BREAKS,
      topLineBreaks: DEFAULT_TOP_LINE_BREAKS,
      bottomLineBreaks: DEFAULT_BOTTOM_LINE_BREAKS,
      stringifyMeta: DEFAULT_STRINGIFY_META,
      metaDepth: DEFAULT_META_DEPTH,
      topBorder: DEFAULT_TOP_BORDER,
      bottomBorder: DEFAULT_BOTTOM_BORDER,
      useColor: DEFAULT_USE_COLOR,
      formatter: undefined,
    });
  });

  it("should override default values with user config", () => {
    const formatter = jest.fn();
    const config = resolveOutputConfig({
      hideId: true,
      hideDate: false,
      scopeSeparator: " > ",
      messageLineBreaks: 2,
      topBorder: 5,
      useColor: true,
      formatter,
    });

    expect(config).toMatchObject({
      hideId: true,
      hideDate: false,
      scopeSeparator: " > ",
      messageLineBreaks: 2,
      topBorder: 5,
      useColor: true,
      formatter,
    });
  });
});
