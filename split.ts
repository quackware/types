/**
 * Split the string type `S` by the string type `Delimiter`.
 *
 * @example
 *
 * type Columns = Split<"a,b,c", ",">; // type Columns = ["a", "b", "c"]
 */
export type Split<S extends string, Delimiter extends string> = S extends `${infer Head}${Delimiter}${infer Tail}`
  ? [Head, ...Split<Tail, Delimiter>]
  : S extends Delimiter ? []
  : [S];

/**
 * Unlike {@linkcode Split}, this includes the delimiter splitted on in the returned array.
 */
export type SplitIncludingDelimiters<
  Source extends string,
  Delimiter extends string,
> = Source extends "" ? []
  : Source extends `${infer FirstPart}${Delimiter}${infer SecondPart}`
    ? Source extends `${FirstPart}${infer UsedDelimiter}${SecondPart}`
      ? UsedDelimiter extends Delimiter ? Source extends `${infer FirstPart}${UsedDelimiter}${infer SecondPart}` ? [
            ...SplitIncludingDelimiters<FirstPart, Delimiter>,
            UsedDelimiter,
            ...SplitIncludingDelimiters<SecondPart, Delimiter>,
          ]
        : never
      : never
    : never
  : [Source];
