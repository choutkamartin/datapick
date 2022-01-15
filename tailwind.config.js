module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {},
      backgroundImage: {
        hero: "url('/images/robot.jpg')",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
