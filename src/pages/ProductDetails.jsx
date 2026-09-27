import { Link, useParams } from "react-router";
import { ButtonContainer } from "../components/Button";
import { getProduct } from "../data/products";
import { useCart } from "../store/CartContext";
import { formatPrice } from "../store/cart";
import NotFound from "./NotFound";

export default function ProductDetails() {
  const { id } = useParams();
  const product = getProduct(id);
  const { addToCart, isInCart } = useCart();
  if (!product) return <NotFound />;

  const { company, img, info, price, title } = product;
  const inCart = isInCart(product.id);

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
          <h1>{title}</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-10 mx-auto col-md-6 my-3">
          <img src={img} className="img-fluid" alt={title} />
        </div>
        <div className="col-10 mx-auto col-md-6 my-3">
          <h2>Model: {title}</h2>
          <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
            made by: <span className="text-uppercase">{company}</span>
          </h4>
          <h4 className="text-blue">
            <strong>Price: {formatPrice(price)}</strong>
          </h4>
          <p className="text-capitalize fw-bold mt-3 mb-0">
            some info about the product:
          </p>
          <p className="text-muted lead">{info}</p>
          <div>
            <ButtonContainer as={Link} to="/" className="text-decoration-none">
              back to products
            </ButtonContainer>
            <ButtonContainer
              $cart
              disabled={inCart}
              onClick={() => addToCart(product.id)}
            >
              {inCart ? "in cart" : "add to cart"}
            </ButtonContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
