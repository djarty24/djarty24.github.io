/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
    theme: {
        extend: {
          fontFamily: {
            bold: ['pavon', 'serif'],
            base: ['romelu-vomelu', 'serif'],
          },
          colors: {
            rust: "#FF3D00",
            ivory: "#FFFCF2",
            forest: "#1C448E",
          },    
        },
      },
    plugins: [],
};