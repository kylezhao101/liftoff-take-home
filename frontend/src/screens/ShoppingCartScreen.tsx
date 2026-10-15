import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { CartLineItem } from "../components/cart/CartLineItem";
import { AppText } from "../components/ui/AppText";
import { Button } from "../components/ui/Button";
import { GradientBezel } from "../components/ui/GradientBezel";
import { GradientButton } from "../components/ui/GradientButton";
import { Icon } from "../components/ui/Icon";
import { PriceRow } from "../components/ui/PriceRow";
import { Screen } from "../components/ui/Screen";
import { TextField } from "../components/ui/TextField";
import { products } from "../data/products";
import { useShopStore } from "../store/shop-store";
import { tokens } from "../theme/tokens";
import {
  BIKE30_CODE,
  BIKE30_PERCENT,
  calculateCartTotals,
} from "../utils/cart";
import { formatMoney } from "../utils/money";

export default function ShoppingCartScreen() {
  const cartItems = useShopStore((state) => state.cartItems);
  const setQuantity = useShopStore((state) => state.setQuantity);
  const appliedPromoCode = useShopStore((state) => state.appliedPromoCode);
  const applyPromoCode = useShopStore((state) => state.applyPromoCode);
  const [promoInput, setPromoInput] = useState("Bike30");
  const [promoMessage, setPromoMessage] = useState("");
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const totals = calculateCartTotals(cartItems, products, appliedPromoCode);
  const goBack = () =>
    router.canGoBack() ? router.back() : router.replace("/");

  return (
    <Screen style={styles.screen}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <GradientButton
            accessibilityLabel="Back to bikes"
            onPress={goBack}
            style={styles.backButton}
          >
            <Icon
              name="chevron-left"
              width={tokens.sizes.icon}
              height={tokens.sizes.icon}
            />
          </GradientButton>
          <AppText
            accessibilityRole="header"
            weight="bold"
            style={styles.title}
          >
            My Shopping Cart
          </AppText>
          <View style={styles.headerBalance} />
        </View>

        <View style={styles.items}>
          {cartItems.length ? (
            cartItems.map((item) => {
              const product = products.find(
                (candidate) => candidate.id === item.productId,
              );
              if (!product) return null;
              return (
                <CartLineItem
                  key={item.productId}
                  product={product}
                  quantity={item.quantity}
                  onQuantityChange={(quantity) =>
                    setQuantity(item.productId, quantity)
                  }
                />
              );
            })
          ) : (
            <View style={styles.empty}>
              <AppText weight="semibold">Your cart is empty</AppText>
              <Button
                label="Browse bikes"
                onPress={() => router.replace("/")}
              />
            </View>
          )}
        </View>

        <View style={styles.lower}>
          {totals.itemCount > 0 && (
            <AppText style={styles.shipping}>
              Your cart qualifies for free shipping
            </AppText>
          )}
          <View style={styles.promoRow}>
            <TextField
              accessibilityLabel="Promo code"
              autoCapitalize="characters"
              autoCorrect={false}
              value={promoInput}
              onChangeText={(value) => {
                setPromoInput(value);
                setPromoMessage("");
              }}
              onSubmitEditing={() =>
                setPromoMessage(
                  applyPromoCode(promoInput)
                    ? "Bike30 applied"
                    : "Invalid promo code",
                )
              }
              placeholder="Promo code"
              placeholderTextColor={tokens.cart.promoTextColor}
              containerStyle={styles.promoInput}
              style={styles.promoText}
            />
            <GradientButton
              label="Apply"
              onPress={() =>
                setPromoMessage(
                  applyPromoCode(promoInput)
                    ? "Bike30 applied"
                    : "Invalid promo code",
                )
              }
              style={styles.apply}
            />
          </View>
          {!!promoMessage && (
            <AppText
              accessibilityLiveRegion="polite"
              style={[
                styles.promoMessage,
                promoMessage === "Invalid promo code" && styles.error,
              ]}
            >
              {promoMessage}
            </AppText>
          )}
          <View style={styles.prices}>
            <PriceRow
              label="Subtotal:"
              value={formatMoney(totals.subtotalCents)}
            />
            <PriceRow
              label="Delivery Fee:"
              value={formatMoney(totals.deliveryCents)}
            />
            <PriceRow
              label={
                appliedPromoCode === BIKE30_CODE
                  ? `Discount (${BIKE30_PERCENT}%):`
                  : "Discount:"
              }
              value={`-${formatMoney(totals.discountCents)}`}
            />
            <PriceRow
              label="Total:"
              value={formatMoney(totals.totalCents)}
              emphasized
              style={styles.total}
            />
          </View>
          <Button
            variant="plain"
            accessibilityLabel="Checkout"
            disabled={totals.itemCount === 0}
            onPress={() =>
              setCheckoutMessage("Checkout is not available in this demo.")
            }
            style={styles.checkout}
          >
            <View style={styles.checkoutArrow}>
              <GradientBezel
                radius={tokens.radii.control}
                borderWidth={tokens.bezel.borderWidth}
                fill={tokens.bezel.active}
                border={tokens.bezel.border}
              />
              <View pointerEvents="none" style={styles.checkoutIcon}>
                <Icon
                  name="chevron-right"
                  width={tokens.sizes.icon}
                  height={tokens.sizes.icon}
                />
              </View>
            </View>
            <AppText style={styles.checkoutText}>Checkout</AppText>
          </Button>
          {!!checkoutMessage && (
            <AppText
              accessibilityLiveRegion="polite"
              style={styles.checkoutMessage}
            >
              {checkoutMessage}
            </AppText>
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: tokens.colors.background },
  content: {
    flexGrow: 1,
    paddingHorizontal: tokens.spacing.gutter,
    paddingTop: tokens.spacing.lg,
    paddingBottom: tokens.spacing.xl,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: tokens.spacing.sm,
    marginBottom: tokens.spacing.xxl,
  },
  backButton: { width: tokens.sizes.control, paddingHorizontal: 0 },
  headerBalance: { width: tokens.sizes.control },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: tokens.typography.size.title,
    lineHeight: tokens.typography.lineHeight.title,
  },
  items: { marginHorizontal: -tokens.spacing.gutter },
  empty: {
    alignItems: "center",
    gap: tokens.spacing.lg,
    paddingVertical: tokens.spacing.xxl,
  },
  lower: { marginTop: "auto", paddingTop: tokens.spacing.xl },
  shipping: {
    color: tokens.colors.muted,
    textAlign: "center",
    fontSize: tokens.typography.size.label,
    lineHeight: tokens.typography.lineHeight.label,
    marginBottom: tokens.spacing.xl,
  },
  promoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: tokens.spacing.sm,
  },
  promoInput: { flex: 1, minWidth: 0 },
  promoText: { color: tokens.cart.promoTextColor },
  apply: { width: 114 },
  promoMessage: {
    color: tokens.colors.accent,
    fontSize: tokens.typography.size.caption,
    marginTop: tokens.spacing.xs,
  },
  error: { color: tokens.colors.error },
  prices: { gap: tokens.spacing.sm, paddingTop: tokens.spacing.lg },
  total: { paddingTop: tokens.spacing.sm },
  checkout: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    height: tokens.sizes.control,
    marginTop: tokens.spacing.xl,
    paddingHorizontal: 0,
    paddingVertical: 0,
    minWidth: 172,
    backgroundColor: tokens.colors.deep,
    boxShadow: tokens.shadows.inset,
  },
  checkoutArrow: {
    width: tokens.sizes.control,
    height: tokens.sizes.control,
    borderRadius: tokens.radii.control,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  checkoutIcon: { zIndex: 1 },
  checkoutText: {
    color: tokens.colors.muted,
    flex: 1,
    textAlign: "center",
    paddingHorizontal: tokens.spacing.md,
  },
  checkoutMessage: {
    color: tokens.colors.muted,
    textAlign: "center",
    fontSize: tokens.typography.size.caption,
    marginTop: tokens.spacing.sm,
  },
});
