import { useState, type KeyboardEvent } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  cancelAnimation,
  clamp,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

import { tokens } from '../../theme/tokens';
import { AppText } from '../ui/AppText';
import { Icon } from '../ui/Icon';
import { GradientBezel } from '../ui/surfaces/GradientBezel';

const travel = tokens.cart.checkoutWidth - tokens.sizes.control;
const settleConfig = {
  duration: tokens.motion.checkout.settleDuration,
  easing: Easing.out(Easing.quad),
};

export function CheckoutSlider({ disabled = false }: { disabled?: boolean }) {
  const [completed, setCompleted] = useState(false);
  const position = useSharedValue(0);
  const start = useSharedValue(0);
  const pointerStart = useSharedValue(0);
  const locked = useSharedValue(false);
  const markComplete = () => setCompleted(true);

  const finishSlide = () => {
    'worklet';
    if (locked.get()) return;
    locked.set(true);
    position.set(withTiming(travel, settleConfig, (finished) => {
      if (finished) scheduleOnRN(markComplete);
    }));
  };

  const completeAccessible = () => {
    if (!disabled) finishSlide();
  };

  const pan = Gesture.Pan()
    .enabled(!disabled && !completed)
    .activeOffsetX([-5, 5])
    .failOffsetY([-12, 12])
    .onBegin((event) => {
      if (locked.get()) return;
      cancelAnimation(position);
      start.set(position.get());
      pointerStart.set(event.absoluteX);
    })
    .onUpdate((event) => {
      if (!locked.get()) position.set(clamp(start.get() + event.absoluteX - pointerStart.get(), 0, travel));
    })
    .onEnd((_event, success) => {
      if (locked.get()) return;
      if (success && position.get() >= travel * tokens.motion.checkout.completionThreshold) {
        finishSlide();
      } else {
        position.set(withTiming(0, settleConfig));
      }
    })
    .onFinalize((_event, success) => {
      if (!success && !locked.get()) position.set(withTiming(0, settleConfig));
    });

  const handleStyle = useAnimatedStyle(() => ({ transform: [{ translateX: position.get() }] }));
  const checkoutStyle = useAnimatedStyle(() => ({ opacity: 1 - position.get() / travel }));
  const doneStyle = useAnimatedStyle(() => ({ opacity: position.get() / travel }));
  const webKeyboardProps = Platform.OS === 'web' ? {
    onKeyDown: (event: KeyboardEvent) => {
      if (['Enter', ' ', 'ArrowRight', 'End'].includes(event.key)) {
        event.preventDefault();
        completeAccessible();
      }
    },
  } : {};

  return (
    <View style={styles.container}>
      <View
        {...webKeyboardProps}
        testID="checkout-slider"
        accessible
        accessibilityRole="adjustable"
        role="slider"
        accessibilityLabel="Checkout"
        accessibilityHint="Drag the arrow to the right to complete checkout."
        accessibilityState={{ disabled: disabled || completed }}
        aria-disabled={disabled || completed}
        aria-valuemin={0}
        aria-valuemax={1}
        aria-valuenow={completed ? 1 : 0}
        aria-valuetext={completed ? 'Done!' : 'Slide right to checkout'}
        accessibilityValue={{ min: 0, max: 1, now: completed ? 1 : 0, text: completed ? 'Done!' : 'Slide right to checkout' }}
        accessibilityActions={[{ name: 'increment', label: 'Complete checkout' }, { name: 'activate', label: 'Complete checkout' }]}
        onAccessibilityAction={({ nativeEvent }) => {
          if (['increment', 'activate'].includes(nativeEvent.actionName)) completeAccessible();
        }}
        onAccessibilityTap={completeAccessible}
        tabIndex={disabled || completed ? -1 : 0}
        style={[styles.track, disabled && styles.disabled]}
      >
        <Animated.View pointerEvents="none" aria-hidden style={[styles.label, styles.checkoutLabel, checkoutStyle]}>
          <AppText style={styles.text}>Checkout</AppText>
        </Animated.View>
        <Animated.View pointerEvents="none" aria-hidden style={[styles.label, styles.doneLabel, doneStyle]}>
          <AppText style={styles.text}>Done!</AppText>
        </Animated.View>
        <GestureDetector gesture={pan} touchAction="pan-y">
          <Animated.View testID="checkout-handle" accessible={false} style={[styles.handle, handleStyle]}>
            <GradientBezel
              radius={tokens.radii.control}
              borderWidth={tokens.bezel.borderWidth}
              fill={tokens.bezel.active}
              border={tokens.bezel.border}
            />
            <View pointerEvents="none" aria-hidden style={styles.icon}>
              <Icon name="chevron-right" width={tokens.sizes.icon} height={tokens.sizes.icon} />
            </View>
          </Animated.View>
        </GestureDetector>
      </View>
      {completed && (
        <AppText accessibilityLiveRegion="polite" style={styles.message}>
          Checkout is not available in this demo.
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: tokens.spacing.xl, alignItems: 'center' },
  track: {
    width: tokens.cart.checkoutWidth,
    height: tokens.sizes.control,
    borderRadius: tokens.radii.control,
    backgroundColor: tokens.colors.deep,
    boxShadow: tokens.shadows.inset,
  },
  handle: {
    width: tokens.sizes.control,
    height: tokens.sizes.control,
    borderRadius: tokens.radii.control,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    zIndex: 1,
  },
  icon: { zIndex: 1 },
  label: { position: 'absolute', top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' },
  checkoutLabel: { left: tokens.sizes.control, right: 0 },
  doneLabel: { left: 0, right: tokens.sizes.control },
  text: { color: tokens.colors.muted },
  disabled: { opacity: 0.5 },
  message: { color: tokens.colors.muted, textAlign: 'center', fontSize: tokens.typography.size.caption, marginTop: tokens.spacing.sm },
});
