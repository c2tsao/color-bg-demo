const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./renderer/pages/**/*.{js,ts,jsx,tsx}', './renderer/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      // use colors only specified
      white: colors.white,
      gray: colors.gray,
      blue: colors.blue,
      red: colors.red,
      indigo: colors.indigo,
      rose: colors.rose,
      black: colors.black,
      stone: colors.stone,
    },
    extend: {},
  },
  plugins: [],
}
