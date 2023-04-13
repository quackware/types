import type * as List from "./list.ts";

/**
 * Switch case but for types
 *
 * ```ts
 * type Test1 = Switch<string, [
 *   [number, "number"],
 *   [boolean, "boolean"],
 *   [string, "string"]
 * ]>;
 * // Test1 = "string"
 *
 * type Test2 = Switch<object, [
 *   [number, "number"],
 *   [boolean, "boolean"],
 *   [string, "string"]
 * ]>;
 * // Test2 = never
 *
 * type Test3 = Switch<string, []>;
 * // Test3 = never
 * ```
 */
export type Switch<T, Conditions extends Array<[unknown, unknown]>> = List.Head<Conditions> extends never ? never
  : T extends List.Head<Conditions>[0] ? List.Head<Conditions>[1]
  : Switch<T, List.Tail<Conditions>>;
