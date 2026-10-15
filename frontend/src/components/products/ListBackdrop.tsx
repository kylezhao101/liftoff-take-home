import { StyleSheet, View } from 'react-native';
import Svg from 'react-native-svg';

import BackgroundLayer from '../../../assets/images/backgrounds/product-list-backdrop.svg';

export function ListBackdrop() {
  return (
    <View testID="list-backdrop" pointerEvents="none" aria-hidden={true} style={StyleSheet.absoluteFill}>
      <Svg width="100%" height="100%" viewBox="0 0 390 844" preserveAspectRatio="none">
        {/* The export already includes its horizontal offset and crop. */}
        <BackgroundLayer x={0} y={149} width={390} height={695} preserveAspectRatio="none" />
      </Svg>
    </View>
  );
}
