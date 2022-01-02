module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#f2f2f2",
        },
      },
      backgroundImage: {
        hero: "url('https://images.unsplash.com/photo-1474314243412-cd4a79f02c6a')",
        people:
          "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c')",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
