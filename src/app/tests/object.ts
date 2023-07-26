import { expect, it } from "@app/test";

export const testCases = [
  it("Returns true for equal objects", () => {
    const obj1 = { a: 1, b: { c: 2 }, d: [3, 4] };
    const obj2 = { a: 1, b: { c: 2 }, d: [3, 4] };
    return expect(obj1).toEqual(obj2);
  }),
  it("Returns false for different objects", () => {
    const obj1 = { a: 1, b: { c: 2 }, d: [3, 4] };
    const obj2 = { a: 1, b: { c: 99 }, d: [3, 4] };
    return expect(obj1).not.toEqual(obj2);
  }),
  it("Handles nested objects", () => {
    const obj1 = { a: 1, b: { c: { d: { e: 5 } } } };
    const obj2 = { a: 1, b: { c: { d: { e: 5 } } } };
    return expect(obj1).toEqual(obj2);
  }),
  it("Returns false for different nested objects", () => {
    const obj1 = { a: 1, b: { c: { d: { e: 5 } } } };
    const obj2 = { a: 1, b: { c: { d: { e: 99 } } } };
    return expect(obj1).not.toEqual(obj2);
  }),
  it("Returns false for objects with different number of properties", () => {
    const obj1 = { a: 1, b: { c: 2 }, d: [3, 4] };
    const obj2 = { a: 1, b: { c: 2 } };
    return expect(obj1).not.toEqual(obj2);
  }),
  it("Returns false for different types of objects", () => {
    const obj1 = { a: 1, b: { c: 2 } };
    const obj2 = { a: 1, b: [3, 4] };
    return expect(obj1).not.toEqual(obj2);
  }),
  it("Returns false for null and object comparison", () => {
    const obj1 = { a: 1, b: { c: 2 } };
    const obj2 = null;
    return expect(obj1).not.toEqual(obj2);
  }),
];
