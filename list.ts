/** A type representation of a list data structure */
export type List<A = unknown> = ReadonlyArray<A>;

/** A type for determining the length of a {@linkcode List} type. */
export type Length<L extends List> = L["length"];

/** The last item of a {@linkcode List } type */
export type Tail<L extends List> = L extends readonly [] ? L
  : L extends readonly [unknown?, ...infer LTail] ? LTail
  : L;

/** The first item of a {@linkcode List } type */
export type Head<L extends List> = Length<L> extends 0 ? never : L[0];

export type OpenHead<L extends List, NeverType> = Length<L> extends 0 ? NeverType : L[0];

export type Pop<T extends unknown[]> = T extends [...infer P, infer _T] ? P
  : [];
export type Head2<T extends unknown[]> = T extends [infer H1, infer H2, ...infer _P] ? H2 : never;
export type TailBy<
  T extends unknown[],
  By extends number,
  A extends number[] = [],
> = By extends A["length"] ? T
  : TailBy<Tail<T>, By, Push<A>>;
export type Push<T extends unknown[], V = 0> = [...T, V];
