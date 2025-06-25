import type { StandaloneLogOptions } from "@/core/logger/standalone-log";
import { baseStandaloneLog } from "@/core/logger/standalone-log";
import { transportPayload } from "@/core/logger/utils/payload/transport-payload";
import { Formatter } from "@/modules/formatters";
import { Normalizer } from "@/modules/normalizers";
import { BrowserConsoleTransporter } from "@/modules/transporters";

const normalizer = new Normalizer();
const formatter = new Formatter();
const transporters = [new BrowserConsoleTransporter({ normalizer, formatter })];

export const browserStandaloneLog = (options: StandaloneLogOptions): void => {
  const rawPayload = baseStandaloneLog(options);
  transportPayload({ transporters, rawPayload });
};
