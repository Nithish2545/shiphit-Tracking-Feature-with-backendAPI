/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "sm":"300px",
        'tb': '768px',            // Tablet screens and up
        'lp': '1024px',           // Laptop screens and up
        'lg': '1280px',           // Large screens and up
        // Custom min and max breakpoints
        'min-sm': {'min': '340px'},  // Minimum 540px
        'max-sm': {'max': '339px'},  // Maximum 539px
        'min-tb': {'min': '768px'},  // Minimum 768px
        'max-tb': {'max': '767px'},  // Maximum 767px
        'min-lp': {'min': '1024px'}, // Minimum 1024px
        'max-lp': {'max': '1023px'}, // Maximum 1023px
        'min-lg': {'min': '1280px'}, // Minimum 1280px
        'max-lg': {'max': '1279px'}, // Maximum 1279px
      },
      colors: {
        primary: '#111111',   // Dark color
        secondary: '#C3B649', // Gold-like color
        tertiary: '#F2EED1',  // Light beige color
        quaternary: '#F2EED1',// Same as tertiary for consistency
        white: '#FFFFFF',     // White color
      },
      fontSize: {
        'xs': '12px',  // Extra small text
        'sm': '14px',  // Small text
        'base': '18px',// Base text
        'lg': '20px',  // Large text
        'xl': '26px',  // Extra large text
        '2xl': '32px', // 2x Extra large text
        '3xl': '48px', // 3x Extra large text
      },
    },
  },
  plugins: [],
}