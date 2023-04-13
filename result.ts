/** Option type representing an `ok` and `error` case. */
export type Result<T = unknown> =
  | { readonly ok: false; readonly error: Error }
  | {
    readonly ok: true;
    readonly data: T;
  };
