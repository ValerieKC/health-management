import type { Config } from 'tailwindcss'

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: '#D57EEA',
          100: '#9963F2',
          200:'#F2A79A',
        },
        secondary: {
          DEFAULT: '#F9F1E6',}
      },
      fontSize: {
        'size-1': [
          '12px',
          {
            lineHeight: '15px',
            letterSpacing: '-0.2px',
          },
        ],
        'size-2': [
          '14px',
          {
            lineHeight: '18px',
            letterSpacing: '-0.2px',
          },
        ],
        'size-3': [
          '16px',
          {
            lineHeight: '20px',
            letterSpacing: '-0.3px',
          },
        ],
        'size-4': [
          '20px',
          {
            lineHeight: '25px',
            letterSpacing: '-0.4px',
          },
        ],
        'size-5': [
          '24px',
          {
            lineHeight: '30px',
            letterSpacing: '-0.5px',
          },
        ],
        'size-6': [
          '28px',
          {
            lineHeight: '35px',
            letterSpacing: '-0.6px',
          },
        ],
        'size-7': [
          '32px',
          {
            lineHeight: '40px',
            letterSpacing: '-0.7px',
          },
        ],
        'size-8': [
          '40px',
          {
            lineHeight: '50px',
            letterSpacing: '-0.8px',
          },
        ],
      },
    },
  },
  plugins: [],
} satisfies Config
