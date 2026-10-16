import '../../global.css';

import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { fontAssets } from '../theme/fonts';
import { NavigationStack } from '../components/navigation/NavigationStack';

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="light" animated={false} />
        <NavigationStack />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
