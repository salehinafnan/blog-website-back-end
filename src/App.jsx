import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import AddedToCartModal from "./components/AddedToCartModal";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart/Cart";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route index element={<ProductList />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <AddedToCartModal />
    </>
  );
}
