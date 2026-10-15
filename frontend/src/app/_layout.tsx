import '../../global.css';

import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { fontAssets } from '../theme/fonts';

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(fontAssets);

  if (!fontsLoaded) {
    return (
      <View className="flex-1 items-center justify-center">
        {fontError ? (
          <Text accessibilityRole="alert">Unable to load fonts. Please reload the app.</Text>
        ) : (
          <Text>Loading fonts…</Text>
        )}
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false, animation: 'none' }} />
    </SafeAreaProvider>
  );
}
