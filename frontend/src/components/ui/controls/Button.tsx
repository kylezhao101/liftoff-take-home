import { useEffect, type ReactNode } from "react";
import {
  Pressable,
  StyleSheet,
  View,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { tokens } from "../../../theme/tokens";
import { AppText } from "../AppText";
import { GradientBezel } from "../surfaces/GradientBezel";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type ButtonProps = Omit<PressableProps, "children" | "style"> & {
  label?: string;
  children?: ReactNode;
  loading?: boolean;
  variant?: "surface" | "accent" | "plain";
  shrinkOnPress?: boolean;
  insetShadow?: string;
  bezelRadius?: number;
  bezelWidth?: number;
  style?: StyleProp<ViewStyle>;
};

export function Button({
  label,
  children,
  loading = false,
  disabled = false,
  variant = "surface",
  shrinkOnPress = variant === "accent",
  style,
  insetShadow,
  bezelRadius = tokens.radii.control,
  bezelWidth = tokens.bezel.borderWidth,
  accessibilityState,
  accessibilityLabel = label,
  onPressIn,
  onPressOut,
  ...props
}: ButtonProps) {
  const scale = useSharedValue(1);
  const blocked = disabled || loading;
  const pressStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.get() }],
  }));

  useEffect(() => {
    if (blocked || !shrinkOnPress) scale.set(1);
  }, [blocked, shrinkOnPress, scale]);

  const content = loading ? (
    <AppText weight="medium" style={styles.label}>
      Loading…
    </AppText>
  ) : (
    (children ?? (
      <AppText weight="medium" style={styles.label}>
        {label}
      </AppText>
    ))
  );
  return (
    <AnimatedPressable
      {...props}
      accessibilityRole={props.accessibilityRole ?? "button"}
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{
        ...accessibilityState,
        disabled: disabled || loading,
        busy: loading || accessibilityState?.busy,
      }}
      aria-disabled={disabled || loading}
      aria-busy={loading || accessibilityState?.busy}
      aria-selected={props["aria-selected"] ?? accessibilityState?.selected}
      disabled={disabled || loading}
      onPressIn={(event) => {
        if (shrinkOnPress && !blocked) {
          scale.set(withTiming(tokens.motion.accentPress.scale, {
            duration: tokens.motion.accentPress.pressDuration,
            easing: Easing.out(Easing.quad),
          }));
        }
        onPressIn?.(event);
      }}
      onPressOut={(event) => {
        if (shrinkOnPress) {
          scale.set(withTiming(1, {
            duration: tokens.motion.accentPress.releaseDuration,
            easing: Easing.out(Easing.quad),
          }));
        }
        onPressOut?.(event);
      }}
      style={[
        styles.base,
        variant !== "plain" && styles.surface,
        (disabled || loading) && styles.disabled,
        style,
        shrinkOnPress && pressStyle,
      ]}
    >
      {variant !== "plain" && (
        <GradientBezel
          radius={bezelRadius}
          borderWidth={bezelWidth}
          fill={
            variant === "accent" ? tokens.bezel.active : tokens.bezel.inactive
          }
          border={tokens.bezel.border}
        />
      )}
      {insetShadow && (
        <View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            styles.inset,
            { boxShadow: insetShadow },
          ]}
        />
      )}
      {variant === "plain" ? (
        content
      ) : (
        <View pointerEvents="none" style={styles.content}>
          {content}
        </View>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: tokens.sizes.control,
    minWidth: tokens.sizes.control,
    paddingHorizontal: tokens.spacing.lg,
    paddingVertical: tokens.spacing.sm,
    borderRadius: tokens.radii.control,
    alignItems: "center",
    justifyContent: "center",
  },
  surface: {
    backgroundColor: tokens.colors.surface,
    boxShadow: tokens.shadows.raised,
  },
  content: { zIndex: 1, alignItems: "center", justifyContent: "center" },
  inset: { borderRadius: tokens.radii.control },
  label: {
    fontSize: tokens.typography.size.label,
    lineHeight: tokens.typography.lineHeight.label,
  },
  disabled: { opacity: 0.5 },
});
