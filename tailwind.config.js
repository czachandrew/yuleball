module.exports = {
  purge: ["./index.html", "./src/**/*.{vue, js, ts, jsx, tsx}"],
  // content: ["./src/App.vue", "./src/views/*.vue", "./src/components/*.vue"],
  theme: {
    extend: {
      keyframes: {
        "fade-in-up": {
          "0%": {
            opacity: 0,
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0px)",
          },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.5s ease-out",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
