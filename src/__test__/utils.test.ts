import { calculateAge, makeObject, sum } from "../utils";

test("sum", () => {
  expect(sum(1, 2)).toBe(3);
});

test("makeObject", () => {
  expect(makeObject("테스트", 10)).toEqual({
    name: "테스트",
    age: 10,
  });
});

test("calculateAge", () => {
  expect(calculateAge(new Date("1999-03-09"))).toBe(24);
});
