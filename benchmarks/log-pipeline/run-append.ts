import { rawPayload } from "./mock-data";
import { now } from "./now";
import { appendProcessFields } from "@/shared/utils/node/append-process-fields";
import { getOs } from "@/shared/utils/node/lazy-modules";

export const runAppend = async (count: number) => {
  const t0 = now();
  for (let i = 0; i < count; i++) {
    await appendProcessFields(getOs, rawPayload);
  }
  const t1 = now();

  const duration = t1 - t0;
  const throughput = (count / duration).toFixed(2);

  return { duration, throughput };
};
