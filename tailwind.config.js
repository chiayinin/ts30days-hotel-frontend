/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,scss}",
    './node_modules/primereact/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '12px', // 左右 padding
        // lg: '24px',
        // xl: '36px',
        // '2xl': '36px'
      },
      screens: {
        DEFAULT: '1296px', // 固定寬度
        // lg: '1024px',
        // xl: '1280px',
        // '2xl': '1296px'
      }
    },
    extend: {
      colors: {
        'transparent': 'transparent',
        'primary': {
          120: '#7B6651',
          100: '#BF9D7D',
          80: '#D0B79F',
          60: '#E1D1C2',
          40: '#F1EAE4',
          10: '#F7F2EE',
          'tint': '#FAF7F5'
        },
        'neutral': {
          'bg': '#140F0A',
          100: '#000000',
          80: '#4B4B4B',
          60: '#909090',
          40: '#ECECEC',
          10: '#F9F9F9',
          0: '#FFFFFF'
        },
        'success': {
          120: '#299F65',
          100: '#52DD7E',
          20: '#BCFBBD',
          10: '#E8FEE7'
        },
        'info': {
          120: '#1D66AC',
          100: '#3BADEF',
          20: '#B1EFFD',
          10: '#E6FBFE'
        },
        'danger': {
          120: '#C22538',
          100: '#DA3E51',
          20: '#F5CCD1',
          10: '#FDECEF'
        }
      },
      keyframes: {
        'fadein': {
          '0%': { opacity: '0' },
          '50%': { opacity: '0.5' },
          '100%': { opacity: '1' },
        },
        'fadeout': {
          '0%': { opacity: '1' },
          '0%': { opacity: '0.5' },
          '0%': { opacity: '0' },
        },
        'edit': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(9deg)' },
          '75%': { transform: 'rotate(-9deg)' },
        },
      },
      animation: {
        'fadein': 'fadein 0.5s ease-in-out',
        'fadeout': 'fadeout 1s ease-in-out',
        'edit': 'edit 0.6s ease'
      },
    },
  },
  plugins: [],
}
