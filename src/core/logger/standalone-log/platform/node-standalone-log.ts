import type { StandaloneLogOptions } from "@/core/logger/standalone-log";
import { baseStandaloneLog } from "@/core/logger/standalone-log";
import { transportPayload } from "@/core/logger/utils/payload/transport-payload";
import { Formatter } from "@/modules/formatters";
import { Normalizer } from "@/modules/normalizers";
import { NodeConsoleTransporter } from "@/modules/transporters";

const normalizer = new Normalizer();
const formatter = new Formatter();
const transporters = [new NodeConsoleTransporter({ normalizer, formatter })];

export const nodeStandaloneLog = (options: StandaloneLogOptions): void => {
  const rawPayload = baseStandaloneLog(options);
  transportPayload({ transporters, rawPayload });
};
