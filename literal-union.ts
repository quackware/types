type Primitive = null | undefined | string | number | boolean | symbol | bigint;

/**
 * Saves your literal types when unioned with a wider type. This allows auto-completion in ides.
 *
 * @example
 *
 * type Pet = "dog" | "cat" | string; // string
 *
 * type Pet2 = LiteralUnion<"dog" | "cat", string>; // "dog" | "cat" | (string & Record<never, never>)
 */
export type LiteralUnion<LiteralType, BaseType extends Primitive> =
  | LiteralType
  | (BaseType & Record<never, never>);
