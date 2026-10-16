import { StyleSheet, View, type LayoutChangeEvent } from "react-native";
import type { EdgeInsets } from "react-native-safe-area-context";
import { tokens } from "../../../theme/tokens";
import { formatMoney } from "../../../utils/money";
import { AppText } from "../../ui/AppText";
import { GradientButton } from "../../ui/controls/GradientButton";
import { GradientBezel } from "../../ui/surfaces/GradientBezel";

type Props = {
  priceCents: number;
  quantity: number;
  added: boolean;
  insets: EdgeInsets;
  onAddToCart: () => void;
  onLayout: (event: LayoutChangeEvent) => void;
};

export function ProductDetailFooter({
  priceCents,
  quantity,
  added,
  insets,
  onAddToCart,
  onLayout,
}: Props) {
  return (
    <View
      testID="detail-footer"
      onLayout={onLayout}
      style={[
        styles.footer,
        {
          minHeight: tokens.detail.footerMinHeight + insets.bottom,
          paddingBottom: tokens.spacing.xl + insets.bottom,
          paddingLeft: tokens.spacing.xxl + insets.left,
          paddingRight: tokens.spacing.xxl + insets.right,
        },
      ]}
    >
      <View
        pointerEvents="none"
        testID="detail-footer-surface"
        style={[StyleSheet.absoluteFill, styles.footerSurface]}
      >
        <GradientBezel
          radius={tokens.detail.footerRadius}
          borderWidth={tokens.bezel.borderWidth}
          border={tokens.detail.footerBorder}
          blendMode={tokens.detail.footerBorderBlendMode}
        />
      </View>
      <View className="flex-row items-center" style={styles.footerRow}>
        <AppText testID="detail-price" style={styles.price}>
          {formatMoney(priceCents)}
        </AppText>
        <GradientButton
          label="Add to Cart"
          onPress={onAddToCart}
          style={styles.addButton}
        />
      </View>
      {added && (
        <AppText accessibilityLiveRegion="polite" style={styles.confirmation}>
          Added to cart · {quantity} {quantity === 1 ? "item" : "items"}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
    justifyContent: "center",
    minHeight: tokens.detail.footerMinHeight,
    borderTopLeftRadius: tokens.detail.footerRadius,
    borderTopRightRadius: tokens.detail.footerRadius,
    paddingTop: tokens.spacing.xl,
    backgroundColor: "transparent",
  },
  footerRow: { gap: tokens.spacing.gutter, justifyContent: "space-between" },
  footerSurface: {
    borderRadius: tokens.detail.footerRadius,
    backgroundColor: tokens.detail.footerBackground,
  },
  price: {
    flexShrink: 1,
    color: tokens.colors.accent,
    fontSize: tokens.typography.size.price,
    lineHeight: tokens.typography.lineHeight.price,
  },
  addButton: {
    flex: 1,
    maxWidth: "50%",
    minWidth: 0,
    paddingHorizontal: tokens.spacing.sm,
  },
  confirmation: {
    textAlign: "right",
    color: tokens.colors.muted,
    fontSize: tokens.typography.size.caption,
    lineHeight: tokens.typography.lineHeight.caption,
    paddingTop: tokens.spacing.xs,
  },
});
