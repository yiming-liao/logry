const pad = (n: number) => n.toString().padStart(2, "0");

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
      }
    : {
        y: date.getFullYear(),
        m: pad(date.getMonth() + 1),
        d: pad(date.getDate()),
        h: pad(date.getHours()),
        min: pad(date.getMinutes()),
        s: pad(date.getSeconds()),
      };

  if (showTimeOnly) {
    return `${get.h}:${get.min}:${get.s}`;
  }
  return `${get.y}-${get.m}-${get.d} ${get.h}:${get.min}:${get.s}`;
};
