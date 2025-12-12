import type { LogContext } from "@/shared/types/log-context";
import type { RuraHook } from "rura";

export type LogHook = RuraHook<LogContext, void>;
