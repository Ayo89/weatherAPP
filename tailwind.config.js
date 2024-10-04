/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customOrange: "#d7562c",
        customGreen: "rgba(25,170,25,.9)",
      },
    },
  },
  plugins: [],
};
