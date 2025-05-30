import {
  initNodeOs,
  osModule,
} from "@/modules/transporters/node/utils/init-node-os";

describe("initNodeOs", () => {
  it("should return undefined if not running in Node.js", async () => {
    const originalProcess = global.process;
    delete (global as { process: unknown }).process;

    const result = await initNodeOs();
    expect(result).toBeUndefined();

    global.process = originalProcess;
  });

  it("should import and cache os module in Node.js environment", async () => {
    const firstImport = await initNodeOs();
    expect(firstImport).toBeDefined();
    expect(osModule).toBe(firstImport);

    const secondImport = await initNodeOs();
    expect(secondImport).toBe(firstImport);
  });
});
