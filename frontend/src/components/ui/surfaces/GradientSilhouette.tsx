import { useId, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import Svg, {
  Defs,
  FeGaussianBlur,
  FeOffset,
  Filter,
  Path,
} from "react-native-svg";

import { tokens } from "../../../theme/tokens";
import { GradientDefinition } from "./GradientBezel";
import { ShapedGlassBlur } from "./glass/ShapedGlassBlur";

type GradientSilhouetteProps = {
  shape: "hero" | "navigation";
  glass?: boolean;
};

/** Shaped background only; foreground imagery and icons stay upright. */
export function GradientSilhouette({
  shape,
  glass = false,
}: GradientSilhouetteProps) {
  const id = useId().replace(/:/g, "");
  const [bounds, setBounds] = useState({ width: 0, height: 0 });
  const { width: w, height: h } = bounds;
  const slopeRatio = Math.tan(
    ((shape === "hero"
      ? tokens.list.heroBottomSlope
      : tokens.list.navTopSlope) *
      Math.PI) /
    180,
  );
  const slope = slopeRatio * w;
  const r = tokens.radii.card;
  const path =
    shape === "navigation"
      ? `M0 ${slope} L${w} 0 V${h} H0 Z`
      : `M${r} 0 H${w - r} Q${w} 0 ${w} ${r} V${h - slope - r} Q${w} ${h - slope} ${w - r} ${h - slope + r * slopeRatio} L${r} ${h - r * slopeRatio} Q0 ${h} 0 ${h - r} V${r} Q0 0 ${r} 0 Z`;

  return (
    <>
      {/* Keep web backdrop sampling outside the SVG surface group. Nesting it
          inside that group leaves the background sharp in Chromium. */}
      {glass && Platform.OS === "web" && w > 0 && h > 0 && (
        <ShapedGlassBlur path={path} width={w} height={h} />
      )}
      <View
        pointerEvents="none"
        aria-hidden={true}
        style={[StyleSheet.absoluteFill, !glass && styles.isolation]}
        onLayout={({ nativeEvent: { layout } }) => {
          if (layout.width !== w || layout.height !== h)
            setBounds({ width: layout.width, height: layout.height });
        }}
      >
        {w > 0 && h > 0 && (
          <>
            {shape === "hero" && (
              <Svg
                width={w + 80}
                height={h + 80}
                viewBox={`-40 -40 ${w + 80} ${h + 80}`}
                style={styles.shadow}
              >
                <Defs>
                  <Filter
                    id={`${id}-shadow-dark`}
                    filterUnits="userSpaceOnUse"
                    x={-40}
                    y={-40}
                    width={w + 80}
                    height={h + 80}
                  >
                    <FeGaussianBlur stdDeviation={10} />
                    <FeOffset dx={4} dy={8} />
                  </Filter>
                  <Filter
                    id={`${id}-shadow-light`}
                    filterUnits="userSpaceOnUse"
                    x={-40}
                    y={-40}
                    width={w + 80}
                    height={h + 80}
                  >
                    <FeGaussianBlur stdDeviation={4} />
                    <FeOffset dx={-2} dy={-2} />
                  </Filter>
                </Defs>
                <Path
                  d={path}
                  fill="black"
                  opacity={0.32}
                  filter={`url(#${id}-shadow-dark)`}
                />
                <Path
                  d={path}
                  fill="white"
                  opacity={0.04}
                  filter={`url(#${id}-shadow-light)`}
                />
              </Svg>
            )}
            {glass && Platform.OS !== "web" && (
              <ShapedGlassBlur path={path} width={w} height={h} />
            )}
            <Svg
              width="100%"
              height="100%"
              viewBox={`0 0 ${w} ${h}`}
              style={StyleSheet.absoluteFill}
              opacity={glass ? tokens.list.glass.tintOpacity : 1}
            >
              <GradientDefinition
                id={`${id}-fill`}
                spec={tokens.bezel.inactive}
                {...bounds}
              />
              <Path d={path} fill={`url(#${id}-fill)`} />
            </Svg>
            <View style={[StyleSheet.absoluteFill, styles.border]}>
              <Svg
                width={w + 2}
                height={h + 2}
                viewBox={`-1 -1 ${w + 2} ${h + 2}`}
                style={styles.strokeBounds}
              >
                <GradientDefinition
                  id={`${id}-stroke`}
                  spec={
                    shape === "hero"
                      ? tokens.bezel.heroBorder
                      : tokens.bezel.border
                  }
                  {...bounds}
                />
                <Path
                  d={path}
                  fill="none"
                  stroke={`url(#${id}-stroke)`}
                  strokeWidth={tokens.bezel.borderWidth}
                />
              </Svg>
            </View>
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  isolation: { isolation: "isolate" },
  shadow: { position: "absolute", left: -40, top: -40 },
  strokeBounds: { position: "absolute", left: -1, top: -1 },
  border: { mixBlendMode: tokens.bezel.blendMode },
});
