import { Box } from '@chakra-ui/layout';
import { ReactChild } from 'react';
import useAppSelector from '../../../hooks/useAppSelector';
import useHexToRgb from '../../../hooks/useHexToRgb';
import { selectColors } from '../slice';

function Paper({ children, ...props }: { children?: ReactChild; [x: string]: any }) {
  const { shadow } = useAppSelector(selectColors);
  const rgbAccent = useHexToRgb(shadow);

  return (
    <Box
      background="profile.secondary"
      borderRadius="lg"
      boxShadow={`0 0 15px rgba(${rgbAccent}, 0.6)`}
      borderWidth="0px"
      {...props}
    >
      {children}
    </Box>
  );
}

export default Paper;
