/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      xxl: "1400px",
    },
    container: {
      center: true,
      padding: "2rem",
    },
    fontFamily: {
      Alegreya: '"Alegreya variant", Tofu',
      BarlowCondensed: '"Barlow Condensed", sans-serif',
      OpenSans: '"Open Sans", sans-serif',
      Gilda: '"Gilda Display", serif',
      Roboto: '"Roboto,sans-serif"',
      NunitoSans: "'Nunito Sans', sans-serif",
      TimeNewRoman: '"Times New Roman", Times, serif'
    },
    extend: {
      flexShrink: {
        2: "2",
      },
      boxShadow: {
        "3xl": "0px 5px 15px rgba(0, 0, 0, 0.35)",
      },
      keyframes: {
        animateBottom: {
          "0%": { bottom: "-300px", opacity: "0" },
          "100%": { bottom: "0", opacity: "1" },
        },
      },
      animation: {
        animateBottom: "animateBottom 1s",
      },
    },
  },
  plugins: [],
};
