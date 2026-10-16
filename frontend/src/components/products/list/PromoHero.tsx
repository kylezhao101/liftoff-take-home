import { Image, StyleSheet, View } from 'react-native';

import { promoImages } from '../../../assets/catalog';
import { tokens } from '../../../theme/tokens';
import { AppText } from '../../ui/AppText';
import { Card } from '../../ui/surfaces/Card';

export function PromoHero() {
  return (
    <Card testID="promo-hero" shape="hero" glass contentStyle={styles.content}>
      <View style={styles.imageFrame}>
        <Image source={promoImages['hero-bike']} accessibilityLabel="Electric sport bicycle promotion" resizeMode="contain" style={styles.image} />
      </View>
      <AppText weight="bold" style={styles.discount}>30% Off</AppText>
    </Card>
  );
}

const styles = StyleSheet.create({
  content: { aspectRatio: tokens.list.heroAspectRatio, padding: tokens.spacing.lg },
  imageFrame: { flex: 1 },
  image: { position: 'absolute', width: '100%', height: '100%' },
  discount: { fontSize: tokens.list.heroDiscountSize, lineHeight: 42, color: tokens.colors.muted },
});
