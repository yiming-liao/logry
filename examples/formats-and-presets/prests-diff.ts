import { logry } from "logry";

const context = {
  userId: "user_123",
  ip: "192.168.0.10",
};

const meta = {
  method: "POST",
  data: {
    path: "/login",
    status: 401,
  },
};

const prettyLogger = logry({
  id: "pretty",
  preset: "pretty",
});
const prettyMultiLineLogger = logry({
  id: "pretty-expanded",
  preset: "pretty-expanded",
});
const minimalLogger = logry({
  id: "minimal",
  preset: "minimal",
});
const verboseLogger = logry({
  id: "verbose",
  preset: "verbose",
  context,
});

console.log("\n------------------ pretty \n");
prettyLogger.fatal("This is a preset - `pretty`", meta, {
  scope: ["api", "user"],
});
prettyLogger.error("This is a preset - `pretty`", meta);
prettyLogger.warn("This is a preset - `pretty`");
await new Promise((r) => setTimeout(r, 200));

console.log("\n------------------ pretty-expanded \n");
prettyMultiLineLogger.fatal("This is a preset - `pretty-expanded`", meta, {
  scope: ["api", "user"],
});
prettyMultiLineLogger.error("This is a preset - `pretty-expanded`", meta);
prettyMultiLineLogger.warn("This is a preset - `pretty-expanded`");
await new Promise((r) => setTimeout(r, 200));

console.log("\n------------------ minimal \n");
minimalLogger.fatal("This is a preset - `minimal`", meta, {
  scope: ["api", "user"],
});
minimalLogger.error("This is a preset - `minimal`", meta);
minimalLogger.warn("This is a preset - `minimal`");
await new Promise((r) => setTimeout(r, 200));

console.log("\n------------------ verbose \n");
verboseLogger.fatal("This is a preset - `verbose`", meta, {
  scope: ["api", "user"],
});
verboseLogger.error("This is a preset - `verbose`", meta);
verboseLogger.warn("This is a preset - `verbose`");
