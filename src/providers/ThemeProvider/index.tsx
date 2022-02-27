import { ColorModeScript, ChakraProvider, extendTheme } from '@chakra-ui/react';
import { ReactChild } from 'react';
import useAppSelector from '../../hooks/useAppSelector';
import { selectTheme } from './slice';

function ThemeProvider({ children }: { children: ReactChild }) {
  const theme = useAppSelector(selectTheme);

  return (
    <>
      <ColorModeScript initialColorMode={'dark'} />
      <ChakraProvider theme={extendTheme(theme)}>{children}</ChakraProvider>
    </>
  );
}

export default ThemeProvider;
