/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          light: 'var(--primary-light)',
        },
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        background: {
          DEFAULT: 'var(--background)',
          dark: 'var(--background-dark)',
          darker: 'var(--background-darker)',
        },
        text: {
          primary: 'var(--text-primary)',
          light: 'var(--text-light)',
        },
        notification: 'var(--notification)',
        success: 'var(--success)',
        warning: 'var(--warning)',
      },
      borderRadius: {
        custom: '8px',
      },
      boxShadow: {
        'light': '0 4px 6px rgba(138, 43, 226, 0.1)',
        'medium': '0 6px 12px rgba(138, 43, 226, 0.2)',
        'glow': '0 0 10px var(--notification)',
      },
      animation: {
        'bounce': 'bounce 1s infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fadeIn': 'fadeIn 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      zIndex: {
        '50': '50',
        '60': '60',
        '70': '70',
      },
    },
  },
  plugins: [],
} 