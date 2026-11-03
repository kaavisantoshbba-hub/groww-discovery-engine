
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'premium-black': '#080808',
        'charcoal-surface': '#11100D',
        'gold-primary': '#D4AF62',
        'gold-champagne': '#F1D18A',
        'ivory-text': '#F5F0E6',
        'muted-gold': '#927342',
      },
      backgroundImage: {
        'gold-glow': 'radial-gradient(circle at center, rgba(212, 175, 98, 0.12) 0%, transparent 70%)',
        'deep-gradient': 'linear-gradient(180deg, #0B0B0B 0%, #080808 100%)',
      },
    },
  },
  plugins: [],
}
