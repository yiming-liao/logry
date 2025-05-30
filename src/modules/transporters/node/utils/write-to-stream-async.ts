/**
 * Writes a chunk to a Node.js stream and waits for 'drain' if needed.
 *
 * Ensures proper handling of stream backpressure.
 *
 * @param chunk - The string content to write to the stream.
 * @param stream - The Node.js writable stream (defaults to process.stdout).
 * @returns A promise that resolves when the write is complete.
 */
export const writeToStreamAsync = async (
  chunk: string,
  stream: NodeJS.WriteStream = process.stdout,
): Promise<void> => {
  return new Promise((resolve) => {
    const ok = stream.write(chunk);
    // If write returns false, wait for 'drain' before resolving
    if (!ok) {
      stream.once("drain", resolve);
    } else {
      resolve();
    }
  });
};
