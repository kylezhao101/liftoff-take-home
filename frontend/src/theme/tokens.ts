/** Raster-derived working theme. See docs/design-tokens.md for provenance.
 * Original Figma gradient stops, typography metrics, radii and shadows are pending.
 */
export const tokens = {
  colors: {
    background: '#242C3B',
    surface: '#353F54',
    deep: '#1C222E',
    text: '#FFFFFF',
    muted: '#A7ABB1',
    accent: '#3AA0F0',
    border: 'rgba(255,255,255,0.10)',
    highlight: 'rgba(255,255,255,0.24)',
    error: '#FFB4AB',
  },
  gradients: {
    accent: ['#3AAFEB', '#4478EE'] as const,
    surface: ['#353F54', '#222834'] as const,
    inset: ['#1C222E', '#2A3344'] as const,
  },
  filters: {
    inactiveOpacity: 0.6,
    activeOpacity: 1,
  },
  subtract: {
    background: '#353F54',
    borderWidth: 0.5,
    border: {
      angle: 141.57,
      stops: [
        { offset: 0.0625, color: 'rgba(255,255,255,0.2)' },
        { offset: 0.5389, color: 'rgba(0,0,0,0.2)' },
      ],
    },
  },
  bezel: {
    borderWidth: 2,
    blendMode: 'overlay',
    heroBorder: {
      angle: 134.4,
      stops: [
        { offset: 0.0751, color: 'rgba(255,255,255,0.2)' },
        { offset: 0.6543, color: 'rgba(0,0,0,0.2)' },
      ],
    },
    productBorder: {
      angle: 134.4,
      stops: [
        { offset: 0.0751, color: 'rgba(255,255,255,0.2)' },
        { offset: 0.5643, color: 'rgba(0,0,0,0.2)' },
        { offset: 0.6543, color: 'rgba(0,0,0,0.2)' },
      ],
    },
    inactive: {
      angle: 169.98,
      stops: [
        { offset: 0.2798, color: '#353F54' },
        { offset: 0.812, color: '#222834' },
      ],
    },
    border: {
      angle: 180.81,
      stops: [
        { offset: 0.0067, color: 'rgba(255,255,255,0.2)' },
        { offset: 0.1404, color: 'rgba(0,0,0,0)' },
      ],
    },
    active: {
      angle: 152.72,
      stops: [
        { offset: 0.017, color: '#34C8E8' },
        { offset: 1.1452, color: '#4E4AF2' },
      ],
    },
  },
  typography: {
    family: 'Poppins',
    size: { caption: 12, label: 14, body: 15, subtitle: 16, title: 20, price: 24 },
    lineHeight: { caption: 18, label: 21, body: 23, subtitle: 24, title: 30, price: 36 },
  },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, gutter: 20, xl: 24, xxl: 32 },
  radii: { control: 10, card: 20, sheet: 30, pill: 50 },
  sizes: { control: 44, quantityGlyph: 16, icon: 20 },
  detail: {
    sheetGradient: {
      angle: 157.91,
      stops: [
        { offset: 0, color: '#353F54' },
        { offset: 0.5847, color: '#222834' },
      ],
    },
    footerBackground: '#262E3D',
    footerBorderBlendMode: 'normal',
    footerBorder: {
      angle: 180,
      stops: [
        { offset: 0, color: 'rgba(255,255,255,0.1)' },
        { offset: 0.6923, color: 'rgba(0,0,0,0.1)' },
      ],
    },
    // Measured on the 390pt-wide design export; see design-tokens.md.
    referenceWidth: 390,
    heroHeight: 394,
    sheetMinHeight: 346,
    footerMinHeight: 104,
    footerRadius: 50,
    imageWidth: '85%',
    pagerDot: 6,
    pagerGap: 7,
    pagerBottom: 40,
    sheetTabInset: 24,
  },
  list: {
    heroAspectRatio: 350 / 238,
    heroBottomSlope: 6,
    cardTilt: '-7deg',
    columnOffset: 24,
    categoryStep: 10,
    categoryOverlap: -8,
    gridOverlap: -12,
    heroDiscountSize: 28,
    productImageAspectRatio: { bike: 1.1, helmet: 1.5 },
    navHeight: 64,
    navTileWidth: 55,
    navTileHeight: 40,
    navTopSlope: 3,
    filterInset: 10,
    filterGap: 20,
    favorite: {
      angle: 144.6,
      stops: [
        { offset: -0.0037, color: '#34CAE8' },
        { offset: 1.0555, color: '#4E49F2' },
      ],
    },
    glass: {
      shadow: '0px 20px 60px 0px #10141C99, 0px -20px 60px 0px #3B475F80',
      blur: 100,
      // Provisional tint: no Figma background opacity was supplied.
      tintOpacity: 0.6,
    },
  },
  shadows: {
    raised: '4px 8px 20px rgba(0,0,0,0.32), -2px -2px 8px rgba(255,255,255,0.04)',
    inset: 'inset 3px 3px 9px rgba(0,0,0,0.35), inset -2px -2px 6px rgba(255,255,255,0.04)',
    tabSelected: '4px 4px 10px 0px #252B39, -4px -4px 10px 0px #38445A',
    tabInactive: 'inset 4px 4px 8px 0px #202633, inset -4px -4px 8px 0px #364055',
  },
  // Timings and easing will be specified and implemented in stage (e).
  motion: {},
} as const;

export const layoutTargets = { compact: 375, large: 440 } as const;
