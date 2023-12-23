// deno-lint-ignore-file ban-types
export interface SimplifyOptions {
  deep?: boolean;
}

type Flatten<
  AnyType,
  Options extends SimplifyOptions = {},
> = Options["deep"] extends true ? { [KeyType in keyof AnyType]: Expand<AnyType[KeyType], Options> }
  : { [KeyType in keyof AnyType]: AnyType[KeyType] };

/**
 * Unrolls the `...` type displays in an IDE.
 */
export type Expand<
  AnyType,
  Options extends SimplifyOptions = {},
> = Flatten<AnyType> extends AnyType ? Flatten<AnyType, Options>
  : AnyType;

/**
 * Unrolls the `...` type displays in an IDE.
 *
 * This is an alias for {@linkcode Expand}
 */
export type Simplify<T> = Expand<T>;

/**
 * Unrolls the `...` type displays in an IDE.
 *
 * This is an alias for {@linkcode Expand}
 */
export type Preview<T> = Expand<T>;

/**
 * Unrolls the `...` type displays in an IDE recursively.
 */
export type ExpandAll<T> = Expand<T, { deep: true }>;

/**
 * Unrolls the `...` type displays in an IDE recursively.
 *
 * This is an alias for {@linkcode ExpandAll}
 */
export type SimplifyAll<T> = ExpandAll<T>;

/**
 * Unrolls the `...` type displays in an IDE.
 *
 * This is an alias for {@linkcode ExpandAll}
 */
export type PreviewAll<T> = ExpandAll<T>;
