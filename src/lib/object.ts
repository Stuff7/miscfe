import type { Option } from "./types";

export function deepCompare<
  T extends Record<string, unknown>,
  U extends T | Record<string, unknown>,
>(obj1: Option<T>, obj2: Option<U>): boolean {
  const stack = [{ obj1, obj2 }];

  while (stack.length) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { obj1, obj2 } = stack.pop()!;

    if (obj1 !== obj2) {
      if (typeof obj1 !== "object" || obj1 === null || typeof obj2 !== "object" || obj2 === null) {
        return false;
      }

      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);

      if (keys1.length !== keys2.length) {
        return false;
      }

      for (const key of keys1) {
        if (!Object.prototype.hasOwnProperty.call(obj2, key)) {
          return false;
        }

        stack.push({ obj1: obj1[key] as T, obj2: obj2[key] as U });
      }
    }
  }

  return true;
}
