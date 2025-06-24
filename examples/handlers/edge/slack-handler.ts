/* 

💡 Demonstrates how to use `logry` with a custom Slack handler.

📚 Slack webhooks doc: https://api.slack.com/messaging/webhooks

📟  Run this example with:
npx tsx examples/handlers/edge/slack-handler.ts

*/

// Simulate an Edge-like runtime.
/* eslint-disable @typescript-eslint/no-explicit-any */
delete (globalThis as any).process;
delete (globalThis as any).window;
delete (globalThis as any).document;

import { type RawPayload, logry, EdgeHandler } from "../../../dist/edge"; // 📦 Use Edge-specific module. (Includes EdgeHandler)

// ════════════════════ Implementing a Custom Handler ════════════════════

// ✨ SlackHandler sends logs to a Slack channel via Incoming Webhooks.
// It extends EdgeHandler and posts formatted log messages as plain text.
// 📌 Note: This implementation does not include message length protection.
class SlackHandler extends EdgeHandler {
  constructor(private webhookUrl = "") {
    super();
    this.webhookUrl = webhookUrl;
  }

  async handle(payload: RawPayload) {
    const logLine = this.compose(payload);

    await fetch(this.webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: logLine }),
    });
  }
}

// ════════════════════ Usage Example ════════════════════

// Create an instance of the the handler
const mySlackHandler = new SlackHandler(
  "https://hooks.slack.com/services/T09...", // ✏️ Try your Webhook URL here
);

// Create a logger
const logger = logry({ id: "my-logger", level: "trace" });

// Add the handler
logger.addHandler(mySlackHandler, "my-slack-handler");

// 🚀 Fire logs
logger.fatal("Critical server failure!", new Error("Database connection lost")); // meta as Error
logger.error("Payment failed", { userId: "u_12345", orderId: "o_22345" });
logger.warn("Slow response from /api/orders", { endpoint: "/api/orders" });
logger.info("Maintenance started", { deliveryTime: "08:30 AM" });
logger.debug("Token validated", { tokenId: "jwt_xyz" });
logger.trace("Running validateOrderPayload()", { route: "/checkout" });
