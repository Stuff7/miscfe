import type { Option } from "./types";
export declare function setLocalNamespace(namespace: string): void;
export declare function getLocalItem<T = string, U extends Option<T> = Option<T>>(key: string, fallback?: T | U, callback?: Option<(rawValue: string) => T>): U extends T ? T : Option<T>;
export declare function setLocalItem<T>(key: string, value: T): void;
export declare function removeLocalItem(key: string): void;
