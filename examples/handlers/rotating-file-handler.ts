import type { FormatterConfig, NormalizerConfig, RawPayload } from "logry";
import fs from "fs/promises";
import path from "path";
import { BaseHandler } from "logry";
import { logry } from "logry";

// 🌀 RotatingFileHandler is a basic example showing how to integrate log rotation.
// It uses `rotating-file-stream` to rotate log files daily.
class RotatingFileHandler extends BaseHandler {
  private currentDate: string;
  private currentFilePath: string;
  private fileDir: string;

  constructor({
    fileDir,
    normalizerConfig,
    formatterConfig,
  }: {
    fileDir: string;
    normalizerConfig?: NormalizerConfig;
    formatterConfig?: FormatterConfig;
  }) {
    super({ normalizerConfig, formatterConfig });
    this.fileDir = path.resolve(fileDir);
    this.currentDate = this.getToday();
    this.currentFilePath = path.join(
      this.fileDir,
      `log-${this.currentDate}.log`,
    );
  }

  // Returns today's date string in "YYYY-MM-DD" format
  private getToday() {
    return new Date().toISOString().split("T")[0];
  }

  // Checks if the date has changed and updates file path accordingly
  private async checkRotate() {
    const today = this.getToday();
    if (today !== this.currentDate) {
      this.currentDate = today;
      this.currentFilePath = path.join(
        this.fileDir,
        `log-${this.currentDate}.log`,
      );
    }
  }

  async handle(payload: RawPayload) {
    await this.checkRotate();
    const logLine = await this.compose(payload);
    await fs.mkdir(this.fileDir, { recursive: true });
    await fs.appendFile(this.currentFilePath, logLine, "utf-8");
  }
}

// === Example usage ===

// Create an instance of the rotation file handler
const myRotatingHandler = new RotatingFileHandler({
  fileDir: "./logs", // Directory where log files will be saved
  formatterConfig: { node: { meta: { format: "json", prefix: "| " } } },
});

// Create a logger
const logger = logry({ id: "my-logger" });

// Register the rotating file handler
logger.addHandler(myRotatingHandler, "my-rotating-file-handler");

// 🚀 Fire logs and watch it get written into the file!
logger.warn("📅 Log file rotated — new day, new file!", { rotation: "daily" });
logger.error("Something went wrong during log rotation", { errorCode: "FAIL" });
