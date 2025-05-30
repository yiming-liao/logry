import type { RawPayload } from "@/core/logger/types";

export type Handler = (rawPayload: RawPayload) => void | Promise<void>;

export type FlushStrategy = (
  flush: () => Promise<void>,
) => (() => void) | undefined;
export type ErrorCallback = (error: unknown, handlerId: string) => void;

/** Config */
export type HandlerConfig = {
  flushStrategy?: FlushStrategy;
  onError?: ErrorCallback;
  flushTimeout?: number;
};
