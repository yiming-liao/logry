import { logry } from "./dist/index.js";

function intervalFlushStrategy(flush) {
  const interval = setInterval(() => {
    flush();
  }, 300);

  return () => clearInterval(interval);
}

const logger = logry({
  id: "test-logger",
  level: "warn",
  handlerConfig: {
    flushTimeout: 1000,
    flushStrategy: intervalFlushStrategy,
  },
});

logger.warn("This is a warning message");

setTimeout(async () => {
  await logger.flush();
  console.log("Manual flush completed");

  // 🧼 清理，讓程式正常退出
  logger.dispose();
}, 2000);
