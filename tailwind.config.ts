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
          200: '#F2A79A',
          300: '#D5BCED',
          400: '#EDB1EA',
          500: '#D57EEA',
          600: '#CBD1EC',
          700: '#F1D7FF',
        },
        secondary: {
          DEFAULT: '#F9F1E6',},
        warning: {
          DEFAULT: 'red'
        }
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
      boxShadow: {
        '100': 'rgba(24, 39, 75, 0.08) 0px 4px 4px -2px, rgba(24, 39, 75, 0.12) 0px 2px 4px -2px',       
        '200': '0 0 5px 3px rgba(0, 150, 200, 1)',
        
      },
    },
  },
  plugins: [],
} satisfies Config
