import { expect, it } from "@app/test";
import { stringify } from "@lib/string";

export const testCases = [
  // Test cases for object values
  it("Handles null", () => {
    const input = null;
    const result = stringify(input);
    return expect(result).toBe(null);
  }),

  it("Handles empty object", () => {
    const input = {};
    const result = stringify(input);
    return expect(result).toBe(JSON.stringify(input));
  }),

  it("Handles simple object", () => {
    const input = { key: "value" };
    const result = stringify(input);
    return expect(result).toBe(JSON.stringify(input));
  }),

  it("Handles nested objects", () => {
    const input = { a: 1, b: { c: { d: { e: 5 } } } };
    const result = stringify(input);
    return expect(result).toBe(JSON.stringify(input));
  }),

  // Test cases for non-object values
  it("Handles string primitive", () => {
    const input = "hello";
    const result = stringify(input);
    return expect(result).toBe(input);
  }),

  it("Handles number primitive", () => {
    const input = 42;
    const result = stringify(input);
    return expect(result).toBe(input.toString());
  }),

  it("Handles boolean true primitive", () => {
    const input = true;
    const result = stringify(input);
    return expect(result).toBe(input.toString());
  }),

  it("Handles boolean false primitive", () => {
    const input = false;
    const result = stringify(input);
    return expect(result).toBe(input.toString());
  }),

  it("Handles undefined", () => {
    const input = undefined;
    const result = stringify(input);
    return expect(result).toBe(input);
  }),

  it("Handles symbols", () => {
    const input = Symbol("test");
    const result = stringify(input);
    return expect(result).toBe(input.toString());
  }),

  it("Handles numbers with decimals", () => {
    const input = 3.14;
    const result = stringify(input);
    return expect(result).toBe(input.toString());
  }),
];
