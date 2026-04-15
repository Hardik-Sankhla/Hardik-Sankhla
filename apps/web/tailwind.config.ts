import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#090f1f",
        card: "#122447",
        accent: "#57d4ff",
        textsoft: "#b7c4e4"
      }
    }
  },
  plugins: []
};

export default config;
