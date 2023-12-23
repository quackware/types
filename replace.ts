/**
 * String replacement
 *
 * @example
 *
 * type Test = Replace<`{foo: "\${GITHUB_ENV}"}`, `\${GITHUB_ENV}`, `production`>;
 * const foo: Test = "{foo: \"production\"}"
 */
export type Replace<
  Input extends string,
  Search extends string,
  Replacement extends string,
  Options extends { all?: boolean } = {},
> = Input extends `${infer Head}${Search}${infer Tail}`
  ? Options["all"] extends true
    ? Replace<`${Head}${Replacement}${Tail}`, Search, Replacement, Options>
  : `${Head}${Replacement}${Tail}`
  : Input;

/**
 * @example
 *
 * // res: "{ foo: production }"
 * const res = replace(`{ foo: \${GITHUB_ENV} }`, `\${GITHUB_ENV}`, `production`);
 */
export function replace<
  Input extends string,
  Search extends string,
  Replacement extends string,
>(
  input: Input,
  search: Search,
  repl: Replacement,
) {
  return input.replaceAll(search, repl) as Replace<
    Input,
    Search,
    Replacement,
    { all: true }
  >;
}
