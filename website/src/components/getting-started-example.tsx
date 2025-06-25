import { logry } from "logry/browser";

const GettingStartedExample = () => {
  const logger = logry({
    id: "myapp",
    level: "trace",
    formatterConfig: { browser: { lineBreaksAfter: 2, lineBreaksBefore: 1 } },
  });

  logger.trace("Fetching data from cache");
  logger.debug("Component mounted successfully", undefined, {
    scope: ["ui", "mount"],
  });
  logger.info("Server started on port 3000");
  logger.warn("Missing optional config file, using defaults");
  logger.error("Request failed with status 500", {
    endpoint: "/api/user",
    status: 500,
  });
  logger.fatal(
    "Critical: unable to connect to database",
    new Error("DB connection timeout"),
  );

  return null;
};

export default GettingStartedExample;
