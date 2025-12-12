/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from "vitest";
import {
  isNode,
  isDeno,
  isBun,
  isServer,
  isBrowser,
  isPlain,
  getEnv,
} from "@/pipeline/utils/platform";

describe("platform detection (pure functions)", () => {
  // --- Node.js ---
  it("detects Node.js", () => {
    const mock = { process: { versions: { node: "20.0.0" } } };
    expect(isNode(mock)).toBe(true);
    expect(isServer(mock)).toBe(true);
    expect(isBrowser(mock)).toBe(false);
    expect(isPlain(mock)).toBe(false);
  });

  // --- Deno ---
  it("detects Deno", () => {
    const mock = { Deno: {} };
    expect(isDeno(mock)).toBe(true);
    expect(isServer(mock)).toBe(true);
    expect(isBrowser(mock)).toBe(false);
    expect(isPlain(mock)).toBe(false);
  });

  // --- Bun ---
  it("detects Bun", () => {
    const mock = { Bun: {} };
    expect(isBun(mock)).toBe(true);
    expect(isServer(mock)).toBe(true);
    expect(isBrowser(mock)).toBe(false);
    expect(isPlain(mock)).toBe(false);
  });

  // --- Browser ---
  it("detects browser environment", () => {
    const mock = { window: {}, document: {} };
    expect(isBrowser(mock)).toBe(true);
    expect(isServer(mock)).toBe(false);
    expect(isPlain(mock)).toBe(false);
  });

  // --- Plain (Edge / RN / Workers / unknown) ---
  it("detects plain environment (non-server, non-browser)", () => {
    const mock = {};
    expect(isPlain(mock)).toBe(true);
    expect(isServer(mock)).toBe(false);
    expect(isBrowser(mock)).toBe(false);
  });

  // --- getEnv ----
  it("getEnv returns correct normalized descriptor", () => {
    const mock = { window: {}, document: {} } as any;
    const env = getEnv(mock);
    expect(env).toEqual({
      isServer: false,
      isBrowser: true,
      isPlain: false,
    });
  });
});
