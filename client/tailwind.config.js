/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cantora: ["Cantora"],
      },
      colors: {
        "side-bar":"#0F2D37",
        "text":"#FFFFFF",
        "selected" : "#111F24",
        "hover-sidebar":"#145369",
        "tabcolor" : "#69BEE2",
        "primaryColor":"#C9EDED"
      }
    },
  },
  plugins: [],
}