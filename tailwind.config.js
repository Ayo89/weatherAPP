/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customOrange: "#d7562c",
        customGreen: "rgba(25,170,25,.9)",
      },
      screens: {
        xs: "480px",
      },
      animation: {
        roundSun: "roundSun 22s linear infinite",
        rainScroll: "rainScroll 4s linear infinite",
        moveCloudRight: "moveCloudRight 1.2s ease-out forwards",
        moveCloudLeft: "moveCloudLeft 1.2s linear forwards",
        moveSun: "moveSun 1s linear forwards",
        growSun: "growSun 1.2s linear forwards",
      },
      keyframes: {
        growSun: {
          "0%": { width: "20rem" },
          "100%": { width: "24rem" },
        },
        roundSun: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        rainScroll: {
          "50%": { backgroundPosition: "-50px -150%" },
          "100%": { backgroundPosition: "-100px -300%" },
        },
        moveCloudRight: {
          "0%": {
            transform: "translateX(-100%)",
            opacity: "0",
          },
          "20%": {
            opacity: "0.2",
          },
          "40%": {
            opacity: "0.4",
          },
          "60%": {
            opacity: "0.6",
          },
          "80%": {
            opacity: "0.8",
          },
          "100%": {
            transform: "translateX(0%)",
            opacity: "1",
          },
        },
        moveCloudLeft: {
          "0%": {
            transform: "translateX(0%)",
            opacity: "1",
          },
          "20%": {
            opacity: "0.8",
          },
          "40%": {
            opacity: "0.6",
          },
          "60%": {
            opacity: "0.4",
          },
          "80%": {
            opacity: "0.2",
          },
          "100%": {
            transform: "translateX(-200%)",
            opacity: "0",
          },
        },

        moveSun: {
          "0%": { transform: "translateX(10rem) translateY(-10rem)" },
          "100%": { transform: "translateX(0%) translateY(0%)" },
        },
      },
      fontSize: {
        "2xs": ".6rem",
      },
    },
  },
  plugins: [],
};
