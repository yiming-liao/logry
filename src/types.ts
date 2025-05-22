import type { LOG_LEVELS, PLATFORM } from "./constants";

export type LogLevel = (typeof LOG_LEVELS)[number];

export type LogOptions = {
  context?: string;
  writeConfig?: WriteConfig;
};

export type LogMeta =
  | Record<string, unknown>
  | ({ error: Error } & Record<string, unknown>)
  | Error
  | string
  | number
  | boolean
  | null
  | undefined
  | unknown;

export type Platform = (typeof PLATFORM)[number];

export type WriteConfig = {
  platform?: Platform;
  hideId?: boolean;
  hideContext?: boolean;
  showOnlyLatestContext?: boolean;
  hideDate?: boolean;
  node?: { metaDepth?: number; borderWidth?: number; useColor?: boolean };
  // browser: {};
};
