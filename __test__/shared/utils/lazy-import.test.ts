import { lazyImport } from "@/shared/utils/node/lazy-import";

describe("lazyImport", () => {
  it("should only call importer once and cache the result", async () => {
    const fakeModule = { hello: "world" };
    const importer = jest.fn(async () => fakeModule);
    const lazy = lazyImport(importer);

    const mod1 = await lazy();
    const mod2 = await lazy();
    const mod3 = await lazy();

    expect(mod1).toBe(fakeModule);
    expect(mod2).toBe(fakeModule);
    expect(mod3).toBe(fakeModule);
    expect(importer).toHaveBeenCalledTimes(1);
  });

  it("should return the exact same reference (cached instance)", async () => {
    const fakeModule = { count: 42 };
    const lazy = lazyImport(async () => fakeModule);

    const first = await lazy();
    const second = await lazy();

    expect(first).toBe(second);
  });

  it("should support multiple lazy imports with independent caches", async () => {
    const moduleA = { id: "A" };
    const moduleB = { id: "B" };

    const lazyA = lazyImport(async () => moduleA);
    const lazyB = lazyImport(async () => moduleB);

    const a1 = await lazyA();
    const b1 = await lazyB();
    const a2 = await lazyA();
    const b2 = await lazyB();

    expect(a1).toBe(moduleA);
    expect(b1).toBe(moduleB);
    expect(a1).toBe(a2);
    expect(b1).toBe(b2);
  });
});
