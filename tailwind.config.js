/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    borderColor: '#5f6368',
    backgroundColor: '#202124',
    fontFamily: {
      sans: ['Roboto', 'Arial', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: '#fdbe563b',
      },
    },
  },
  plugins: [],
}

