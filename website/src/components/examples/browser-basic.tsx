import { trace, debug, info, warn, error, fatal } from "logry/browser";

const BrowserBasic = () => {
  /**
   * 🧪 Basic Log Levels
   * ------------------------------------------------------
   * These are the six standard log levels, from least to most severe.
   */
  console.log("\n\n══════════════════════════════[ Basic Log Levels ]\n\n\n");

  trace("Fetching data from cache");
  debug("Component mounted successfully");
  info("Server started on port 3000");
  warn("Missing optional config file");
  error("Request failed with status 500");
  fatal("Critical: unable to connect to database");

  /**
   * 📦 Logging Metadata
   * ------------------------------------------------------
   * Add structured context to a log using the second parameter.
   * Great for logging objects, IDs, user actions, etc.
   */
  console.log("\n\n══════════════════════════════[ Logging Metadata ]\n\n\n");

  info("User login detected", {
    userId: "user_123",
    ip: "192.168.0.2",
    role: "admin",
  });

  /**
   * 📂 Using Scope
   * ------------------------------------------------------
   * Add a scope tag to group related logs — can be a string or breadcrumb-style array.
   * If you don't need to log any metadata, pass `null` or `undefined` as the second argument.
   */
  console.log("\n\n══════════════════════════════[ Using Scope ]\n\n\n");

  debug("Fetching dashboard data", null, {
    scope: "dashboard",
  });

  warn("Deprecated endpoint called", null, {
    scope: ["api", "v1", "legacy"],
  });

  /**
   * 🧠 Logging an Error Object
   * ------------------------------------------------------
   * Pass an Error instance as metadata — it will automatically log the stack trace.
   */
  console.log(
    "\n\n══════════════════════════════[ Logging an Error Object ]\n\n\n",
  );

  error("Unexpected failure", new Error("Connection timeout"));

  /**
   * ⚙️ Advanced Options
   * ------------------------------------------------------
   * Customize formatting, normalization behavior using the third parameter.
   */
  console.log("\n\n══════════════════════════════[ Advanced Options ]\n\n\n");

  trace(
    "Logging deeply nested meta data",
    { system: { cache: { status: "miss", age: 0 } } },
    {
      normalizerConfig: {
        browser: {
          timestamp: { style: "iso" },
          level: { style: "lower" },
        },
      },
      formatterConfig: {
        browser: {
          message: { prefix: " 📌 " },
          meta: { format: "pretty" },
        },
      },
    },
  );

  return null;
};

export default BrowserBasic;
