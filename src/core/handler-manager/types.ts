import type { Platform } from "@/shared/types";
import type { RawPayload } from "@/shared/types/log-payload";

export type HandlerItem = { id: string; handler: Handler };

/** A handler can be a simple function or a class-based object. */
export type Handler = HandlerFunction | HandlerClass;

/** Function-based handler. Receives raw payload only. */
export type HandlerFunction = (payload: RawPayload) => void | Promise<void>;

/** Class-based handler with optional lifecycle and custom logic. */
export interface HandlerClass {
  platform: Platform;
  /** Main payload handler. Type depends on normalization/formatting. */
  handle: (payload: RawPayload) => void | Promise<void>;
  init?(): void | Promise<void>;
  dispose?: () => void | Promise<void>;
  flush?: () => void | Promise<void>;
}

/** Where to insert the handler in the chain. */
export type AddHandlerPosition = "start" | "end";
