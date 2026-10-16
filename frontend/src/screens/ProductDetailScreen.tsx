import { ProductDetailHero } from "../components/products/detail/ProductDetailHero";
import { ProductDetailFooter } from "../components/products/detail/ProductDetailFooter";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BikeSharePanel } from "../components/products/detail/BikeSharePanel";
import { DetailBackdrop } from "../components/products/backdrop/DetailBackdrop";
import { DetailSheetSurface } from "../components/products/detail/DetailSheetSurface";
import { AppText } from "../components/ui/AppText";
import { GradientButton } from "../components/ui/controls/GradientButton";
import { Screen } from "../components/ui/Screen";
import {
  TabSwitcher,
  type TabOption,
} from "../components/ui/controls/TabSwitcher";
import { getProduct } from "../config/products";
import { useShopStore } from "../store/shop-store";
import { tokens } from "../theme/tokens";

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
          <ProductDetailHero
            product={product}
            width={width}
            heroHeight={heroHeight}
            topInset={insets.top}
            onBack={goBack}
          />
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
      <ProductDetailFooter
        priceCents={product.priceCents}
        quantity={quantity}
        added={added}
        insets={insets}
        onAddToCart={() => {
          addToCart(product.id);
          setAdded(true);
        }}
        onLayout={({ nativeEvent: { layout } }) => {
          if (layout.height !== footerHeight) setFooterHeight(layout.height);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: tokens.colors.background },
  scroll: { flex: 1 },
  scrollContent: { flexGrow: 1 },
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
  missing: {
    flex: 1,
    justifyContent: "center",
    padding: tokens.spacing.gutter,
    gap: tokens.spacing.lg,
  },
});
