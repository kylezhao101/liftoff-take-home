import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { tokens } from '../theme/tokens';
import { formatMoney } from '../utils/money';
import { AppText } from './ui/AppText';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Chip } from './ui/Chip';
import { GradientButton } from './ui/GradientButton';
import { Icon } from './ui/Icon';
import { PriceRow } from './ui/PriceRow';
import { QuantityStepper } from './ui/QuantityStepper';
import { TabSwitcher } from './ui/TabSwitcher';
import { TextField } from './ui/TextField';

const tabs = [
  { value: 'description', label: 'Description' },
  { value: 'specification', label: 'Specification' },
] as const;
const categories = ['all', 'e-bike', 'road', 'mountain', 'helmet'] as const;

export function ComponentPreview() {
  const [category, setCategory] = useState<(typeof categories)[number]>('all');
  const [tab, setTab] = useState<(typeof tabs)[number]['value']>('description');
  const [quantity, setQuantity] = useState(1);
  const [promo, setPromo] = useState('Bike30');
  const [notice, setNotice] = useState('');

  return (
    <View style={styles.stack}>
      <View className="flex-row items-center justify-between" style={styles.row}>
        <AppText weight="bold" style={styles.title}>Shared Components</AppText>
        <GradientButton accessibilityLabel="Preview search button" onPress={() => setNotice('Search button pressed.')} style={styles.iconButton}>
          <Icon name="search" width={tokens.sizes.icon} height={tokens.sizes.icon} />
        </GradientButton>
      </View>
      <AppText style={styles.muted}>
        Stage (a) review. Colors and measurements are provisional; see the design token notes.
      </AppText>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categories}>
        {categories.map((name) => (
          <Chip
            key={name} label={name === 'all' ? 'All' : name}
            selected={category === name} onPress={() => setCategory(name)}
            icon={name === 'all' ? undefined : name}
          />
        ))}
      </ScrollView>

      <Card contentStyle={styles.stack}>
        <TabSwitcher options={tabs} value={tab} onChange={setTab} />
        <AppText weight="bold">{tab === 'description' ? 'Description' : 'Specification'}</AppText>
        <AppText style={styles.muted}>
          {tab === 'description'
            ? 'Poppins typography, a raised surface, and inset controls share the same working design tokens.'
            : 'The live data container will be implemented with loading, error, and retry states in stage (c).'}
        </AppText>
      </Card>

      <Card contentStyle={styles.stack}>
        <View className="flex-row flex-wrap items-center justify-between" style={styles.row}>
          <AppText weight="semibold">Quantity</AppText>
          <QuantityStepper value={quantity} onChange={setQuantity} min={1} max={9} label="preview item" />
        </View>
        <PriceRow label="Unit price" value={formatMoney(199999)} />
        <PriceRow label="Preview subtotal" value={formatMoney(quantity * 199999)} emphasized />
      </Card>

      <View className="flex-row" style={styles.row}>
        <TextField accessibilityLabel="Promo code preview" value={promo} onChangeText={setPromo} autoCapitalize="none" autoCorrect={false} containerStyle={styles.grow} />
        <GradientButton label="Apply" onPress={() => setNotice(`Preview code: ${promo || '(empty)'}`)} />
      </View>
      <GradientButton label="Add to Cart" onPress={() => setNotice('Button interaction confirmed. Cart state follows in stage (d).')} />
      <View className="flex-row" style={styles.row}>
        <Button label="Disabled" disabled style={styles.grow} />
        <GradientButton label="Loading" loading style={styles.grow} />
      </View>
      <AppText accessibilityLiveRegion="polite" style={styles.muted}>
        {notice || 'Try the controls above. Preview interactions do not modify a shopping cart.'}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  stack: { gap: tokens.spacing.lg },
  row: { gap: tokens.spacing.md },
  title: { flex: 1, fontSize: tokens.typography.size.title, lineHeight: tokens.typography.lineHeight.title },
  muted: { color: tokens.colors.muted },
  categories: { gap: tokens.spacing.gutter, paddingBottom: tokens.spacing.lg, paddingTop: tokens.spacing.sm },
  iconButton: { paddingHorizontal: tokens.spacing.sm },
  grow: { flex: 1, minWidth: 0 },
});
