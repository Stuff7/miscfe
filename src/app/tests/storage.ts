import { each, expect, it } from "@app/test";
import { getLocalItem, setLocalItem, removeLocalItem } from "@lib/storage";

const simpleObjectKey = "simple-obj";
const simpleObject = { example: "Some example" };
const nestedObjectKey = "nested-obj";
const nestedObject = {
  some: {
    really: {
      nested: { object: "here" },
      and: { a: { number: 12 } },
    },
  },
};

export const testCases = each(
  [[simpleObjectKey, simpleObject], [nestedObjectKey, nestedObject]] satisfies [string, Record<string, unknown>][],
  ([key, obj]) => ([
    it(`Saves and retrieves ${key}.`, () => {
      setLocalItem(key, obj);
      return expect(getLocalItem(key)).toBe(JSON.stringify(obj));
    }),
    it(`Saves, retrieves and parses ${key}.`, () => {
      setLocalItem(key, obj);
      const localItem = getLocalItem<typeof obj>(key, null, JSON.parse);
      return expect(localItem).toEqual(obj);
    }),
    it(`Removes ${key}.`, () => {
      setLocalItem(key, obj);
      removeLocalItem(key);
      return expect(getLocalItem<typeof obj>(key, null, JSON.parse)).toBe(null);
    }),
    it(`Retrieves fallback when ${key} doesn't exist.`, () => {
      const fallback = { example: "Fallback example" };
      const localItem = getLocalItem<typeof obj>(key, fallback, JSON.parse);
      return expect(localItem).toEqual(fallback);
    }),
  ]),
);

export const afterEach = localStorage.clear.bind(localStorage);
