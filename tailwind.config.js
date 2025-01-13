/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        darkBorder: "#1f1f1f",
        darkBg: "#070707",
        darkHover: "#333333",
        darkFocus: "#444444",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
