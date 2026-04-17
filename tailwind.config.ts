import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 18px 45px rgba(15, 23, 42, 0.08)',
      },
      colors: {
        neutral: {
          950: '#0b0f18',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
