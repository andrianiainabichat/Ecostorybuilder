import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'eco-green': '#10b981',
        'eco-dark': '#064e3b',
        'eco-light': '#d1fae5',
      },
    },
  },
  plugins: [],
}
export default config