/* 

💡 Demonstrates basic `logry` methods.

📟  Run this example with:
npx tsx examples/basic/node.ts  

*/

import { trace, debug, info, warn, error, fatal } from "logry";

/**
 * 🧪 Basic Log Levels
 * ------------------------------------------------------
 * These are the six standard log levels, from least to most severe.
 */
console.log("\n══════════════════════════════[ Basic Log Levels ]\n");

trace("Fetching data from cache");
debug("Component mounted successfully");
info("Server started on port 3000");
warn("Missing optional config file");
error("Request failed with status 500");
fatal("Critical: unable to connect to database");

await new Promise((r) => setTimeout(r, 10));
/**
 * 📦 Logging Metadata
 * ------------------------------------------------------
 * Add structured context to a log using the second parameter.
 * Great for logging objects, IDs, user actions, etc.
 */
console.log("\n══════════════════════════════[ Logging Metadata ]\n");

info("User login detected", {
  userId: "user_123",
  ip: "192.168.0.2",
  role: "admin",
});

await new Promise((r) => setTimeout(r, 10));
/**
 * 📂 Using Scope
 * ------------------------------------------------------
 * Add a scope tag to group related logs — can be a string or breadcrumb-style array.
 * If you don't need to log any metadata, pass `null` or `undefined` as the second argument.
 */
console.log("\n══════════════════════════════[ Using Scope ]\n");

debug("Fetching dashboard data", { scope: "dashboard" });

warn("Deprecated endpoint called", { scope: ["api", "v1", "legacy"] });

await new Promise((r) => setTimeout(r, 10));
/**
 * 🧠 Logging an Error Object
 * ------------------------------------------------------
 * Pass an Error instance as metadata — it will automatically log the stack trace.
 */
console.log("\n══════════════════════════════[ Logging an Error Object ]\n");

error("Unexpected failure", new Error("Connection timeout"));

await new Promise((r) => setTimeout(r, 10));
/**
 * ⚙️ Advanced Options
 * ------------------------------------------------------
 * Customize formatting, normalization behavior using the third parameter.
 */
console.log("\n══════════════════════════════[ Advanced Options ]\n");

trace(
  "Logging deeply nested meta data",
  { system: { cache: { status: "miss", age: 0 } } },
  {
    normalizerConfig: {
      node: { timestamp: { style: "iso" }, level: { style: "lower" } },
    },
    formatterConfig: {
      node: { message: { prefix: "📌 " }, meta: { format: "pretty" } },
    },
  },
);
