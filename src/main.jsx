import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/oswald";
import "@fontsource/permanent-marker";
import "./index.css";
import App from "./App";
import { CartProvider } from "./store/CartContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
);
