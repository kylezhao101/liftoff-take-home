import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient, Polygon, Stop } from 'react-native-svg';

import { tokens } from '../../theme/tokens';

export function DetailBackdrop() {
  const [bounds, setBounds] = useState({ width: 0, height: 0 });
  const referenceHeight = bounds.width > 0 ? bounds.height * 390 / bounds.width : 844;
  // Continue the reference diagonal past the sheet without stretching its slope.
  const bottomLeft = 312 - (312 - 120) * referenceHeight / 394;
  return (
    <View
      testID="detail-backdrop" pointerEvents="none" aria-hidden={true} style={StyleSheet.absoluteFill}
      onLayout={({ nativeEvent: { layout } }) => {
        if (layout.width !== bounds.width || layout.height !== bounds.height) {
          setBounds({ width: layout.width, height: layout.height });
        }
      }}
    >
      <Svg width="100%" height="100%" viewBox={`0 0 390 ${referenceHeight}`} preserveAspectRatio="none">
        <Defs>
          <LinearGradient id="detail-blue" x1="312" y1="0" x2="312" y2={referenceHeight} gradientUnits="userSpaceOnUse">
            <Stop offset="0" stopColor={tokens.gradients.accent[0]} />
            <Stop offset="1" stopColor={tokens.gradients.accent[1]} />
          </LinearGradient>
        </Defs>
        <Polygon points={`312,0 390,0 390,${referenceHeight} ${bottomLeft},${referenceHeight}`} fill="url(#detail-blue)" />
      </Svg>
    </View>
  );
}
