export type GradientSpec = {
  angle: number;
  stops: readonly { offset: number; color: string }[];
};

/** CSS angles: 0deg points up, 90deg right. Stops may extend beyond 100%.
 * Remap the first/last stops to SVG endpoints so native SVG doesn't clamp them.
 */
export function cssGradientToSvg({ angle, stops }: GradientSpec, width: number, height: number) {
  const radians = angle * Math.PI / 180;
  const direction = { x: Math.sin(radians), y: -Math.cos(radians) };
  const length = Math.abs(width * direction.x) + Math.abs(height * direction.y);
  const first = stops[0].offset;
  const last = stops[stops.length - 1].offset;
  const point = (offset: number) => ({
    x: width / 2 + direction.x * length * (offset - 0.5),
    y: height / 2 + direction.y * length * (offset - 0.5),
  });
  const start = point(first);
  const end = point(last);
  return {
    x1: start.x, y1: start.y, x2: end.x, y2: end.y,
    stops: stops.map(stop => ({ ...stop, offset: (stop.offset - first) / (last - first) })),
  };
}
