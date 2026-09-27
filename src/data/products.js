export const products = [
  {
    id: 1,
    title: "Google Pixel - Black",
    img: `${import.meta.env.BASE_URL}img/product-1.png`,
    price: 10,
    company: "Google",
    info: "Google's own Android phone: a clean, stock-Android experience with updates straight from Google and a camera that leans on computational photography.",
  },
  {
    id: 2,
    title: "Samsung S7",
    img: `${import.meta.env.BASE_URL}img/product-2.png`,
    price: 16,
    company: "Samsung",
    info: "Samsung's 2016 flagship with a glass-and-metal body, a Super AMOLED display and IP68 water resistance.",
  },
  {
    id: 3,
    title: "HTC 10 - Black",
    img: `${import.meta.env.BASE_URL}img/product-3.png`,
    price: 8,
    company: "HTC",
    info: "HTC's 2016 flagship with a chamfered all-aluminium unibody and a strong focus on high-resolution audio.",
  },
  {
    id: 4,
    title: "HTC 10 - White",
    img: `${import.meta.env.BASE_URL}img/product-4.png`,
    price: 18,
    company: "HTC",
    info: "The same all-aluminium HTC 10, in a lighter finish.",
  },
  {
    id: 5,
    title: "HTC Desire 626s",
    img: `${import.meta.env.BASE_URL}img/product-5.png`,
    price: 24,
    company: "HTC",
    info: "A budget-friendly model from HTC's Desire line with a light, colourful plastic build.",
  },
  {
    id: 6,
    title: "Vintage iPhone",
    img: `${import.meta.env.BASE_URL}img/product-6.png`,
    price: 17,
    company: "Apple",
    info: "The one that started it all. A first-generation-style iPhone for collectors and the nostalgic.",
  },
  {
    id: 7,
    title: "iPhone 7",
    img: `${import.meta.env.BASE_URL}img/product-7.png`,
    price: 30,
    company: "Apple",
    info: "Apple's 2016 iPhone, the first to drop the headphone jack, with stereo speakers and water resistance.",
  },
  {
    id: 8,
    title: "Smashed iPhone",
    img: `${import.meta.env.BASE_URL}img/product-8.png`,
    price: 2,
    company: "Apple",
    info: "Spent a little too long on the pavement. Sold as-is: for parts, for art, or for courage.",
  },
];

export const companies = [...new Set(products.map((p) => p.company))];

const byId = new Map(products.map((p) => [p.id, p]));
export const getProduct = (id) => byId.get(Number(id));
