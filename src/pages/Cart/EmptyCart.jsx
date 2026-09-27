import { Link } from "react-router";

export default function EmptyCart() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-10 mx-auto text-center text-title text-capitalize">
          <h1>your cart is currently empty</h1>
          <Link to="/" className="btn btn-outline-dark mt-4">
            browse products
          </Link>
        </div>
      </div>
    </div>
  );
}
