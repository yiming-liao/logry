import { formattedPayload } from "./mock-data";
import { now } from "./now";
import { LogQueue } from "@/modules/transporters/node/utils/global-log-queue";
import { printLog } from "@/modules/transporters/node/utils/print-log";

const globalLogQueue = new LogQueue();

export const runPrintLog = async (count: number) => {
  const t0 = now();
  for (let i = 0; i < count; i++) {
    await printLog(
      formattedPayload,
      globalLogQueue.queueWrite.bind(globalLogQueue),
    );
  }
  const t1 = now();

  const duration = t1 - t0;
  const throughput = (count / duration).toFixed(2);

  return { duration, throughput };
};
