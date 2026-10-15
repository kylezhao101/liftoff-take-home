import type { ImageSourcePropType } from "react-native";

export const productImages = {
  "peugeot-lr01": require("../../assets/images/products/peugeot-lr01.png"),
  // User-supplied export name differs from the product's display name.
  "pilot-chromoly-520": require("../../assets/images/products/pilot-trade.png"),
  "smith-trade": require("../../assets/images/products/smith-trade.png"),
  "electric-sport": require("../../assets/images/promo/hero-bike.png"),
} satisfies Record<
  "peugeot-lr01" | "pilot-chromoly-520" | "smith-trade" | "electric-sport",
  ImageSourcePropType
>;

export const productEffects = {
  "peugeot-bike-shadow": require("../../assets/images/products/peugeot-bike-shadow.png"),
} satisfies Record<"peugeot-bike-shadow", ImageSourcePropType>;

export const promoImages = {
  "hero-bike": require("../../assets/images/promo/hero-bike.png"),
} satisfies Record<"hero-bike", ImageSourcePropType>;

export type ProductImageKey = keyof typeof productImages;
