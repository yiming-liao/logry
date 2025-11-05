import { Formatter } from "../../dist";
import { now } from "./now";
import { normalizedPayload } from "./test-data";

const formatter = new Formatter();

export const runFormat = async (count: number) => {
  const t0 = now();
  for (let i = 0; i < count; i++) {
    formatter.format("node", normalizedPayload);
  }
  const t1 = now();

  const duration = t1 - t0;
  const throughput = (count / duration).toFixed(2);

  return { duration, throughput };
};
