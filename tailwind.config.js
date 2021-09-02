module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      padding: {
        88: '22rem',
        18: '4.5rem',
      },
      scale: {
        '-1': '-1',
      },
      zIndex: {
        '-1': '-1',
        60: '60',
        70: '70',
        90: '90',
      },
      transformOrigin: {
        0: '0%',
      },
      height: {
        xs: '8%',
        '1/8': '12.5%',
        '3/8': '37.5%',
        '7/8': '87.5%',
        '7/10': '70%',
        '5/8': '62.5%',
        'screen+': '120vh',
        'full+': '120%',
        120: '30rem',
      },
      width: {
        xs: '5%',
        '1/8': '12.5%',
        '7/8': '87.5%',
        '7/10': '70%',
        '5/8': '62.5%',
        '3/8': '37.5%',
        120: '30rem',
      },
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        darkgray: 'var(--dark-gray)',
        darkgrayAccent: 'var(--dark-gray-accent)',
        lightgray: 'var(--light-gray)',
        midgray: 'var(--mid-gray)',
        twitter: 'var(--twitter)',
        facebook: 'var(--facebook)',
        instagram: 'var(--instagram)',
        orange: '#F97316',
        orangeLight: '#FED7AA',
      },
      fontSize: {
        xs: '.75rem',
      },
      backgroundImage: () => ({
        // 'hero-image': "url('../img/wedding_draft.jpg')",
        // 'prop-image': "url('/images/cbdshelf.jpeg')",
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
