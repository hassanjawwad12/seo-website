/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens:{
      sm: "640px",
      md: "940px",
      lg: "1280px",

    },
   
    extend: {},
  },
  plugins: [],
}