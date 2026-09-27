import { useEffect, useRef } from "react";
import { Link } from "react-router";
import styled from "styled-components";
import { ButtonContainer } from "./Button";
import { useCart } from "../store/CartContext";
import { formatPrice } from "../store/cart";

export default function AddedToCartModal() {
  const { modalProduct, closeModal } = useCart();
  const dialog = useRef(null);

  useEffect(() => {
    if (!modalProduct) return;
    const onKey = (e) => e.key === "Escape" && closeModal();
    document.addEventListener("keydown", onKey);
    dialog.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [modalProduct, closeModal]);

  if (!modalProduct) return null;
  const { img, title, price } = modalProduct;

  return (
    <ModalContainer
      onClick={(e) => e.target === e.currentTarget && closeModal()}
    >
      <div
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        className="col-10 mx-auto col-md-6 col-lg-4 text-center p-5"
      >
        <h5 id="modal-title" className="text-capitalize">
          item added to the cart
        </h5>
        <img src={img} className="img-fluid my-3" alt={title} />
        <h5>{title}</h5>
        <h5 className="text-muted mb-3">Price: {formatPrice(price)}</h5>
        <ButtonContainer as={Link} to="/" onClick={closeModal}>
          continue shopping
        </ButtonContainer>
        <ButtonContainer as={Link} to="/cart" $cart onClick={closeModal}>
          go to cart
        </ButtonContainer>
      </div>
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  [role="dialog"] {
    background: var(--mainWhite);
    outline: none;
    max-height: 90vh;
    overflow-y: auto;
  }
  img {
    max-height: 40vh;
  }
  a {
    display: inline-block;
    text-decoration: none;
  }
`;
