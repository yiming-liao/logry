export type ObjectFormat = "json" | "pretty" | "compact";

/** Formats an object into different string representations. */
export const formatObject = (
  input: Record<string, unknown>,
  style: ObjectFormat = "json",
  indent: number = 0,
): string => {
  try {
    switch (style) {
      case "pretty": {
        const indentSpaces = " ".repeat(indent);
        return JSON.stringify(input, null, 2)
          .split("\n")
          .map((line) => indentSpaces + line)
          .join("\n");
      }

      case "compact": {
        return Object.entries(input)
          .map(([key, val]) => {
            if (val === null || val === undefined) return `${key}=null`;
            if (typeof val === "object") {
              const json = JSON.stringify(val);
              return `${key}='${json}'`;
            }
            if (typeof val === "string") {
              return /\s/.test(val) ? `${key}="${val}"` : `${key}=${val}`;
            }
            return `${key}=${String(val)}`;
          })
          .join(" ");
      }

      // json
      default: {
        return JSON.stringify(input);
      }
    }
  } catch {
    return "";
  }
};
