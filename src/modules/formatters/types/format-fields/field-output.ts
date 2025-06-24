/**
 * The final output type of a formatted field.
 * This type is aliased as `O` in generic parameters.
 */
export type FieldOutputType = "string" | "structured";

/** Maps each log field to its corresponding output type. */
export type FieldOutputTypeMap = {
  timestamp: "string";
  id: "string";
  level: "string";
  scope: "string";
  message: "string";
  meta: "structured";
  context: "structured";
  pid: "string";
  hostname: "string";
};
