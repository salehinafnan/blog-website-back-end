import { FaTrash } from "react-icons/fa";
import { useCart } from "../../store/CartContext";
import { formatPrice } from "../../store/cart";

export default function CartItem({ item }) {
  const { id, title, img, price, total, count } = item;
  const { increment, decrement, removeItem } = useCart();

  return (
    <div className="row my-2 text-center align-items-center">
      <div className="col-10 mx-auto col-lg-2">
        <img
          src={img}
          style={{ width: "5rem", height: "5rem" }}
          className="img-fluid"
          alt=""
        />
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <span className="d-lg-none">product: </span>
        {title}
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <strong>
          <span className="d-lg-none">price: </span>
          {formatPrice(price)}
        </strong>
      </div>
      <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
        <div className="d-flex justify-content-center align-items-center">
          <button
            type="button"
            className="btn btn-black mx-1"
            onClick={() => decrement(id)}
            aria-label={`Decrease ${title} quantity`}
          >
            -
          </button>
          <span
            className="btn btn-black mx-1"
            aria-live="polite"
            aria-label={`${title} quantity`}
          >
            {count}
          </span>
          <button
            type="button"
            className="btn btn-black mx-1"
            onClick={() => increment(id)}
            aria-label={`Increase ${title} quantity`}
          >
            +
          </button>
        </div>
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <button
          type="button"
          className="cart-icon btn btn-link"
          onClick={() => removeItem(id)}
          aria-label={`Remove ${title} from cart`}
        >
          <FaTrash aria-hidden />
        </button>
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <strong>item total: {formatPrice(total)}</strong>
      </div>
    </div>
  );
}
