import { Includes } from "./array.ts";
import { Replace } from "./replace.ts";
import { Split } from "./split.ts";

export type UpperCaseCharacters =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z";

export type LowercaseCharacters = Lowercase<UpperCaseCharacters>;

export type WordSeparators = "-" | "_" | " ";

export type UrlSeparator = "/";

export type IdentifierSeparator = ":" | UrlSeparator;

export type WhitespaceCharacters = " " | "\t" | "\n" | "\r";

export type NonCharacters = Split<
  "\u2000-\u206F\u2E00-\u2E7F'!\"#$%&()*+,-./:;<=>?@[]^_`{|}~",
  ""
>;

export type StringDigit =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9";

export type AlphaNumeric =
  | `${UpperCaseCharacters}`
  | `${LowercaseCharacters}`
  | `${StringDigit}`;

export type NumberToString<T extends number> = `${T}` extends
  `${infer $STR extends string}` ? $STR : never;
export type StringToNumber<T extends string> = `${T}` extends
  `${infer $NUM extends number}` ? $NUM : never;

type ParserError<T extends string> = { error: true } & T;

export type EatWhitespace<State extends string> = string extends State
  ? ParserError<"EatWhitespace got generic string type">
  : State extends ` ${infer State}` | `${infer State} ` ? EatWhitespace<State>
  : State;

export type EatWhitespaceAndEscapes<
  _State extends string,
  State extends Replace<_State, "\n", ""> = Replace<_State, "\n", "">,
> = string extends State ? ParserError<"EatWhitespace got generic string type">
  : State extends
    | `${WhitespaceCharacters}${infer State}`
    | `${infer State}${WhitespaceCharacters}` ? EatWhitespaceAndEscapes<State>
  : State;

/**
 * Unlike a simpler split, this one includes the delimiter splitted on in the resulting array literal. This is to enable splitting on, for example, upper-case characters.
 */
export type SplitIncludingDelimiters<
  Source extends string,
  Delimiter extends string,
> = Source extends "" ? []
  : Source extends `${infer FirstPart}${Delimiter}${infer SecondPart}`
    ? Source extends `${FirstPart}${infer UsedDelimiter}${SecondPart}`
      ? UsedDelimiter extends Delimiter
        ? Source extends `${infer FirstPart}${UsedDelimiter}${infer SecondPart}`
          ? [
            ...SplitIncludingDelimiters<FirstPart, Delimiter>,
            UsedDelimiter,
            ...SplitIncludingDelimiters<SecondPart, Delimiter>,
          ]
        : never
      : never
    : never
  : [Source];

/**
 * Format a specific part of the splitted string literal that `StringArrayToDelimiterCase<>` fuses together, ensuring desired casing.
 */
type StringPartToDelimiterCase<
  StringPart extends string,
  Start extends boolean,
  UsedWordSeparators extends string,
  UsedUpperCaseCharacters extends string,
  Delimiter extends string,
> = StringPart extends UsedWordSeparators ? Delimiter
  : Start extends true ? Lowercase<StringPart>
  : StringPart extends UsedUpperCaseCharacters
    ? `${Delimiter}${Lowercase<StringPart>}`
  : StringPart;

/**
 * Takes the result of a splitted string literal and recursively concatenates it together into the desired casing.
 *
 * It receives `UsedWordSeparators` and `UsedUpperCaseCharacters` as input to ensure it's fully encapsulated.
 */
type StringArrayToDelimiterCase<
  Parts extends readonly any[],
  Start extends boolean,
  UsedWordSeparators extends string,
  UsedUpperCaseCharacters extends string,
  Delimiter extends string,
> = Parts extends [`${infer FirstPart}`, ...infer RemainingParts]
  ? `${StringPartToDelimiterCase<
    FirstPart,
    Start,
    UsedWordSeparators,
    UsedUpperCaseCharacters,
    Delimiter
  >}${StringArrayToDelimiterCase<
    RemainingParts,
    false,
    UsedWordSeparators,
    UsedUpperCaseCharacters,
    Delimiter
  >}`
  : Parts extends [string] ? string
  : "";

export type DelimiterCase<Value, Delimiter extends string> = Value extends
  string ? StringArrayToDelimiterCase<
    SplitIncludingDelimiters<Value, WordSeparators | UpperCaseCharacters>,
    true,
    WordSeparators,
    UpperCaseCharacters,
    Delimiter
  >
  : Value;

export type SnakeCase<Value> = DelimiterCase<Value, "_">;

export type PascalCase<Value> = CamelCase<Value> extends string
  ? Capitalize<CamelCase<Value>>
  : CamelCase<Value>;

export type KebabCase<Value> = DelimiterCase<Value, "-">;

type InnerCamelCaseStringArray<Parts extends readonly any[], PreviousPart> =
  Parts extends [
    `${infer FirstPart}`,
    ...infer RemainingParts,
  ] ? FirstPart extends undefined ? ""
    : FirstPart extends ""
      ? InnerCamelCaseStringArray<RemainingParts, PreviousPart>
    : `${PreviousPart extends "" ? FirstPart
      : Capitalize<FirstPart>}${InnerCamelCaseStringArray<
      RemainingParts,
      FirstPart
    >}`
    : "";

type CamelCaseStringArray<Parts extends readonly string[]> = Parts extends [
  `${infer FirstPart}`,
  ...infer RemainingParts,
] ? Uncapitalize<
    `${FirstPart}${InnerCamelCaseStringArray<RemainingParts, FirstPart>}`
  >
  : never;

export type CamelCase<K> = K extends string ? CamelCaseStringArray<
    Split<K extends Uppercase<K> ? Lowercase<K> : K, WordSeparators>
  >
  : K;

export type CamelCasedPropertiesDeep<Value> = Value extends Function ? Value
  : Value extends Array<infer U> ? Array<CamelCasedPropertiesDeep<U>>
  : Value extends Set<infer U> ? Set<CamelCasedPropertiesDeep<U>>
  : {
    [K in keyof Value as CamelCase<K>]: CamelCasedPropertiesDeep<Value[K]>;
  };

export type CamelCasedProperties<Value> = Value extends Function ? Value
  : Value extends Array<infer U> ? Value
  : {
    [K in keyof Value as CamelCase<K>]: Value[K];
  };

export type IsScreamingSnakeCase<Value extends string> = Value extends
  Uppercase<Value>
  ? Includes<SplitIncludingDelimiters<Lowercase<Value>, "_">, "_"> extends true
    ? true
  : false
  : false;

export type ScreamingSnakeCase<Value> = Value extends string
  ? IsScreamingSnakeCase<Value> extends true ? Value
  : Uppercase<SnakeCase<Value>>
  : Value;

export type DelimiterCasedProperties<
  Value,
  Delimiter extends string,
> = Value extends Function ? Value
  : Value extends Array<infer U> ? Value
  : { [K in keyof Value as DelimiterCase<K, Delimiter>]: Value[K] };

export type DelimiterCasedPropertiesDeep<
  Value,
  Delimiter extends string,
> = Value extends Function | Date | RegExp ? Value
  : Value extends Array<infer U>
    ? Array<DelimiterCasedPropertiesDeep<U, Delimiter>>
  : Value extends Set<infer U> ? Set<DelimiterCasedPropertiesDeep<U, Delimiter>>
  : {
    [
      K in keyof Value as DelimiterCase<
        K,
        Delimiter
      >
    ]: DelimiterCasedPropertiesDeep<Value[K], Delimiter>;
  };
