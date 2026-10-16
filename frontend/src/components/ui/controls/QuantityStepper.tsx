import { StyleSheet, View } from "react-native";

import { tokens } from "../../../theme/tokens";
import { AppText } from "../AppText";
import { Button } from "./Button";
import { GradientButton } from "./GradientButton";
import { Icon } from "../Icon";
import { GradientBezel } from "../surfaces/GradientBezel";

type QuantityStepperProps = {
  value: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  label?: string;
  compact?: boolean;
};

export function QuantityStepper({
  value,
  onChange,
  min = 0,
  max,
  label = "item",
  compact = false,
}: QuantityStepperProps) {
  return (
    <View style={[styles.container, compact && styles.compactContainer]}>
      <View
        className="flex-row items-center"
        style={[styles.row, compact && styles.compactRow]}
      >
        <Button
          variant="plain"
          accessibilityLabel={`Decrease quantity of ${label}`}
          disabled={value <= min}
          hitSlop={compact ? 8 : undefined}
          onPress={() => onChange(Math.max(min, value - 1))}
          style={[
            styles.control,
            styles.subtract,
            compact && styles.compactControl,
          ]}
        >
          <GradientBezel
            radius={
              compact ? tokens.cart.quantityControlRadius : tokens.radii.control
            }
            borderWidth={tokens.subtract.borderWidth}
            border={tokens.subtract.border}
          />
          <View pointerEvents="none" style={styles.glyph}>
            <Icon
              name="minus"
              width={tokens.sizes.quantityGlyph}
              height={tokens.sizes.quantityGlyph}
              opacity={value <= min ? 0.5 : 1}
            />
          </View>
        </Button>
        <AppText
          accessibilityLiveRegion="polite"
          accessibilityLabel={`${value} ${label}`}
          style={[
            styles.value,
            compact && styles.compactValue,
            compact && value < 10 && styles.singleDigitValue,
          ]}
        >
          {value}
        </AppText>
        <GradientButton
          accessibilityLabel={`Increase quantity of ${label}`}
          disabled={max !== undefined && value >= max}
          bezelRadius={compact ? tokens.cart.quantityControlRadius : undefined}
          bezelWidth={
            compact ? tokens.cart.quantityControlBorderWidth : undefined
          }
          hitSlop={compact ? 8 : undefined}
          onPress={() => onChange(Math.min(max ?? Infinity, value + 1))}
          style={[styles.control, compact && styles.compactControl]}
        >
          <Icon
            name="plus"
            width={tokens.sizes.quantityGlyph}
            height={tokens.sizes.quantityGlyph}
          />
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
  value: {
    minWidth: tokens.spacing.xl,
    textAlign: "center",
    fontVariant: ["tabular-nums"],
  },
  compactContainer: {
    minWidth: tokens.cart.quantityMinWidth,
    minHeight: tokens.cart.quantityMinHeight,
    borderRadius: tokens.cart.quantityRadius,
    backgroundColor: tokens.cart.quantityBackground,
    boxShadow: tokens.cart.quantityInsetShadow,
  },
  compactRow: {
    gap: tokens.cart.quantityGap,
    padding: tokens.cart.quantityControlTop,
  },
  compactControl: {
    minWidth: tokens.cart.quantityControlSize,
    width: tokens.cart.quantityControlSize,
    minHeight: tokens.cart.quantityControlSize,
    height: tokens.cart.quantityControlSize,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: tokens.cart.quantityControlRadius,
  },
  compactValue: {
    minWidth: tokens.cart.quantityValueWidth,
    fontSize: 10,
    lineHeight: 15,
  },
  singleDigitValue: { width: tokens.cart.quantityValueWidth },
});
