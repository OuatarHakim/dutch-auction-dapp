// tailwind.config.js

module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.jsx',
    './src/**/*.ts',
    './src/**/*.tsx',
  ],
  theme: {
    extend: {
      colors: {
        // Exemple d'extension de couleurs
        primary: '#FF4500',
        secondary: '#4A90E2',
      },
      fontFamily: {
        // Exemple d'extension de polices
        sans: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        // Exemple d'extension de tailles de police
        '2xl': '1.75rem',
        '3xl': '2rem',
      },
    },
  },
  plugins: [
    // Exemple d'ajout de plugins
    require('@tailwindcss/forms'), // Plugin pour personnaliser les styles des formulaires
    require('@tailwindcss/typography'), // Plugin pour ajouter des styles de typographie améliorés
  ],
};
