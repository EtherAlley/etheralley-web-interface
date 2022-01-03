import { extendTheme } from '@chakra-ui/react';

/**
 * https://smart-swatch.netlify.app/#2fe1b9
 */

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50: '#dcfff6',
      100: '#b5f6e9',
      200: '#8cf0da',
      300: '#60e9cb',
      400: '#36e2bc',
      500: '#1dc9a2',
      600: '#0f9c7e',
      700: '#026f5a',
      800: '#004435',
      900: '#001811',
    },
  },
});

export default theme;
