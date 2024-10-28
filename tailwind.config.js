/** @type {import('tailwindcss').Config} */
export const content = ['./index.html', './src/**/*.{js,ts,jsx,tsx}'];
export const theme = {
  extend: {
    colors: {
      'custom-black': '#020202',
      'custom-green': '#9EE44D',
      'custom-gray': '#EFEFEF',
      'custom-dark-blue': '#1A1A1A',
    },
  },
  plugins: [],
};
