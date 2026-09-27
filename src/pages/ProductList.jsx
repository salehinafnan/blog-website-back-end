import { useSearchParams } from "react-router";
import Title from "../components/Title";
import ProductCard from "../components/ProductCard";
import { companies, products } from "../data/products";

const sorters = {
  featured: () => 0,
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
};

export default function ProductList() {
  const [params, setParams] = useSearchParams();
  const brand = params.get("brand") ?? "all";
  const sort = sorters[params.get("sort")] ? params.get("sort") : "featured";

  const update = (key, value, fallback) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        value === fallback ? next.delete(key) : next.set(key, value);
        return next;
      },
      { replace: true },
    );

  const visible = products
    .filter((p) => brand === "all" || p.company.toLowerCase() === brand)
    .sort(sorters[sort]);

  return (
    <div className="py-5">
      <div className="container">
        <Title name="our" title="products" />
        <div className="d-flex flex-wrap gap-2 justify-content-center align-items-center my-3">
          {["all", ...companies.map((c) => c.toLowerCase())].map((b) => (
            <button
              key={b}
              type="button"
              className={`btn btn-sm text-uppercase ${b === brand ? "btn-dark" : "btn-outline-dark"}`}
              aria-pressed={b === brand}
              onClick={() => update("brand", b, "all")}
            >
              {b}
            </button>
          ))}
          <select
            className="form-select form-select-sm w-auto ms-md-3"
            aria-label="Sort products"
            value={sort}
            onChange={(e) => update("sort", e.target.value, "featured")}
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </div>
        <div className="row">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {visible.length === 0 && (
            <p className="text-center text-muted my-5">
              No products for this brand.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
