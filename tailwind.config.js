/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'custom-black': '#020202',
        'custom-green': '#9EE44D',
        'custom-gray': '#EFEFEF',
        'custom-dark-blue': '#1A1A1A',
        'gre':'#7FFF00',
        'gra':'#D3D3D3',
        'bg-bl':'#1C1E24',
        'main':'#A3D977',
        'col-t':'#E0E0E0',
        'blank':'#4DA8DA'
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
