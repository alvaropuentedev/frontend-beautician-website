/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-pastel-pink': '#ffccd5'
      },
    },
  },
  plugins: [require("daisyui")],
}

