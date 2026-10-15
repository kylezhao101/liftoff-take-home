import { Image, ScrollView, StyleSheet, View } from 'react-native';

import { productImages, promoImages } from '../assets/catalog';
import { iconNames } from '../assets/icons';
import { Icon } from '../components/ui/Icon';
import { AppText } from '../components/ui/AppText';
import { ComponentPreview } from '../components/ComponentPreview';
import { Card } from '../components/ui/Card';
import { Screen } from '../components/ui/Screen';
import { tokens } from '../theme/tokens';

// Stage (a) review surface; replaced by the product list in stage (b).
export default function SetupScreen() {
  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <ComponentPreview />
        <AppText accessibilityRole="header" weight="bold" style={styles.title}>
          Asset preview
        </AppText>
        <AppText style={styles.muted}>
          Export review only. Screen designs and final tokens follow separately.
        </AppText>
        {Object.entries({ ...productImages, ...promoImages }).map(([name, source]) => (
          <Card key={name} contentStyle={styles.assetContent}>
            <Image
              source={source}
              accessibilityLabel={name}
              resizeMode="contain"
              className="h-40 w-full"
            />
            <AppText>{name}</AppText>
          </Card>
        ))}
        <AppText accessibilityRole="header" weight="bold" style={styles.title}>
          Icons
        </AppText>
        <View className="flex-row flex-wrap gap-4">
          {iconNames.map((name) => (
            <Card key={name} contentStyle={styles.iconAssetContent}>
              <Icon name={name} width={30} height={30} />
              <AppText>{name}</AppText>
            </Card>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: tokens.colors.background },
  content: { gap: tokens.spacing.xl, padding: tokens.spacing.gutter, paddingBottom: tokens.spacing.xxl },
  title: { fontSize: tokens.typography.size.title, lineHeight: tokens.typography.lineHeight.title },
  muted: { color: tokens.colors.muted },
  assetContent: { gap: tokens.spacing.sm },
  iconAssetContent: { gap: tokens.spacing.sm, alignItems: 'center' },
});
