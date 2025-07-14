export { coreMap, resetCoreMap } from "./core-map";
export { loggerMap, resetLoggerMap } from "./logger-map";
export { getOrCreateLogger } from "./get-or-create-logger";

export {
  getOrCreateUniversalLogger,
  getOrCreateNodeLogger,
  getOrCreateBrowserLogger,
  getOrCreateEdgeLogger,
} from "./platform";
