import { Box, ChakraProps } from '@chakra-ui/react';
import useAppSelector from '../../../hooks/useAppSelector';
import useHexToRgb from '../../../hooks/useHexToRgb';
import { selectColors } from '../slice';

function Divider(props: ChakraProps) {
  const { primary_text } = useAppSelector(selectColors);
  const rgbAccent = useHexToRgb(primary_text);

  return <Box height="1px" borderTop={`1px solid rgba(${rgbAccent}, 0.1)`} {...props} />;
}

export default Divider;
