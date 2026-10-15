import type { ComponentProps } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

type ScreenProps = ComponentProps<typeof SafeAreaView>;

export function Screen({ className = '', ...props }: ScreenProps) {
  return <SafeAreaView className={`flex-1 ${className}`} {...props} />;
}
