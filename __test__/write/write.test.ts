import { writeBrowser } from "../../src/write/browser";
import { writeNode } from "../../src/write/node";
import { write } from "../../src/write/write";

jest.mock("../../src/write/browser", () => ({
  writeBrowser: jest.fn(),
}));
jest.mock("../../src/write/node", () => ({
  writeNode: jest.fn(),
}));

describe("write", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("does not write if level is silent", () => {
    write({
      id: "abc",
      level: "silent",
      context: "ctx",
      message: "should not log",
      meta: undefined,
      writeConfig: {},
    });

    expect(writeNode).not.toHaveBeenCalled();
    expect(writeBrowser).not.toHaveBeenCalled();
  });

  it("writes to node platform", () => {
    write({
      id: "abc",
      level: "info",
      context: "ctx",
      message: "hello",
      meta: undefined,
      writeConfig: { platform: "node" },
    });

    expect(writeNode).toHaveBeenCalled();
    expect(writeBrowser).not.toHaveBeenCalled();
  });

  it("writes to browser platform", () => {
    write({
      id: "abc",
      level: "info",
      context: "ctx",
      message: "hello",
      meta: undefined,
      writeConfig: { platform: "browser" },
    });

    expect(writeBrowser).toHaveBeenCalled();
    expect(writeNode).not.toHaveBeenCalled();
  });

  it("uses 'auto' as default and resolves to node when window is undefined", () => {
    delete (global as { window: unknown }).window;

    write({
      id: "abc",
      level: "info",
      context: "ctx",
      message: "hello",
      meta: undefined,
      writeConfig: {},
    });

    expect(writeNode).toHaveBeenCalled();
  });

  it("falls back to default platform when writeConfig is undefined", () => {
    delete (global as { window: unknown }).window;

    write({
      id: "fallback",
      level: "info",
      context: "test",
      message: "writeConfig is undefined",
      meta: undefined,
      writeConfig: undefined, // simulate missing writeConfig
    });

    expect(writeNode).toHaveBeenCalled();
  });
});
