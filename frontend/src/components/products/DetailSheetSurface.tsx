import { tokens } from '../../theme/tokens';
import { GradientBezel } from '../ui/GradientBezel';

export function DetailSheetSurface() {
  return <GradientBezel
    radius={tokens.radii.sheet} roundBottom={false} borderWidth={tokens.bezel.borderWidth}
    fill={tokens.detail.sheetGradient} border={tokens.bezel.border}
  />;
}
