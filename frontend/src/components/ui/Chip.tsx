import { StyleSheet, View } from 'react-native';

import { Button } from './Button';
import { AppText } from './AppText';
import { GradientBezel } from './GradientBezel';
import { Icon } from './Icon';
import type { IconName } from '../../assets/icons';
import { tokens } from '../../theme/tokens';

type ChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
  icon?: IconName;
  fluid?: boolean;
};

export function Chip({ label, selected, onPress, icon, fluid = false }: ChipProps) {
  const opacity = selected ? tokens.filters.activeOpacity : tokens.filters.inactiveOpacity;
  return (
    <Button
      label={label} onPress={onPress} accessibilityLabel={label}
      accessibilityState={{ selected }} variant="plain" style={[styles.chip, fluid ? styles.fluid : styles.fixed]}
    >
      <GradientBezel
        size={fluid ? undefined : tokens.sizes.control} radius={tokens.radii.control}
        borderWidth={tokens.bezel.borderWidth}
        fill={selected ? tokens.bezel.active : tokens.bezel.inactive}
        border={tokens.bezel.border}
      />
      <View pointerEvents="none" style={[styles.content, fluid && StyleSheet.absoluteFill]}>
        {icon ? (
          <Icon name={icon} width={fluid ? '60%' : 28} height={fluid ? '60%' : 28} color="white" fillOpacity={1} opacity={opacity} />
        ) : (
          <AppText weight="medium" style={[styles.label, { opacity }]}>{label}</AppText>
        )}
      </View>
    </Button>
  );
}

const styles = StyleSheet.create({
  chip: {
    aspectRatio: 1, flexShrink: 0,
    paddingHorizontal: 0, paddingVertical: 0,
    boxShadow: tokens.shadows.raised,
  },
  fixed: { width: tokens.sizes.control },
  fluid: { width: '100%' },
  content: { zIndex: 1, alignItems: 'center', justifyContent: 'center' },
  label: { fontSize: tokens.typography.size.label, lineHeight: tokens.typography.lineHeight.label },
});
