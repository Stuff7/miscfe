export type Option<T> = T | null;

/**
 * Transforms a union of different array types into an array of a union of those types.
 *
 * @param T - The union of arrays. <T[] | U[] | V[]>
 * @returns (T | U | V)[] - An array of a union of every type of the array.
 */
export type JoinArrays<T extends unknown[]> = (T extends Array<infer U> ? U : never)[];
