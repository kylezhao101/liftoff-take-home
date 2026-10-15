import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { useBikeShare } from '../../hooks/use-bike-share';
import { tokens } from '../../theme/tokens';
import { AppText } from '../ui/AppText';
import { Button } from '../ui/Button';

export function BikeSharePanel({ enabled }: { enabled: boolean }) {
  const { state, retry } = useBikeShare(enabled);
  return (
    <View testID="free-data" style={styles.container}>
      <View style={styles.heading}>
        <AppText weight="bold">Vancouver bike share</AppText>
        <AppText style={styles.muted}>Live cycling data · Mobi stations</AppText>
      </View>
      {(state.status === 'idle' || state.status === 'loading') && <View accessibilityRole="progressbar" accessibilityLabel="Loading bike-share availability" style={styles.state}>
        <AppText accessibilityLiveRegion="polite" style={styles.muted}>Loading bike-share availability…</AppText>
        {[0, 1, 2].map(index => <View key={index} style={styles.placeholder} />)}
      </View>}
      {state.status === 'error' && <View style={styles.state}>
        <AppText accessibilityRole="alert" style={styles.muted}>{state.message}</AppText>
        <Button label="Try again" onPress={retry} />
      </View>}
      {state.status === 'success' && <>
        {state.data.stations.length === 0 ? <View style={styles.state}>
          <AppText style={styles.muted}>No stations are reporting availability right now.</AppText>
          <Button label="Refresh availability" onPress={retry} />
        </View> : state.data.stations.map(station => (
          <View key={station.id} style={styles.station}>
            <AppText weight="medium" style={styles.stationName}>{station.name}</AppText>
            <View className="flex-row" style={styles.counts}>
              <AppText style={styles.available}>{station.availableBikes ?? '—'} bikes</AppText>
              <AppText style={styles.muted}>{station.emptyDocks ?? '—'} empty docks</AppText>
            </View>
            {station.updatedAt && <AppText style={styles.timestamp}>Updated {new Date(station.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</AppText>}
          </View>
        ))}
        {state.data.stations.length > 0 && <Button variant="plain" label="Refresh availability" onPress={retry} />}
      </>}
      <Link href="https://citybik.es/" asChild>
        <AppText accessibilityLabel="Data by CityBikes, opens website" style={styles.attribution}>Data by CityBikes ↗</AppText>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: tokens.spacing.md },
  heading: { gap: tokens.spacing.xs },
  muted: { color: tokens.colors.muted, fontSize: tokens.typography.size.label },
  state: { gap: tokens.spacing.md, paddingVertical: tokens.spacing.sm },
  placeholder: { height: 48, borderRadius: tokens.radii.control, backgroundColor: tokens.colors.surface },
  station: { padding: tokens.spacing.md, borderRadius: tokens.radii.control, backgroundColor: tokens.colors.background, gap: tokens.spacing.xs },
  stationName: { fontSize: tokens.typography.size.label },
  counts: { gap: tokens.spacing.lg, flexWrap: 'wrap' },
  available: { color: tokens.colors.accent, fontSize: tokens.typography.size.label },
  timestamp: { color: tokens.colors.muted, fontSize: tokens.typography.size.caption, lineHeight: tokens.typography.lineHeight.caption },
  attribution: { color: tokens.colors.accent, fontSize: tokens.typography.size.caption, textDecorationLine: 'underline', paddingVertical: tokens.spacing.sm },
});
