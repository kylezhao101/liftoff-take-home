import { StyleSheet, View } from 'react-native';

import type { IconName } from '../../../assets/icons';
import { tokens } from '../../../theme/tokens';
import type { ProductFilter } from '../../../types/product';
import { Chip } from '../../ui/controls/Chip';

const filters: readonly { value: ProductFilter; label: string; icon?: IconName }[] = [
  { value: 'all', label: 'All' },
  { value: 'electric-bike', label: 'Electric bikes', icon: 'e-bike' },
  { value: 'road-bike', label: 'Road bikes', icon: 'road' },
  { value: 'mountain-bike', label: 'Mountain bikes', icon: 'mountain' },
  { value: 'helmet', label: 'Helmets', icon: 'helmet' },
];

type CategoryFiltersProps = { value: ProductFilter; onChange: (filter: ProductFilter) => void };

export function CategoryFilters({ value, onChange }: CategoryFiltersProps) {
  return (
    <View style={styles.row}>
      {filters.map((filter, index) => (
        <View key={filter.value} style={[styles.slot, { paddingTop: (filters.length - 1 - index) * tokens.list.categoryStep }]}>
          <Chip fluid label={filter.label} icon={filter.icon} selected={value === filter.value} onPress={() => onChange(filter.value)} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row', alignItems: 'flex-start', overflow: 'visible',
    marginTop: tokens.list.categoryOverlap, paddingHorizontal: tokens.list.filterInset,
    gap: tokens.list.filterGap, paddingTop: tokens.spacing.sm, paddingBottom: tokens.spacing.xl,
  },
  slot: { flex: 1, minWidth: 0, overflow: 'visible' },
});
