import type { RawPayload } from "@/shared/types/log-payload";
import { Normalizer } from "@/modules/normalizers";
import {
  normalizeTimestamp,
  normalizeId,
  normalizeLevel,
  normalizeScope,
  normalizeMessage,
  normalizeMeta,
  normalizeContext,
} from "@/modules/normalizers/fields";

jest.mock("@/modules/normalizers/fields");
jest.mock("@/modules/normalizers/fields");
jest.mock("@/modules/normalizers/fields");
jest.mock("@/modules/normalizers/fields");
jest.mock("@/modules/normalizers/fields");
jest.mock("@/modules/normalizers/fields");
jest.mock("@/modules/normalizers/fields");

describe("Normalizer", () => {
  let normalizer: Normalizer;

  beforeEach(() => {
    normalizer = new Normalizer();

    (normalizeTimestamp as jest.Mock).mockImplementation((v) => `ts:${v}`);
    (normalizeId as jest.Mock).mockImplementation((v) => `id:${v}`);
    (normalizeLevel as jest.Mock).mockImplementation((v) => `level:${v}`);
    (normalizeScope as jest.Mock).mockImplementation((v) => `scope:${v}`);
    (normalizeMessage as jest.Mock).mockImplementation((v) => `msg:${v}`);
    (normalizeMeta as jest.Mock).mockImplementation(
      (v) => `meta:${JSON.stringify(v)}`,
    );
    (normalizeContext as jest.Mock).mockImplementation(
      (v) => `ctx:${JSON.stringify(v)}`,
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should normalize with node config", () => {
    const rawPayload: RawPayload = {
      timestamp: 123_456,
      id: "abc",
      level: "info",
      scope: ["scope"],
      message: "hello",
      meta: { foo: "bar" },
      context: { user: "alice" },
      normalizerConfig: {
        node: {
          timestamp: {},
          id: {},
          level: {},
          scope: {},
          message: {},
          meta: {},
          context: {},
        },
      },
      formatterConfig: {},
      raw: {
        scope: [],
        timestamp: 0,
        id: "",
        level: "silent",
        message: "",
        hasMeta: true,
        hasContext: true,
      },
    };

    const result = normalizer.normalize("node", rawPayload);

    expect(result.timestamp).toBe("ts:123456");
    expect(result.id).toBe("id:abc");
    expect(result.level).toBe("level:info");
    expect(result.scope).toBe("scope:scope");
    expect(result.message).toBe("msg:hello");
    expect(result.meta).toBe('meta:{"foo":"bar"}');
    expect(result.context).toBe('ctx:{"user":"alice"}');
    expect(result.normalizerConfig).toBe(rawPayload.normalizerConfig);
    expect(result.formatterConfig).toBe(rawPayload.formatterConfig);
    expect(result.raw).toBe(rawPayload.raw);
  });

  it("should normalize with browser config", () => {
    const rawPayload: RawPayload = {
      timestamp: 111,
      id: "id123",
      level: "error",
      scope: ["testScope"],
      message: "browser msg",
      meta: { a: 1 },
      context: { b: 2 },
      normalizerConfig: {
        browser: {
          timestamp: {},
          id: {},
          level: {},
          scope: {},
          message: {},
          meta: {},
          context: {},
        },
      },
      formatterConfig: {},
      raw: {
        scope: [],
        timestamp: 0,
        id: "",
        level: "silent",
        message: "",
        hasMeta: true,
        hasContext: true,
      },
    };

    const result = normalizer.normalize("node", rawPayload);

    expect(result.timestamp).toBe("ts:111");
    expect(result.id).toBe("id:id123");
    expect(result.level).toBe("level:error");
    expect(result.scope).toBe("scope:testScope");
    expect(result.message).toBe("msg:browser msg");
    expect(result.meta).toBe('meta:{"a":1}');
    expect(result.context).toBe('ctx:{"b":2}');
  });

  it("should fallback to empty config if none provided", () => {
    const rawPayload: RawPayload = {
      timestamp: 1,
      id: "x",
      level: "warn",
      scope: ["s"],
      message: "m",
      meta: {},
      context: {},
      normalizerConfig: {},
      formatterConfig: {},
      raw: {
        scope: [],
        timestamp: 0,
        id: "",
        level: "silent",
        message: "",
        hasMeta: true,
        hasContext: true,
      },
    };

    const result = normalizer.normalize("node", rawPayload);

    expect(result.timestamp).toBe("ts:1");
    expect(result.id).toBe("id:x");
    expect(result.level).toBe("level:warn");
  });
});
