import { describe, expect, it } from "vitest";
import { cartReducer, cartTotals, sanitizeCart } from "./cart";

const run = (...actions) => actions.reduce(cartReducer, []);

describe("cartReducer", () => {
  it("adds a product once", () => {
    expect(run({ type: "add", id: 1 }, { type: "add", id: 1 })).toEqual([
      { id: 1, count: 1 },
    ]);
  });

  it("ignores unknown products", () => {
    expect(run({ type: "add", id: 999 })).toEqual([]);
  });

  it("increments and decrements, removing at zero", () => {
    const cart = run({ type: "add", id: 2 }, { type: "increment", id: 2 });
    expect(cart).toEqual([{ id: 2, count: 2 }]);
    expect(cartReducer(cart, { type: "decrement", id: 2 })).toEqual([
      { id: 2, count: 1 },
    ]);
    expect(run({ type: "add", id: 2 }, { type: "decrement", id: 2 })).toEqual(
      [],
    );
  });

  it("never mutates the previous state", () => {
    const before = Object.freeze([Object.freeze({ id: 1, count: 1 })]);
    expect(() =>
      cartReducer(before, { type: "increment", id: 1 }),
    ).not.toThrow();
    expect(before[0].count).toBe(1);
  });

  it("removes and clears", () => {
    const cart = run({ type: "add", id: 1 }, { type: "add", id: 2 });
    expect(cartReducer(cart, { type: "remove", id: 1 })).toEqual([
      { id: 2, count: 1 },
    ]);
    expect(cartReducer(cart, { type: "clear" })).toEqual([]);
  });
});

describe("cartTotals", () => {
  it("computes subtotal, 10% tax and total", () => {
    // Samsung S7 ($16) x2 + iPhone 7 ($30) = $62, tax $6.20
    const cart = [
      { id: 2, count: 2 },
      { id: 7, count: 1 },
    ];
    expect(cartTotals(cart)).toEqual({
      subtotal: 62,
      tax: 6.2,
      total: 68.2,
      count: 3,
    });
  });
});

describe("sanitizeCart", () => {
  it("drops malformed, unknown and duplicate entries", () => {
    expect(
      sanitizeCart([
        { id: 1, count: 2 },
        { id: 1, count: 5 },
        { id: 999, count: 1 },
        { id: 2, count: 0 },
        { id: 3, count: 1.5 },
        null,
      ]),
    ).toEqual([{ id: 1, count: 2 }]);
    expect(sanitizeCart("nope")).toEqual([]);
  });
});
