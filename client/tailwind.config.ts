import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBackground: "var(--dark-background)",
        primaryBackground: "var(--primary-background)",
        secondaryBackground: "var(--secondary-background)",
        primaryForeground: "var(--primary-foreground)",
        secondaryForeground: "var(--secondary-foreground)",
        primaryAccent: "var(--primary-accent)",
        primaryBorder:"var(--primary-border)"
      },
    },
  },
  plugins: [],
} satisfies Config;
