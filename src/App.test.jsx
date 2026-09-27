import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import App from "./App";
import { CartProvider } from "./store/CartContext";

const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <CartProvider>
        <App />
      </CartProvider>
    </MemoryRouter>,
  );

describe("store", () => {
  it("lists all products and filters by brand", async () => {
    renderAt("/");
    expect(
      screen.getAllByRole("img", { name: /pixel|samsung|htc|iphone/i }),
    ).toHaveLength(8);
    await userEvent.click(screen.getByRole("button", { name: "apple" }));
    expect(screen.getAllByRole("img", { name: /iphone/i })).toHaveLength(3);
    expect(screen.queryByAltText("Samsung S7")).not.toBeInTheDocument();
  });

  it("adds to cart, shows the modal and updates totals", async () => {
    const user = userEvent.setup();
    renderAt("/");
    await user.click(
      screen.getByRole("button", { name: "Add iPhone 7 to cart" }),
    );

    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByText("iPhone 7")).toBeInTheDocument();
    await user.click(within(dialog).getByRole("link", { name: /go to cart/i }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByTestId("cart-total")).toHaveTextContent("$33.00");
    await user.click(
      screen.getByRole("button", { name: "Increase iPhone 7 quantity" }),
    );
    expect(screen.getByTestId("cart-subtotal")).toHaveTextContent("$60.00");
    expect(screen.getByTestId("cart-total")).toHaveTextContent("$66.00");
  });

  it("closes the modal with Escape", async () => {
    const user = userEvent.setup();
    renderAt("/product/1");
    await user.click(screen.getByRole("button", { name: "add to cart" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "in cart" })).toBeDisabled();
  });

  it("renders product pages from the URL, so refresh and deep links work", () => {
    renderAt("/product/6");
    expect(
      screen.getByRole("heading", { level: 1, name: "Vintage iPhone" }),
    ).toBeInTheDocument();
  });

  it("persists the cart across reloads", async () => {
    const user = userEvent.setup();
    const { unmount } = renderAt("/product/2");
    await user.click(screen.getByRole("button", { name: "add to cart" }));
    unmount();
    renderAt("/cart");
    expect(screen.getByText("Samsung S7")).toBeInTheDocument();
  });

  it("shows a 404 for unknown routes and products", () => {
    renderAt("/product/42");
    expect(screen.getByText("page not found")).toBeInTheDocument();
  });
});
