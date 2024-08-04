const deafaultTheme = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    screens: {
      'xs': '475px',
      ...deafaultTheme.screens
    },
    extend: {
      colors:{
        primary:'#15803d',
        secondary:'#22c55e',
        black:'#020617'
      },
      fontFamily: {
        sans: ['Nunito Sans', 'sans-serif']
      }
    },
  },
  plugins: [],
}

