/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Palette - Deep Professional Blues
        'midnight-blue': '#001F3F',
        'navy': '#0A2540',
        'deep-blue': '#1B3A5E',
        'ocean': '#2E5A8A',
        
        // Secondary Palette - Sophisticated Grays
        'slate-silver': '#708090',
        'charcoal': '#2C3E50',
        'steel': '#4A5568',
        'pearl': '#E8EDF2',
        'mist': '#F5F7FA',
        
        // Accent Colors - Professional Teals & Blues
        'accent-teal': '#0EA5E9',
        'accent-cyan': '#06B6D4',
        'accent-blue': '#3B82F6',
        'accent-indigo': '#6366F1',
        
        // Neutral Base
        'stark-white': '#FFFFFF',
        'warm-white': '#FAFBFC',
        'off-white': '#F8F9FA',
        
        // Semantic Colors
        'success': '#10B981',
        'warning': '#F59E0B',
        'error': '#EF4444',
      },
      fontFamily: {
        'sans': ['Inter', 'Helvetica Now', 'Montserrat', 'system-ui', 'sans-serif'],
      },
      spacing: {
        'section': '100px',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

