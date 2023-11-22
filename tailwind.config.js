/* eslint-disable no-undef */
/**@type {import("tailwindcss").Config} */
module.exports = {
  important: true,
  darkMode: "class",
  content: ["./src/**/*.{html,js,ts,tsx,jsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#991d03",
        secondary: "#fecc00",
      },
      screens: {
        xs: "400px",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
