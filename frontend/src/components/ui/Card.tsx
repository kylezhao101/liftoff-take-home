import { StyleSheet, View, type ViewProps, type StyleProp, type ViewStyle } from 'react-native';

import { tokens } from '../../theme/tokens';
import type { GradientSpec } from '../../utils/gradient';
import { GradientBezel } from './GradientBezel';
import { GlassBlur } from './GlassBlur';
import { GradientSilhouette } from './GradientSilhouette';

type CardProps = ViewProps & {
  contentStyle?: StyleProp<ViewStyle>;
  surfaceStyle?: StyleProp<ViewStyle>;
  glass?: boolean;
  border?: GradientSpec;
  shape?: 'rounded' | 'hero';
};

export function Card({ style, contentStyle, surfaceStyle, glass = false, border = tokens.bezel.border, shape = 'rounded', children, ...props }: CardProps) {
  return (
    <View {...props} style={[styles.card, style]}>
      <View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.surface, (glass || shape === 'hero') && styles.clear, shape === 'hero' && styles.shapedShadow, glass && shape === 'rounded' && styles.glassShadow, surfaceStyle]}>
        {glass && shape === 'rounded' && <View style={[StyleSheet.absoluteFill, styles.glassClip]}>
          <GlassBlur />
          <View style={[StyleSheet.absoluteFill, styles.glassTint]} />
        </View>}
        {shape === 'hero' ? <GradientSilhouette shape="hero" glass={glass} /> : <GradientBezel
          radius={tokens.radii.card} borderWidth={tokens.bezel.borderWidth}
          fill={glass ? undefined : tokens.bezel.inactive} border={border}
        />}
      </View>
      <View style={[styles.content, contentStyle]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: tokens.radii.card },
  surface: {
    borderRadius: tokens.radii.card, backgroundColor: tokens.colors.surface,
    boxShadow: tokens.shadows.raised,
  },
  content: { padding: tokens.spacing.lg, zIndex: 1 },
  clear: { backgroundColor: 'transparent' },
  shapedShadow: { boxShadow: 'none' },
  glassClip: { overflow: 'hidden', borderRadius: tokens.radii.card },
  glassShadow: { boxShadow: tokens.list.glass.shadow },
  glassTint: { backgroundColor: tokens.colors.surface, opacity: tokens.list.glass.tintOpacity },
});
