import plugin from 'tailwindcss/plugin';

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'gov-blue': '#0069B4',
        'gov-blue-dark': '#005086',
        'success-green': '#2E7D32',
      },
      boxShadow: {
        'soft-md': '0 2px 6px 0 rgba(0,0,0,0.05)',
        'soft-lg': '0 20px 27px 0 rgba(0,0,0,0.05)',
      },
      borderRadius: {
        '2xl': '1rem',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.bg-gradient-primary': {
          background: 'linear-gradient(310deg, #7928CA 0%, #FF0080 100%)',
        },
      });
    }),
  ],
};
