import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { tokens } from '../../../theme/tokens';
import { AppText } from '../AppText';
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
      {options.map((option) => (
        <TabButton
          key={option.value}
          label={option.label}
          selected={option.value === value}
          onPress={() => onChange(option.value)}
        />
      ))}
    </View>
  );
}

type TabButtonProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

function TabButton({ label, selected, onPress }: TabButtonProps) {
  const progress = useSharedValue(selected ? 1 : 0);

  useEffect(() => {
    progress.set(withTiming(selected ? 1 : 0, {
      duration: tokens.motion.skeuomorphicTransitionDuration,
      easing: Easing.inOut(Easing.quad),
    }));
  }, [selected, progress]);

  const raisedStyle = useAnimatedStyle(() => ({ opacity: progress.get() }));
  const recessedStyle = useAnimatedStyle(() => ({ opacity: 1 - progress.get() }));

  return (
    <View style={[styles.slot, selected && styles.selected]}>
      {/* Crossfade fixed shadows: inset and outer shadows can't interpolate. */}
      <Animated.View
        pointerEvents="none" aria-hidden
        style={[StyleSheet.absoluteFill, styles.inactive, recessedStyle]}
      />
      <Animated.View
        pointerEvents="none" aria-hidden
        style={[StyleSheet.absoluteFill, styles.raised, raisedStyle]}
      />
      <Button
        variant="plain" accessibilityRole="tab"
        accessibilityLabel={label} accessibilityState={{ selected }}
        onPress={onPress} style={styles.tab}
      >
        <View pointerEvents="none" aria-hidden style={styles.labelFrame}>
          <Animated.View style={[styles.labelLayer, recessedStyle]}>
            <AppText style={[styles.label, styles.mutedLabel]}>{label}</AppText>
          </Animated.View>
          <Animated.View style={[StyleSheet.absoluteFill, styles.labelLayer, raisedStyle]}>
            <AppText weight="bold" style={[styles.label, styles.activeLabel]}>{label}</AppText>
          </Animated.View>
        </View>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { gap: tokens.spacing.lg, overflow: 'visible' },
  slot: { flex: 1, borderRadius: tokens.radii.control, overflow: 'visible' },
  raised: {
    borderRadius: tokens.radii.control,
    backgroundColor: tokens.colors.surface,
    boxShadow: tokens.shadows.tabSelected,
  },
  selected: { zIndex: 1 },
  tab: { paddingHorizontal: tokens.spacing.sm },
  inactive: { borderRadius: tokens.radii.control, backgroundColor: tokens.colors.background, boxShadow: tokens.shadows.tabInactive },
  labelFrame: { width: '100%' },
  labelLayer: { alignItems: 'center', justifyContent: 'center' },
  mutedLabel: { color: tokens.colors.muted },
  activeLabel: { color: tokens.colors.accent },
  label: { fontSize: tokens.typography.size.label, lineHeight: tokens.typography.lineHeight.label },
});
