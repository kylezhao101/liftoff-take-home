import { Stack } from 'expo-router';

import { tokens } from '../../theme/tokens';

/** Native push transitions enter from the right and reverse when going back. */
export function NavigationStack() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        contentStyle: { backgroundColor: tokens.colors.background },
      }}
    />
  );
}
