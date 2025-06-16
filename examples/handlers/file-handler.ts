import type { FormatterConfig, NormalizerConfig, RawPayload } from "../../dist";
import fs from "fs/promises";
import path from "path";
import { BaseHandler } from "../../dist";
import { logry } from "../../dist";

// 📝 FileHandler is a basic example of creating your own handler.
// It extends BaseHandler and writes formatted (or not) logs into a file.
class FileHandler extends BaseHandler {
  private filePath: string;
  constructor({
    filePath,
    normalizerConfig,
    formatterConfig,
  }: {
    filePath: string;
    normalizerConfig?: NormalizerConfig;
    formatterConfig?: FormatterConfig;
  }) {
    super({ normalizerConfig, formatterConfig });
    this.filePath = filePath;
  }

  async handle(payload: RawPayload) {
    // You can also use: this.toJson(payload) if you prefer JSON
    const logLine = await this.compose(payload);
    const file = path.resolve(this.filePath);
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.appendFile(file, logLine, "utf-8");
  }
}

// === Example usage ===

// Create an instance of the file handler
const myFileHandler = new FileHandler({
  filePath: "my-logger.log", // Path to the log file where logs will be appended
  formatterConfig: {
    // Important! `raw` format can't be written to a file — it's not a string.
    // Use `json`, `pretty`, or `compact` to make it writable and readable.
    node: { meta: { format: "json", prefix: "| " } },
  },
});

// Create a logger
const logger = logry({ id: "my-logger" });

// Register the file handler
logger.addHandler(myFileHandler, "my-file-handler");

// 🚀 Fire logs and watch it get written into the file!
logger.warn("⚠️ Low disk space detected", { location: "/var/log" });
logger.error("Failed to connect to database", { retryIn: "5s" });
