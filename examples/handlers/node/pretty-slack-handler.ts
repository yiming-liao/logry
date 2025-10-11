/* 

💡 Demonstrates how to use `logry` with a custom Slack handler.

📚 Slack webhooks doc: https://api.slack.com/messaging/webhooks
📚 Slack block-kit doc: https://api.slack.com/block-kit/building

📟  Run this example with:
npx tsx examples/handlers/node/pretty-slack-handler.ts

*/

import type { RawPayload } from "logry";
import { logry } from "logry";
import { NodeHandler } from "logry"; // 📦 Use built-in handler classes from the "logry/handlers" module.

// ════════════════════ Implementing a Custom Handler ════════════════════

// ✨ PrettySlackHandler sends logs to a Slack channel via Incoming Webhooks.
// It extends NodeHandler and uses Slack Block Kit to format the message with better structure.
// 📌 Note: This implementation does not include message length protection.
class PrettySlackHandler extends NodeHandler {
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
        blocks: [
          {
            type: "header",
            text: {
              type: "plain_text",
              text: `[${level.toUpperCase()}] ${message}`,
            },
          },
          {
            type: "section",
            text: { type: "mrkdwn", text: `*Timestamp:* ${timestamp}` },
          },
          {
            type: "section",
            text: { type: "mrkdwn", text: `*Host:* ${pid}@${hostname}` },
          },
          {
            type: "section",
            text: { type: "mrkdwn", text: `*Logger ID:* ${id}` },
          },
          {
            type: "section",
            text: { type: "mrkdwn", text: `*Scope:* ${scope || "-"}` },
          },
          ...(meta
            ? [
                {
                  type: "context",
                  elements: [
                    {
                      type: "mrkdwn",
                      text: "```" + JSON.stringify(meta, null, 2) + "```",
                    },
                  ],
                },
              ]
            : []),
          { type: "divider" },
        ],
      }),
    });
  }
}

// ════════════════════ Usage Example ════════════════════

// Create an instance of the the handler
const myPrettySlackHandler = new PrettySlackHandler(
  "https://hooks.slack.com/services/T09...", // ✏️ Try your Webhook URL here
);

// Create a logger
const logger = logry({ id: "my-logger", level: "trace", scope: ["api", "v1"] });

// Add the handler
logger.addHandler(myPrettySlackHandler, "my-slack-handler");

// 🚀 Fire logs
logger.fatal("Critical server failure!", new Error("Database connection lost")); // meta as Error
logger.error("Payment failed", { userId: "u_12345", orderId: "o_22345" });
logger.warn("Slow response from /api/orders", { endpoint: "/api/orders" });
logger.info("Maintenance started", { deliveryTime: "08:30 AM" });
logger.debug("Token validated", { tokenId: "jwt_xyz" });
logger.trace("Running validateOrderPayload()", { route: "/checkout" });
