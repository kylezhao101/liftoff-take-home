import { Button, type ButtonProps } from './Button';

type GradientButtonProps = Omit<ButtonProps, 'variant'>;

export function GradientButton(props: GradientButtonProps) {
  return <Button {...props} variant="accent" />;
}
