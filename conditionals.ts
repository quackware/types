export type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N;

/** Return `true` if type `A` and `B` are `true`, else return `false` */
export type And<A, B> = A extends true ? B extends true ? true : false : false;

/** Return `true` if type `A` or `B` are `true`, else return `false` */
export type Or<A, B> = A extends true ? true : B extends true ? true : false;

/** Return `true` if type `A` is `false`, else return `false` */
export type Not<A> = A extends false ? true : A extends true ? false : never;

export type If<I extends 0 | 1, T, E> = I extends 1 ? T : E;

export type IsEqual<T, U> = (<G>() => G extends T ? 1 : 2) extends (<G>() => G extends U ? 1 : 2) ? true
  : false;

export type Filter<KeyType, ExcludeType> = IsEqual<KeyType, ExcludeType> extends true ? never
  : (KeyType extends ExcludeType ? never : KeyType);
