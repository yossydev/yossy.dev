import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.tsx"],
  theme: {
    colors: {
      ...colors,
      black: {
        DEFAULT: "#0a0a0a",
        900: "#000000",
      },
      gray: {
        ...colors.gray,
        dcd: "#dcdcdc",
        "3d": "#3d3d3d",
      },
    },
    extend: {},
  },
  plugins: [],
};
