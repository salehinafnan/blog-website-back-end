// Pure cart logic: the reducer never mutates, totals are derived (never
// stored) and money is summed in integer cents so fractional prices stay exact.
import { getProduct } from "../data/products";

export const TAX_RATE = 0.1;

export const initialCart = [];

export function cartReducer(cart, action) {
  switch (action.type) {
    case "add":
      if (!getProduct(action.id) || cart.some((i) => i.id === action.id))
        return cart;
      return [...cart, { id: action.id, count: 1 }];
    case "increment":
      return cart.map((i) =>
        i.id === action.id ? { ...i, count: i.count + 1 } : i,
      );
    case "decrement":
      return cart
        .map((i) => (i.id === action.id ? { ...i, count: i.count - 1 } : i))
        .filter((i) => i.count > 0);
    case "remove":
      return cart.filter((i) => i.id !== action.id);
    case "clear":
      return initialCart;
    default:
      throw new Error(`Unknown cart action: ${action.type}`);
  }
}

const toCents = (dollars) => Math.round(dollars * 100);

export function cartLines(cart) {
  return cart
    .map(({ id, count }) => {
      const product = getProduct(id);
      return product && { ...product, count, total: product.price * count };
    })
    .filter(Boolean);
}

export function cartTotals(cart, taxRate = TAX_RATE) {
  const subtotal = cartLines(cart).reduce(
    (sum, line) => sum + toCents(line.price) * line.count,
    0,
  );
  const tax = Math.round(subtotal * taxRate);
  return {
    subtotal: subtotal / 100,
    tax: tax / 100,
    total: (subtotal + tax) / 100,
    count: cart.reduce((n, i) => n + i.count, 0),
  };
}

// Only trust persisted data that still matches the catalogue.
export function sanitizeCart(value) {
  if (!Array.isArray(value)) return initialCart;
  const seen = new Set();
  return value.filter(
    (i) =>
      i &&
      getProduct(i.id) &&
      Number.isInteger(i.count) &&
      i.count > 0 &&
      !seen.has(i.id) &&
      seen.add(i.id),
  );
}

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
export const formatPrice = (value) => money.format(value);
