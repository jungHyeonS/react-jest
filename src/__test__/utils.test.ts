import { calculateAge, makeObject, sum } from "../utils";
import { Cart } from "../utils/cart";

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

describe("cart", () => {
  let cart: Cart;

  beforeEach(() => {
    cart = new Cart();
  });

  test("checkoutCart", () => {
    expect(cart.checkout()).toBe(0);
  });

  test("addItem to Checkout", () => {
    expect(cart.addItem("test", 1, 5000)).toContainEqual({
      item: "test",
      quantity: 1,
      price: 5000,
    });
    expect(cart.checkout()).toBe(5000);
  });

  test("반복 addItem", () => {
    for (let i = 0; i < 5; i++) {
      const item = { item: "test12", quantity: i + 1, price: 5000 };
      expect(cart.addItem("test12", 1, 5000)).toContainEqual(item);
    }
  });

  test("removeItem", () => {
    const item = { item: "test12" };
    expect(cart.removeItem("test12")).not.toContainEqual(item);
  });

  test("last checkout", () => {
    expect(cart.addItem("priceTest", 1, 1000)).toContainEqual({
      item: "priceTest",
      quantity: 1,
      price: 1000,
    });
    expect(cart.checkout()).toBe(1000);
  });
});
