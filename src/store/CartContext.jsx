import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { getProduct } from "../data/products";
import { cartReducer, cartTotals, initialCart, sanitizeCart } from "./cart";

const STORAGE_KEY = "phone-store:cart";
const CartContext = createContext(null);

function loadCart() {
  try {
    return sanitizeCart(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  } catch {
    return initialCart;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart, loadCart);
  const [modalId, setModalId] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // storage unavailable (private mode, quota): cart still works in memory
    }
  }, [cart]);

  const addToCart = useCallback((id) => {
    dispatch({ type: "add", id });
    setModalId(id);
  }, []);

  const value = useMemo(
    () => ({
      cart,
      totals: cartTotals(cart),
      isInCart: (id) => cart.some((i) => i.id === id),
      addToCart,
      increment: (id) => dispatch({ type: "increment", id }),
      decrement: (id) => dispatch({ type: "decrement", id }),
      removeItem: (id) => dispatch({ type: "remove", id }),
      clearCart: () => dispatch({ type: "clear" }),
      modalProduct: modalId ? getProduct(modalId) : null,
      closeModal: () => setModalId(null),
    }),
    [cart, modalId, addToCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
