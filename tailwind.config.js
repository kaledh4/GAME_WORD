/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Premium color palette inspired by the provided image
        'brand': {
          'bg-start': '#f2f0eb',
          'bg-end': '#e8e6e1',
          'charcoal': '#4a4a4a',
          'charcoal-dark': '#2d2d2d',
          'taupe': '#d1ccc0',
          'sage': '#8a9a5b',
          'sand': '#c2b280',
          'muted-red': '#922b21',
          'muted-blue': '#2c3e50',
          'off-white': '#faf9f6',
        },
        'game-bg': '#f2f0eb',
        'tile-bg': '#ffffff',
        'tile-empty': '#ffffff',
        'tile-absent': '#b0ada5',
        'tile-present': '#c2b280',
        'tile-correct': '#8a9a5b',
        'key-bg': '#d1ccc0',
        'tile-active': '#4a4a4a',
        'letter-right': '#8a9a5b',
        'letter-exist': '#c2b280',
        'letter-absent': '#b0ada5',

        // Custom color scheme
        'primary': {
          DEFAULT: '#4a4a4a',
          dark: '#2d2d2d',
          light: '#7a7a7a',
        },
        'accent': {
          gold: '#c2b280',
          emerald: '#8a9a5b',
          ruby: '#922b21',
          sapphire: '#2c3e50',
          amber: '#d4af37',
        },
        'surface': {
          DEFAULT: 'rgba(74, 74, 74, 0.05)',
          hover: 'rgba(74, 74, 74, 0.08)',
          active: 'rgba(74, 74, 74, 0.12)',
        },
      },
      fontFamily: {
        'sans': ['Tajawal', 'sans-serif'],
        'display': ['Cairo', 'sans-serif'],
        'elegant': ['Amiri', 'serif'],
      },
      boxShadow: {
        'glow-emerald': '0 0 20px rgba(138, 154, 91, 0.3)',
        'glow-amber': '0 0 20px rgba(194, 178, 128, 0.3)',
        'glow-gold': '0 0 20px rgba(194, 178, 128, 0.2)',
        'inner-light': 'inset 0 1px 0 rgba(255, 255, 255, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-in',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        'tile-flip': 'tileFlip 0.6s ease',
        'tile-shake': 'tileShake 0.5s ease',
        'tile-bounce': 'tileBounce 0.3s ease',
        'vibrate': 'vibrate 0.3s ease-in-out',
      },
      keyframes: {
        vibrate: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '50%': { transform: 'translateX(5px)' },
          '75%': { transform: 'translateX(-5px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}