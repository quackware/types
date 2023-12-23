/**
 * Returns `true` if the given type is `any`, otherwise returns `false`.
 */
export type IsAny<T> = 4 extends 5 & T ? true : false;
