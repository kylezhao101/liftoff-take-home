import { StyleSheet, View, type ViewStyle } from 'react-native';

import { tokens } from '../../../../theme/tokens';

type ShapedGlassBlurProps = { path: string; width: number; height: number };

export function ShapedGlassBlur({ path }: ShapedGlassBlurProps) {
  // Clip and blur must share an element: a clipping ancestor creates a backdrop
  // root and prevents a child blur from sampling the scene behind the card.
  const glass: ViewStyle & { clipPath: string; backdropFilter: string; WebkitBackdropFilter: string } = {
    clipPath: `path('${path}')`,
    backdropFilter: `blur(${tokens.list.glass.blur}px)`,
    WebkitBackdropFilter: `blur(${tokens.list.glass.blur}px)`,
  };
  return <View pointerEvents="none" testID="glass-blur" style={[StyleSheet.absoluteFill, glass]} />;
}
