import { View, type ViewStyle } from 'react-native';

import { tokens } from '../../theme/tokens';
import type { GradientSpec } from '../../utils/gradient';

const cssGradient = ({ angle, stops }: GradientSpec) =>
  `linear-gradient(${angle}deg, ${stops.map(stop => `${stop.color} ${stop.offset * 100}%`).join(', ')})`;

type WebSurfaceStyle = ViewStyle & {
  backgroundImage?: string;
  maskImage?: string;
  maskClip?: string;
  maskComposite?: string;
  WebkitMaskImage?: string;
  WebkitMaskClip?: string;
  WebkitMaskComposite?: string;
};

const surface: WebSurfaceStyle = {
  position: 'absolute', top: 0, right: 0, bottom: 0, left: 0,
  borderTopLeftRadius: tokens.radii.sheet,
  borderTopRightRadius: tokens.radii.sheet,
  backgroundImage: cssGradient(tokens.detail.sheetGradient),
};
const border: WebSurfaceStyle = {
  position: 'absolute', top: 0, right: 0, bottom: 0, left: 0,
  borderTopLeftRadius: tokens.radii.sheet,
  borderTopRightRadius: tokens.radii.sheet,
  padding: tokens.bezel.borderWidth,
  backgroundImage: cssGradient(tokens.bezel.border),
  mixBlendMode: tokens.bezel.blendMode,
  maskImage: 'linear-gradient(#fff 0 0), linear-gradient(#fff 0 0)',
  maskClip: 'content-box, border-box',
  maskComposite: 'exclude',
  WebkitMaskImage: 'linear-gradient(#fff 0 0), linear-gradient(#fff 0 0)',
  WebkitMaskClip: 'content-box, border-box',
  WebkitMaskComposite: 'xor',
};

/** CSS paints immediately as tab content resizes; no measured SVG viewport. */
export function DetailSheetSurface() {
  return (
    <View testID="detail-sheet-surface" pointerEvents="none" aria-hidden={true} style={surface}>
      <View testID="detail-sheet-border" style={border} />
    </View>
  );
}
