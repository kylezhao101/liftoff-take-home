import MaskedView from '@react-native-masked-view/masked-view';
import { StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { GlassBlur } from './GlassBlur';

type ShapedGlassBlurProps = { path: string; width: number; height: number };

export function ShapedGlassBlur({ path, width, height }: ShapedGlassBlurProps) {
  return (
    <MaskedView
      pointerEvents="none" style={StyleSheet.absoluteFill}
      maskElement={<Svg width={width} height={height}><Path d={path} fill="black" /></Svg>}
    >
      <GlassBlur />
    </MaskedView>
  );
}
