// deno-lint-ignore-file no-explicit-any

/** Type representation for a class constructor */
export type Constructor<T, Arguments extends unknown[] = any[]> = new(
  ...arguments_: Arguments
) => T;

/** Type representation for a class. */
export type Class<T, Arguments extends unknown[] = any[]> =
  & Constructor<T, Arguments>
  & { prototype: T };

/**
 * A generic constructor type used for constrained mixins.
 *
 * Source: https://www.typescriptlang.org/docs/handbook/mixins.html#constrained-mixins
 */
// deno-lint-ignore ban-types
export type GenericConstructor<T = {}> = new(...args: any[]) => T;
