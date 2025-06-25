/* 

💡 Demonstrates how to use `logry` with a custom Discord handler.

📚 Discord webhooks doc: https://discord.com/safety/using-webhooks-and-embeds

📟  Run this example with:
npx tsx examples/handlers/edge/discord-handler.ts

*/

// Simulate an Edge-like runtime.
/* eslint-disable @typescript-eslint/no-explicit-any */
delete (globalThis as any).process;
delete (globalThis as any).window;
delete (globalThis as any).document;

import { type RawPayload, logry, EdgeHandler } from "logry/edge"; // 📦 Use Edge-specific module. (Includes EdgeHandler)

// ════════════════════ Implementing a Custom Handler ════════════════════

// ✨ DiscordHandler sends logs to a Discord channel via Incoming Webhooks.
// It extends EdgeHandler and posts formatted log messages as plain text.
// 📌 Note: This implementation does not include message length protection.
class DiscordHandler extends EdgeHandler {
  constructor(private webhookUrl = "") {
    super();
    this.webhookUrl = webhookUrl;
  }

  async handle(payload: RawPayload) {
    const logLine = this.compose(payload);

    await fetch(this.webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: logLine }),
    });
  }
}

// ════════════════════ Usage Example ════════════════════

// Create an instance of the the handler
const myDiscordHandler = new DiscordHandler(
  "https://discord.com/api/webhooks/138...", // ✏️ Try your Webhook URL here
);

// Create a logger
const logger = logry({ id: "my-logger", level: "trace" });

// Add the handler
logger.addHandler(myDiscordHandler, "my-discord-handler");

// 🚀 Fire logs
logger.fatal("Critical server failure!", new Error("Database connection lost")); // meta as Error
logger.error("Payment failed", { userId: "u_12345", orderId: "o_22345" });
logger.warn("Slow response from /api/orders", { endpoint: "/api/orders" });
logger.info("Maintenance started", { deliveryTime: "08:30 AM" });
logger.debug("Token validated", { tokenId: "jwt_xyz" });
logger.trace("Running validateOrderPayload()", { route: "/checkout" });
