import type { ImageSourcePropType } from "react-native";

export type ProductId = string;

export type ProductCategory =
  "electric-bike" | "road-bike" | "mountain-bike" | "helmet";
export type ProductFilter = "all" | ProductCategory;

export interface Product {
  id: ProductId;
  category: ProductCategory;
  name: string;
  priceCents: number;
  description: string;
  image: {
    source: ImageSourcePropType;
    detailOffsetY?: number;
    shadow?: {
      source: ImageSourcePropType;
      list?: { width: `${number}%`; top: `${number}%`; aspectRatio: number };
      detail?: {
        referenceWidth: number;
        width: number;
        height: number;
        top: number;
      };
    };
  };
  initiallyFavorite?: boolean;
  initialCartQuantity?: number;
  initialCartOrder?: number;
}

export interface CartItem {
  productId: ProductId;
  quantity: number;
}
