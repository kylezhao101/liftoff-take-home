import { Text, type TextProps } from 'react-native';

import { fontFamilies } from '../../theme/fonts';
import { tokens } from '../../theme/tokens';

type AppTextProps = TextProps & { weight?: keyof typeof fontFamilies };

export function AppText({ weight = 'regular', style, ...props }: AppTextProps) {
  return (
    <Text
      style={[{
        fontFamily: fontFamilies[weight],
        color: tokens.colors.text,
        fontSize: tokens.typography.size.body,
        lineHeight: tokens.typography.lineHeight.body,
      }, style]}
      {...props}
    />
  );
}
