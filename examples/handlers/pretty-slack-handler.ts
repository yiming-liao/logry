import type { FormatterConfig, NormalizerConfig, RawPayload } from "logry";
import { BaseHandler, logry } from "logry";
import "dotenv/config";

// 📚 Slack webhooks doc: https://api.slack.com/messaging/webhooks
// 📚 Slack block-kit doc: https://api.slack.com/block-kit/building

// 📣 PrettySlackHandler sends logs to a Slack channel via Incoming Webhooks.
// It extends BaseHandler and posts formatted log messages using Slack Block Kit for better structure.
class PrettySlackHandler extends BaseHandler {
  private webhookUrl: string;

  constructor({
    webhookUrl = "",
    normalizerConfig,
    formatterConfig,
  }: {
    webhookUrl?: string;
    normalizerConfig?: NormalizerConfig;
    formatterConfig?: FormatterConfig;
  }) {
    super({ normalizerConfig, formatterConfig });
    this.webhookUrl = webhookUrl;
  }

  async handle(payload: RawPayload) {
    const { timestamp, id, level, pid, hostname, scope, message, meta } =
      await this.normalize(payload);

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
            text: { type: "mrkdwn", text: `*Logger ID:* ${id}` },
          },
          {
            type: "section",
            text: { type: "mrkdwn", text: `*Scope:* ${scope || "-"}` },
          },
          {
            type: "section",
            text: { type: "mrkdwn", text: `*Host:* ${pid}@${hostname}` },
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

// === Example usage ===

// Create an instance of the file writer
const myPrettySlackHandler = new PrettySlackHandler({
  webhookUrl: process.env.SLACK_WEBHOOK_URL,
  formatterConfig: {
    node: {
      message: { lineBreaks: 1 },
      meta: { format: "json", lineBreaks: 1 },
    },
  },
});

// Create a logger
const logger = logry({ id: "my-logger", level: "trace", scope: ["api", "v1"] });

// Register the file writer as a handler
logger.addHandler(myPrettySlackHandler, "my-slack-handler");

// 🚀 Send a log message and see it appear in your Slack channel!
logger.fatal("Critical server failure!", new Error("Database connection lost")); // meta is Error
logger.error("Payment failed", { userId: "u_12345", orderId: "o_22345" });
logger.warn("Slow response from /api/orders", { endpoint: "/api/orders" });
logger.info("Maintenance started", { deliveryTime: "08:30 AM" });
logger.debug("Token validated", { tokenId: "jwt_xyz" });
logger.trace("Running validateOrderPayload()", { route: "/checkout" });
