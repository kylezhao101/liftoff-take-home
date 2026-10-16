import { StyleSheet, TextInput, View, type TextInputProps, type StyleProp, type ViewStyle } from 'react-native';

import { fontFamilies } from '../../../theme/fonts';
import { tokens } from '../../../theme/tokens';

type TextFieldProps = TextInputProps & { containerStyle?: StyleProp<ViewStyle> };

export function TextField({ style, containerStyle, placeholderTextColor = tokens.colors.muted, ...props }: TextFieldProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        {...props}
        placeholderTextColor={placeholderTextColor}
        style={[styles.input, style]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { borderRadius: tokens.radii.control, backgroundColor: tokens.colors.deep, boxShadow: tokens.shadows.inset },
  input: {
    minHeight: tokens.sizes.control,
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.sm,
    borderRadius: tokens.radii.control,
    color: tokens.colors.text,
    fontFamily: fontFamilies.regular,
    fontSize: tokens.typography.size.label,
  },
});
