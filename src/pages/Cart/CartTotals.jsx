import { useNavigate } from "react-router";
import { useCart } from "../../store/CartContext";
import { TAX_RATE, formatPrice } from "../../store/cart";

export default function CartTotals() {
  const { totals, clearCart } = useCart();
  const navigate = useNavigate();
  const rows = [
    ["subtotal", totals.subtotal],
    [`tax (${TAX_RATE * 100}%)`, totals.tax],
    ["total", totals.total],
  ];

  return (
    <div className="container">
      <div className="row">
        <div className="col-10 mt-2 ms-sm-5 ms-md-auto col-sm-8 text-capitalize text-end">
          <button
            className="btn btn-outline-danger text-uppercase mb-3 px-5"
            type="button"
            onClick={() => {
              clearCart();
              navigate("/");
            }}
          >
            clear cart
          </button>
          {rows.map(([label, value]) => (
            <h5 key={label}>
              <span className="text-title">{label}:</span>{" "}
              <strong data-testid={`cart-${label.split(" ")[0]}`}>
                {formatPrice(value)}
              </strong>
            </h5>
          ))}
        </div>
      </div>
    </div>
  );
}
