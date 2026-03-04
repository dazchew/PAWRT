/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        pawrt: {
          bg: '#F0F9FE',
          navy: '#0D436E',
          blue: '#50A7DD',
          'blue-light': '#B3DEF9',
          'blue-ring': '#55A9DB',
          'blue-role': '#93CAED',
          teal: '#334E59',
          orange: '#FAA624',
          green: '#7EC944',
          gray: '#ABB3B9',
          'gray-placeholder': '#828282',
          'gray-disabled': '#CFCFCF',
          'gray-border': '#DADADA',
          'lavender': '#CCC1FF',
          error: '#D63139',
          'error-bg': '#FCDCDC',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
}
