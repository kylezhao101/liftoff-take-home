import { useId } from 'react';
import Svg, { Defs, Mask, Rect } from 'react-native-svg';

import { tokens } from '../../theme/tokens';
import { GradientDefinition } from '../ui/GradientBezel';
import { Icon } from '../ui/Icon';

export function FavoriteIcon({ selected }: { selected: boolean }) {
  const id = useId().replace(/:/g, '');
  if (!selected) return <Icon name="heart" width={20} height={18} color="white" />;
  return (
    <Svg width={20} height={18} viewBox="0 0 20 18" aria-hidden={true}>
      <GradientDefinition id={`${id}-gradient`} spec={tokens.list.favorite} width={20} height={18} />
      <Defs>
        <Mask id={`${id}-mask`} maskUnits="userSpaceOnUse" x={0} y={0} width={20} height={18}>
          <Icon name="heart" width={20} height={18} color="white" />
        </Mask>
      </Defs>
      <Rect width={20} height={18} fill={`url(#${id}-gradient)`} mask={`url(#${id}-mask)`} />
    </Svg>
  );
}
