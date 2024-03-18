/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    // Other theme configurations
    extend: {
      keyframes: {
        gradientX: {
          "0%, 100%": {
            backgroundSize: "200% 200%",
            backgroundPosition: "left center",
          },
          "50%": {
            backgroundSize: "200% 200%",
            backgroundPosition: "right center",
          },
        },
      },
      animation: {
        "gradient-x": "gradientX 8s ease infinite",
      },
    },
  },
  plugins: [
    // Other Tailwind plugins
  ],
};
