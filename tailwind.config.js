/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef2f8',
          100: '#d6e0ee',
          200: '#aebfe0',
          300: '#7e95cd',
          400: '#4f6bb4',
          500: '#2f4a8f',
          600: '#21366f',
          700: '#172653',
          800: '#101b3c',
          900: '#0a1228',
          950: '#060c1a',
        },
        accent: {
          400: '#f5b042',
          500: '#e09b2c',
          600: '#b87a1f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s ease-out forwards',
        'fade-in': 'fade-in 1s ease-out forwards',
        'float': 'float 4s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 1.8s cubic-bezier(0.2, 0.6, 0.3, 1) infinite',
      },
    },
  },
  plugins: [],
};
