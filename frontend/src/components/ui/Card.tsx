import { StyleSheet, View, type ViewProps, type StyleProp, type ViewStyle } from 'react-native';

import { tokens } from '../../theme/tokens';
import { GradientBezel } from './GradientBezel';

type CardProps = ViewProps & { contentStyle?: StyleProp<ViewStyle> };

export function Card({ style, contentStyle, children, ...props }: CardProps) {
  return (
    <View {...props} style={[styles.card, style]}>
      <GradientBezel
        radius={tokens.radii.card} borderWidth={tokens.bezel.borderWidth}
        fill={tokens.bezel.inactive} border={tokens.bezel.border}
      />
      <View style={[styles.content, contentStyle]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: tokens.radii.card, backgroundColor: tokens.colors.surface,
    boxShadow: tokens.shadows.raised,
  },
  content: { padding: tokens.spacing.lg, zIndex: 1 },
});
