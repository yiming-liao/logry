import chalk from "chalk";
import { logry } from "./dist/index.js";

const logger = logry({
  id: `benchmark-test`,
  level: "debug",
  outputConfig: {
    node: {
      stringifyMeta: true,
      topBorder: 20,
    },
  },
});

// 測試次數
const TOTAL = 100_000;

async function benchmarkLogger() {
  console.log(
    chalk.cyan(
      `🚀 開始 logger benchmark，總共 ${TOTAL.toLocaleString()} 次 log...`,
    ),
  );

  const start = performance.now();

  for (let i = 0; i < TOTAL; i++) {
    logger.info(`第 ${i + 1} 筆 log 訊息`, {
      a: { a: { a: { a: { a: { a: { a: { a: {} } } } } } } },
    });
  }

  // 等待所有 handler 都完成（如果有）
  await logger.flush();

  const end = performance.now();
  const duration = end - start;

  console.log(chalk.green(`✅ 完成 log benchmark`));
  console.log(chalk.yellow(`耗時：${duration.toFixed(2)}ms`));
  console.log(
    chalk.magenta(`每筆平均耗時：約 ${(duration / TOTAL).toFixed(6)}ms`),
  );
}

benchmarkLogger().catch((err) => {
  console.error(chalk.red("❌ 發生錯誤："), err);
});
