/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0B0F19',
        card: '#131A2A',
        primary: '#6D5EF9',
        accent: '#00D4FF',
        ink: '#F8FAFC',
        muted: '#8B93A7',
        border: 'rgba(248, 250, 252, 0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(109, 94, 249, 0.25), 0 8px 30px rgba(109, 94, 249, 0.15)',
        'glow-accent': '0 0 0 1px rgba(0, 212, 255, 0.25), 0 8px 30px rgba(0, 212, 255, 0.15)',
        card: '0 4px 24px rgba(0, 0, 0, 0.35)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #6D5EF9 0%, #00D4FF 100%)',
        'gradient-radial-glow':
          'radial-gradient(circle at 50% 0%, rgba(109, 94, 249, 0.18), transparent 60%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
};
