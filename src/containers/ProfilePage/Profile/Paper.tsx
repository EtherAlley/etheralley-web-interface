import { Box } from '@chakra-ui/layout';
import { As } from '@chakra-ui/react';
import useAppSelector from '../../../hooks/useAppSelector';
import useHexToRgb from '../../../hooks/useHexToRgb';
import { selectColors } from '../slice';

function Paper({
  children,
  ...props
}: {
  children?: JSX.Element;
  [x: string]: JSX.Element | string | number | undefined | As | (() => void) | { [x: string]: string };
}) {
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
