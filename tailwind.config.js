/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {
      colors: {
        // Template-aligned canvas (geometric hero / dark UI)
        'canvas': '#030303',
        'surface': '#08080a',
        'surface-2': '#0e0e12',
        'mist': '#141418',
        // Dark editorial base (agency-grade)
        'void': '#0A0A0B',
        'ink': '#111113',
        'carbon': '#18181B',
        'graphite': '#27272A',
        'silver': '#71717A',
        'pearl': '#E4E4E7',
        'cloud': '#F4F4F5',
        'white': '#FAFAFA',
        // Accent: electric cyan (high-grade tech)
        'accent': '#00D4FF',
        'accent-dim': '#00A8CC',
        'accent-glow': 'rgba(0, 212, 255, 0.4)',
        // Wise-inspired landing palette (KEM fintech feel)
        'kem-lime': '#9FE870',
        'kem-lime-soft': '#C5F0A8',
        'kem-forest': '#163300',
        'kem-forest-light': '#234414',
        'kem-sky': '#E8F2FB',
        'kem-sky-deep': '#D4E8FA',
        'kem-stone': '#F2F2F2',
        // Legacy aliases for gradual migration
        'midnight-blue': '#0A0A0B',
        'stark-white': '#FAFAFA',
        'warm-white': '#F4F4F5',
        'slate-silver': '#71717A',
        'deep-blue': '#18181B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Syne', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.5rem, 5vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.1' }],
      },
      backgroundImage: {
        'mesh': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 212, 255, 0.15), transparent), radial-gradient(ellipse 60% 40% at 80% 50%, rgba(0, 212, 255, 0.08), transparent), radial-gradient(ellipse 40% 30% at 20% 80%, rgba(0, 212, 255, 0.06), transparent)',
        'mesh-dark': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 212, 255, 0.12), transparent), radial-gradient(ellipse 60% 40% at 80% 50%, rgba(0, 212, 255, 0.06), transparent)',
        'ambient': 'radial-gradient(ellipse 85% 55% at 50% -15%, rgba(99, 102, 241, 0.12), transparent), radial-gradient(ellipse 55% 45% at 95% 50%, rgba(244, 63, 94, 0.07), transparent), radial-gradient(ellipse 45% 35% at 5% 80%, rgba(0, 212, 255, 0.06), transparent)',
      },
      boxShadow: {
        'glow': '0 0 40px -10px rgba(0, 212, 255, 0.4)',
        'glow-lg': '0 0 60px -15px rgba(0, 212, 255, 0.35)',
        'card': '0 4px 24px -4px rgba(0, 0, 0, 0.08), 0 2px 8px -2px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 24px 48px -12px rgba(0, 0, 0, 0.18), 0 0 0 1px rgba(0, 212, 255, 0.15)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.45), inset 0 1px 0 0 rgba(255, 255, 255, 0.06)',
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
