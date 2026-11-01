import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#1A1A1A',
          50: '#F6F6F6',
          100: '#E7E7E7',
          200: '#D1D1D1',
          300: '#B0B0B0',
          400: '#888888',
          500: '#6D6D6D',
          600: '#5D5D5D',
          700: '#4F4F4F',
          800: '#454545',
          900: '#1A1A1A',
          950: '#111111',
        },
        cream: {
          DEFAULT: '#F9F6F0',
          50: '#FDFAF7',
          100: '#F9F6F0',
          200: '#F2ECE1',
          300: '#EAE1D1',
        },
        linen: {
          DEFAULT: '#EFECE6',
          dark: '#E2DDD4',
        },
        kids: {
          peach: '#E78B72',
          'peach-light': '#FDF1ED',
          sage: '#8EAA90',
          'sage-light': '#F1F6F2',
          sky: '#8FBAD6',
          'sky-light': '#EEF5FA',
          butter: '#F5D38A',
        },
        sale: {
          DEFAULT: '#B84A39',
          light: '#FBEBE9',
        },
        border: {
          DEFAULT: '#E5E5E5',
          dark: '#D1D1D1',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        kids: ['var(--font-outfit)', 'var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        kids: '1.25rem',
        women: '0.125rem',
      },
      boxShadow: {
        subtle: '0 2px 10px rgba(0, 0, 0, 0.03)',
        floating: '0 10px 30px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
};

export default config;

