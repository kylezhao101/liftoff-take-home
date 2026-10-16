import { Stack } from 'expo-router/js-stack';
import { StyleSheet, View } from 'react-native';

import { tokens } from '../../theme/tokens';

/** The native stack doesn't animate on web; use Router's animated JS stack. */
export function NavigationStack() {
  return (
    // Clip translated screens so mobile browsers don't expand the layout viewport
    // during a push and leave bottom-anchored controls below the visible screen.
    <View style={styles.viewport}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          // Keep scrolling inside each screen instead of growing the page.
          cardStyle: { flex: 1, minHeight: 0, backgroundColor: tokens.colors.background },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewport: { flex: 1, overflow: 'hidden' },
});
