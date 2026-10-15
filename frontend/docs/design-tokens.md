# Working design tokens — stage (a)

Source: `figma/Design.png` (2000 × 1044). The left phone occupies x=100–490,
y=100–944, giving a 390 × 844 raster frame. This is a reference canvas, not a
fixed layout width. Acceptance remains 375pt and 440pt.

The original Figma file is inaccessible from this environment. These values are
provisional and are not claimed to be exact Figma properties. The shared component
preview makes them reviewable before product screen implementation.

| Group | Values | Source / precision |
| --- | --- | --- |
| Background | #242C3B | Exact PNG sample at (1600,200), also most frequent cart-frame color |
| Text | #FFFFFF | Exact opaque white pixels in PNG text and supplied icons |
| Muted | #A7ABB1 | Most frequent text color in cart shipping-note crop (1580,615)–(1880,640) |
| Surface | #353F54 | PNG color present in cart frame; a gradient surface has no single flat source value |
| Accent gradient | #3AAFEB → #4478EE | Samples inside back button at (610,165) and (610,197); original stops and angle unknown |
| Surface gradient | #353F54 → #222834 | Sampled surface colors; stop placement/direction provisional |
| Accent text | #3AA0F0 | Provisional from user-provided approximate palette; needs exact Figma value |
| Deep, borders, highlight, inset gradient | See tokens.ts | Provisional visual approximations; need Figma paints/opacity |
| Error | #FFB4AB | Added semantic color for required error states; absent from source screenshot |
| Gutters / control size | 20 / 44 | Raster edge measurement: list x=120 vs frame x=100; back button x=590–634, y=160–204 |
| Other spacing | 4, 8, 12, 16, 24, 32 | Provisional spacing scale, needs inspect values |
| Radii | 10 control, 20 card, 30 sheet, 50 pill | Provisional estimates from silhouettes, not original vector radii |
| Font family | Poppins | Required by user; bundled Regular/Medium/SemiBold/Bold |
| Font sizes | 12, 14, 15, 16, 20, 24 | Provisional estimates; raster glyph bounds cannot reveal exact font-size properties |
| Line heights | 18, 21, 23, 24, 30, 36 | Provisional, needs Figma typography settings |
| Shadows | See tokens.ts | Provisional offsets/blur/opacity; cannot recover original effect settings from flattened PNG |
| Touch target | 44 minimum | Implementation choice, aligned with measured large controls; small stepper glyphs live inside full touch targets |

Needed for exact fidelity: Figma paint/gradient stop values and coordinates,
font weight/size/line-height/letter-spacing for each text role, component padding
and gaps, corner radii, stroke opacity/width, and effect offset/blur/spread/opacity.

The preview does not animate. Reanimated motion remains stage (e). Shadows use
React Native boxShadow, including inset shadows, on the SDK 57 architecture.

## Confirmed surface and filter values

The following overrides were provided directly by the user and are exact inputs.
The fill and border gradients apply to dark cards, filter tiles, and accent
search/Apply/add buttons. Description/Specification tabs and the promo input have
no bezels. The quantity group uses the same inset shadow as the unselected tab,
with a gray subtract control and a blue accent plus button inside it.

- Square tiles (1:1); bike filter uses the supplied `e-bike.svg`.
- White glyphs: 60% inactive and 100% selected. Path-level exported opacity is
  overridden to 100% in filters, then overall glyph opacity is applied once.
- Inactive fill: `linear-gradient(169.98deg, #353F54 27.98%, #222834 81.2%)`.
- Selected fill: `linear-gradient(152.72deg, #34C8E8 1.7%, #4E4AF2 114.52%)`.
- All bezel borders: `linear-gradient(180.81deg, rgba(255,255,255,0.2) 0.67%, rgba(0,0,0,0) 14.04%)` with Overlay blending on the border layer.
- Bezel width: 2pt, from the user's latest `border: 2px solid` specification,
  superseding the earlier 1px borders and state-specific border gradients.
  Tile size remains 44pt and radius 10pt
  from the working theme; the user specified ratio, not revised dimensions.

`GradientBezel` renders separate SVG fill and stroke gradients on native and web.
It measures the actual width and height, preserving 2pt strokes, unwarped corner
radii, and correct CSS angles on square controls and wide containers. Gradient
endpoints are extended to preserve the 114.52% stop rather than clamping to 100%.
Text fields keep their inset dark fill without a bezel.
Border and fill are separate layers: the border uses `mixBlendMode: 'overlay'`,
while the fill uses normal blending. Filled surfaces isolate that blend from
surrounding elements.

## Confirmed segmented tab shadows

- Selected: `4px 4px 10px 0px #252B39, -4px -4px 10px 0px #38445A`.
- Inactive: `inset 4px 4px 8px 0px #202633, inset -4px -4px 8px 0px #364055`.

“Disabled” in the supplied tab styling is interpreted as unselected. The other
tab remains enabled so users can switch to it. Tabs have solid fills with no
bezel. The selected tab's two outer shadows render together on a dedicated
rounded surface with visible overflow, above the adjacent tab. The unselected
tab retains its inset shadows on the control itself.

## Confirmed subtract button

- Solid background: `#353F54`.
- Border width: 0.5pt.
- Border gradient: `linear-gradient(141.57deg, rgba(255,255,255,0.2) 6.25%, rgba(0,0,0,0.2) 53.89%)`.
- Retains Overlay border blending from the shared bezel specification.
- At the minimum quantity the button remains disabled, with only its glyph
  dimmed so the specified background remains intact.

## Stage (b) list measurements and provisional geometry

- Hero bezel: 2pt, `linear-gradient(134.4deg, rgba(255,255,255,0.2) 7.51%,
  rgba(0,0,0,0.2) 65.43%)`, following the angled hero outline.
- Product card bezels: 2pt, `linear-gradient(134.4deg, rgba(255,255,255,0.2)
  7.51%, rgba(0,0,0,0.2) 56.43%, rgba(0,0,0,0.2) 65.43%)`.
  Both retain Overlay blending and supersede the shared 180.81deg bezel for
  these cards only. The two black product stops remain explicit.
- Hero aspect ratio: 350/238, using the PNG hero's outer bounding box. The top is
  now explicitly horizontal, as requested. A shaped SVG surface retains a
  provisional 6deg upward slope on its lower edge; imagery remains upright.
  Its two SVG shadows follow that same path, with expanded filter bounds; the
  former rectangular View box-shadow is removed.
- Product card surface skew: -7deg, a provisional visual estimate from the
  sloping edges. The two columns use equal flex widths and a 20pt gap.
- Column offset: 24pt, rounded from the approximately 25px difference between
  the first visible left/right cards in the reference.
- Filter stagger: 10pt per tile, measured from the PNG's successive tile tops.
  A 10pt horizontal inset matches the PNG's first filter at x=130 versus cards at
  x=120. Fixed 20pt gaps and equal flex slots produce square tiles of 47pt at
  375pt and 60pt at 440pt. Icon bounds grow with the tiles (60% of tile size).
  The filter row is an unclipped View, not a clipping ScrollView. Row overlap
  (-8pt) and grid overlap (-12pt) remain provisional composition choices.
- Product image frames use provisional aspect ratios 1.1 (bikes) and 1.5
  (helmets), keeping export dimensions from dictating card heights.
- Hero and product surfaces use real backdrop blur. The hero clips blur to its
  angled SVG path (CSS path on web, MaskedView on iOS), with its gradient tint
  at provisional 0.6 opacity. Product surfaces use #353F54 at the same provisional
  opacity; no tint opacity was provided. Opacity is applied to the tint alone,
  allowing the hero blur to sample the background. Text and images stay opaque.
- Product shadows are exact user inputs: `0px 20px 60px 0px #10141C99,
  0px -20px 60px 0px #3B475F80`. Shadows are outside the rounded blur clip.
- Web uses exactly `backdrop-filter: blur(100px)`. iOS uses Expo BlurView's
  maximum native intensity of 100; native intensity is not a CSS pixel radius
  and cannot be claimed as a pixel-exact equivalent. Android is outside the
  requested device targets and currently uses the module's fallback behavior.
- Backdrop uses `assets/images/backgrounds/product-list-backdrop.svg` directly, preserving
  its path, viewBox crop, colors and gradient coordinates. This supersedes the
  reconstructed diamond and CSS gradient tokens. The 390 × 695 export is placed
  at y=149 on the 390 × 844 reference canvas (the earlier supplied top offset),
  scaling with the screen. No additional rotation or horizontal offset is applied.
- Navigation spans the left/right/bottom screen edges, with a horizontal bottom
  and a provisional 3deg upward top slope. The shorter 64pt row adds the bottom
  safe-area inset. Buttons are now 60 × 44pt with a 60 × 40pt selected surface;
  these dimensions are provisional interpretations of the requested wider,
  shorter shape. Only the active background skews -7deg; its icon stays upright.
- Favorite hearts reuse the original SVG as a mask over the exact supplied
  `linear-gradient(144.6deg, #34CAE8 -0.37%, #4E49F2 105.55%)`. Negative and
  beyond-100% stops are preserved by gradient endpoint remapping.
- Discount typography: provisional 28pt with 42pt line height.

Needed for exact list fidelity: hero/card vector paths, glass tint opacity,
image bounds and exact tab-bar
geometry. No additional visual assets were generated.

## Stage (c) detail reference and assumptions

Reference: the two middle screens in `figma/Design.png`. The live Figma URL
remains inaccessible from this environment. Coordinates below are measured from
the raster export, not claimed as original Figma values. The detail frame spans
x=570…960, y=100…944, giving a 390 × 844 reference canvas.

- Sheet begins at y=494 in the PNG, or 394pt from the frame top. Hero height
  scales as screen width × 394/390, subtracting the top safe-area inset inside
  the safe area. A 280pt minimum keeps the header/image usable in short layouts.
- The diagonal intersects the frame at x=882 on the top and x=690 at the sheet:
  local x=312 and 120. A single polygon continues that slope to the bottom of
  the screen, behind the sheet and footer; it is not clipped at hero height. Its
  vertical gradient currently reuses provisional #3AAFEB → #4478EE; exact
  Figma gradient coordinates and colors are requested, not available in the PNG.
- The reference's sheet is 346pt from y=494 to the footer at y=840. This is a
  minimum height; content scrolls on smaller devices or in the data tab. The
  sheet extends to the screen bottom underneath a top-level footer overlay.
  Only its top corners are rounded; its fill and bezel both have square bottom
  corners. Scroll padding follows the measured footer height so the last content
  can be read above it. The footer has a 104pt minimum height and safe-area
  bottom padding. Footer content is vertically centered with equal 24pt minimum
  top/bottom padding in its usable area; the bottom safe-area inset adds to both
  its minimum height and bottom padding. It is not a draggable sheet until motion stage (e).
- Sheet top radius reuses 30pt; footer radius 50pt is a provisional visual fit.
  Sheet fill is the confirmed `linear-gradient(157.91deg, #353F54 0%,
  #222834 58.47%)`, stored separately in `tokens.detail.sheetGradient`.
  On web the sheet uses a persistent CSS gradient surface and a masked CSS
  border, avoiding measured SVG viewport updates when tabs change the content
  height. Native retains the SVG fill/bezel. Both use the same tokens and corners.
  The footer uses only solid `#262E3D`, with a 2pt border:
  `linear-gradient(180deg, rgba(255,255,255,0.2) 0%,
  rgba(0,0,0,0.2) 69.23%)`. These confirmed footer settings are in
  `tokens.detail.footerBackground` and `tokens.detail.footerBorder`.
  Footer blending is currently Normal for visual review, controlled separately
  by `tokens.detail.footerBorderBlendMode`; other bezels retain Overlay.
  The latest opacity trial reduces both footer border stops from 0.2 to 0.1,
  halving bezel opacity while preserving its width, angle and stop positions.
  Sheet bezel still uses the shared 2pt Overlay specification. Exact corner
  values remain provisional. The card-specific 134.4deg bezels apply only
  to list hero/products.
  The footer wrapper is transparent around its rounded solid surface, so
  the underlying description/specification sheet remains visible at its corners.
- Tabs start 44pt from the frame's sides (20pt gutter + 24pt inset), with 32pt
  top padding and 44pt control height. They retain the confirmed selected outer
  shadows and unselected inset shadows, without bezels.
- Description title is 16pt/24pt; body 15pt/23pt, with a 12pt gap. Header is
  20pt/30pt and footer price 24pt/36pt. These reuse established working tokens;
  exact type metrics still need Figma values. Paragraph content is transcribed
  from the reference, while other products keep their mock catalog descriptions.
- Pager dot diameter 6pt, gap 7pt and bottom space 40pt are raster measurements.
  Dots are decorative because only one view of each product is exported.
  The image container's 85% width and 90% height are provisional containment
  choices; the transparent image stays upright and fully visible.
- The FREE DATA placeholder is replaced with three live bike-share station
  cards. API row spacing, typography and 10pt radii reuse shared tokens; this
  content layout is an implementation choice because the design has no data UI.
  No new imagery or icons were generated.
