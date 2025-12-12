/* 
Demonstrates different built-in logry presets.

Run this example with:
npx tsx examples/presets/plain.ts  
--------------------------------
*/

// Simulate an Edge-like runtime.
/* eslint-disable @typescript-eslint/no-explicit-any */
delete (globalThis as any).process;
delete (globalThis as any).window;
delete (globalThis as any).document;

import { logry } from "logry";
import { setTimeout } from "node:timers/promises";

const context = { userId: "user_123" };
const meta = { method: "POST", data: { status: 401 } };

const p = logry({ level: "trace", preset: "pretty" });
const m = logry({ level: "trace", preset: "minimal" });
const v = logry({ level: "trace", preset: "verbose", context });

console.log("\n══════════════════════════════[ pretty ] ▼\n");

p.info("This is a msg.");
p.info("This is a msg.", meta);
p.info("This is a msg.", meta, { scope: ["api", "user"] });

await setTimeout(200);

console.log("\n══════════════════════════════[ pretty-expanded ] ▼\n");

m.info("This is a msg.");
m.info("This is a msg.", meta);
m.info("This is a msg.", meta, { scope: ["api", "user"] });

await setTimeout(200);

console.log("\n══════════════════════════════[ verbose ] ▼\n");

v.info("This is a msg.");
v.info("This is a msg.", meta);
v.info("This is a msg.", meta, { scope: ["api", "user"] });
