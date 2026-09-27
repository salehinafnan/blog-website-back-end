const columns = [
  "products",
  "name of product",
  "price",
  "quantity",
  "remove",
  "total",
];

export default function CartColumns() {
  return (
    <div className="container-fluid text-center d-none d-lg-block">
      <div className="row">
        {columns.map((c) => (
          <div key={c} className="col-10 mx-auto col-lg-2">
            <p className="text-uppercase">{c}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
