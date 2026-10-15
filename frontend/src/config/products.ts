import type { Product, ProductCategory, ProductId } from "../types/product";

export const categoryLabels: Record<ProductCategory, string> = {
  "electric-bike": "Electric Bike",
  "road-bike": "Road Bike",
  "mountain-bike": "Mountain Bike",
  helmet: "Road Helmet",
};

/** Add products here; screens and cart render from this typed catalog. */
export const products: readonly Product[] = [
  {
    id: "peugeot-lr01",
    category: "road-bike",
    name: "PEUGEOT \u2013 LR01",
    priceCents: 199999,
    description:
      "The LR01 uses the same design as the most iconic bikes from PEUGEOT Cycles' 130-year history and combines it with agile, dynamic performance that's perfectly suited to navigating today's cities. As well as a lugged steel frame and iconic PEUGEOT black-and-white chequer design, this city bike also features a 16-speed Shimano Claris drivetrain.",
    image: {
      source: require("../../assets/images/products/peugeot-lr01.png"),
      detailOffsetY: 10,
      shadow: {
        source: require("../../assets/images/products/peugeot-bike-shadow.png"),
        list: { width: "90%", top: "78%", aspectRatio: 301 / 29 },
        detail: {
          referenceWidth: 390,
          width: 301,
          height: 29,
          top: 295.3899564361572,
        },
      },
    },
    initiallyFavorite: true,
    initialCartQuantity: 1,
    initialCartOrder: 0,
  },
  {
    id: "smith-trade",
    category: "helmet",
    name: "SMITH \u2013 Trade",
    priceCents: 12000,
    description: "A road helmet for everyday rides.",
    image: { source: require("../../assets/images/products/smith-trade.png") },
    initialCartQuantity: 1,
    initialCartOrder: 2,
  },
  {
    // Only the image is from Figma; name and price are demonstration data.
    id: "electric-sport",
    category: "electric-bike",
    name: "ELECTRIC \u2013 Sport",
    priceCents: 249999,
    description: "An electric sport bicycle for your next ride.",
    image: { source: require("../../assets/images/promo/hero-bike.png") },
  },
  {
    id: "pilot-chromoly-520",
    category: "road-bike",
    name: "PILOT \u2013 CHROMOLY 520",
    priceCents: 399999,
    description: "A chromoly road bicycle with a minimal black finish.",
    // User-supplied export name differs from the product's display name.
    image: { source: require("../../assets/images/products/pilot-trade.png") },
    initialCartQuantity: 1,
    initialCartOrder: 1,
  },
];

export function getProduct(id: ProductId): Product | undefined {
  return products.find((product) => product.id === id);
}
