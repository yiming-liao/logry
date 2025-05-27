import { contextEncoder } from "../../src/utils/context-encoder";

describe("contextEncoder", () => {
  describe("joinContext", () => {
    it("should encode and join valid parts", () => {
      const input = ["project", "sub context", "leaf"];
      const result = contextEncoder.joinContext(input);
      expect(result).toBe(
        "project" +
          "::?__CTX_SEP__?::" +
          "sub%20context" +
          "::?__CTX_SEP__?::" +
          "leaf",
      );
    });

    it("should filter out undefined and non-string values", () => {
      const input = ["a", undefined, "b"];
      const result = contextEncoder.joinContext(input);
      expect(result).toBe("a::?__CTX_SEP__?::b");
    });

    it("should return an empty string for empty array", () => {
      expect(contextEncoder.joinContext([])).toBe("");
    });
  });

  describe("splitContext", () => {
    it("should decode and split valid encoded context", () => {
      const input = "a::?__CTX_SEP__?::b%20b::?__CTX_SEP__?::c";
      const result = contextEncoder.splitContext(input);
      expect(result).toEqual(["a", "b b", "c"]);
    });

    it("should return an empty array for undefined", () => {
      expect(contextEncoder.splitContext(undefined)).toEqual([]);
    });

    it("should return an empty array for empty string", () => {
      expect(contextEncoder.splitContext("")).toEqual([]);
    });
  });

  describe("displayContext", () => {
    it("should return full and last context correctly", () => {
      const input = contextEncoder.joinContext(["a", "b", "c"]);
      const result = contextEncoder.displayContext(input, "::");
      expect(result.fullContext).toBe("a::b::c");
      expect(result.lastContext).toBe("c");
    });

    it("should support custom separator", () => {
      const input = contextEncoder.joinContext(["x", "y"]);
      const result = contextEncoder.displayContext(input, " / ");
      expect(result.fullContext).toBe("x / y");
      expect(result.lastContext).toBe("y");
    });

    it("should return empty strings if encodedContext is undefined", () => {
      const result = contextEncoder.displayContext(undefined);
      expect(result.fullContext).toBe("");
      expect(result.lastContext).toBe("");
    });
  });

  describe("additional tests", () => {
    it("should preserve original parts after join and split", () => {
      const parts = ["中文", "空 白", "💡emoji"];
      const encoded = contextEncoder.joinContext(parts);
      const decoded = contextEncoder.splitContext(encoded);
      expect(decoded).toEqual(parts);
    });

    it("should handle single part context correctly", () => {
      const input = contextEncoder.joinContext(["onlyOne"]);
      const result = contextEncoder.displayContext(input, "::");
      expect(result.fullContext).toBe("onlyOne");
      expect(result.lastContext).toBe("onlyOne");
    });

    it("should handle empty string parts", () => {
      const input = contextEncoder.joinContext(["a", "", "b"]);
      const result = contextEncoder.splitContext(input);
      expect(result).toEqual(["a", "", "b"]);
    });
  });
});
