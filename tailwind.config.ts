// tailwind.config.js
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        SUIT_Variable: [`var(--font-suit-variable)`],
      },
    },
  },
};
