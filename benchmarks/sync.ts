/**
 * 🔬 Logry Core Benchmark (Synchronous Mode – Edge Environment)
 *
 * Measures the time to synchronously process 1,000,000 log operations
 * using the minimal Edge transporter pipeline.
 * 🚀 logger.log() → normalize → format → console.log
 *
 * ⚡ Benchmark Result
 * Total Duration: 2.81 s
 * Average Time Per Log: 0.00281 ms (2.81 μs)
 *
 * 🖥️ Machine Info
 * Model: MacBook Pro (2024, M4 Pro)
 * Chip: Apple M4 Pro – 14-core (10 performance + 4 efficiency)
 * RAM: 24 GB LPDDR5 (Micron)
 * Disk: 494GB SSD (Apple Fabric)
 * OS: macOS 15.5 (Build 24F74)
 * Node.js: v22.14.0
 */

// Simulate an Edge-like runtime.
/* eslint-disable @typescript-eslint/no-explicit-any */
delete (globalThis as any).process;
delete (globalThis as any).window;
delete (globalThis as any).document;

import { logry } from "../dist/edge";

const logger = logry();

export async function run(totalLogs: number) {
  const start = performance.now();
  for (let i = 0; i < totalLogs; i++) {
    logger.error(`log ${i + 1}`);
  }
  await new Promise((r) => setTimeout(r, 10));
  const duration = performance.now() - start;
  return { duration, avgPerLog: duration / totalLogs };
}

const { duration, avgPerLog } = await run(1_000_000);

console.log(`\n\n⚡️ Benchmark Result\n`);
console.log(`Total: ${(duration / 1000).toFixed(2)} s`);
console.log(`Average per log (sync): ${avgPerLog.toFixed(5)} ms`);
