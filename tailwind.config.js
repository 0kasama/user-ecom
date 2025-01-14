/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '30/70': '30% 70%',
        '40/60': '40% 60%',
      },
      gridTemplateRows: {
        '20/10/50/20': '20% 10% 50% 20%',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['pastel'],
  },
};
