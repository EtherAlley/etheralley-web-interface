import { useMediaQuery } from '@chakra-ui/react';

function useIsMobile(): boolean {
  const isMobile = useMediaQuery('only screen and (max-width: 760px)')[0];

  return isMobile;
}

export default useIsMobile;
