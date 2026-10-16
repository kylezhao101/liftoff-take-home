import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { categoryLabels } from "../../../config/products";
import { useShopStore } from "../../../store/shop-store";
import { tokens } from "../../../theme/tokens";
import type { Product } from "../../../types/product";
import { formatMoney } from "../../../utils/money";
import { AppText } from "../../ui/AppText";
import { Button } from "../../ui/controls/Button";
import { Card } from "../../ui/surfaces/Card";
import { FavoriteIcon } from "../FavoriteIcon";

export function ProductCard({ product }: { product: Product }) {
  const favorite = useShopStore((state) =>
    state.favoriteIds.includes(product.id),
  );
  const toggleFavorite = useShopStore((state) => state.toggleFavorite);

  return (
    <Card
      glass
      border={tokens.bezel.productBorder}
      testID={`product-${product.id}`}
      surfaceStyle={styles.surface}
      contentStyle={styles.content}
    >
      <Link
        href={{ pathname: "/product/[id]", params: { id: product.id } }}
        asChild
      >
        <Pressable accessibilityLabel={`View ${product.name}`}>
          <View
            style={[
              styles.imageFrame,
              {
                aspectRatio:
                  product.category === "helmet"
                    ? tokens.list.productImageAspectRatio.helmet
                    : tokens.list.productImageAspectRatio.bike,
              },
            ]}
          >
            {product.image.shadow?.list && (
              <View
                testID={`product-list-shadow-${product.id}`}
                accessibilityElementsHidden
                importantForAccessibility="no"
                style={[styles.imageShadowFrame, product.image.shadow.list]}
              >
                <Image
                  source={product.image.shadow.source}
                  resizeMode="contain"
                  style={styles.imageShadow}
                />
              </View>
            )}
            <Image
              source={product.image.source}
              accessibilityLabel={product.name}
              resizeMode="contain"
              style={styles.image}
            />
          </View>
          <AppText style={styles.category}>
            {categoryLabels[product.category]}
          </AppText>
          <AppText weight="bold" style={styles.name}>
            {product.name}
          </AppText>
          <AppText style={styles.price}>
            {formatMoney(product.priceCents)}
          </AppText>
        </Pressable>
      </Link>
      <Button
        variant="plain"
        accessibilityLabel={`Favorite ${product.name}`}
        aria-pressed={favorite}
        onPress={() => toggleFavorite(product.id)}
        style={styles.favorite}
      >
        <FavoriteIcon selected={favorite} />
      </Button>
    </Card>
  );
}

const styles = StyleSheet.create({
  surface: { transform: [{ skewY: tokens.list.cardTilt }] },
  content: {
    paddingHorizontal: tokens.spacing.md,
    paddingTop: tokens.spacing.xl,
    paddingBottom: tokens.spacing.gutter,
  },
  imageFrame: { width: "100%", marginBottom: tokens.spacing.md },
  image: { position: "absolute", width: "100%", height: "100%" },
  imageShadowFrame: {
    position: "absolute",
    alignSelf: "center",
  },
  imageShadow: { width: "100%", height: "100%" },
  category: {
    fontSize: tokens.typography.size.caption,
    lineHeight: tokens.typography.lineHeight.caption,
    color: tokens.colors.muted,
  },
  name: {
    fontSize: tokens.typography.size.label,
    lineHeight: tokens.typography.lineHeight.label,
  },
  price: {
    fontSize: tokens.typography.size.caption,
    lineHeight: tokens.typography.lineHeight.caption,
    color: tokens.colors.muted,
  },
  favorite: {
    position: "absolute",
    top: -tokens.spacing.sm,
    right: -tokens.spacing.xs,
    paddingHorizontal: 0,
  },
});
