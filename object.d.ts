import type { Option } from "./types";
export declare function deepCompare<T extends Record<string, unknown>, U extends T | Record<string, unknown>>(obj1: Option<T>, obj2: Option<U>): boolean;
