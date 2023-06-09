import { IsEqual } from "./conditionals.ts";

type ArrayKeys = keyof [];

/**
 * Is `true` if the provided type is an array, otherwise is `false`.
 */
export type IsArray<T> = T extends object ? ArrayKeys extends Extract<keyof T, ArrayKeys> ? true : false : false;

/**
 * Whether the given `Value` array type includes `Item`
 */
export type Includes<Value extends readonly any[], Item> = Value extends readonly [Value[0], ...infer rest]
  ? IsEqual<Value[0], Item> extends true ? true
  : Includes<rest, Item>
  : false;

/** An array type with at least one item */
export type NonEmptyArray<T> = [T, ...T[]];
