import { Link, NavLink } from "react-router";
import styled from "styled-components";
import { FaCartPlus } from "react-icons/fa";
import logo from "../logo.svg";
import { ButtonContainer } from "./Button";
import { useCart } from "../store/CartContext";

export default function Navbar() {
  const { totals } = useCart();
  return (
    <NavWrapper className="navbar navbar-expand navbar-dark px-3 px-sm-5">
      <Link to="/" aria-label="Phone Store home">
        <img src={logo} alt="" className="navbar-brand" width="40" />
      </Link>
      <ul className="navbar-nav align-items-center">
        <li className="nav-item ms-3 ms-sm-5">
          <NavLink to="/" end className="nav-link">
            products
          </NavLink>
        </li>
      </ul>
      <Link to="/cart" className="ms-auto">
        <ButtonContainer
          as="span"
          className="cart-button"
          aria-label={`Cart, ${totals.count} items`}
        >
          <FaCartPlus className="me-2" aria-hidden />
          my cart
          {totals.count > 0 && <span className="badge">{totals.count}</span>}
        </ButtonContainer>
      </Link>
    </NavWrapper>
  );
}

const NavWrapper = styled.nav`
  background: var(--mainBlue);
  .nav-link {
    color: var(--mainWhite) !important;
    font-size: 1.3rem;
    text-transform: capitalize;
  }
  .navbar-brand {
    filter: invert(1);
  }
  a:has(> .cart-button) {
    text-decoration: none;
  }
  .nav-link.active {
    text-decoration: underline;
    text-underline-offset: 0.4rem;
  }
  .badge {
    margin-left: 0.5rem;
    background: var(--mainYellow);
    color: var(--mainDark);
    border-radius: 1rem;
    font-size: 0.9rem;
  }
`;
