module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
    './public/index.html',
    './index.js'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f9f5f0',
          100: '#f3ebe3',
          200: '#e8d7c3',
          300: '#dcc3a3',
          400: '#d1af83',
          500: '#c69b63',
          600: '#b8884f',
          700: '#a0753b',
          800: '#886227',
          900: '#704f13',
        },
        accent: {
          light: '#f5f5f5',
          white: '#ffffff',
          dark: '#1a1a1a',
          black: '#000000',
          red: '#e63946',
          darkred: '#a4161a',
        },
      },
      fontFamily: {
        'sans': ['Inter', 'Segoe UI', 'Roboto', 'sans-serif'],
        'display': ['Poppins', 'Inter', 'sans-serif'],
        'mono': ['Fira Code', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'soft': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
        'red': '0 4px 14px rgba(230, 57, 70, 0.2)',
      },
    },
  },
  plugins: [],
};
