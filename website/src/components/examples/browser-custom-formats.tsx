import { logry } from "logry/browser";
import { format1, format2, format3 } from "./formats";

const BrowserCustomFormats = () => {
  const meta = {
    system: "thrusters",
    stage: 1,
    health: { main: "ok", backup: "ok" },
  };

  const logger = logry({
    level: "trace",
    scope: ["api", "v1"],
    formatterConfig: { browser: { context: { hide: false } } },
  });

  logger.error("🚀 Launching app...", meta, {
    formatterConfig: { browser: format1 },
  });

  logger.error("🚀 Launching app...", meta, {
    formatterConfig: { browser: format2 },
  });

  logger.error("🚀 Launching app...", meta, {
    formatterConfig: { browser: format3 },
  });

  return null;
};

export default BrowserCustomFormats;
