/* 

💡 Demonstrates how to use `logry` with a custom Sentry handler for error monitoring.

📚 Sentry SDK doc: https://develop.sentry.dev/sdk/overview/

📟  Run this example with:
npx tsx examples/handlers/node/sentry-handler.ts

*/

import type { Level, RawPayload } from "logry";
import * as Sentry from "@sentry/node";
import { logry } from "logry";
import { NodeHandler } from "logry"; // 📦 Use built-in handler classes from the "logry/handlers" module.

// ════════════════════ Implementing a Custom Handler ════════════════════

// Maps `logry` log levels to Sentry severity levels.
// Note: 'trace' maps to 'debug' since Sentry doesn't currently have a dedicated 'trace' level.
// This mapping ensures trace logs are still properly captured.
const levelMap: Record<Exclude<Level, "silent">, Sentry.SeverityLevel> = {
  fatal: "fatal",
  error: "error",
  warn: "warning",
  info: "info",
  debug: "debug",
  trace: "debug",
};

// ✨ SentryHandler sends logs to Sentry for centralized error tracking.
// Extends NodeHandler and translates log levels to Sentry's severity schema.
class SentryHandler extends NodeHandler {
  constructor({ dsn }: { dsn?: string }) {
    super();
    Sentry.init({ dsn }); // Initialize Sentry with your DSN (Data Source Name)
  }

  async handle(payload: RawPayload) {
    const { level, message, meta } = payload;
    if (level === "silent") return;

    const sentryLevel = levelMap[level];
    if (!sentryLevel) return;

    Sentry.withScope((scope) => {
      scope.setLevel(sentryLevel);

      // If meta is an Error object, capture it as an exception.
      if (meta instanceof Error) {
        Sentry.captureException(meta);
      }
      // Otherwise, capture message with additional context from meta.
      else {
        if (meta) {
          for (const [key, value] of Object.entries(meta)) {
            scope.setExtra(key, value);
          }
        }
        Sentry.captureMessage(message);
      }
    });
  }
}

// ════════════════════ Usage Example ════════════════════

// Create an instance of the the handler
const mySentryHandler = new SentryHandler({ dsn: "https://3ae06dd..." }); // ✏️ Try your DSN here

// Create a logger
const logger = logry({ id: "my-logger", level: "trace" });

// Add the handler
logger.addHandler(mySentryHandler, "my-sentry-handler");

// 🚀 Fire logs
logger.fatal("Critical server failure!", new Error("Database connection lost")); // meta as Error
logger.error("Payment failed", { userId: "u_12345", orderId: "o_22345" });
logger.warn("Slow response from /api/orders", { endpoint: "/api/orders" });
logger.info("Maintenance started", { deliveryTime: "08:30 AM" });
logger.debug("Token validated", { tokenId: "jwt_xyz" });
logger.trace("Running validateOrderPayload()", { route: "/checkout" });
