/**
 * Formats a timestamp into a readable string.
 *
 * @param hideDate - If true, omit the date portion. Default: false.
 * @param timeZone - Optional IANA timezone string (e.g., "Asia/Taipei").
 * @param date - Optional Date object to format. Default: current time.
 * @returns Formatted timestamp string, e.g., "2025-05-21 14:30:00"
 */
export const formatTimestamp = (
  hideDate: boolean = false,
  timeZone?: string,
  date: Date = new Date(),
): string => {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  // Parse into parts: year, month, day, hour, minute, second
  const parts = formatter
    .formatToParts(date)
    .reduce<Record<string, string>>((acc, part) => {
      if (part.type !== "literal") {
        acc[part.type] = part.value;
      }
      return acc;
    }, {});

  const datePart = `${parts.year}-${parts.month}-${parts.day}`;
  const timePart = `${parts.hour}:${parts.minute}:${parts.second}`;

  return hideDate ? timePart : `${datePart} ${timePart}`;
};
