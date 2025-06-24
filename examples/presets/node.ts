/* 

💡 Demonstrates different built-in logry presets in an Node.js environment.

📟  Run this example with:
npx tsx examples/presets/node.ts  

*/

import { logry } from "logry";

const context = { userId: "user_123" };
const meta = { method: "POST", data: { status: 401 } };

const p = logry({ id: "1", level: "trace", preset: "pretty" });
const pe = logry({ id: "2", level: "trace", preset: "pretty-expanded" });
const m = logry({ id: "3", level: "trace", preset: "minimal" });
const v = logry({ id: "4", level: "trace", preset: "verbose", context });

console.log("\n══════════════════════════════[ pretty ]\n");

p.fatal("This is a msg.");
p.error("This is a msg.", meta);
p.warn("This is a msg.", meta, { scope: ["api", "user"] });

await new Promise((r) => setTimeout(r, 10));
console.log("\n══════════════════════════════[ pretty-expanded ]\n");

pe.info("This is a msg.");
pe.debug("This is a msg.", meta);
pe.trace("This is a msg.", meta, { scope: ["api", "user"] });

await new Promise((r) => setTimeout(r, 10));
console.log("\n══════════════════════════════[ minimal ]\n");

m.fatal("This is a msg.");
m.error("This is a msg.", meta);
m.warn("This is a msg.", meta, { scope: ["api", "user"] });

await new Promise((r) => setTimeout(r, 10));
console.log("\n══════════════════════════════[ verbose ]\n");

v.info("This is a msg.");
v.debug("This is a msg.", meta);
v.trace("This is a msg.", meta, { scope: ["api", "user"] });
