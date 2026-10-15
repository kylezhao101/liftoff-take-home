import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BikeSharePanel } from "../components/products/BikeSharePanel";
import { DetailBackdrop } from "../components/products/DetailBackdrop";
import { DetailSheetSurface } from "../components/products/DetailSheetSurface";
import { AppText } from "../components/ui/AppText";
import { GradientBezel } from "../components/ui/GradientBezel";
import { GradientButton } from "../components/ui/GradientButton";
import { Icon } from "../components/ui/Icon";
import { Screen } from "../components/ui/Screen";
import { TabSwitcher, type TabOption } from "../components/ui/TabSwitcher";
import { getProduct } from "../config/products";
import { useShopStore } from "../store/shop-store";
import { tokens } from "../theme/tokens";
import { formatMoney } from "../utils/money";

type DetailTab = "description" | "specification";
const tabs: readonly TabOption<DetailTab>[] = [
  { value: "description", label: "Description" },
  { value: "specification", label: "Specification" },
];

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  // Route identity remounts the detail state when opening another product.
  return <ProductDetail key={id} id={id} />;
}

function ProductDetail({ id }: { id: string }) {
  const product = getProduct(id);
  const imageShadow = product?.image.shadow;
  const detailShadow = imageShadow?.detail;
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<DetailTab>("description");
  const [requestedData, setRequestedData] = useState(false);
  const [added, setAdded] = useState(false);
  const [footerHeight, setFooterHeight] = useState<number>(
    tokens.detail.footerMinHeight,
  );
  const addToCart = useShopStore((state) => state.addToCart);
  const quantity = useShopStore(
    (state) =>
      state.cartItems.find((item) => item.productId === id)?.quantity ?? 0,
  );
  const goBack = () =>
    router.canGoBack() ? router.back() : router.replace("/");
  const heroHeight =
    (width * tokens.detail.heroHeight) / tokens.detail.referenceWidth;

  if (!product)
    return (
      <Screen style={styles.screen}>
        <View style={styles.missing}>
          <AppText accessibilityRole="header" weight="bold">
            Product not found
          </AppText>
          <AppText style={styles.muted}>
            This product is no longer in the catalog.
          </AppText>
          <GradientButton
            label="Back to bikes"
            onPress={() => router.replace("/")}
          />
        </View>
      </Screen>
    );

  return (
    <View testID="product-detail" style={styles.screen}>
      <DetailBackdrop />
      <Screen edges={["top", "left", "right"]}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={[
              styles.hero,
              { height: Math.max(280, heroHeight - insets.top) },
            ]}
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
                        (detailShadow.width * width) /
                          detailShadow.referenceWidth) /
                      2,
                    top:
                      (detailShadow.top * width) / detailShadow.referenceWidth -
                      insets.top,
                    width:
                      (detailShadow.width * width) /
                      detailShadow.referenceWidth,
                    height:
                      (detailShadow.height * width) /
                      detailShadow.referenceWidth,
                  },
                ]}
              />
            )}
            <View className="flex-row items-center" style={styles.header}>
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
            <View
              accessibilityLabel="Product image 1 of 1"
              style={styles.pager}
            >
              {[0, 1, 2].map((index) => (
                <View
                  key={index}
                  aria-hidden={true}
                  style={[styles.dot, index > 0 && styles.inactiveDot]}
                />
              ))}
            </View>
          </View>
          <View
            testID="detail-sheet"
            style={[
              styles.sheet,
              {
                minHeight: Math.max(
                  tokens.detail.sheetMinHeight,
                  height - Math.max(heroHeight, insets.top + 280),
                ),
                paddingBottom: footerHeight + tokens.spacing.xl,
              },
            ]}
          >
            <DetailSheetSurface />
            <View style={styles.tabInset}>
              <TabSwitcher
                options={tabs}
                value={tab}
                onChange={(value) => {
                  setTab(value);
                  if (value === "specification") setRequestedData(true);
                }}
              />
            </View>
            <View style={styles.panel}>
              {tab === "description" && (
                <View testID="description-panel" style={styles.description}>
                  <AppText weight="bold" style={styles.productTitle}>
                    {product.name}
                  </AppText>
                  <AppText style={styles.muted}>{product.description}</AppText>
                </View>
              )}
              <View style={tab !== "specification" && styles.hidden}>
                <BikeSharePanel enabled={requestedData} />
              </View>
            </View>
          </View>
        </ScrollView>
      </Screen>
      <View
        testID="detail-footer"
        onLayout={({ nativeEvent: { layout } }) => {
          if (layout.height !== footerHeight) setFooterHeight(layout.height);
        }}
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
            {formatMoney(product.priceCents)}
          </AppText>
          <GradientButton
            label="Add to Cart"
            onPress={() => {
              addToCart(product.id);
              setAdded(true);
            }}
            style={styles.addButton}
          />
        </View>
        {added && (
          <AppText accessibilityLiveRegion="polite" style={styles.confirmation}>
            Added to cart · {quantity} {quantity === 1 ? "item" : "items"}
          </AppText>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: tokens.colors.background },
  scroll: { flex: 1 },
  scrollContent: { flexGrow: 1 },
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
  sheet: {
    flexGrow: 1,
    minHeight: tokens.detail.sheetMinHeight,
    borderTopLeftRadius: tokens.radii.sheet,
    borderTopRightRadius: tokens.radii.sheet,
    paddingTop: tokens.spacing.xxl,
    paddingBottom: tokens.spacing.xl,
  },
  tabInset: {
    paddingHorizontal: tokens.spacing.gutter + tokens.detail.sheetTabInset,
  },
  panel: {
    paddingHorizontal: tokens.spacing.gutter,
    paddingTop: tokens.spacing.xxl,
  },
  description: { gap: tokens.spacing.md },
  productTitle: {
    fontSize: tokens.typography.size.subtitle,
    lineHeight: tokens.typography.lineHeight.subtitle,
  },
  muted: { color: tokens.colors.muted },
  hidden: { display: "none" },
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
  missing: {
    flex: 1,
    justifyContent: "center",
    padding: tokens.spacing.gutter,
    gap: tokens.spacing.lg,
  },
});
