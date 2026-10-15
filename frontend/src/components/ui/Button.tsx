import type { ReactNode } from 'react';
import {
  Pressable, StyleSheet, View,
  type PressableProps, type StyleProp, type ViewStyle,
} from 'react-native';

import { tokens } from '../../theme/tokens';
import { AppText } from './AppText';
import { GradientBezel } from './GradientBezel';

export type ButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  label?: string;
  children?: ReactNode;
  loading?: boolean;
  variant?: 'surface' | 'accent' | 'plain';
  insetShadow?: string;
  style?: StyleProp<ViewStyle>;
};

export function Button({
  label, children, loading = false, disabled = false, variant = 'surface',
  style, insetShadow, accessibilityState, accessibilityLabel = label, ...props
}: ButtonProps) {
  const content = loading ? <AppText weight="medium" style={styles.label}>Loading…</AppText> : children ?? (
    <AppText weight="medium" style={styles.label}>{label}</AppText>
  );
  return (
    <Pressable
      {...props}
      accessibilityRole={props.accessibilityRole ?? 'button'}
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ ...accessibilityState, disabled: disabled || loading, busy: loading || accessibilityState?.busy }}
      aria-disabled={disabled || loading}
      aria-busy={loading || accessibilityState?.busy}
      aria-selected={props['aria-selected'] ?? accessibilityState?.selected}
      disabled={disabled || loading}
      style={[
        styles.base,
        variant !== 'plain' && styles.surface,
        (disabled || loading) && styles.disabled,
        style,
      ]}
    >
      {variant !== 'plain' && <GradientBezel
        radius={tokens.radii.control} borderWidth={tokens.bezel.borderWidth}
        fill={variant === 'accent' ? tokens.bezel.active : tokens.bezel.inactive}
        border={tokens.bezel.border}
      />}
      {insetShadow && <View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.inset, { boxShadow: insetShadow }]} />}
      {variant === 'plain' ? content : <View pointerEvents="none" style={styles.content}>{content}</View>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: tokens.sizes.control, minWidth: tokens.sizes.control,
    paddingHorizontal: tokens.spacing.lg, paddingVertical: tokens.spacing.sm,
    borderRadius: tokens.radii.control,
    alignItems: 'center', justifyContent: 'center',
  },
  surface: { backgroundColor: tokens.colors.surface, boxShadow: tokens.shadows.raised },
  content: { zIndex: 1, alignItems: 'center', justifyContent: 'center' },
  inset: { borderRadius: tokens.radii.control },
  label: { fontSize: tokens.typography.size.label, lineHeight: tokens.typography.lineHeight.label },
  disabled: { opacity: 0.5 },
});
