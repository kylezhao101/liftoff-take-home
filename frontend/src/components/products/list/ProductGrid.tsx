import { StyleSheet, View } from 'react-native';

import { tokens } from '../../../theme/tokens';
import type { Product } from '../../../types/product';
import { ProductCard } from './ProductCard';

export function ProductGrid({ products }: { products: readonly Product[] }) {
  const columns = [products.filter((_, index) => index % 2 === 0), products.filter((_, index) => index % 2 === 1)];
  return (
    <View className="flex-row items-start" style={styles.grid}>
      {columns.map((column, index) => (
        <View key={index} style={[styles.column, index === 0 && styles.offset]}>
          {column.map(product => <ProductCard key={product.id} product={product} />)}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { gap: tokens.spacing.gutter, marginTop: tokens.list.gridOverlap },
  column: { flex: 1, minWidth: 0, gap: tokens.spacing.xxl },
  offset: { paddingTop: tokens.list.columnOffset },
});
