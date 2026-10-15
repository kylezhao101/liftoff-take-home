# Figma asset exports

The supplied exports are registered in `src/assets/catalog.ts` and
`src/assets/icons.ts`. The `/preview` route displays an asset preview.
The product list also reuses the promo bike image for the extra ELECTRIC – Sport
mock product; this is an additional catalog entry, not an additional image export.

## Products: `images/products/`

- `peugeot-lr01.png` — silver road bike, reused on list, detail and cart.
- `pilot-trade.png` — black bicycle, mapped to product ID `pilot-chromoly-520`.
- `smith-trade.png` — helmet, reused on list and cart.
- Give any additional products descriptive kebab-case names.

Export transparent PNG cutouts, with the complete object visible. Exclude card
backgrounds, labels, prices, favorite icons and UI shadows. Use consistent canvas
bounds for each object's density variants. Export @1x, @2x and @3x if available
(for example `peugeot-lr01.png`, `peugeot-lr01@2x.png`, `peugeot-lr01@3x.png`).
The base filename is required when using density variants. If exporting just one
file, export at 3x and keep the base filename; we will set its display size in code.

## Promo: `images/promo/`

The `images/backgrounds/product-list-backdrop.svg` export is the list's decorative background layer.
It is imported directly without changing its path, gradient or viewBox crop.

- `hero-bike.png` — silver bike from the 30% Off hero, transparent background.

Export only the object. The gradient card and discount text will be rendered in
React Native. Use the same density convention as product imagery.

## Icons: `icons/`

Use these base names:

`search`, `chevron-left`, `chevron-right`, `heart`, `heart-filled`, `bike`,
`road`, `mountain`, `helmet`, `map`, `cart`, `profile`, `document`, `minus`, `plus`.

SVG is preferred for icons; PNG density variants also work. Export the glyph
without its gradient button tile or shadow. Preserve SVG viewBox values and
consistent bounds. Keep separate active/inactive exports only if the glyph shape
changes; otherwise we will control tint in code. Metro now transforms raw SVG
imports into react-native-svg components. Use the shared `Icon` component with
`name`, optional `color`, and SVG sizing props. Exported fill opacity is preserved.
White fills become `currentColor` at build time; source SVGs are unchanged.
Exported 60% path opacity remains the default, but can be overridden with
`fillOpacity`. Category filters use `fillOpacity={1}` and apply glyph opacity once
at 60% inactive or 100% selected. Restart Metro with a cleared cache after editing
the SVG transform configuration.

Filename aliases: `bicycle.svg` maps to `bike`, `person.svg` to `profile`, and
`chevron-forward.svg` to `chevron-right`. The extra `e-bike.svg` is also registered.
No `heart-filled.svg` was supplied, so no filled-heart asset is claimed to exist.

### Current raster dimensions

| File | Pixels |
| --- | --- |
| peugeot-lr01.png | 285 × 209 |
| pilot-trade.png | 116 × 79 |
| smith-trade.png | 124 × 104 |
| hero-bike.png | 317 × 153 |

These are usable for layout work. Higher-resolution exports are recommended for
sharp rendering on high-density iPhones, especially the black bicycle. Preserve
the current filenames when replacing them, or use the density suffixes above.

## Fonts: `fonts/`

Optional local font destination: Poppins Regular, Medium, SemiBold and Bold TTFs,
plus their font license. Poppins is now loaded from the bundled
`@expo-google-fonts/poppins` package; local font exports are optional.

## Brand: `brand/`

Optional app icon and splash artwork. The root assets supplied by Expo are template
launcher assets and are unrelated to the Figma product images.

## Wiring the exports

Register images in `src/assets/catalog.ts` using literal static `require` calls.
Do not use dynamically constructed require paths; Metro needs static filenames.
Export product detail images only once unless the Figma view uses a different angle.
Do not export status bars, home indicators, page backgrounds, buttons or whole
screens as UI assets; these will be rendered by the app.
