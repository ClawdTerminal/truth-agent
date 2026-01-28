/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'terminal-bg': '#0a0a0a',
        'terminal-green': '#00ff41',
        'terminal-green-dim': '#008f11',
        'terminal-gray': '#1a1a1a',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', 'monospace'],
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'typewriter': 'typewriter 0.05s steps(1) forwards',
      },
      keyframes: {
        blink: {
          '50%': { opacity: '0' },
        },
      }
    },
  },
  plugins: [],
}
