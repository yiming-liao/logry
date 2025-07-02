const pad = (n: number) => n.toString().padStart(2, "0");
const pad3 = (n: number) => n.toString().padStart(3, "0");

export const buildTimestampString = ({
  timestamp,
  useUTC = false,
  showTimeOnly = false,
}: {
  timestamp: number;
  useUTC: boolean;
  showTimeOnly: boolean;
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

  if (showTimeOnly) {
    return `${get.h}:${get.min}:${get.s}.${get.ms}`;
  }
  return `${get.y}-${get.m}-${get.d} ${get.h}:${get.min}:${get.s}.${get.ms}`;
};
