// tailwind.config.js
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "suit-variable": ["SUIT Variable", "sans-serif"],
      },
      colors: {
        // Label colors
        "label-inverse": "var(--color-label-inverse)",
        "label-normal": "var(--color-label-normal)",
        "label-strong": "var(--color-label-strong)",
        "label-alternative": "var(--color-label-alternative)",
        "label-primary": "var(--color-label-primary)",
        "label-disabled": "var(--color-label-disabled)",
        "label-assistive": "var(--color-label-assistive)",
        
        // Background colors
        "background-normal": "var(--color-background-normal)",
        "background-strong": "var(--color-background-strong)",
        "background-primary": "var(--color-background-primary)",
        "background-alternative": "var(--color-background-alternative)",
        "background-disabled": "var(--color-background-disabled)",
        "background-assistive": "var(--color-background-assistive)",
        
        // Status colors
        "status-negative": "var(--color-status-negative)",
        "status-positive": "var(--color-status-positive)",
        
        // Line colors
        "line-normal": "var(--color-line-normal)",
        "line-disabled": "var(--color-line-disabled)",
      },
      spacing: {
        // Numbers
        "0": "var(--spacing-Number-0)",
        "1": "var(--spacing-Number-1)",
        "2": "var(--spacing-Number-2)",
        "4": "var(--spacing-Number-4)",
        "8": "var(--spacing-Number-8)",
        "12": "var(--spacing-Number-12)",
        "14": "var(--spacing-Number-14)",
        "16": "var(--spacing-Number-16)",
        "18": "var(--spacing-Number-18)",
        "20": "var(--spacing-Number-20)",
        "24": "var(--spacing-Number-24)",
        "28": "var(--spacing-Number-28)",
        "32": "var(--spacing-Number-32)",
        "40": "var(--spacing-Number-40)",
        "48": "var(--spacing-Number-48)",
        "56": "var(--spacing-Number-56)",
        "64": "var(--spacing-Number-64)",
        "72": "var(--spacing-Number-72)",
        "80": "var(--spacing-Number-80)",
        
        // Gap
        "gap-2": "var(--spacing-gap-2)",
        "gap-4": "var(--spacing-gap-4)",
        "gap-8": "var(--spacing-gap-8)",
        "gap-12": "var(--spacing-gap-12)",
        "gap-16": "var(--spacing-gap-16)",
        "gap-20": "var(--spacing-gap-20)",
        
        // Padding
        "padding-2": "var(--spacing-padding-2)",
        "padding-4": "var(--spacing-padding-4)",
        "padding-8": "var(--spacing-padding-8)",
        "padding-12": "var(--spacing-padding-12)",
        "padding-16": "var(--spacing-padding-16)",
        "padding-20": "var(--spacing-padding-20)",
      },
      borderRadius: {
        "2": "var(--radius-2)",
        "4": "var(--radius-4)",
        "8": "var(--radius-8)",
        "12": "var(--radius-12)",
        "16": "var(--radius-16)",
        "round": "var(--radius-round)",
      },
      fontSize: {
        "text-0": "var(--text-fontSize-0)",
        "text-1": "var(--text-fontSize-1)",
        "text-2": "var(--text-fontSize-2)",
        "text-3": "var(--text-fontSize-3)",
        "text-4": "var(--text-fontSize-4)",
        "text-5": "var(--text-fontSize-5)",
        "text-6": "var(--text-fontSize-6)",
        "text-7": "var(--text-fontSize-7)",
      },
      lineHeight: {
        "leading-0": "var(--leading-lineHeights-0)",
        "leading-1": "var(--leading-lineHeights-1)",
        "leading-2": "var(--leading-lineHeights-2)",
        "leading-3": "var(--leading-lineHeights-3)",
        "leading-4": "var(--leading-lineHeights-4)",
        "leading-5": "var(--leading-lineHeights-5)",
        "leading-6": "var(--leading-lineHeights-6)",
        "leading-7": "var(--leading-lineHeights-7)",
      },
    },
  },
  plugins: [],
};

export default config;
