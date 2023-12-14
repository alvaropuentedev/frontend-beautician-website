/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      // We add a custom color named 'custom-pastel-pink'
      colors: {
        'custom-pastel-pink': '#ffccd5'
      },
    },
  },
  plugins: [
    // We add the 'daisyui' plugin for additional components
    require("daisyui"),

    // We add the custom plugin 'tw-elements'
    require("tw-elements/dist/plugin.cjs")
  ],
  darkMode: "class" // Enable dark mode with the 'dark' class
}
