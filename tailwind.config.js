/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        archive: {
          cream: '#F6F2E9',
          paper: '#EFE8DC',
          parchment: '#E4DAC7',
          beige: '#D8CDB8',
          linen: '#FBF9F5',
          ink: '#121514',
          charcoal: '#1A1E1C',
          dark: '#0E1110',
          slate: '#262D2A',
          olive: '#384334',
          'olive-light': '#51614C',
          forest: '#182A1E',
          'forest-light': '#243C2C',
          rust: '#9E4224',
          'rust-light': '#C45630',
          terracotta: '#B65434',
          amber: '#D27230',
          ochre: '#AA8244',
          navy: '#1B2632',
          border: 'rgba(216, 205, 184, 0.22)',
          'border-dark': 'rgba(255, 255, 255, 0.10)',
        },
        lab: {
          950: '#0E1110',
          900: '#141716',
          850: '#1A1E1C',
          800: '#222724',
          700: '#2E3531',
          600: '#3D4642',
          border: 'rgba(255, 255, 255, 0.10)',
          'border-bright': 'rgba(255, 255, 255, 0.20)',
          accent: '#00F0FF',
          'accent-glow': 'rgba(0, 240, 255, 0.25)',
          lime: '#CCFF00',
          'lime-glow': 'rgba(204, 255, 0, 0.25)',
          emerald: '#2D8A4E',
          warning: '#D27230',
          danger: '#C43D30',
        }
      },
      fontFamily: {
        editorial: ['Fraunces', 'Cormorant Garamond', 'Georgia', 'serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Fraunces', 'Space Grotesk', 'serif'],
      },
      boxShadow: {
        'spine': '5px 0 20px -2px rgba(0, 0, 0, 0.4), inset -2px 0 6px rgba(0, 0, 0, 0.3), inset 2px 0 4px rgba(255, 255, 255, 0.15)',
        'spine-lift': '15px 0 35px -5px rgba(0, 0, 0, 0.6), inset -2px 0 6px rgba(0, 0, 0, 0.3), 0 20px 40px rgba(0, 0, 0, 0.5)',
        'paper': '0 4px 20px -2px rgba(0, 0, 0, 0.15), 0 0 1px 1px rgba(0, 0, 0, 0.05)',
        'panel': '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.07)',
        'floating': '0 25px 60px -15px rgba(0, 0, 0, 0.85), 0 0 1px 1px rgba(210, 114, 48, 0.25)',
      },
      backgroundImage: {
        'laid-paper': 'repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.02) 0px, rgba(255, 255, 255, 0.02) 1px, transparent 1px, transparent 4px)',
        'paper-grain': 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
        'technical-grid': 'linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
      }
    },
  },
  plugins: [],
}
