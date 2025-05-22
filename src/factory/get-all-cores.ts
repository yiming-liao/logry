import type { LoggerCore } from "../core";
import { coreMap } from "./core-map";

export const getAllCores = (): LoggerCore[] => {
  return Array.from(coreMap.values());
};
