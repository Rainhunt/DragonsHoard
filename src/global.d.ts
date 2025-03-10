declare global {
    /**
 * A utility type that enforces that only one the properties from `T` or the properties from `K` can exist at a time.
 * 
 * - If any property from `T` is present, the properties from `K` are disallowed.
 * - If any property from `K` is present, the properties from `T` are disallowed.
 * 
 * @template T - The first type, representing the set of properties that can be included in the object.
 * @template K - The second type, representing another set of properties that can be included in the object.
 * 
 * @example
 * // Valid usage
 * type A = OR<{ name: string }, { age: number }>;
 * const validA: A = { name: "Alice" }; // OK
 * const validB: A = { age: 30 }; // OK
 * 
 * // Invalid usage
 * const invalid: A = { name: "Alice", age: 30 }; // Error: Both `name` and `age` cannot exist together
 */
    type OR<T extends { [key: string]: any }, K extends { [key: string]: any }> =
        { [P in keyof T]: T[P] } & { [P in keyof K]?: never } |
        { [P in keyof K]: K[P] } & { [P in keyof T]?: never };

    type Nested<T> = { [K: string]: T | Nested<T> };

    type MatchShape<Shape extends Record<string, any>, T> = {
        [K in keyof Shape]: Shape[K] extends object ? MatchShape<Shape[K], T> : T;
    };
}

export { }