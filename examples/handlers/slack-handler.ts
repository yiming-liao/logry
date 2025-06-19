import type { FormatterConfig, NormalizerConfig, RawPayload } from "logry";
import { NodeBaseHandler, logry } from "logry";
import "dotenv/config";

// 📚 Slack webhooks doc: https://api.slack.com/messaging/webhooks

// 📣 SlackHandler sends logs to a Slack channel via Incoming Webhooks.
// It extends NodeBaseHandler and posts formatted log messages as plain text.
class SlackHandler extends NodeBaseHandler {
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
    const logLine = await this.compose(payload);

    await fetch(this.webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: logLine }),
    });
  }
}

// === Example usage ===

// Create an instance of the file writer
const mySlackHandler = new SlackHandler({
  webhookUrl: process.env.SLACK_WEBHOOK_URL,
  formatterConfig: {
    node: {
      meta: { format: "json", lineBreaks: 1 },
    },
  },
});

// Create a logger
const logger = logry({ id: "my-logger", level: "trace" });

// Register the file writer as a handler
logger.addHandler(mySlackHandler, "my-slack-handler");

// 🚀 Send a log message and see it appear in your Slack channel!
logger.fatal("Critical server failure!", new Error("Database connection lost")); // meta is Error
logger.error("Payment failed", { userId: "u_12345", orderId: "o_22345" });
logger.warn("Slow response from /api/orders", { endpoint: "/api/orders" });
logger.info("Maintenance started", { deliveryTime: "08:30 AM" });
logger.debug("Token validated", { tokenId: "jwt_xyz" });
logger.trace("Running validateOrderPayload()", { route: "/checkout" });
