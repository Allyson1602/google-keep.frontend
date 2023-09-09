/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      sans: ['Roboto', 'Arial', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: '#fdbe563b',
        systemDark: '#202124',
        systemGray: '#5f6368',
        systemWhite: '#e8eaed',
        systemWhiteLight: '#dadce0',
      },
    },
  },
  plugins: [],
}

