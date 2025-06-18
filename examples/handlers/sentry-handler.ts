import * as Sentry from "@sentry/node";
import {
  type Level,
  type NormalizerConfig,
  type FormatterConfig,
  type RawPayload,
  BaseHandler,
  logry,
} from "logry";
import "dotenv/config";

// 📚 Sentry sdk doc: https://develop.sentry.dev/sdk/overview/

// Maps log levels to corresponding Sentry severity levels
// Note: 'trace' is mapped to 'debug' because Sentry does not have a distinct 'trace' level (yet),
// and 'debug' best represents verbose tracing logs.
const levelMap: Record<Exclude<Level, "silent">, Sentry.SeverityLevel> = {
  fatal: "fatal",
  error: "error",
  warn: "warning",
  info: "info",
  debug: "debug",
  trace: "debug",
};

// 🛡️ SentryHandler sends logs to Sentry for error monitoring.
// It extends BaseHandler and maps log levels to Sentry severity.
class SentryHandler extends BaseHandler {
  constructor({
    dsn,
    normalizerConfig,
    formatterConfig,
  }: {
    dsn?: string;
    normalizerConfig?: NormalizerConfig;
    formatterConfig?: FormatterConfig;
  }) {
    super({ normalizerConfig, formatterConfig });
    Sentry.init({ dsn }); // Initialize Sentry with the provided DSN (Data Source Name)
  }

  async handle(payload: RawPayload) {
    const { level, message, meta } = payload;

    const sentryLevel = levelMap[level];
    if (!sentryLevel) {
      return;
    }

    Sentry.withScope((scope) => {
      scope.setLevel(sentryLevel);

      // meta is Error (capture exception only)
      if (meta instanceof Error) {
        Sentry.captureException(meta);
      }
      // meta without Error or no meta (capture message with extra data or just message)
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

// === Example usage ===

// Create an instance of the file writer
const mySentryHandler = new SentryHandler({ dsn: process.env.SENTRY_DSN });

// Create a logger
const logger = logry({ id: "my-logger", level: "trace" });

// Register the file writer as a handler
logger.addHandler(mySentryHandler, "my-sentry-handler");

// 🚀 Fire logs and watch it get captured by Sentry!
logger.fatal("Critical server failure!", new Error("Database connection lost")); // meta is Error
logger.error("Payment failed", { userId: "u_12345", orderId: "o_22345" });
logger.warn("Slow response from /api/orders", { endpoint: "/api/orders" });
logger.info("Maintenance started", { deliveryTime: "08:30 AM" });
logger.debug("Token validated", { tokenId: "jwt_xyz" });
logger.trace("Running validateOrderPayload()", { route: "/checkout" });
