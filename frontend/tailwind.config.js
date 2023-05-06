module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        "133px": "133px",
        "309px": "309px",
      },
      backgroundImage: {},
    },
    screens: {
      sm: "320px",
      md: "467px", // tablet // fixed width
      lg: "767px", // laptop // fixed width
      xl: "1024px", // desktop // fixed
      xxl: "1280px",
      xxxl: "1536px",
    },
  },
  plugins: [],
};
