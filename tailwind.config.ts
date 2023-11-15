import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        nobel: {
          "50": "#f8f8f8",
          "100": "#f1efef",
          "200": "#e6e2e2",
          "300": "#d3cece",
          "400": "#b2a9a9",
          "500": "#9f9494",
          "600": "#877b7b",
          "700": "#6f6666",
          "800": "#5e5656",
          "900": "#514b4b",
          "950": "#292626",
        },
        orange: {
          "50": "#fef3f2",
          "100": "#fee5e2",
          "200": "#fdd1cb",
          "300": "#fbafa6",
          "400": "#f68173",
          "500": "#eb4a36",
          "600": "#d93c29",
          "700": "#b72f1e",
          "800": "#972a1d",
          "900": "#7e291e",
          "950": "#44110b",
        },
      },
      keyframes: {
        slideDown: {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        slideUp: {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        slideDown: "slideDown 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        slideUp: "slideUp 300ms cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
    fontFamily: {
      cursive: ["Vujahday Script", "cursive"],
    },
  },
  plugins: [],
} satisfies Config;
