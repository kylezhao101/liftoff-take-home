import { Image, StyleSheet, View } from "react-native";

import { tokens } from "../../theme/tokens";
import type { Product } from "../../types/product";
import { formatMoney } from "../../utils/money";
import { AppText } from "../ui/AppText";
import { GradientBezel } from "../ui/GradientBezel";
import { QuantityStepper } from "../ui/QuantityStepper";

type Props = {
  product: Product;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
};

export function CartLineItem({ product, quantity, onQuantityChange }: Props) {
  return (
    <View testID={`cart-item-${product.id}`} style={styles.row}>
      <View style={styles.imageFrame}>
        <GradientBezel
          radius={tokens.radii.card}
          borderWidth={tokens.cart.previewBorderWidth}
          fill={tokens.cart.previewFill}
          border={tokens.cart.previewBorder}
        />
        <Image
          source={product.image.source}
          resizeMode="contain"
          accessibilityLabel={product.name}
          style={styles.image}
        />
      </View>
      <View style={styles.details}>
        <AppText weight="bold" numberOfLines={2} style={styles.name}>
          {product.name}
        </AppText>
        <View style={styles.bottom}>
          <AppText style={styles.price}>
            {formatMoney(product.priceCents)}
          </AppText>
          <QuantityStepper
            compact
            value={quantity}
            label={product.name}
            onChange={onQuantityChange}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: tokens.spacing.lg,
    minHeight: 124,
    paddingHorizontal: tokens.spacing.gutter,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.07)",
  },
  imageFrame: {
    width: 100,
    height: 90,
    borderRadius: tokens.radii.card,
    backgroundColor: tokens.colors.surface,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: { width: "94%", height: "90%", zIndex: 1 },
  details: {
    flex: 1,
    minWidth: 0,
    minHeight: 90,
    justifyContent: "space-between",
  },
  name: {
    fontSize: tokens.typography.size.label,
    lineHeight: tokens.typography.lineHeight.label,
  },
  bottom: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: tokens.spacing.xs,
  },
  price: {
    color: tokens.colors.accent,
    fontSize: tokens.typography.size.caption,
    lineHeight: tokens.typography.lineHeight.caption,
    flexShrink: 1,
  },
});
