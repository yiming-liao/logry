/**
 * 🔬 Logry Core Benchmark (Node Transporter Pipeline)
 *
 * Measures individual stages of the logging pipeline.
 * 🚀 appendProcessFields → normalize → format → printLog
 *
 * ⚡ Performance Results
 * 🔗 appendProcessFields()      411.5ms  (2430.27K ops/sec)
 * 🔀 normalize()                192.2ms  (5202.89K ops/sec)
 * 🎨 format()                   379.2ms  (2637.05K ops/sec)
 * 📃 printLog()                 7777.5ms  (128.58K ops/sec)
 *
 * 🖥️ Machine Info
 * Model: MacBook Pro (2024, M4 Pro)
 * Chip: Apple M4 Pro – 14-core (10 performance + 4 efficiency)
 * RAM: 24 GB LPDDR5 (Micron)
 * Disk: 494GB SSD (Apple Fabric)
 * OS: macOS 15.5 (Build 24F74)
 * Node.js: v22.14.0
 */

import { runAppend } from "./run-append";
import { runFormat } from "./run-format";
import { runNormalize } from "./run-normalize";
import { runPrintLog } from "./run-print-log";

export const COUNT = 1_000_000;

const { duration: appendDuration, throughput: appendThroughput } =
  await runAppend(COUNT);
const { duration: normalizeDuration, throughput: normalizeThroughput } =
  await runNormalize(COUNT);
const { duration: formatDuration, throughput: formatThroughput } =
  await runFormat(COUNT);
const { duration: printLogDuration, throughput: printLogThroughput } =
  await runPrintLog(COUNT);

console.log(`\n\n⚡️ Benchmark Result\n`);
console.log(
  `${"🔗 appendProcessFields()".padEnd(30)}${appendDuration.toFixed(1)}ms  (${appendThroughput}K ops/sec)`,
);
console.log(
  `${"🔀 normalize()".padEnd(30)}${normalizeDuration.toFixed(1)}ms  (${normalizeThroughput}K ops/sec)`,
);
console.log(
  `${"🎨 format()".padEnd(30)}${formatDuration.toFixed(1)}ms  (${formatThroughput}K ops/sec)`,
);
console.log(
  `${"📃 printLog()".padEnd(30)}${printLogDuration.toFixed(1)}ms  (${printLogThroughput}K ops/sec)`,
);
