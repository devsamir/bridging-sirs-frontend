module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {},
  variants: {
    extend: {
      backgroundColor: ["active"],
      translate: ["active"],
      scale: ["active"],
      shadow: ["active"],
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
};
