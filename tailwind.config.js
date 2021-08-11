module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      scale: {
        '-1': '-1',
      },
      zIndex: {
        '-1': '-1',
      },
      transformOrigin: {
        0: '0%',
      },
      height: {
        '7/8': '87.5%',
      },
      width: {
        '7/8': '87.5%',
      },
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        darkgray: 'var(--dark-gray)',
        lightgray: 'var(--light-gray)',
        gray: 'var(--mid-gray)',
      },
      backgroundImage: () => ({
        // 'hero-image': "url('../img/wedding_draft.jpg')",
        // 'prop-image': "url('../img/example2.jpeg')",
      }),
    },
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    fontFamily: {
      mont: ['Montserrat'],
      rale: ['Raleway'],
      cochin: ['Cochin'],
    },
  },
  variants: {
    extend: {},
    variants: {
      borderColor: ['responsive', 'hover', 'focus', 'focus-within'],
      colors: ['responsive', 'hover', 'focus', 'focus-within'],
    },
  },
  plugins: [],
};
