import type { StandaloneLogOptions } from "@/core/logger/standalone-log";
import { baseStandaloneLog } from "@/core/logger/standalone-log";
import { transportPayload } from "@/core/logger/utils/payload/transport-payload";
import { Formatter } from "@/modules/formatters";
import { Normalizer } from "@/modules/normalizers";
import { EdgeConsoleTransporter } from "@/modules/transporters";

const normalizer = new Normalizer();
const formatter = new Formatter();
const transporters = [new EdgeConsoleTransporter({ normalizer, formatter })];

export const edgeStandaloneLog = (options: StandaloneLogOptions): void => {
  const rawPayload = baseStandaloneLog(options);
  transportPayload({ transporters, rawPayload });
};
