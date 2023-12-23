// deno-lint-ignore-file ban-types
/**
 * Returns the union of the keys of {@linkcode Obj} that have `Function` properties.
 *
 * ```ts
 * type MixedProps = {
 *   name: string;
 *   setName: (name: string) => void;
 *   someKeys?: string;
 *   someFn?: (...args: any) => any
 * };
 *
 * type Keys = FunctionKeys<MixedProps>; // "setName" | "someFn"
 * ```
 */
export type FunctionKeys<Obj extends object> = {
  [K in keyof Obj]-?: Exclude<Obj[K], undefined> extends Function ? K : never;
}[keyof Obj];
