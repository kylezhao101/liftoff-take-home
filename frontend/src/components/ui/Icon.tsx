import type { SvgProps } from 'react-native-svg';

import { icons, type IconName } from '../../assets/icons';

type IconProps = SvgProps & { name: IconName };

/** Exported opacity is the default; fillOpacity can normalize paths for filters. */
export function Icon({ name, color, ...props }: IconProps) {
  const Glyph = icons[name];
  return (
    <Glyph
      aria-hidden={true}
      color={color ?? (name === 'search' ? '#FAFEFF' : 'white')}
      {...props}
    />
  );
}
