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
};

export function Chip({ label, selected, onPress, icon }: ChipProps) {
  const opacity = selected ? tokens.filters.activeOpacity : tokens.filters.inactiveOpacity;
  return (
    <Button
      label={label} onPress={onPress} accessibilityLabel={label}
      accessibilityState={{ selected }} variant="plain" style={styles.chip}
    >
      <GradientBezel
        size={tokens.sizes.control} radius={tokens.radii.control}
        borderWidth={tokens.bezel.borderWidth}
        fill={selected ? tokens.bezel.active : tokens.bezel.inactive}
        border={tokens.bezel.border}
      />
      <View pointerEvents="none" style={styles.content}>
        {icon ? (
          <Icon name={icon} width={28} height={28} color="white" fillOpacity={1} opacity={opacity} />
        ) : (
          <AppText weight="medium" style={[styles.label, { opacity }]}>{label}</AppText>
        )}
      </View>
    </Button>
  );
}

const styles = StyleSheet.create({
  chip: {
    height: tokens.sizes.control, aspectRatio: 1, flexShrink: 0,
    paddingHorizontal: 0, paddingVertical: 0,
    boxShadow: tokens.shadows.raised,
  },
  content: { zIndex: 1, alignItems: 'center', justifyContent: 'center' },
  label: { fontSize: tokens.typography.size.label, lineHeight: tokens.typography.lineHeight.label },
});
