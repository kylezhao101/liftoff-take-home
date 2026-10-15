# Bike shop mobile app

Expo React Native + TypeScript, Expo Router, NativeWind 4 / Tailwind 3, and
Reanimated. The home route is the product list; tap a product to open its detail
screen at `/product/[id]`. The Cart tab opens `/cart`. The shared-component and
asset preview remains available at `/preview`.

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
    ui/             Screen, AppText, Icon, Button, GradientButton, Card, Chip,
                    QuantityStepper, TabSwitcher, PriceRow, TextField
    products/       list cards/filters, detail backdrop, bike-share panel
    cart/           cart line item
    navigation/     floating tab bar
  screens/          product list, detail and cart composition
  theme/            working tokens, bundled Poppins font configuration
  types/            shared domain types
  store/            Zustand favorites, cart quantities and applied promo
  services/         validated CityBikes public API client
  hooks/            cancellable bike-share request and retry state
  utils/            money formatting and cent-based cart totals
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
- User-supplied gradients, bezel details and tab shadows are recorded exactly.
  Remaining Figma values use PNG samples/measurements and explicitly provisional
  estimates. [Design token notes](docs/design-tokens.md) identify their source and
  precision and list the needed Figma values.
- Acceptance widths are 375pt and 440pt as requested; final containers must use
  flexible layouts and safe-area insets rather than fixed device widths.
- Every animation will use Reanimated. Router transitions are disabled for now;
  screen motion and gestures will be implemented in stage (e).
- Cart starts with the three pictured products, one each, so the reference screen
  can be reviewed immediately. Added products increment that state; quantity zero
  removes a row. State resets on a full reload. Money formatting assumes USD;
  the source shows dollars but does not identify a currency code.
- The three displayed unit prices sum to $6,119.98, one cent less than the
  screenshot subtotal. The 30% order discount is rounded once to the nearest
  cent ($1,835.99); free delivery gives a state-derived $4,283.99 total. The
  screenshot shows free delivery but supplies no threshold, so delivery remains
  free at every cart size. Bike30 starts applied as pictured. Applying any other
  code clears the discount and shows an invalid-code message.
- Add or edit products in `src/config/products.ts`. Each typed entry holds its
  category, name, price in cents, description, and static image source. Optional
  image shadow settings control list/detail placement without product ID checks
  in the components. Optional initial cart quantity/order and favorite status
  seed the reference UI. `src/types/product.ts` defines the schema. Keep image
  `require()` calls with literal paths so Metro can bundle them.
- Search matches product name/category case-insensitively and combines with the
  selected category. Closing search clears its query. Reset clears both filters.
- Favorites use a typed Zustand store and survive filtering/remounts in the same
  app session. They reset on a full reload; PEUGEOT starts favorited as pictured.
- The PEUGEOT, SMITH and PILOT names/prices come from the reference. A fourth
  demonstration product, ELECTRIC – Sport ($2,499.99), reuses the promo bike image.
  Its name and price are mock assumptions, not details supplied by Figma.
- The Mountain bikes filter intentionally shows an empty state because none of
  the supplied bikes are represented as a mountain bike in the mock catalog.
- The active Bikes tab is shown in the floating bar and Cart opens the cart
  route. Map/Profile/Documents are disabled because their flows are outside
  the three requested screens. Product cards open their own detail route; their
  favorite buttons remain separate from the navigation target.
- Add to Cart updates integer quantities in Zustand, combining repeated products
  into one line. Confirmation reports the quantity of the current product.
  Cart and favorites survive navigation but reset on a full reload. Checkout
  shows an inline demo message because no payment integration was supplied.
- The PEUGEOT description is transcribed from `figma/Design.png`. Other products
  reuse the detail layout with their own catalog descriptions, price and image.
- The detail sheet uses a persistent CSS gradient and masked border on web to
  avoid resizing a measured SVG surface when switching tabs. Native retains
  the SVG surface; both render the same theme tokens and corner geometry.
- Only one image per product is supplied. The reference's three pager dots are
  visual decoration; accessibility reports one image. Additional image exports
  are needed for a real image pager, whose motion belongs to stage (e).
- No backend connection, authentication or payment integration is configured.
- Product cards use the supplied shadows and 100px CSS backdrop blur on web.
  iOS uses Expo BlurView intensity 100, which is not measured in CSS pixels.
  Tint opacity is a provisional 0.6; exact native visual fidelity needs device review.
- The hero uses the same blur, clipped to its angled outline via CSS path on web
  and MaskedView on iOS. Its translucent gradient and path shadows sit above/below
  the blur respectively; the bike and text remain sharp.
- The background uses `assets/images/backgrounds/product-list-backdrop.svg` directly, preserving its path and using the supplied
  170.76deg gradient, positioned at the previously supplied y=149 on the reference
  390 × 844 canvas. Navigation uses provisional 60 × 40pt selected tiles
  with 44pt touch targets and a shorter 64pt row. Hero shadows follow its path.
- The PEUGEOT detail uses the user-supplied `peugeot-bike-shadow.png` beneath
  the bike, replacing the drawn ellipses. The road filter icon uses the four
  newly supplied lane-mark paths. Their positions are provisional because
  those individual exports do not include their Figma layout coordinates.

## Review stages

Current handoff: stage (d) cart, editable quantities, promo and totals. Product
list remains at `/`, detail at `/product/[id]`, and shared components at
`/preview`. Motion is deferred; all transforms are static visual geometry.
The preview does not modify the shopping cart. Stop for review before stage (e)
Reanimated motion. Exact Figma values can replace working tokens centrally.

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
