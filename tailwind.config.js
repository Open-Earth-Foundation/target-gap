/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        secondary: "#2351DC",
        "content-secondary": "#232640",
        "content-alternative": "#001EA7",
        tertiary: "#7A7B9A",
        control: "#7A7B9A",
        "background-neutral": "#E8EAFB",
      },
    },
  },
  plugins: [],
  important: true,
};
