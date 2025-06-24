/* 

💡 Demonstrates how to use `logry` with a custom file handler.

📟  Run this example with:
npx tsx examples/handlers/node/file-handler.ts

*/

import type { FormatterConfig, RawPayload } from "logry";
import fs from "node:fs/promises";
import path from "node:path";
import { logry } from "logry";
import { NodeHandler } from "logry/handlers"; // 📦 Use built-in handler classes from the "logry/handlers" module.

// ════════════════════ Implementing a Custom Handler ════════════════════

// ✨ This example extends the built-in NodeHandler to create a simple
// file logger that writes formatted log entries to a specified file.
// 📌 Note: This is a basic example intended for demonstration purposes only.
class FileHandler extends NodeHandler {
  private filePath: string;
  constructor({
    filePath,
    formatterConfig,
  }: {
    filePath: string;
    formatterConfig?: FormatterConfig;
  }) {
    super({ formatterConfig });
    this.filePath = filePath;
  }

  async handle(payload: RawPayload) {
    // You can also use: this.toJson(payload) if you prefer JSON
    // const logLine = await this.compose(payload);
    const logLine = await this.compose(payload);
    const file = path.resolve(this.filePath);
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.appendFile(file, logLine, "utf-8");
  }
}

// ════════════════════ Usage Example ════════════════════

// Create an instance of the the handler
const myFileHandler = new FileHandler({
  filePath: "my-logger.log", // Path to the log file where logs will be appended
  formatterConfig: {
    // Important! `raw` format can't be written to a file — it's not a string.
    // Use `json`, `pretty`, or `compact` to make it writable and readable.
    node: {
      meta: {
        format: "json",
        prefix: "| ",
      },
    },
  },
});

// Create a logger
const logger = logry({ id: "my-logger" });

// Add the handler
logger.addHandler(myFileHandler, "my-file-handler");

// 🚀 Fire logs
logger.warn("⚠️ Low disk space detected", { location: "/var/log" });
logger.error("Failed to connect to database", { retryIn: "5s" });
