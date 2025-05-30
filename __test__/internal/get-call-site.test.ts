import { getCallSite } from "@/internal";

describe("getCallSite", () => {
  it("should return a call site string from the stack trace", () => {
    const site = getCallSite();
    expect(typeof site).toBe("string");
    expect(site).toMatch(/at /);
  });

  it("should point to the correct caller location", () => {
    function testCaller() {
      return getCallSite();
    }

    const site = testCaller();

    expect(site).toContain("testCaller");
  });

  it("should return undefined if stack is unavailable (manually simulated)", () => {
    const fakeError = { stack: undefined } as Error;
    const site = getCallSite(fakeError);
    expect(site).toBeUndefined();
  });
});
