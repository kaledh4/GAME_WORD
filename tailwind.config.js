module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'game-bg': '#0f1011',
        'key-bg': '#3a3a3c', // Keyboard background - darker for better contrast
        'key-enter': '#569bf5', // Accent blue for Enter key
        'key-delete': '#e65353', // Accent red for delete key
        'tile-empty': '#1f1f1f', // Empty tile background (dark neutral)
        'tile-border': '#2e2e2e', // Empty tile border
        'tile-active': '#565758',
        'tile-correct': '#1e7f5c', // Correct (green)
        'tile-present': '#9e7c19', // Present (yellow)
        'tile-absent': '#787878', // Absent (gray) - much clearer for wrong letters
      },
      fontFamily: {
        sans: ['IBM Plex Sans Arabic', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '40%': { transform: 'scale(1.1)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        flipIn: {
          '0%': { transform: 'rotateX(0deg)' },
          '100%': { transform: 'rotateX(-90deg)' },
        },
        flipOut: {
          '0%': { transform: 'rotateX(-90deg)' },
          '100%': { transform: 'rotateX(0deg)' },
        },
        vibrate: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-2px)' },
          '40%': { transform: 'translateX(2px)' },
          '60%': { transform: 'translateX(-2px)' },
          '80%': { transform: 'translateX(2px)' },
        },
        slideIn: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideOut: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
        fadeInUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        pop: 'pop 0.3s ease-in-out forwards',
        'flip-in': 'flipIn 0.3s ease-in forwards',
        'flip-out': 'flipOut 0.3s ease-out forwards',
        vibrate: 'vibrate 0.3s linear',
        'slide-in': 'slideIn 0.3s ease-out forwards',
        'slide-out': 'slideOut 0.3s ease-in forwards',
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
};
