/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{html,js}",
  ],
  theme: {
    colors: {
      white: "#FFFFFF",
      black: "#242424",
      "dark-grey": "#6B6B6B",
      primary: "#B784B7",
      "dark-green": "rgb(22 101 52)",
      red: "#FF0000",
    },

    fontSize: {
      sm: "12px",
      base: "14px",
      xl: "16px",
      "2xl": "20px",
      "3xl": "28px",
      "4xl": "38px",
      "5xl": "50px",
    },

    extend: {
      fontFamily: {
        inter: ["'Inter'", "sans-serif"],
        gelasio: ["'Gelasio'", "serif"],
        cursive: ["Ephesis", "cursive"],
      },
    },
  },
};
