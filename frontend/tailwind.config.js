import daisyui from "daisyui";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "bubble-rise": {
          "0%, 100%": { transform: "translateY(0)", opacity: 0.7 },
          "50%": { transform: "translateY(-10px)", opacity: 1 },
        },
        flaskTilt: {
          '0%': { transform: 'rotate(-12deg)' },
          '50%': { transform: 'rotate(6deg)' },
          '100%': { transform: 'rotate(-12deg)' }
        },
        headBounce: {
          '0%, 100%': { transform: 'translate(-50%, -1px)' },
          '50%': { transform: 'translate(-50%, 3px)' }, 
        },
      },
      animation: {
        "bubble-rise": "bubble-rise 2s ease-in-out infinite",
        "flask-tilt": "flaskTilt 1.5s ease-in-out infinite",
        "head-bounce": "headBounce 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      // Built-in themes
      "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", 
      "valentine", "halloween", "garden", "forest", "lofi", "pastel", "fantasy", "wireframe", "black", 
      "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter", 
      "dim", "nord", "sunset",

      // Custom themes as objects
      {
        caramellatte: {
          primary: "#ff7a00",
          secondary: "#e7cba9",
          accent: "#b0724d",
          neutral: "#4b3a2f",
          "base-100": "#f3e5d2",
          info: "#8fbcd4",
          success: "#a3d39c",
          warning: "#f6c177",
          error: "#e06c75",
        },
      },
      {
        abyss: {
          "primary": "#bfa46f",      
          "secondary": "#345c4d",    
          "accent": "#8e9775",       
          "neutral": "#1a2e2b",      
          "base-100": "#0f1b17",     
          "info": "#88c9bf",
          "success": "#9ac98f",
          "warning": "#e0c97d",
          "error": "#d4715f",
        },
      },
      {
        silk: {
          primary: "#8a9a5b",
          secondary: "#cfcfcf",
          accent: "#b2b2a3",
          neutral: "#3f3f3f",
          "base-100": "#f5f5f5",
          info: "#a3c4bc",
          success: "#c1d5a4",
          warning: "#f0e68c",
          error: "#e29578",
        },
      },
      {
        solstice: {
          "primary": "#272727",
          "secondary": "#BBD02C",
          "accent": "#57CC99",
          "neutral": "#2C2C2C",
          "base-100": "#FAFAFA",
          "info": "#3ABFF8",
          "success": "#6FCF97",
          "warning": "#F2994A",
          "error": "#EB4D4B",
        },
      },
      {
        midnightneon: {
          primary: "#0ff0fc",
          secondary: "#ff206e",
          accent: "#fbff12",
          neutral: "#1a1a2e",
          "base-100": "#0f0f1a",
          info: "#29f19c",
          success: "#2ec4b6",
          warning: "#ff9f1c",
          error: "#ff4040",
        },
      },
      {
        mojitogreen: {
          primary: "#3a5a40",
          secondary: "#a3b18a",
          accent: "#588157",
          neutral: "#2d3436",
          "base-100": "#e9edc9",
          info: "#76c893",
          success: "#99d98c",
          warning: "#f4a261",
          error: "#e63946",
        },
      },
    ],
  },
};


