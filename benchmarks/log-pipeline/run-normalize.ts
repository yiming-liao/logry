import { Normalizer } from "../../dist";
import { rawPayload } from "./mock-data";
import { now } from "./now";

const normalizer = new Normalizer();

export const runNormalize = async (count: number) => {
  const t0 = now();
  for (let i = 0; i < count; i++) {
    normalizer.normalize("node", rawPayload);
  }
  const t1 = now();

  const duration = t1 - t0;
  const throughput = (count / duration).toFixed(2);

  return { duration, throughput };
};
