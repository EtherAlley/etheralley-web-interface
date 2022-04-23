import { Box, Heading } from '@chakra-ui/react';
import useAppSelector from '../../../hooks/useAppSelector';
import { selectColors } from '../slice';

function Chip({ text }: { text: string }) {
  const { accent } = useAppSelector(selectColors);

  return (
    <Box as="span" display="inline-block" borderRadius={8} py={1} px={2} mt={3} border={`1px solid ${accent}`}>
      <Heading as="h3" size="md" noOfLines={1} textColor="profile.accent">
        {text}
      </Heading>
    </Box>
  );
}

export default Chip;
