import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      'blue': '#1878b9',
      'light-green': '#6eb87c',
      'gold': '#ecab32',
      'orange': '#eb4a36',
      'white': '#ffffff',
      'black': '#0c0808',
      'gray': '#b2a9a9',
      'light-gray': '#e7dada',
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
