import { it } from "@app/test";
import { deepCompare } from "@lib/object";

export const testCases = [
  it("Returns true for equal objects", () => {
    const obj1 = { a: 1, b: { c: 2 }, d: [3, 4] };
    const obj2 = { a: 1, b: { c: 2 }, d: [3, 4] };
    return deepCompare(obj1, obj2);
  }),
  it("Returns false for different objects", () => {
    const obj1 = { a: 1, b: { c: 2 }, d: [3, 4] };
    const obj2 = { a: 1, b: { c: 99 }, d: [3, 4] };
    return !deepCompare(obj1, obj2);
  }),
  it("Handles nested objects", () => {
    const obj1 = { a: 1, b: { c: { d: { e: 5 } } } };
    const obj2 = { a: 1, b: { c: { d: { e: 5 } } } };
    return deepCompare(obj1, obj2);
  }),
  it("Returns false for different nested objects", () => {
    const obj1 = { a: 1, b: { c: { d: { e: 5 } } } };
    const obj2 = { a: 1, b: { c: { d: { e: 99 } } } };
    return !deepCompare(obj1, obj2);
  }),
  it("Returns false for objects with different number of properties", () => {
    const obj1 = { a: 1, b: { c: 2 }, d: [3, 4] };
    const obj2 = { a: 1, b: { c: 2 } };
    return !deepCompare(obj1, obj2);
  }),
  it("Returns false for different types of objects", () => {
    const obj1 = { a: 1, b: { c: 2 } };
    const obj2 = { a: 1, b: [3, 4] };
    return !deepCompare(obj1, obj2);
  }),
  it("Returns false for null and object comparison", () => {
    const obj1 = { a: 1, b: { c: 2 } };
    const obj2 = null;
    return !deepCompare(obj1, obj2);
  }),
];
