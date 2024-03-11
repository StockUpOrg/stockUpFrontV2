/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    animation: {
      "fade-in": "fadeIn 1s ease-out", // Define the fade-in animation
    },
  },
  plugins: [
    // Other Tailwind plugins
  ],
};
