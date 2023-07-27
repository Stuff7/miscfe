export type Option<T> = T | null;

/**
 * Transforms a union of different array types into an array of a union of those types.
 *
 * @param T - The union of arrays. <T[] | U[] | V[]>
 * @returns The array of the union of the array types - (T | U | V)[]
 */
export type JoinArrays<T extends unknown[]> = (T extends Array<infer U> ? U : never)[];
