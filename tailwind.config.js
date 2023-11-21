/* eslint-disable no-undef */
/**@type {import("tailwindcss").Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2752e7",
        secondary: "#fecc00",
      },
      screens: {
        xs: "420px",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
