/* 

💡 Demonstrates how to use `logry` with a custom Discord handler.

📚 Discord webhooks doc: https://discord.com/safety/using-webhooks-and-embeds

📟  Run this example with:
npx tsx examples/handlers/node/discord-handler.ts

*/

import type { RawPayload } from "logry";
import { logry } from "logry";
import { NodeHandler } from "logry/handlers"; // 📦 Use built-in handler classes from the "logry/handlers" module.

// ════════════════════ Implementing a Custom Handler ════════════════════

// ✨ DiscordHandler sends logs to a Discord channel via Incoming Webhooks.
// It extends NodeHandler and posts formatted log messages as plain text.
// 📌 Note: This implementation does not include message length protection.
class DiscordHandler extends NodeHandler {
  constructor(private webhookUrl = "") {
    super({
      formatterConfig: { node: { meta: { format: "json", lineBreaks: 1 } } },
    });
    this.webhookUrl = webhookUrl;
  }
  async handle(payload: RawPayload) {
    const logLine = await this.compose(payload);

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
