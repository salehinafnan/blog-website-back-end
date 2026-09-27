import Title from "../../components/Title";
import { useCart } from "../../store/CartContext";
import { cartLines } from "../../store/cart";
import CartColumns from "./CartColumns";
import CartItem from "./CartItem";
import CartTotals from "./CartTotals";
import EmptyCart from "./EmptyCart";

export default function Cart() {
  const { cart } = useCart();
  if (cart.length === 0) return <EmptyCart />;
  return (
    <section className="py-5">
      <div className="container">
        <Title name="your" title="cart" />
      </div>
      <CartColumns />
      <div className="container-fluid">
        {cartLines(cart).map((line) => (
          <CartItem key={line.id} item={line} />
        ))}
      </div>
      <CartTotals />
    </section>
  );
}
