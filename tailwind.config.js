module.exports = {
  purge: ["./index.html", "./src/**/*.{vue, js, ts, jsx, tsx}"],
  // content: ["./src/App.vue", "./src/views/*.vue", "./src/components/*.vue"],
  theme: {
    extend: {},
  },
  plugins: [require("tw-elements/dist/plugin")],
};
