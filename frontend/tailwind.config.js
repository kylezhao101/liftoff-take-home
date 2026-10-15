/** @type {import('tailwindcss').Config} */
module.exports = {
  // Web initializes the color scheme after Metro injects the generated CSS.
  // Class mode permits that initialization to call colorScheme.set().
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: { extend: {} },
  plugins: [],
};
