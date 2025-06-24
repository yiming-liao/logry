/**
 * 🔬 Logry Core Benchmark (Fire-and-Forget Mode – Node Environment)
 *
 * Measures the time to asynchronously trigger log calls and dispatch raw payloads
 * directly to transporters, without performing normalization or formatting.
 * 🚀 logger.log()
 *
 * ⚡ Benchmark Summary
 * Total Duration: 0.99 seconds
 * Average Time Per Log: 0.00099 ms (0.99 μs)
 *
 * 🖥️ Machine Info
 * Model: MacBook Pro (2024, M4 Pro)
 * Chip: Apple M4 Pro – 14-core (10 performance + 4 efficiency)
 * RAM: 24 GB LPDDR5 (Micron)
 * Disk: 494GB SSD (Apple Fabric)
 * OS: macOS 15.5 (Build 24F74)
 * Node.js: v22.14.0
 */

import { logry } from "../dist";

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

setTimeout(() => {
  console.log(`\n\n⚡️ Benchmark Result\n`);
  console.log(`Total: ${(duration / 1000).toFixed(2)} s`);
  console.log(`Average per log (fire-and-forget): ${avgPerLog.toFixed(5)} ms`);
}, 5000);
