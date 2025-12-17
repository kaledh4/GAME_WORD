/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Enhanced color palette
        'darker': '#0a0e14',
        'game-bg': '#1e293b', // Dark blue-gray from image
        'tile-bg': '#334155', // Lighter gray for tiles
        'key-bg': '#475569', // Gray for keyboard
        'tile-active': '#f59e0b', // Amber for active tile border
        'letter-right': '#16a34a', // Green for correct letter
        'letter-exist': '#ca8a04', // Yellow for existing letter
        'letter-absent': '#475569', // Gray for absent letter
        
        // Custom color scheme
        'primary': {
          DEFAULT: '#10b981',
          dark: '#059669',
          light: '#34d399',
        },
        'accent': {
          gold: '#d4af37',
          emerald: '#10b981',
          ruby: '#ef4444',
          sapphire: '#3b82f6',
          amber: '#f59e0b',
        },
        'surface': {
          DEFAULT: 'rgba(255, 255, 255, 0.05)',
          hover: 'rgba(255, 255, 255, 0.08)',
          active: 'rgba(255, 255, 255, 0.12)',
        },
      },
      fontFamily: {
        'sans': ['Tajawal', 'sans-serif'],
        'display': ['Cairo', 'sans-serif'],
        'elegant': ['Amiri', 'serif'],
      },
      boxShadow: {
        'glow-emerald': '0 0 20px rgba(16, 185, 129, 0.3)',
        'glow-amber': '0 0 20px rgba(245, 158, 11, 0.3)',
        'glow-gold': '0 0 20px rgba(212, 175, 55, 0.2)',
        'inner-light': 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-in',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        'tile-flip': 'tileFlip 0.6s ease',
        'tile-shake': 'tileShake 0.5s ease',
        'tile-bounce': 'tileBounce 0.3s ease',
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