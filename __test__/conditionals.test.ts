import { And } from "../conditionals.ts";
import { assertType } from "./deps.ts";

Deno.test("conditionals", async (t) => {
  await t.step("And", () => {
    assertType<And<true, true>>(true);
    assertType<And<true, false>>(false);
  });
});
