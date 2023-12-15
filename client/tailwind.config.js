/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      "spacing": {
        "n30px": "-30px",
        "20px": "20px",
        "30px": "30px",
        "40px": "40px",
        "50px": "50px",
        "55px": "55px",
        "65px": "65px",
        "100px": "120px",
        "200px": "200px",
        "340px": "280px",
        "400px": "400px",
        "mpage": "calc(100vh - 65px)",
        "list": "calc(100% - 110px)",
        "chats": "calc(100% - 100px)",
        "auth": "calc(100vh - 65px)",
      },
      "boxShadow": {
        'nav': '0 3px 6px -1px rgb(0 0 0 / 0.25)',
        'normal': '0 3px 4px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3), 0 -2px 4px -2px rgb(0 0 0 / 0.3)',
        'btn': '0 3px 4px -1px rgb(0 0 0 / 0.18), 0 2px 4px -2px rgb(0 0 0 / 0.18), 0 -2px 4px -2px rgb(0 0 0 / 0.18)',
      },
      "colors": {
        "darkgrey": "#777",
        "grey": "#ccc",
        "lightgrey": "#eee",
      },
      transitionProperty: {
        'shadow': 'box-shadow',
        'border': 'border-color',
        'alert': 'transform opacity',
      },
    },
  },
  plugins: [],
}