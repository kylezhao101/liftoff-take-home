import type { SvgProps } from 'react-native-svg';

import { icons, type IconName } from '../../assets/icons';

type IconProps = SvgProps & { name: IconName };

/** Keeps exported geometry/opacity; supports color overrides for active states. */
export function Icon({ name, color, ...props }: IconProps) {
  const Glyph = icons[name];
  return (
    <Glyph
      accessible={false}
      color={color ?? (name === 'search' ? '#FAFEFF' : 'white')}
      {...props}
    />
  );
}
