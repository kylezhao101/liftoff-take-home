import { StyleSheet, View } from 'react-native';

import { tokens } from '../../theme/tokens';
import { AppText } from './AppText';
import { Button } from './Button';

export type TabOption<T extends string> = { value: T; label: string };
type TabSwitcherProps<T extends string> = {
  options: readonly TabOption<T>[];
  value: T;
  onChange: (value: T) => void;
};

export function TabSwitcher<T extends string>({ options, value, onChange }: TabSwitcherProps<T>) {
  return (
    <View accessibilityRole="tablist" className="flex-row" style={styles.row}>
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <View
            key={option.value}
            style={[styles.slot, selected && styles.raised]}
          >
            <Button
              variant="plain" accessibilityRole="tab"
              accessibilityLabel={option.label} accessibilityState={{ selected }}
              onPress={() => onChange(option.value)}
              style={[styles.tab, !selected && styles.inactive]}
            >
              <AppText weight={selected ? 'bold' : 'regular'} style={[styles.label, { color: selected ? tokens.colors.accent : tokens.colors.muted }]}>
                {option.label}
              </AppText>
            </Button>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { gap: tokens.spacing.lg, overflow: 'visible' },
  slot: { flex: 1, borderRadius: tokens.radii.control, overflow: 'visible' },
  raised: {
    backgroundColor: tokens.colors.surface,
    boxShadow: tokens.shadows.tabSelected,
    zIndex: 1,
  },
  tab: { paddingHorizontal: tokens.spacing.sm },
  inactive: { backgroundColor: tokens.colors.background, boxShadow: tokens.shadows.tabInactive },
  label: { fontSize: tokens.typography.size.label, lineHeight: tokens.typography.lineHeight.label },
});
