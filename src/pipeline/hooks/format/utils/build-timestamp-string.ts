const pad = (n: number) => n.toString().padStart(2, "0");
const pad3 = (n: number) => n.toString().padStart(3, "0");

/** Builds a formatted timestamp string. */
export const buildTimestampString = ({
  timestamp,
  useUTC = false,
  withDate = true,
}: {
  timestamp: number;
  useUTC: boolean;
  withDate: boolean;
}): string => {
  const date = new Date(timestamp);

  const get = useUTC
    ? {
        y: date.getUTCFullYear(),
        m: pad(date.getUTCMonth() + 1),
        d: pad(date.getUTCDate()),
        h: pad(date.getUTCHours()),
        min: pad(date.getUTCMinutes()),
        s: pad(date.getUTCSeconds()),
        ms: pad3(date.getUTCMilliseconds()),
      }
    : {
        y: date.getFullYear(),
        m: pad(date.getMonth() + 1),
        d: pad(date.getDate()),
        h: pad(date.getHours()),
        min: pad(date.getMinutes()),
        s: pad(date.getSeconds()),
        ms: pad3(date.getMilliseconds()),
      };

  const time = `${get.h}:${get.min}:${get.s}.${get.ms}`;
  return withDate ? `${get.y}-${get.m}-${get.d} ${time}` : time;
};
