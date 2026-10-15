# Bike shop mobile app

Expo React Native + TypeScript, Expo Router, NativeWind 4 / Tailwind 3, and
Reanimated. The setup route is the stage (a) shared-component preview, followed
by the supplied imagery and SVG icons. Product screens are not implemented yet.

## Run

Use Node 22.13+ within Node 22 LTS (the machine used for scaffolding has 22.12,
which is below Expo SDK 57's supported minimum).

```sh
cd frontend
npm install
npm start
```

Open on an iPhone using a compatible Expo Go client, or use an Expo development
build if the available Expo Go version does not support SDK 57. iOS Simulator
requires macOS; physical iPhone development can be started from Windows.

```sh
npm run typecheck
npm run lint
npm run web
```

NativeWind uses `darkMode: 'class'` in `tailwind.config.js` so its web color-scheme
initialization can set the scheme after CSS loads. After changing this setting,
restart Metro with `npx expo start --clear --web` and reload the browser.

If `Icon` reports an invalid element type (object), an older Metro process may
still be serving SVGs as image assets. Fully stop that server before restarting
with the command above. Fast Refresh cannot apply changes to `metro.config.js`;
it must be loaded by a new Metro process.

## Layout

```text
assets/
  images/products/  transparent bike and helmet exports
  images/promo/     promo hero bike
  icons/            Figma icon exports
  fonts/            optional local Poppins files and license
  brand/            optional launcher and splash artwork
src/
  app/              Expo Router routes (setup screen only for now)
  assets/           typed asset catalog
  components/
    ui/             Screen, AppText, Icon, Button, GradientButton, Card, Chip,
                    QuantityStepper, TabSwitcher, PriceRow, TextField
    products/       future hero, product card, category row
    cart/           future line item and summary
    navigation/     future floating navigation
  theme/            working tokens, bundled Poppins font configuration
  data/             future typed mock products
  types/            shared domain types
  store/            future Zustand cart and favorites
  services/         future public API client
  hooks/            future data and interaction hooks
  utils/            money formatting (cart totals follow in stage d)
```

See [the export guide](assets/README.md) before exporting assets. Empty source
folders contain `.gitkeep` so they survive version control.

## Assumptions and open decisions

- App lives in `frontend`; existing `backend` and `figma` files are preserved.
- SDK 57 is the current stable template selected at scaffold time. NativeWind
  uses its stable v4 integration, not the v5 release candidate.
- Routes live in `src/app` per the generated Expo project instructions.
- User supplied four product/promo PNGs and 15 SVG icons. All are registered and
  shown in the asset preview. No assets were generated. Filename aliases and
  raster dimensions are documented in `assets/README.md`.
- Poppins Regular, Medium, SemiBold and Bold are bundled through
  `@expo-google-fonts/poppins`. The app waits for font loading before rendering.
- Exact Figma colors, gradients, spacing, typography metrics, radii and shadows
  are unverified. The stage (a) working theme uses PNG samples/measurements and
  explicitly provisional estimates. [Design token notes](docs/design-tokens.md)
  identify the source and precision of each group and list the needed Figma values.
- Acceptance widths are 375pt and 440pt as requested; final containers must use
  flexible layouts and safe-area insets rather than fixed device widths.
- Every animation will use Reanimated. Router transitions are disabled for now;
  screen motion and gestures will be implemented in stage (e).
- Future cart calculations use integer cents. The three pictured items subtotal
  $6,119.98; a rounded 30% discount and free delivery produce $4,283.99.
- Cart initial contents, search/filter behavior, unused tabs, checkout behavior,
  and API choice/location remain open decisions. Money formatting assumes USD;
  the source shows dollars but does not identify a currency code.
- Zustand, gradient, gesture and SVG dependencies are prepared for later stages;
  cart state, API fetching and product routes are not implemented yet.
- No backend connection, authentication or payment integration is configured.

## Review stages

Current handoff: stage (a) shared components and provisional design tokens.
The preview exercises chip selection, Description/Specification tabs, quantity
bounds, derived subtotal, text input, buttons, and disabled/loading states.
Loading is static text until Reanimated motion is added. No animation is implemented
in this stage, and preview actions do not change a shopping cart.

Stop for review before (b) product list, (c) detail + public data, (d) cart and
totals, and (e) Reanimated motion. Exact Figma values can replace working tokens
centrally without changing component code.

## Setup references

- [Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/)
- [Expo Router installation](https://docs.expo.dev/router/installation/)
- [NativeWind stable installation](https://www.nativewind.dev/docs/getting-started/installation)

## Verification

- TypeScript and Expo ESLint pass.
- iOS production bundle export passes, including Hermes bytecode compilation.
- The browser component preview renders at 375pt and 440pt with no page overflow;
  quantity/subtotal updates, tab selection, Poppins loading and SVGs are verified.
- Native rendering has not been tested on a physical device or iOS Simulator.
- Installation reported 35 dependency audit findings (14 moderate, 21 high).
  No automatic breaking dependency upgrades were applied during scaffolding.
