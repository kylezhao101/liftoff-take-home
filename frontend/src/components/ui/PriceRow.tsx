import { StyleSheet, View, type ViewProps } from 'react-native';

import { tokens } from '../../theme/tokens';
import { AppText } from './AppText';

type PriceRowProps = ViewProps & { label: string; value: string; emphasized?: boolean };

export function PriceRow({ label, value, emphasized = false, style, ...props }: PriceRowProps) {
  return (
    <View {...props} className="flex-row items-center justify-between" style={[styles.row, style]}>
      <AppText style={styles.label}>{label}</AppText>
      <AppText weight={emphasized ? 'bold' : 'regular'} style={[styles.value, emphasized && styles.emphasized]}>
        {value}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { gap: tokens.spacing.lg },
  label: { flexShrink: 1, fontSize: tokens.typography.size.label },
  value: { fontSize: tokens.typography.size.label, color: tokens.colors.muted, fontVariant: ['tabular-nums'] },
  emphasized: { color: tokens.colors.accent, fontSize: tokens.typography.size.subtitle },
});
