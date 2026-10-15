import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { FloatingTabBar } from "../components/navigation/FloatingTabBar";
import { CategoryFilters } from "../components/products/CategoryFilters";
import { ListBackdrop } from "../components/products/ListBackdrop";
import { ProductGrid } from "../components/products/ProductGrid";
import { PromoHero } from "../components/products/PromoHero";
import { AppText } from "../components/ui/AppText";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { GradientButton } from "../components/ui/GradientButton";
import { Icon } from "../components/ui/Icon";
import { Screen } from "../components/ui/Screen";
import { TextField } from "../components/ui/TextField";
import { categoryLabels, products } from "../config/products";
import { tokens } from "../theme/tokens";
import type { ProductFilter } from "../types/product";

export default function ProductListScreen() {
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState<ProductFilter>("all");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const visibleProducts = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    return products.filter(
      (product) =>
        (filter === "all" || product.category === filter) &&
        `${product.name} ${categoryLabels[product.category]}`
          .toLocaleLowerCase()
          .includes(term),
    );
  }, [filter, query]);

  return (
    <View style={styles.screen}>
      <ListBackdrop />
      <Screen edges={["top", "left", "right"]}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.content,
            {
              paddingBottom:
                tokens.list.navHeight +
                Math.max(insets.bottom, tokens.spacing.lg) +
                tokens.spacing.xxl,
            },
          ]}
        >
          <View
            className="flex-row items-center justify-between"
            style={styles.header}
          >
            <AppText
              accessibilityRole="header"
              weight="bold"
              style={styles.title}
            >
              Choose Your Bike
            </AppText>
            <GradientButton
              accessibilityLabel="Search products"
              aria-expanded={searchOpen}
              onPress={() => {
                if (searchOpen) setQuery("");
                setSearchOpen((open) => !open);
              }}
              style={styles.searchButton}
            >
              <Icon
                name="search"
                width={tokens.sizes.icon}
                height={tokens.sizes.icon}
              />
            </GradientButton>
          </View>
          {searchOpen && (
            <View style={styles.searchRow}>
              <TextField
                accessibilityLabel="Search bikes and helmets"
                placeholder="Search bikes and helmets"
                value={query}
                onChangeText={setQuery}
                autoFocus
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="search"
                clearButtonMode="while-editing"
              />
            </View>
          )}
          <PromoHero />
          <CategoryFilters value={filter} onChange={setFilter} />
          {visibleProducts.length > 0 ? (
            <ProductGrid products={visibleProducts} />
          ) : (
            <Card contentStyle={styles.empty}>
              <AppText weight="semibold">No products found</AppText>
              <AppText style={styles.muted}>
                Try another category or search term.
              </AppText>
              <Button
                label="Reset filters"
                onPress={() => {
                  setFilter("all");
                  setQuery("");
                }}
              />
            </Card>
          )}
        </ScrollView>
      </Screen>
      <FloatingTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: tokens.colors.background,
    overflow: "hidden",
  },
  content: {
    paddingHorizontal: tokens.spacing.gutter,
    paddingTop: tokens.spacing.lg,
  },
  header: { gap: tokens.spacing.gutter, marginBottom: tokens.spacing.xxl },
  title: {
    flex: 1,
    fontSize: tokens.typography.size.title,
    lineHeight: tokens.typography.lineHeight.title,
  },
  searchButton: { width: tokens.sizes.control, paddingHorizontal: 0 },
  searchRow: { marginBottom: tokens.spacing.xl },
  empty: { gap: tokens.spacing.md },
  muted: { color: tokens.colors.muted },
});
