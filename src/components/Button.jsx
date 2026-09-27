import styled from "styled-components";

export const ButtonContainer = styled.button`
  text-transform: capitalize;
  font-size: 1.4rem;
  background: transparent;
  border: 0.05rem solid;
  border-color: ${({ $cart }) =>
    $cart ? "var(--mainYellow)" : "var(--lightBlue)"};
  border-radius: 0.5rem;
  color: ${({ $cart }) => ($cart ? "var(--mainYellow)" : "var(--lightBlue)")};
  padding: 0.2rem 0.5rem;
  cursor: pointer;
  margin: 0.2rem 0.5rem 0.2rem 0;
  transition: all 0.3s ease-in-out;
  &:hover:not(:disabled) {
    background: ${({ $cart }) =>
      $cart ? "var(--mainYellow)" : "var(--lightBlue)"};
    color: var(--mainBlue);
  }
  &:focus-visible {
    outline: 2px solid var(--mainYellow);
    outline-offset: 2px;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
