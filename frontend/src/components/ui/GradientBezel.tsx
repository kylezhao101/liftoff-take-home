import { useId, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

import { tokens } from '../../theme/tokens';
import { cssGradientToSvg, type GradientSpec } from '../../utils/gradient';

type GradientBezelProps = {
  size?: number;
  radius: number;
  borderWidth: number;
  fill?: GradientSpec;
  border: GradientSpec;
  roundBottom?: boolean;
  blendMode?: 'normal' | 'overlay';
};

export function GradientDefinition({ id, spec, width, height }: {
  id: string; spec: GradientSpec; width: number; height: number;
}) {
  const { stops, ...points } = cssGradientToSvg(spec, width, height);
  return (
    <Defs>
      <LinearGradient id={id} gradientUnits="userSpaceOnUse" {...points}>
        {stops.map((stop, index) => <Stop key={index} offset={stop.offset} stopColor={stop.color} />)}
      </LinearGradient>
    </Defs>
  );
}

/** Separate border layer; blending never changes the fill. */
export function GradientBezel({ size, radius, borderWidth, fill, border, roundBottom = true, blendMode = tokens.bezel.blendMode }: GradientBezelProps) {
  const id = useId().replace(/:/g, '');
  const [bounds, setBounds] = useState({ width: size ?? 0, height: size ?? 0 });
  const { width, height } = bounds;
  const halfBorder = borderWidth / 2;
  const viewBox = `0 0 ${width} ${height}`;
  const topRoundedPath = (inset: number) => {
    const right = width - inset;
    const bottom = height - inset;
    const r = Math.max(0, Math.min(radius - inset, (width - 2 * inset) / 2, height - 2 * inset));
    return `M${inset + r} ${inset} H${right - r} Q${right} ${inset} ${right} ${inset + r} V${bottom} H${inset} V${inset + r} Q${inset} ${inset} ${inset + r} ${inset} Z`;
  };
  return (
    <View
      pointerEvents="none" aria-hidden={true}
      style={[StyleSheet.absoluteFill, fill && styles.isolatedFill]}
      onLayout={({ nativeEvent: { layout } }) => {
        if (layout.width !== width || layout.height !== height) {
          setBounds({ width: layout.width, height: layout.height });
        }
      }}
    >
      {width > 0 && height > 0 && <>
        {fill && <Svg width="100%" height="100%" viewBox={viewBox} style={StyleSheet.absoluteFill}>
          <GradientDefinition id={`${id}-fill`} spec={fill} {...bounds} />
          {roundBottom ? <Rect width={width} height={height} rx={radius} fill={`url(#${id}-fill)`} />
            : <Path d={topRoundedPath(0)} fill={`url(#${id}-fill)`} />}
        </Svg>}
        <View style={[StyleSheet.absoluteFill, { mixBlendMode: blendMode }]}>
          <Svg width="100%" height="100%" viewBox={viewBox}>
            <GradientDefinition id={`${id}-border`} spec={border} {...bounds} />
            {roundBottom ? <Rect
              x={halfBorder} y={halfBorder}
              width={Math.max(0, width - borderWidth)} height={Math.max(0, height - borderWidth)}
              rx={Math.max(0, radius - halfBorder)} fill="none"
              stroke={`url(#${id}-border)`} strokeWidth={borderWidth}
            /> : <Path d={topRoundedPath(halfBorder)} fill="none" stroke={`url(#${id}-border)`} strokeWidth={borderWidth} />}
          </Svg>
        </View>
      </>}
    </View>
  );
}

const styles = StyleSheet.create({
  // Filled surfaces blend against their own background; border-only inputs use
  // the input background outside this component as their blending backdrop.
  isolatedFill: { isolation: 'isolate' },
});
