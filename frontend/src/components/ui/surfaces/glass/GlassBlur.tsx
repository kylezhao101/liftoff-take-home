import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';

import { tokens } from '../../../../theme/tokens';

export function GlassBlur() {
  return <BlurView pointerEvents="none" intensity={tokens.list.glass.blur} tint="dark" style={StyleSheet.absoluteFill} />;
}
