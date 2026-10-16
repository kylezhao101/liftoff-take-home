import { Image, StyleSheet, View } from "react-native";
import type { Product } from "../../../types/product";
import { tokens } from "../../../theme/tokens";
import { AppText } from "../../ui/AppText";
import { GradientButton } from "../../ui/controls/GradientButton";
import { Icon } from "../../ui/Icon";

type Props = {
  product: Product;
  width: number;
  heroHeight: number;
  topInset: number;
  onBack: () => void;
};

export function ProductDetailHero({
  product,
  width,
  heroHeight,
  topInset,
  onBack,
}: Props) {
  const imageShadow = product.image.shadow;
  const detailShadow = imageShadow?.detail;
  return (
    <View
      style={[styles.hero, { height: Math.max(280, heroHeight - topInset) }]}
    >
      {detailShadow && imageShadow && (
        <Image
          testID={`product-detail-shadow-${product.id}`}
          accessibilityElementsHidden={true}
          importantForAccessibility="no"
          source={imageShadow.source}
          resizeMode="contain"
          style={[
            styles.imageShadow,
            {
              left:
                (width -
                  (detailShadow.width * width) / detailShadow.referenceWidth) /
                2,
              top:
                (detailShadow.top * width) / detailShadow.referenceWidth -
                topInset,
              width: (detailShadow.width * width) / detailShadow.referenceWidth,
              height:
                (detailShadow.height * width) / detailShadow.referenceWidth,
            },
          ]}
        />
      )}
      <View className="flex-row items-center" style={styles.header}>
        <GradientButton
          accessibilityLabel="Back to bikes"
          onPress={onBack}
          style={styles.backButton}
        >
          <Icon
            name="chevron-left"
            width={tokens.sizes.icon}
            height={tokens.sizes.icon}
          />
        </GradientButton>
        <AppText accessibilityRole="header" weight="bold" style={styles.title}>
          {product.name}
        </AppText>
        <View style={styles.headerBalance} />
      </View>
      <View style={styles.imageFrame}>
        <Image
          accessibilityLabel={product.name}
          source={product.image.source}
          resizeMode="contain"
          style={[
            styles.image,
            product.image.detailOffsetY !== undefined && {
              transform: [
                {
                  translateY:
                    (product.image.detailOffsetY * width) /
                    (detailShadow?.referenceWidth ??
                      tokens.detail.referenceWidth),
                },
              ],
            },
          ]}
        />
      </View>
      <View accessibilityLabel="Product image 1 of 1" style={styles.pager}>
        {[0, 1, 2].map((index) => (
          <View
            key={index}
            aria-hidden={true}
            style={[styles.dot, index > 0 && styles.inactiveDot]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { paddingTop: tokens.spacing.lg },
  header: { paddingHorizontal: tokens.spacing.gutter, gap: tokens.spacing.sm },
  backButton: { width: tokens.sizes.control, paddingHorizontal: 0 },
  headerBalance: { width: tokens.sizes.control },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: tokens.typography.size.title,
    lineHeight: tokens.typography.lineHeight.title,
  },
  imageFrame: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: tokens.spacing.xl,
  },
  image: { width: tokens.detail.imageWidth, height: "90%" },
  imageShadow: { position: "absolute" },
  pager: {
    flexDirection: "row",
    justifyContent: "center",
    gap: tokens.detail.pagerGap,
    paddingTop: tokens.spacing.md,
    paddingBottom: tokens.detail.pagerBottom,
  },
  dot: {
    width: tokens.detail.pagerDot,
    height: tokens.detail.pagerDot,
    borderRadius: tokens.detail.pagerDot / 2,
    backgroundColor: tokens.colors.text,
  },
  inactiveDot: { opacity: 0.3 },
});
