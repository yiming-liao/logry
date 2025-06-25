/* 

💡 Demonstrates how to use `logry` with a custom Discord handler.

📚 Discord webhooks doc: https://discord.com/safety/using-webhooks-and-embeds

📟  Run this example with:
npx tsx examples/handlers/node/pretty-discord-handler.ts

*/

import type { RawPayload } from "logry";
import { logry } from "logry";
import { NodeHandler } from "logry/handlers"; // 📦 Use built-in handler classes from the "logry/handlers" module.

// ════════════════════ Implementing a Custom Handler ════════════════════

// Map log levels to Discord embed colors
const getDiscordColor = (level: string): number => {
  const colors: Record<string, number> = {
    fatal: 0x8b0000,
    error: 0xff4b4b,
    warn: 0xffc107,
    info: 0x36a2eb,
    debug: 0x90caf9,
    trace: 0x999999,
  };
  return colors[level.toLowerCase()] ?? 0xcccccc;
};

// ✨ PrettyDiscordHandler sends logs to a Discord channel via Incoming Webhooks.
// It extends NodeHandler and posts formatted log messages as plain text.
// 📌 Note: This implementation does not include message length protection.
class PrettyDiscordHandler extends NodeHandler {
  constructor(private webhookUrl = "") {
    super();
    this.webhookUrl = webhookUrl;
  }

  async handle(payload: RawPayload) {
    payload = await this.appendProcessFields(payload);
    const { timestamp, id, level, pid, hostname, scope, message, meta } =
      this.normalize(payload);

    await fetch(this.webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            title: `[${level.toUpperCase()}] ${message}`,
            color: getDiscordColor(level),
            fields: [
              { name: "Timestamp", value: timestamp, inline: false },
              { name: "Host", value: `${pid}@${hostname}`, inline: false },
              { name: "Logger ID", value: id, inline: false },
              { name: "Scope", value: scope || "-", inline: false },
              ...(meta
                ? [
                    {
                      name: "Meta",
                      value:
                        "```json\n" + JSON.stringify(meta, null, 2) + "\n```",
                      inline: false,
                    },
                  ]
                : []),
            ],
          },
        ],
      }),
    });
  }
}

// ════════════════════ Usage Example ════════════════════

// Create an instance of the the handler
const myPrettyDiscordHandler = new PrettyDiscordHandler(
  "https://discord.com/api/webhooks/138...", // ✏️ Try your Webhook URL here
);

// Create a logger
const logger = logry({ id: "my-logger", level: "trace" });

// Add the handler
logger.addHandler(myPrettyDiscordHandler, "my-discord-handler");

// 🚀 Fire logs
logger.fatal("Critical server failure!", new Error("Database connection lost")); // meta as Error
logger.error("Payment failed", { userId: "u_12345", orderId: "o_22345" });
logger.warn("Slow response from /api/orders", { endpoint: "/api/orders" });
logger.info("Maintenance started", { deliveryTime: "08:30 AM" });
logger.debug("Token validated", { tokenId: "jwt_xyz" });
logger.trace("Running validateOrderPayload()", { route: "/checkout" });
