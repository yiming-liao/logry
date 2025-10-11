/* 

💡 Demonstrates how to use `logry` with a custom rotating file handler.

📟  Run this example with:
npx tsx examples/handlers/node/rotating-file-handler.ts

*/

import type { FormatterConfig, RawPayload } from "logry";
import fs from "node:fs/promises";
import path from "node:path";
import { logry } from "logry";
import { NodeHandler } from "logry"; // 📦 Use built-in handler classes from the "logry/handlers" module.

// ════════════════════ Implementing a Custom Handler ════════════════════

// ✨ RotatingFileHandler illustrates integrating daily log rotation.
// It maintains separate log files per day by updating the filename automatically.
// 📌 Note: This is a simplified version and does not handle advanced rotation features like compression or cleanup.
class RotatingFileHandler extends NodeHandler {
  private currentDate: string;
  private currentFilePath: string;
  private fileDir: string;

  constructor({
    fileDir,
    formatterConfig,
  }: {
    fileDir: string;
    formatterConfig?: FormatterConfig;
  }) {
    super({ formatterConfig });
    this.fileDir = path.resolve(fileDir);
    this.currentDate = this.getToday();
    this.currentFilePath = path.join(this.fileDir, `${this.currentDate}-2.log`);
  }

  // Returns today's date in "YYYY-MM-DD" format
  private getToday() {
    return new Date().toISOString().split("T")[0];
  }

  // Checks if the date has changed and updates file path accordingly
  private async checkRotate() {
    const today = this.getToday();
    if (today !== this.currentDate) {
      this.currentDate = today;
      this.currentFilePath = path.join(this.fileDir, `${this.currentDate}.log`);
    }
  }

  async handle(payload: RawPayload) {
    await this.checkRotate();
    const logLine = await this.compose(payload);
    await fs.mkdir(this.fileDir, { recursive: true });
    await fs.appendFile(this.currentFilePath, logLine, "utf-8");
  }
}

// ════════════════════ Usage Example ════════════════════

// Create an instance of the the handler
const myRotatingHandler = new RotatingFileHandler({
  fileDir: "./logs", // Directory to store log files
  formatterConfig: {
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

// Add the handle
logger.addHandler(myRotatingHandler, "my-rotating-file-handler");

// 🚀 Fire logs
logger.warn("📅 Log file rotated — new day, new file!", { rotation: "daily" });
logger.error("Something went wrong during log rotation", { errorCode: "FAIL" });
