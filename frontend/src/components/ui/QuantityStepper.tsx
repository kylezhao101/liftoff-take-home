import { StyleSheet, View } from 'react-native';

import { tokens } from '../../theme/tokens';
import { AppText } from './AppText';
import { Button } from './Button';
import { GradientButton } from './GradientButton';
import { Icon } from './Icon';
import { GradientBezel } from './GradientBezel';

type QuantityStepperProps = {
  value: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  label?: string;
};

export function QuantityStepper({ value, onChange, min = 0, max, label = 'item' }: QuantityStepperProps) {
  return (
    <View style={styles.container}>
      <View className="flex-row items-center" style={styles.row}>
        <Button
          variant="plain"
          accessibilityLabel={`Decrease quantity of ${label}`} disabled={value <= min}
          onPress={() => onChange(Math.max(min, value - 1))} style={[styles.control, styles.subtract]}
        >
          <GradientBezel
            radius={tokens.radii.control}
            borderWidth={tokens.subtract.borderWidth} border={tokens.subtract.border}
          />
          <View pointerEvents="none" style={styles.glyph}>
            <Icon name="minus" width={tokens.sizes.quantityGlyph} height={tokens.sizes.quantityGlyph} opacity={value <= min ? 0.5 : 1} />
          </View>
        </Button>
        <AppText
          accessibilityLiveRegion="polite" accessibilityLabel={`${value} ${label}`}
          style={styles.value}
        >{value}</AppText>
        <GradientButton
          accessibilityLabel={`Increase quantity of ${label}`} disabled={max !== undefined && value >= max}
          onPress={() => onChange(Math.min(max ?? Infinity, value + 1))} style={styles.control}
        >
          <Icon name="plus" width={tokens.sizes.quantityGlyph} height={tokens.sizes.quantityGlyph} />
        </GradientButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: tokens.radii.control,
    backgroundColor: tokens.colors.background,
    boxShadow: tokens.shadows.tabInactive,
  },
  row: { gap: tokens.spacing.xs, padding: tokens.spacing.xs },
  control: { paddingHorizontal: tokens.spacing.sm },
  // Keep the specified surface color at the lower bound; dim only the glyph.
  subtract: { backgroundColor: tokens.subtract.background, opacity: 1 },
  glyph: { zIndex: 1 },
  value: { minWidth: tokens.spacing.xl, textAlign: 'center', fontVariant: ['tabular-nums'] },
});
