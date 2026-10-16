import { View, type ViewStyle } from 'react-native';

import { tokens } from '../../../../theme/tokens';

// CSS-only properties are kept in the web implementation, outside native styles.
const glassStyle: ViewStyle & { backdropFilter: string; WebkitBackdropFilter: string } = {
  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
  backdropFilter: `blur(${tokens.list.glass.blur}px)`,
  WebkitBackdropFilter: `blur(${tokens.list.glass.blur}px)`,
};

export function GlassBlur() {
  return <View pointerEvents="none" testID="glass-blur" style={glassStyle} />;
}
