import { writeToStreamAsync } from "@/modules/transporters/node/utils/write-to-stream-async";

describe("writeToStreamAsync", () => {
  it("should resolve immediately when stream.write returns true", async () => {
    const mockStream = {
      write: jest.fn().mockReturnValue(true),
      once: jest.fn(),
    } as unknown as NodeJS.WriteStream;

    await expect(
      writeToStreamAsync("hello", mockStream),
    ).resolves.toBeUndefined();
    expect(mockStream.write).toHaveBeenCalledWith("hello");
    expect(mockStream.once).not.toHaveBeenCalled();
  });

  it("should wait for 'drain' when stream.write returns false", async () => {
    let drainCallback: () => void;

    const mockStream = {
      write: jest.fn().mockReturnValue(false),
      once: jest.fn((event: string, cb: () => void) => {
        if (event === "drain") {
          drainCallback = cb;
        }
      }),
    } as unknown as NodeJS.WriteStream;

    const promise = writeToStreamAsync("world", mockStream);

    expect(mockStream.write).toHaveBeenCalledWith("world");
    expect(mockStream.once).toHaveBeenCalledWith("drain", expect.any(Function));

    // Simulate 'drain' event
    drainCallback!();

    await expect(promise).resolves.toBeUndefined();
  });
});
