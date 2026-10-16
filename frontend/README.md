# Bike shop mobile app

## Run

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
npm run test:cart
npm run web
```

NativeWind uses `darkMode: 'class'` in `tailwind.config.js` so its web color-scheme
initialization can set the scheme after CSS loads. After changing this setting,
restart Metro with `npx expo start --clear --web` and reload the browser.

If `Icon` reports an invalid element type (object), an older Metro process may
still be serving SVGs as image assets. Fully stop that server before restarting
with the command above. Fast Refresh cannot apply changes to `metro.config.js`;
it must be loaded by a new Metro process.

If Metro cannot resolve a newly added platform component such as
`DetailSheetSurface`, stop the project's existing Expo servers and run
`npx expo start --clear --port 8081` from `frontend`. Use that server's URL/QR
code in the client; avoid leaving a second Metro instance running on another
port. The native fallback is `DetailSheetSurface.tsx`; web selects
`DetailSheetSurface.web.tsx` automatically.

## Layout

```text
assets/
  images/backgrounds/ decorative SVG background layers
  images/products/  transparent bike and helmet exports
  images/promo/     promo hero bike
  icons/            Figma icon exports
  fonts/            optional local Poppins files and license
  brand/            optional launcher and splash artwork
src/
  app/              Expo Router routes: list, product/[id], /cart, /preview
  assets/           shared promo assets and icon registry
  config/           typed product catalog and category labels
  components/
    ui/             Screen, AppText, Icon, PriceRow
      controls/     buttons, chips, quantity stepper, tabs and text fields
      surfaces/     Card, gradient bezel and shaped surfaces
        glass/      native/web blur implementations and shape masking
    products/
      backdrop/     list and detail backgrounds
      list/         product cards, grid, category filters and promo hero
      detail/       detail sheet surface and bike-share panel
      FavoriteIcon.tsx  shared product favorite icon
    cart/           CartLineItem and CheckoutSlider
    navigation/     FloatingTabBar and native/web NavigationStack
  screens/          product list, detail and cart composition
  theme/            working tokens, bundled Poppins font configuration
  types/            shared domain types
  store/            Zustand favorites, cart quantities and applied promo
  services/         validated CityBikes public API client
  hooks/            cancellable bike-share request and retry state
  utils/            money formatting and cent-based cart totals
```

See [the export guide](assets/README.md) before exporting assets.

## Assumptions

- Prices are assumed to be in USD because the reference does not specify a currency.
- The cart initially contains the three pictured products, one each, to match the reference.
- The screenshot subtotal differs from the calculated subtotal by $0.01. Calculations use actual product prices.
- Delivery is assumed to be free at every cart size because no threshold was provided.
- Map, Profile, and Documents functionality is assumed to be outside scope.
- Products with only one supplied image use decorative pagination dots.
- Road filter icon positions are provisional because their Figma layout coordinates were not supplied.

## Specification public data

The design's FREE DATA placeholder contains Vancouver Mobi bike-share availability,
not manufacturer specifications. It requests
`https://api.citybik.es/v2/networks/mobibikes` when Specification first opens.
This fixed city is a demonstration choice; no location permission is requested.
The endpoint requires no key and its browser CORS response was verified.

The panel shows three reporting stations alphabetically, their available bikes,
empty docks and update time when a valid timestamp is provided. These are not
the nearest stations. Missing counts display an em dash rather than zero.
Data remains cached while toggling tabs on the same detail screen; Refresh
fetches again. There is no automatic polling or offline fallback data.

Requests time out after 15 seconds and abort on unmount. The client validates
the remote structure and handles HTTP/network failures, malformed JSON/data and
an empty station list. Loading placeholders are static until motion stage (e).
The panel includes the required linked attribution to
[CityBikes](https://api.citybik.es/v2/), whose documentation defines the data fields
and attribution requirement. External data can change independently of the app.

## Setup references

- [Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/)
- [Expo Router installation](https://docs.expo.dev/router/installation/)
- [NativeWind stable installation](https://www.nativewind.dev/docs/getting-started/installation)

## Verification

- TypeScript and Expo ESLint pass.
- iOS production bundle export passes, including Hermes bytecode compilation.
- The browser component preview renders at 375pt and 440pt with no page overflow;
  quantity/subtotal updates, tab selection, Poppins loading and SVGs are verified.
- The product list is checked at both widths: two equal-width columns, square
  category controls, loaded images, favorites, category/search combinations,
  empty states and filter reset.
- Detail is checked at 375pt and 440pt: image, description/tabs, fixed footer,
  navigation and repeat adds across products. A real CityBikes response renders;
  intercepted HTTP/malformed errors, loading, retry, empty and null counts,
  tab caching and an unknown product route are verified in the browser.
- Cart renders at 375pt and 440pt without horizontal overflow. Browser checks
  cover the initial cents, quantity changes, invalid/reapplied promo and the
  checkout response. `npm run test:cart` covers arithmetic and cent rounding.
- Native rendering has not been tested on a physical device or iOS Simulator.
- Installation reported 35 dependency audit findings (14 moderate, 21 high).
  No automatic breaking dependency upgrades were applied during scaffolding.
