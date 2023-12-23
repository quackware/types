declare const _brand: unique symbol;
type Brand<Type, Name = "DefaultName"> = Type & { [_brand]: Name };
type ParserError<T extends string> = Brand<T, "ParserError">;

export type ExtractVars<T extends string> = T extends
  `${string}{{${infer Prop}}}${infer Rest}` ? Prop | ExtractVars<Rest>
  : never;

export type VarRecord<Str extends string> = Readonly<
  {
    [K in ExtractVars<Str>]: string | number;
  }
>;

export type GetMissingVars<
  Str extends string,
  Obj extends Record<string, string | number>,
> = ExtractVars<Str> extends infer Vars ? Vars extends string ? {
      [K in Vars]: unknown extends Obj[K] ? `Missing var '${K}'` : never;
    }[Vars]
  : never
  : never;

/**
 * @example
 *
 * type MyString = Interpolate<`My Name Is {{name}}, I'm {{age}} years old`, { name: "Curtis"; age: "99" }>;
 *
 * // Error here
 * type DoesNotExists = Interpolate<
 *   `My Name Is {{name}}, I'm {{wow_look_at_me}} years old`,
 *    { name: "Curtis"; age: "99" }>;
 */
export type Interpolate<Str extends string, Obj extends VarRecord<Str>> =
  GetMissingVars<
    Str,
    Obj
  > extends infer MissingVars
    ? [MissingVars] extends [never]
      ? Str extends `${infer Prev}{{${infer Prop}}}${infer Rest}`
        ? `${Prev}${Obj[Prop & keyof Obj]}${Interpolate<
          Rest,
          Obj & VarRecord<Rest>
        >}`
      : Str
    : ParserError<Extract<MissingVars, string>>
    : never;

export {};
