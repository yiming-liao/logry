/* 

💡 Demonstrates different built-in logry presets in an Edge environment.

📟  Run this example with:
npx tsx examples/presets/edge.ts  

*/

// Simulate an Edge-like runtime.
/* eslint-disable @typescript-eslint/no-explicit-any */
delete (globalThis as any).process;
delete (globalThis as any).window;
delete (globalThis as any).document;

import { logry } from "logry/edge"; // 📦 Use Edge-specific module.

const context = { userId: "user_123" };
const meta = { method: "POST", data: { status: 401 } };

const p = logry({ level: "trace", preset: "pretty" });
const pe = logry({ level: "trace", preset: "pretty-expanded" });
const m = logry({ level: "trace", preset: "minimal" });
const v = logry({ level: "trace", preset: "verbose", context });

console.log("\n══════════════════════════════[ pretty ]\n");

p.fatal("This is a msg.");
p.error("This is a msg.", meta);
p.warn("This is a msg.", meta, { scope: ["api", "user"] });

console.log("\n══════════════════════════════[ pretty-expanded ]\n");

pe.info("This is a msg.");
pe.debug("This is a msg.", meta);
pe.trace("This is a msg.", meta, { scope: ["api", "user"] });

console.log("\n══════════════════════════════[ minimal ]\n");

m.fatal("This is a msg.");
m.error("This is a msg.", meta);
m.warn("This is a msg.", meta, { scope: ["api", "user"] });

console.log("\n══════════════════════════════[ verbose ]\n");

v.info("This is a msg.");
v.debug("This is a msg.", meta);
v.trace("This is a msg.", meta, { scope: ["api", "user"] });
