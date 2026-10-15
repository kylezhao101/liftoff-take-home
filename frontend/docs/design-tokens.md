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
