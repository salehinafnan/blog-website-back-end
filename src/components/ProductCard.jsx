import { Link } from "react-router";
import styled from "styled-components";
import { FaCartPlus } from "react-icons/fa";
import { useCart } from "../store/CartContext";
import { formatPrice } from "../store/cart";

export default function ProductCard({ product }) {
  const { id, title, img, price } = product;
  const { addToCart, isInCart } = useCart();
  const inCart = isInCart(id);

  return (
    <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
      <div className="card">
        <div className="img-container p-5">
          <Link to={`/product/${id}`}>
            <img src={img} alt={title} className="card-img-top" />
          </Link>
          <button
            type="button"
            className="cart-btn"
            disabled={inCart}
            onClick={() => addToCart(id)}
            aria-label={
              inCart ? `${title} is in your cart` : `Add ${title} to cart`
            }
          >
            {inCart ? (
              <span className="text-capitalize fs-6">in cart</span>
            ) : (
              <FaCartPlus aria-hidden />
            )}
          </button>
        </div>
        <div className="card-footer d-flex justify-content-between">
          <Link to={`/product/${id}`} className="align-self-center mb-0 title">
            {title}
          </Link>
          <h5 className="text-blue fst-italic mb-0">{formatPrice(price)}</h5>
        </div>
      </div>
    </ProductWrapper>
  );
}

const ProductWrapper = styled.div`
  .card {
    border-color: transparent;
    transition: all 0.4s linear;
  }
  .card-footer {
    background: transparent;
    border-top: transparent;
    transition: all 0.4s linear;
  }
  .title {
    color: inherit;
    text-decoration: none;
  }
  &:hover {
    .card {
      border: 0.04rem solid rgba(0, 0, 0, 0.2);
      box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
    }
    .card-footer {
      background: rgba(247, 247, 247);
    }
  }
  .img-container {
    position: relative;
    overflow: hidden;
  }
  .card-img-top {
    transition: all 0.6s linear;
  }
  .img-container:hover .card-img-top {
    transform: scale(1.2);
  }
  .cart-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0.2rem 0.4rem;
    background: var(--lightBlue);
    border: none;
    color: var(--mainWhite);
    font-size: 1.4rem;
    border-radius: 0.5rem 0 0 0;
    transform: translate(100%, 100%);
    transition: all 0.4s linear;
  }
  .img-container:hover .cart-btn,
  .cart-btn:focus-visible {
    transform: translate(0, 0);
  }
  .cart-btn:hover:not(:disabled) {
    color: var(--mainBlue);
    cursor: pointer;
  }
  @media (hover: none) {
    .cart-btn {
      transform: translate(0, 0);
    }
  }
`;
