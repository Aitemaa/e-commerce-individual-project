import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
  ],

  daisyui: {
    themes: [
      {
        myTheme: {                        
          "primary": "#fafaf9",            
          "secondary": "#fafaf9",          
          "accent": "#fafaf9",              
          "neutral": "#fafaf9",
          "base-100": "#fafaf9",           
        }
      },
    ],
    darkTheme: "myTheme",  
  },
}

