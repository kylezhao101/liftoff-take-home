import { Image, ScrollView, Text, View } from 'react-native';

import { productImages, promoImages } from '../assets/catalog';
import { iconNames } from '../assets/icons';
import { Icon } from '../components/ui/Icon';
import { Screen } from '../components/ui/Screen';

// Setup screen only. These utilities are not design tokens for the bike UI.
export default function SetupScreen() {
  return (
    <Screen className="bg-slate-900">
      <ScrollView contentContainerClassName="gap-6 p-6">
        <Text accessibilityRole="header" className="text-xl font-bold text-white">
          Asset preview
        </Text>
        <Text className="text-slate-300">
          Export review only. Screen designs and final tokens follow separately.
        </Text>
        {Object.entries({ ...productImages, ...promoImages }).map(([name, source]) => (
          <View key={name} className="gap-2 rounded-xl bg-slate-800 p-4">
            <Image
              source={source}
              accessibilityLabel={name}
              resizeMode="contain"
              className="h-40 w-full"
            />
            <Text className="text-white">{name}</Text>
          </View>
        ))}
        <Text accessibilityRole="header" className="text-xl font-bold text-white">
          Icons
        </Text>
        <View className="flex-row flex-wrap gap-4">
          {iconNames.map((name) => (
            <View key={name} className="items-center gap-2 rounded-xl bg-slate-800 p-4">
              <Icon name={name} width={30} height={30} />
              <Text className="text-white">{name}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}
